package main

import (
	"algoespresso_backend/application/server"
	"algoespresso_backend/core"
	"algoespresso_backend/data/database"
	"algoespresso_backend/injection"
	"context"
	"fmt"
	"log"
	"os"
	"os/signal"
	"strconv"
	"syscall"
	"time"

	"github.com/clerk/clerk-sdk-go/v2"
	_ "github.com/joho/godotenv/autoload"
	"go.uber.org/dig"
)

type ServerStartDependencies struct {
	dig.In
	Config core.IConfig `name:"Config"`
}

func startAPIServer(deps ServerStartDependencies) {
	// Register the handlers for the server
	_server := server.NewServer()
	clerkSecret := deps.Config.GetEnv().ClerkSecretKey
	clerk.SetKey(clerkSecret)

	// channel to signal when the shutdown is complete
	shutdownComplete := make(chan bool, 1)

	// start server listening on port
	go func() {
		port, _ := strconv.Atoi(os.Getenv(("PORT")))
		if err := _server.Listen(fmt.Sprintf(":%d", port)); err != nil {
			panic(fmt.Sprintf("Failed to start server %v\n", err))
		}
	}()

	go gracefulShutdown(_server, shutdownComplete)

	// wait for a graceful shutdown comlete to be sent through the channel
	<-shutdownComplete
}

func gracefulShutdown(server server.IServer, shutdownComplete chan bool) {
	ctx, stop := signal.NotifyContext(context.Background(), syscall.SIGINT, syscall.SIGTERM)
	defer stop()

	<-ctx.Done()

	log.Println("Server gracefully shutting down: Ctrl+C pressed, Press again to force shutdown!")

	// timed request that gives the server 5 seconds to complete currently being handled requests
	ctx, cancel := context.WithTimeout(context.Background(), time.Second*5)
	defer cancel()

	if err := server.ShutdownWithContext(ctx); err != nil {
		log.Printf("Server forced to shutdown after waiting for 5 seconds%v\n", err)
	}

	log.Println("Server shutdown complete signaled!")

	shutdownComplete <- true
}

type CacheConnectionDeps struct {
	dig.In
	CacheDb database.ICacheDB `name:"CacheDb"`
	Config  core.IConfig      `name:"Config"`
}

func connectCache(deps CacheConnectionDeps) error {
	cache := deps.CacheDb
	return cache.Connect(
		database.ConnectDbParams{
			Config: deps.Config,
		},
	)
}

func disconnectCache(deps CacheConnectionDeps) {
	fmt.Println("===Releasing cache resource")
	deps.CacheDb.Disconnect()
}

type DatabaseConnectionDeps struct {
	dig.In
	Database database.IDatabase `name:"Database"`
	Config   core.IConfig       `name:"Config"`
}

func connectDatabase(deps DatabaseConnectionDeps) error {
	db := deps.Database
	return db.Connect(
		database.ConnectDbParams{
			Config: deps.Config,
		},
	)
}

func disconnectDatabase(deps DatabaseConnectionDeps) {
	fmt.Println("===Releasing Database resource")
	deps.Database.Disconnect()
}

func main() {
	container := injection.Container

	defer container.Invoke(disconnectDatabase)
	if err := container.Invoke(connectDatabase); err != nil {
		panic(fmt.Sprintf("Failed to connect to database: %v\n", err))
	}

	defer container.Invoke(disconnectCache)
	if err := container.Invoke(connectCache); err != nil {
		panic(fmt.Sprintf("Failed to connect to cache server: %v\n", err))
	}

	if err := container.Invoke(startAPIServer); err != nil {
		panic(fmt.Sprintf("Failed to start server: %v\n", err))
	}

	log.Println("Shutdown Successful!")
}
