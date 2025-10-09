.PHONY: help up down build logs shell db-generate db-migrate db-seed db-setup db-reset restart clean

# Default target
help:
	@echo "Available commands:"
	@echo "  make up              - Start all services"
	@echo "  make down            - Stop all services"
	@echo "  make build           - Build all services"
	@echo "  make logs            - Show logs (add service=<name> for specific service)"
	@echo "  make shell           - Open shell in backend container"
	@echo ""
	@echo "Database commands:"
	@echo "  make db-generate     - Generate Prisma clients for all services"
	@echo "  make db-migrate      - Run migrations for all databases"
	@echo "  make db-seed         - Seed all databases with test data"
	@echo "  make db-setup        - Complete setup (generate + migrate + seed)"
	@echo "  make db-reset        - Reset all databases"
	@echo ""
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
	docker compose -f docker-compose.dev.yml exec backend sh

restart:
ifdef service
	docker compose -f docker-compose.dev.yml restart $(service)
else
	docker compose -f docker-compose.dev.yml restart
endif

# Database commands (all services at once)
db-generate:
	@echo "🔧 Generating Prisma clients for all services..."
	docker compose -f docker-compose.dev.yml exec backend npx prisma generate --schema=apps/user-service/prisma/schema.prisma
	docker compose -f docker-compose.dev.yml exec backend npx prisma generate --schema=apps/inventory-service/prisma/schema.prisma
	@echo "✅ Prisma clients generated!"

db-migrate:
	@echo "📦 Running migrations for all databases..."
	docker compose -f docker-compose.dev.yml exec backend npx prisma migrate dev --schema=apps/user-service/prisma/schema.prisma --name auto
	docker compose -f docker-compose.dev.yml exec backend npx prisma migrate dev --schema=apps/inventory-service/prisma/schema.prisma --name auto
	@echo "✅ Migrations completed!"

db-seed:
	@echo "🌱 Seeding databases..."
	docker compose -f docker-compose.dev.yml exec backend ts-node apps/inventory-service/prisma/seeds/seed.ts
	@echo "✅ Databases seeded!"

db-setup:
	@echo "🚀 Setting up all databases (generate + migrate + seed)..."
	@make db-generate
	@make db-migrate
	@make db-seed
	@echo "✅ Database setup complete!"

db-reset:
	@echo "⚠️  Resetting all databases..."
	docker compose -f docker-compose.dev.yml exec backend npx prisma migrate reset --schema=apps/user-service/prisma/schema.prisma --force
	docker compose -f docker-compose.dev.yml exec backend npx prisma migrate reset --schema=apps/inventory-service/prisma/schema.prisma --force
	@echo "✅ Databases reset!"

# Cleanup
clean:
	docker compose -f docker-compose.dev.yml down -v --rmi all
	docker system prune -f

