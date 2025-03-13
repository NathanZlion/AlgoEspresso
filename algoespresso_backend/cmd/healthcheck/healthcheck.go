package main

import (
	"fmt"
	"net/http"
	"os"
	"strconv"

	_ "github.com/joho/godotenv/autoload"
)

func healthCheck(url string) bool {
	resp, err := http.Get(url)
	fmt.Printf("Pinging url %v ...\n", url)

	return err == nil && resp.StatusCode == http.StatusOK
}

func readinessCheck(url string) bool {
	resp, err := http.Get(url)
	fmt.Printf("Pinging url %v ...\n", url)

	return err == nil && resp.StatusCode == http.StatusOK
}

func main() {
	port, err := strconv.Atoi(os.Getenv("PORT"))
	if err != nil {
		port = 8080
	}

	healthurl := fmt.Sprintf("http://localhost:%v/health-check", port)
	readinessurl := fmt.Sprintf("http://localhost:%v/readiness-check", port)
	if healthCheck(healthurl) && readinessCheck(readinessurl) {
		fmt.Printf("System Healthy!! \n")
		os.Exit(0)
	} else {
		os.Exit(1)
	}
}
