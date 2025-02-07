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

func NewCacheDB(config core.Config) *CacheDB {
	env := config.GetEnv()
	host := env.CacheDBHost
	port := env.CacheDBPort
	password := env.CacheDBPassword
	db := env.CacheDBDatabaseNumber

	return &CacheDB{
		Client: redis.NewClient(
			&redis.Options{
				Addr:     fmt.Sprintf("%s:%d", host, port),
				Password: password,
				DB:       db,
			},
		),
	}
}

func (cache *CacheDB) Connect() error {
	return nil
}

func (cache *CacheDB) Health() bool {
	timeoutDuration := time.Second * 1
	ctx, cancel := context.WithTimeout(context.Background(), timeoutDuration)
	defer cancel()

	err := cache.Client.Ping(ctx)
	return err == nil

}
