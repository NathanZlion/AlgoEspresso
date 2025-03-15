package server

import (
	"algoespresso_backend/core"
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
		fmt.Printf("Something Wrong with the Cache %+v\n", err)
		return false
	}

	if err := container.Invoke(pingDatabase); err != nil {
		fmt.Printf("Something Wrong with the Database %+v\n", err)
		return false
	}

	return true
}

type PingDeps struct {
	dig.In
	Database database.IDatabase `name:"Database"`
	CacheDb  database.ICacheDB  `name:"CacheDb"`
	Config   core.IConfig       `name:"Config"`
}

func pingCacheDb(deps PingDeps) error {
	return deps.CacheDb.Health()
}

func pingDatabase(deps PingDeps) error {
	return deps.Database.Health()
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
