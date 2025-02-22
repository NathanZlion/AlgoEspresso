package database

import (
	"context"
	"time"

	_ "github.com/joho/godotenv/autoload"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

type IDatabase interface {
	Connect(ConnectDbParams) error
	Health() bool
}

// Interface Implementation
type Database struct {
	client *mongo.Client
}

// return just an empty instance with no connection
func NewDatabase() *Database {
	return &Database{}
}

func (mongodbDatabase *Database) Connect(params ConnectDbParams) error {
	client, err := mongo.Connect(
		context.Background(),
		options.Client().ApplyURI(params.Config.GetEnv().MongoDBConnectionString),
	)

	if err != nil {
		return err
	}
	mongodbDatabase.client = client
	return nil
}

func (mongodbDatabase *Database) Health() bool {
	timeoutDuration := time.Second * 1
	ctx, cancel := context.WithTimeout(context.Background(), timeoutDuration)
	defer cancel()

	err := mongodbDatabase.client.Ping(ctx, nil)
	return err == nil
}
