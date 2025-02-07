package cache

import (
	"algoespresso_backend/data/database"
	"algoespresso_backend/domain/repositories"
	"context"
	"time"
)

type CacheRepo struct {
	db *database.CacheDB
}

func NewCacheRepo(db *database.CacheDB) *CacheRepo {
	return &CacheRepo{db}
}

func (repo *CacheRepo) SetValue(value repository.SetCacheInput) error {
	err := repo.db.Client.Set(context.Background(), value.Key, value.Value, time.Duration(value.Ttl)).Err()
	return err
}

func (repo *CacheRepo) GetValue(key string) (interface{}, error) {
	val, err := repo.db.Client.Get(context.Background(), key).Result()
	return val, err
}

func (repo *CacheRepo) Deletevalue(key string) error {
	err := repo.db.Client.Del(context.Background(), key).Err()
	return err
}
