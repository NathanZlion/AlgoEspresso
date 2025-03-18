package main

import (
	"fmt"
	"net/http"
	"os"
	"strconv"

	_ "github.com/joho/godotenv/autoload"
)

func healthCheckAPICall(url string) bool {
	resp, err := http.Get(url)
	return err == nil && resp.StatusCode == http.StatusOK
}

func readinessCheckAPICall(url string) bool {
	resp, err := http.Get(url)
	return err == nil && resp.StatusCode == http.StatusOK
}

func main() {
	port, err := strconv.Atoi(os.Getenv("PORT"))
	if err != nil {
		port = 8080
	}

	healthurl := fmt.Sprintf("http://localhost:%v/health-check", port)
	readinessurl := fmt.Sprintf("http://localhost:%v/readiness-check", port)
	if healthCheckAPICall(healthurl) && readinessCheckAPICall(readinessurl) {
		fmt.Printf("System Healthy!! \n")
		os.Exit(0)
	} else {
		os.Exit(1)
	}
}
