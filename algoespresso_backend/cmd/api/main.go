package main

import (
	"algoespresso_backend/application/server"
	"algoespresso_backend/core"
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

func gracefulShutdown(server server.IServer, shutdownComplete chan bool) {
	ctx, stop := signal.NotifyContext(context.Background(), syscall.SIGINT, syscall.SIGTERM)
	defer stop()

	<-ctx.Done()

	log.Println("Server gracefully shutting down: Ctrl+C pressed, Press again to force shutdown!")

	// timed request that gives the server 5 seconds to complete currently being handled requests
	ctx, cancel := context.WithTimeout(context.Background(), time.Second*5)
	defer cancel()

	if err := server.ShutdownWithContext(ctx); err != nil {
		log.Printf("Server forced to shutdown %v\n", err)
	}

	log.Println("Server shutdown complete signaled!")

	shutdownComplete <- true
}

type ServerStartDependencies struct {
	dig.In
	Server server.IServer `name:"Server"`
	Config core.IConfig   `name:"Config"`
}

func startServer(deps ServerStartDependencies) {
	// Register the handlers for the server
	deps.Server.RegisterRoutes()
	clerkSecret := deps.Config.GetEnv().ClerkSecretKey
	clerk.SetKey(clerkSecret)

	// channel to signal when the shutdown is complete
	shutdownComplete := make(chan bool, 1)

	// start server listening on port
	go func() {
		port, _ := strconv.Atoi(os.Getenv(("PORT")))
		if err := deps.Server.Listen(fmt.Sprintf(":%d", port)); err != nil {
			panic(fmt.Sprintf("Failed to start server %v\n", err))
		}
	}()

	go gracefulShutdown(deps.Server, shutdownComplete)

	// wait for a graceful shutdown comlete to be sent through the channel
	<-shutdownComplete
}

func main() {
	container := injection.Register()
	err := container.Invoke(startServer)

	if err != nil {
		panic(fmt.Sprintf("Failed to start server: %v\n", err))
	}

	log.Println("Shutdown Successful!")
	os.Exit(0)
}
