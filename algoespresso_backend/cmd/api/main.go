package main

import (
	"algoespresso_backend/bootstrap"
	"algoespresso_backend/injection"
	"context"
	"fmt"
	"log"
	"os"
	"os/signal"
	"reflect"
	"strconv"
	"syscall"
	"time"

	_ "github.com/joho/godotenv/autoload"
	"go.uber.org/dig"
)

func gracefulShutdown(server bootstrap.IServer, shutdownComplete chan bool) {
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

	log.Println("Server stopped!")

	shutdownComplete <- true
}

type ServerStartDependencies struct {
	dig.In
	Server bootstrap.IServer `name:"Server"`
}

func startServer(deps ServerStartDependencies) {
	// Register the handlers for the server
	deps.Server.RegisterRoutes()

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

	log.Println("Server shutdown gracefully completed")
}

func main() {
	container := injection.Register()
	var server *bootstrap.Server

	container.Invoke(func(target *bootstrap.Server) {
		val := reflect.ValueOf(target)
		if val.Kind() != reflect.Ptr {
			panic("target must be a pointer")
		}
		val.Elem().Set(reflect.ValueOf(target))
	})

	fmt.Printf("server instance %v\n", server)

	err := container.Invoke(startServer)

	if err != nil {
		panic(fmt.Sprintf("Failed to start server: %v\n", err))
	}
}
