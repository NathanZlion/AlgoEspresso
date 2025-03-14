package injection

import (
	// "algoespresso_backend/application/server"
	"algoespresso_backend/core"
	"algoespresso_backend/data/database"
	"algoespresso_backend/data/repository/cache"
	repository "algoespresso_backend/domain/repositories"
	"fmt"
	"log"

	"go.uber.org/dig"
)

type Dependency struct {
	Constructor interface{}
	Interface   interface{}
	Token       string
}

// Register services to container
func Register() *dig.Container {
	container := dig.New()

	log.Println("Registering instances ...")

	deps := []Dependency{
		{
			Constructor: core.NewConfig,
			Interface:   new(core.IConfig),
			Token:       "Config",
		},
		{
			Constructor: database.NewDatabase,
			Interface:   new(database.IDatabase),
			Token:       "Database",
		},
		{
			Constructor: database.NewCacheDB,
			Interface:   new(database.ICacheDB),
			Token:       "CacheDb",
		},
		{
			Constructor: cache.NewCacheRepo,
			Interface:   new(repository.ICacheRepo),
			Token:       "CacheRepo",
		},
		/*
			- inject repositories
			- inject controllers
		*/
	}

	// register the services
	for _, dep := range deps {
		if err := container.Provide(
			dep.Constructor,
			dig.As(dep.Interface),
			dig.Name(dep.Token),
		); err != nil {
			panic(fmt.Sprintf("Error registering service %s with error: %v", dep.Token, err))
		}
	}

	log.Print("Completed registering dependencies ✅")
	return container
}

var Container = Register()