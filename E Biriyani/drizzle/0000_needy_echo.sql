CREATE TABLE "inventories" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "inventories_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"name" varchar(255) NOT NULL,
	"stock" integer DEFAULT 100 NOT NULL,
	"warehouse_location" varchar(255) NOT NULL,
	"last_updated" timestamp NOT NULL
);
