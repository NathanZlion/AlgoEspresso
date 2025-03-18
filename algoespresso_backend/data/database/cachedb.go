package database

import (
	"context"
	"fmt"
	"time"

	"github.com/redis/go-redis/v9"
)

type ICacheDB interface {
	Connect(params ConnectDbParams) error
	Disconnect()
	Health() error
}

type CacheDB struct {
	Client *redis.Client
}

// We need the config for the connection credentials and stuff
func NewCacheDB() *CacheDB {
	return &CacheDB{}
}

func (cache *CacheDB) Connect(params ConnectDbParams) error {
	fmt.Println("Trying to connect to redis...")
	env := params.Config.GetEnv()

	cache.Client = redis.NewClient(
		&redis.Options{
			Username: env.CacheDBUsername,
			Addr:     fmt.Sprintf("%s:%s", env.CacheDBHost, env.CacheDBPort),
			Password: env.CacheDBPassword,
			DB:       env.CacheDBDatabaseNumber,
		},
	)
	fmt.Printf("Redis Connection %v \n", cache.Client.ClientID(context.Background()))

	if cache.Client == nil {
		return fmt.Errorf("Cannot connect to redis server!")
	}

	fmt.Println("Connected to Redis successfully")
	return nil
}

func (cache *CacheDB) Disconnect() {
	cache.Client.Close()
}

func (cache *CacheDB) Health() error {
	timeoutDuration := time.Second * 1
	ctx, cancel := context.WithTimeout(context.Background(), timeoutDuration)
	defer cancel()

	if err := cache.Client.Ping(ctx).Err(); err != nil {
		return err
	}

	return nil
}
