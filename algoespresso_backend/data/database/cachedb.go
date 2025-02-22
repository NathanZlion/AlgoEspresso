package database

import (
	"algoespresso_backend/core"
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
func NewCacheDB(config core.Config) *CacheDB {

	return &CacheDB{}
}

func (cache *CacheDB) Connect(params ConnectDbParams) error {
	env := params.Config.GetEnv()

	cache.Client = redis.NewClient(
		&redis.Options{
			Addr:     fmt.Sprintf("%s:%d", env.CacheDBHost, env.CacheDBPort),
			Password: env.CacheDBPassword,
			DB:       env.CacheDBDatabaseNumber,
		},
	)

	return nil
}

func (cache *CacheDB) Health() bool {
	timeoutDuration := time.Second * 1
	ctx, cancel := context.WithTimeout(context.Background(), timeoutDuration)
	defer cancel()

	err := cache.Client.Ping(ctx)
	return err == nil

}
