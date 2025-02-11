package server

import (
	"fmt"
	"log"

	"github.com/gofiber/fiber/v2"
)

func (s *Server) HealthCheck(c *fiber.Ctx) bool {
	// check db health
	// check all service health
	return true
}

func (s *Server) ReadinessCheck(c *fiber.Ctx) bool {
	// Check for readiness
	return true
}

func (s *Server) RegisterProblemsRoutes(router fiber.Router) {
	problemRouter := router.Group("/problem")
	problemRouter.Get("/list", func(c *fiber.Ctx) error {
		return c.SendString("Hello from list problems")
	})

	specificProblemRouter := problemRouter.Group("/:id")

	// get a specific problem
	specificProblemRouter.Get("/", func(ctx *fiber.Ctx) error {
		id := ctx.Params("id")
		return ctx.SendString(fmt.Sprintf("Get Problem With Id: %s \n", id))
	})

	// submit a solution
	// TODO: block unauthorized users
	specificProblemRouter.Post("/submit", func(ctx *fiber.Ctx) error {
		id := ctx.Params("id")
		var submittion Submittion
		if err := ctx.BodyParser(&submittion); err != nil {
			log.Println("Failed to parse body to solution")
		}

		return ctx.SendString(fmt.Sprintf("Submit Solution For Problem With Id: %s Code: %s\n", id, submittion.Code))
	})
}
