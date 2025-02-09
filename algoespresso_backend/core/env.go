package core

import (
	"fmt"
	"os"
	"strconv"

	_ "github.com/joho/godotenv/autoload"
)

type Env struct {
	ServerPort            int
	App_Env               string
	DB_Host               string
	DB_Port               string
	DB_Username           string
	DB_Root_Password      string
	CacheDBHost           string
	CacheDBPort           string
	CacheDBPassword       string
	CacheDBDatabaseNumber int
	ClerkSecretKey        string
}

func NewEnv() Env {
	var err error

	port, err := strconv.Atoi(os.Getenv("PORT"))
	cacheDBDatabaseNumber, err := strconv.Atoi(os.Getenv("CacheDBDatabaseNumber"))

	if err != nil {
		panic(fmt.Sprintf("Failed to read variables from environment: %v", err))
	}

	return Env{
		ServerPort:            port,
		App_Env:               os.Getenv("APP_ENV"),
		DB_Host:               os.Getenv("DB_HOST"),
		DB_Port:               os.Getenv("DB_PORT"),
		DB_Username:           os.Getenv("DB_USERNAME"),
		DB_Root_Password:      os.Getenv("DB_ROOT_PASSWORD"),
		CacheDBHost:           os.Getenv("CacheDBHost"),
		CacheDBPort:           os.Getenv("CacheDBPort"),
		CacheDBPassword:       os.Getenv("CacheDBPassword"),
		ClerkSecretKey:        os.Getenv("CLERK_SECRET_KEY"),
		CacheDBDatabaseNumber: cacheDBDatabaseNumber,
	}
}
