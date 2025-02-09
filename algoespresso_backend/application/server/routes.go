package server

import "github.com/gofiber/fiber/v2"

func (s *Server) HealthCheck(c *fiber.Ctx) bool {
	// check db health
	// check all service health
	return true
}

func (s *Server) ReadinessCheck(c *fiber.Ctx) bool {
	// Check for readiness
	return true
}
