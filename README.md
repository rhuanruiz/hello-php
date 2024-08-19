O projeto utiliza PHP, Nginx, PostgreSQL e frontend em React.

- docker-compose build
- docker-compose up -d
- docker-compose exec -T postgresql psql -U root -d visu_clientes -f ./migrations/000_migration.sql
- Acesso: localhost:4000
