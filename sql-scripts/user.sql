CREATE TABLE IF NOT EXISTS "users"(
	"id" SERIAL NOT NULL PRIMARY KEY,
	"first_name" VARCHAR(100) NOT NULL,
	"last_name" VARCHAR(100) NOT NULL,
	"email" VARCHAR(50) NOT NULL,
	"password" VARCHAR(100) NOT NULL,
	"role" VARCHAR(10) NOT NULL,
	"last_login_at" TIMESTAMPTZ,
	"created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
	"updated_at" TIMESTAMPTZ
);