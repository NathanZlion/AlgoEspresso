package server

import (
	middleware "algoespresso_backend/application/middlewares"
	"context"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/gofiber/fiber/v2/middleware/healthcheck"
	"github.com/gofiber/fiber/v2/middleware/helmet"
	"github.com/gofiber/fiber/v2/middleware/logger"
	"github.com/gofiber/fiber/v2/middleware/requestid"
)

type IServer interface {
	RegisterRoutes()
	Listen(string) error
	ShutdownWithContext(context.Context) error
}

type Server struct {
	*fiber.App
}

func NewServer() *Server {
	server := &Server{
		App: fiber.New(fiber.Config{
			ServerHeader:  "algoespresso_backend",
			AppName:       "algoespresso_backend",
			CaseSensitive: true,
		}),
	}

	// Apply CORS middleware
	server.App.Use(cors.New(cors.Config{
		AllowOrigins:     "*",
		AllowMethods:     "GET,POST,PUT,DELETE,OPTIONS,PATCH",
		AllowHeaders:     "Accept,Authorization,Content-Type",
		AllowCredentials: false, // credentials require explicit origins
		MaxAge:           300,
	}))

	server.App.Use(helmet.New())

	// Health check
	server.App.Use(healthcheck.New(healthcheck.Config{
		LivenessEndpoint:  "/health-check",
		LivenessProbe:     server.HealthCheck,
		ReadinessEndpoint: "/readiness-check",
		ReadinessProbe:    server.ReadinessCheck,
	}))

	// logger
	server.App.Use(requestid.New())
	server.App.Use(logger.New(logger.Config{
		Format:        "[${ip}]:${port} ${status} - ${method} ${path} request id: ${locals:requestid}\n",
		DisableColors: false,
	}))

	server.RegisterRoutes()
	return server
}

func (s *Server) RegisterRoutes() {

	v1 := s.App.Group("/api/v1", func(c *fiber.Ctx) error {
		c.Set("Version", "v1")
		return c.Next()
	})

	v1.Use(middleware.WithHeaderAuthorization)

	s.RegisterProblemsRoutes(v1)
}
