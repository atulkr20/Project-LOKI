CREATE TABLE "link_tracking" (
	"id" serial PRIMARY KEY NOT NULL,
	"short_code" varchar NOT NULL,
	"user_id" integer,
	"event_type" varchar NOT NULL,
	"time_spent_ms" integer,
	"user_agent" text,
	"referrer" text,
	"created_at" timestamp DEFAULT now()
);
