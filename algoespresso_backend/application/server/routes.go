package server

import (
	"algoespresso_backend/data/database"
	"algoespresso_backend/injection"
	"fmt"
	"github.com/gofiber/fiber/v2"
	"go.uber.org/dig"
)

func (s *Server) HealthCheck(c *fiber.Ctx) bool {
	// TODO: check the health of the database, and cache

	container := injection.Container
	if err := container.Invoke(pingCacheDb); err != nil {
		return false
	}

	if err := container.Invoke(pingDatabase); err != nil {
		return false
	}

	return true
}

func pingCacheDb(
	deps struct {
		dig.In
		cacheDb database.ICacheDB `name:"CacheDatabase"`
	},
) bool {
	return deps.cacheDb.Health()
}

func pingDatabase(
	deps struct {
		dig.In
		database database.Database `name:"Database"`
	},
) bool {
	return deps.database.Health()
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
		return nil
		// id := ctx.Params("id")
		// var submittion Submittion
		// if err := ctx.BodyParser(&submittion); err != nil {
		// 	log.Println("Failed to parse body to solution")
		// }

		// return ctx.SendString(fmt.Sprintf("Submit Solution For Problem With Id: %s Code: %s\n", id, submittion.Code))
	})
}
