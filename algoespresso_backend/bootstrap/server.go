package bootstrap

import (
	"algoespresso_backend/data/database"
	"context"

	"github.com/gofiber/fiber/v2/middleware/cors"
	"go.uber.org/dig"

	"github.com/gofiber/fiber/v2"
)

type IServer interface {
	RegisterRoutes()
	Listen(string) error
	ShutdownWithContext(context.Context) error
}

type Server struct {
	*fiber.App
	Db database.IDatabase `name:"Database"`
}

type NewServerDeps struct {
	dig.In

	Db database.IDatabase `name:"Database"`
}

func NewServer(deps NewServerDeps) *Server {
	server := &Server{
		App: fiber.New(fiber.Config{
			ServerHeader: "algoespresso_backend",
			AppName:      "algoespresso_backend",
		}),

		Db: deps.Db,
	}

	return server
}

func (s *Server) RegisterRoutes() {
	// Apply CORS middleware
	s.App.Use(cors.New(cors.Config{
		AllowOrigins:     "*",
		AllowMethods:     "GET,POST,PUT,DELETE,OPTIONS,PATCH",
		AllowHeaders:     "Accept,Authorization,Content-Type",
		AllowCredentials: false, // credentials require explicit origins
		MaxAge:           300,
	}))

	s.App.Get("/ping", s.HelloWorldHandler)
	s.App.Get("/health", s.healthHandler)
}

func (s *Server) HelloWorldHandler(c *fiber.Ctx) error {
	resp := fiber.Map{
		"message": "Pong",
	}

	return c.JSON(resp)
}

func (s *Server) healthHandler(c *fiber.Ctx) error {
	return c.JSON(s.Db.Health())
}
