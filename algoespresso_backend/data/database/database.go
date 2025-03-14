package database

import (
	"context"
	"fmt"
	"time"

	_ "github.com/joho/godotenv/autoload"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

type IDatabase interface {
	Connect(params ConnectDbParams) error
	Disconnect()
	Health() error
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
	fmt.Println("Trying to connect to database...")
	serverAPI := options.ServerAPI(options.ServerAPIVersion1)
	opts := options.Client().ApplyURI(params.Config.GetEnv().MongoDBConnectionString).SetServerAPIOptions(serverAPI)

	client, err := mongo.Connect(context.Background(), opts)

	if err != nil {
		fmt.Printf("Cannot connect to Mongo server! %+v \n", err)
		return err
	}

	mongodbDatabase.client = client
	fmt.Println("Connected to MongoDb successfully")
	return nil
}

func (mongodbDatabase *Database) Disconnect() {
	if err := mongodbDatabase.client.Disconnect(context.Background()); err != nil {
		fmt.Println("Failed to release mongodb connection.")
	}
}

func (mongodbDatabase *Database) Health() error {
	fmt.Println("Pinging MongoDb")
	timeoutDuration := time.Second * 3
	ctx, cancel := context.WithTimeout(context.Background(), timeoutDuration)
	defer cancel()

	if err := mongodbDatabase.client.Ping(ctx, nil); err != nil {
		fmt.Printf("Failed Pinging MongoDb %+v \n", err)
		return err
	}

	fmt.Println("Pinging Mongo Success")
	return nil
}
