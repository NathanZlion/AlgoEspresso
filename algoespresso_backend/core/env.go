package core

import (
	"fmt"
	"os"
	"strconv"

	_ "github.com/joho/godotenv/autoload"
)

type Env struct {
	ServerPort              int
	App_Env                 string
	DBHost                  string
	DBPort                  string
	DBUsername              string
	DBRootPassword          string
	MongoDBConnectionString string
	CacheDBUsername         string
	CacheDBHost             string
	CacheDBPort             string
	CacheDBPassword         string
	CacheDBDatabaseNumber   int
	ClerkSecretKey          string
}

func NewEnv() Env {
	port, err := strconv.Atoi(os.Getenv("PORT"))
	if err != nil {
		panic(fmt.Sprintf("Failed to read Port from environment: %v", err))
	}

	cacheDBDatabaseNumber, err := strconv.Atoi(os.Getenv("CACHE_DB_DATABASE_NUMBER"))
	if err != nil {
		panic(fmt.Sprintf("Failed to read cacheDbDatabaseNumber from environment: %v", err))
	}

	return Env{
		ServerPort:              port,
		App_Env:                 os.Getenv("APP_ENV"),
		DBHost:                  os.Getenv("DB_HOST"),
		DBPort:                  os.Getenv("DB_PORT"),
		DBUsername:              os.Getenv("DB_USERNAME"),
		DBRootPassword:          os.Getenv("DB_ROOT_PASSWORD"),
		CacheDBUsername:         os.Getenv("CACHE_DB_USERNAME"),
		CacheDBHost:             os.Getenv("CACHE_DB_HOST"),
		CacheDBPort:             os.Getenv("CACHE_DB_PORT"),
		CacheDBPassword:         os.Getenv("CACHE_DB_PASSWORD"),
		ClerkSecretKey:          os.Getenv("CLERK_SECRET_KEY"),
		MongoDBConnectionString: os.Getenv("MONGO_CONNECTION_STRING"),
		CacheDBDatabaseNumber:   cacheDBDatabaseNumber,
	}
}
