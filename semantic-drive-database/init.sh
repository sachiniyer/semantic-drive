echo "creating database"
psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" <<-EOSQL
  CREATE DATABASE "$NEW_POSTGRES_DB";
EOSQL

echo "adding extensions"
psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$NEW_POSTGRES_DB" <<-EOSQL
  CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
  CREATE EXTENSION IF NOT EXISTS "pgcrypto";
EOSQL

echo "creating user"
psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<-EOSQL
  CREATE USER "$NEW_POSTGRES_USER" WITH LOGIN PASSWORD '$NEW_POSTGRES_PASSWORD';
EOSQL

echo "granting privaleges"
psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<-EOSQL
     ALTER DATABASE "$NEW_POSTGRES_DB" OWNER TO "$NEW_POSTGRES_USER";
EOSQL
