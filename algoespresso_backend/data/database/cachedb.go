package database

import (
	"context"
	"fmt"
	"time"

	"github.com/redis/go-redis/v9"
)

type ICacheDB interface {
	IDatabase
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

	if cache.Client == nil {
		return fmt.Errorf("Cannot connect to redis server!")
	}

	fmt.Println("Connected to Redis successfully")
	return nil
}

func (cache *CacheDB) Disconnect() {
	cache.Client.Close()
}

func (cache *CacheDB) Health() bool {
	timeoutDuration := time.Second * 1
	ctx, cancel := context.WithTimeout(context.Background(), timeoutDuration)
	defer cancel()

	err := cache.Client.Ping(ctx)
	return err == nil

}
