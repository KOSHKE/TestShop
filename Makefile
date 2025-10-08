.PHONY: help up down build logs shell db-migrate db-seed db-reset restart clean

# Default target
help:
	@echo "Available commands:"
	@echo "  make up              - Start all services"
	@echo "  make down            - Stop all services"
	@echo "  make build           - Build all services"
	@echo "  make logs            - Show logs (add service=<name> for specific service)"
	@echo "  make shell           - Open shell in service (add service=<name>)"
	@echo "  make db-migrate      - Run database migrations"
	@echo "  make db-seed         - Seed database with test data"
	@echo "  make db-reset        - Reset database (migrate + seed)"
	@echo "  make restart         - Restart service (add service=<name>)"
	@echo "  make clean           - Remove all containers, volumes, and images"

# Docker Compose commands
up:
	docker compose -f docker-compose.dev.yml up -d

down:
	docker compose -f docker-compose.dev.yml down

build:
	docker compose -f docker-compose.dev.yml build

logs:
ifdef service
	docker compose -f docker-compose.dev.yml logs -f $(service)
else
	docker compose -f docker-compose.dev.yml logs -f
endif

shell:
ifdef service
	docker compose -f docker-compose.dev.yml exec $(service) sh
else
	docker compose -f docker-compose.dev.yml exec api-gateway sh
endif

restart:
ifdef service
	docker compose -f docker-compose.dev.yml restart $(service)
else
	docker compose -f docker-compose.dev.yml restart
endif

# Database commands
db-migrate:
	docker compose -f docker-compose.dev.yml exec user-service npx prisma migrate dev

db-seed:
	docker compose -f docker-compose.dev.yml exec user-service npm run db:seed

db-reset:
	docker compose -f docker-compose.dev.yml exec user-service npx prisma migrate reset --force

db-generate:
	docker compose -f docker-compose.dev.yml exec user-service npx prisma generate

# Cleanup
clean:
	docker compose -f docker-compose.dev.yml down -v --rmi all
	docker system prune -f

