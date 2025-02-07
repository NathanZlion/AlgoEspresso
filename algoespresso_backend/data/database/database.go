package database

import (
	"context"
	"fmt"
	"os"
	"time"

	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"

	_ "github.com/joho/godotenv/autoload"
)

type IDatabase interface {
	Connect() error
	Health() bool
}

// Interface Implementation
type Database struct {
	client *mongo.Client
}

var (
	host = os.Getenv("BLUEPRINT_DB_HOST")
	port = os.Getenv("BLUEPRINT_DB_PORT")
)

func NewDatabase() *Database {
	client, err := mongo.Connect(context.Background(), options.Client().ApplyURI(fmt.Sprintf("mongodb://%s:%s", host, port)))

	if err != nil {
		panic(err)
	}

	return &Database{
		client: client,
	}
}

func (mongodbDatabase *Database) Connect() error {
	return nil
}

func (mongodbDatabase *Database) Health() bool {
	timeoutDuration := time.Second * 1
	ctx, cancel := context.WithTimeout(context.Background(), timeoutDuration)
	defer cancel()

	err := mongodbDatabase.client.Ping(ctx, nil)
	return err == nil
}
