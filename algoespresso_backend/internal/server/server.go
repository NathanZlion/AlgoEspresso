package server

import (
	"github.com/gofiber/fiber/v2"

	"algoespresso_backend/internal/database"
)

type FiberServer struct {
	*fiber.App

	db database.Service
}

func New() *FiberServer {
	server := &FiberServer{
		App: fiber.New(fiber.Config{
			ServerHeader: "algoespresso_backend",
			AppName:      "algoespresso_backend",
		}),

		db: database.New(),
	}

	return server
}
