
BACKEND = algoespresso_backend
FRONTEND = algoespresso_frontend
TIME = $$(date +%Y_%m_%d_%H_%M_%S)
LOGS_FOLDER = logs


.PHONY: all
all: build test


.PHONY: time
time:
	@echo $(TIME)


.PHONY: build
build: clean
	@echo "Building Backend..."
	@cd $(BACKEND) && go build -o ./bin/main ./cmd/api/main.go
	@cd $(BACKEND) && go build -o ./bin/healthcheck ./cmd/healthcheck/healthcheck.go
	@echo " ===  ✔ Backend Complete"
	@echo "Building Frontend..."
	@cd $(FRONTEND) && npm run build
	@echo " ===  ✔ Frontend Complete"
	@echo "✔ Complete"


.PHONY: dev
dev:
	@echo "Creating container in dev mode..."
	@docker compose -f "docker-compose-dev.yml" up 2> ./$(LOGS_FOLDER)/dev_$(TIME).log || \
	echo "Error: Docker Compose V2 failed. Open log file $(LOGS_FOLDER)/dev_$(TIME).log for details.";


.PHONY: clear-logs
clear-logs:
	@echo "Clearing logs..."
	@rm -f ./logs/dev_*.log
	@echo "✔ Logs Cleared"


.PHONY: down
down:
	@echo "Shutting and cleaning Docker dev container..."
	@if docker compose -f "docker-compose-dev.yml" down 2>/dev/null; then \
		: ; \
	else \
		echo "Falling back to Docker Compose V1"; \
		docker-compose down; \
	fi


.PHONY: lint
lint:
	@echo "Linting Project..."
	@cd $(FRONTEND) && npm run lint
	@echo "✔ Completed Linting"


# runs both unit and integration tests
.PHONY: test
test:
	@echo "Testing..."
	@ cd $(BACKEND) && go test ./... -v
	@cd $(FRONTEND) && npm run test


.PHONY: clean
clean:
	@echo "Cleaning..."
	rm -f -r $(BACKEND)/bin
	rm -f -r $(BACKEND)/tmp
	cd $(FRONTEND) && rm -rf .next
	@echo "🧹 Cleanup Complete"


.PHONY: help
help:
	@echo "=========================="
	@echo "☕☕☕ AlgoEspresso ☕☕☕"
	@echo "=========================="
	@echo ""
	@echo "Usage: make [target]"
	@echo ""
	@echo "Targets:"
	@echo "  all       - Build and test the project"
	@echo "  build     - Build the project"
	@echo "  dev       - Run the project in development mode"
	@echo "  clear-logs- Clear logs created by the dev target"
	@echo "  down      - Shut down the development containers"
	@echo "  lint      - Lint the project"
	@echo "  test      - Run tests"
	@echo "  clean     - Clean the project, removing temporary and binary files"
	@echo "  help      - Show this help message"
	@echo ""
	@echo "Variables:"
	@echo "  BACKEND   - The backend directory"
	@echo "  FRONTEND  - The frontend directory"
	@echo ""
	@echo "Examples:"
	@echo "  make build"
	@echo ""
	@echo "For more information, see the Makefile file."
	@echo ""
