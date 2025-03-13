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
	"go.uber.org/dig"
)

type IServer interface {
	RegisterRoutes()
	Listen(string) error
	ShutdownWithContext(context.Context) error
}

type Server struct {
	*fiber.App
}

type NewServerDeps struct {
	dig.In
}

func NewServer(deps NewServerDeps) *Server {
	server := &Server{
		App: fiber.New(fiber.Config{
			ServerHeader:  "algoespresso_backend",
			AppName:       "algoespresso_backend",
			CaseSensitive: true,
		}),
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

	s.App.Use(helmet.New())

	// logger
	s.App.Use(requestid.New())
	s.App.Use(logger.New(logger.Config{
		Format:        "[${ip}]:${port} ${status} - ${method} ${path} request id: ${locals:requestid}\n",
		DisableColors: false,
	}))

	s.App.Use(healthcheck.New(healthcheck.Config{
		LivenessEndpoint:  "/health-check",
		LivenessProbe:     s.HealthCheck,
		ReadinessEndpoint: "/readiness-check",
		ReadinessProbe:    s.ReadinessCheck,
	}))

	v1 := s.App.Group("/api/v1", func(c *fiber.Ctx) error {
		c.Set("Version", "v1")
		return c.Next()
	})

	v1.Use(middleware.WithHeaderAuthorization)

	s.RegisterProblemsRoutes(v1)

	// webhook := s.App.Group("/webhook", func(c *fiber.Ctx) error {
	// 	return c.Next()
	// })
}

type Submittion struct {
	Code string `json:"code" xml:"code" form:"code"`
}
