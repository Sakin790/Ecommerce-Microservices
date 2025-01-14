import { integer, pgTable, timestamp, varchar } from "drizzle-orm/pg-core";


export const inventoryTable = pgTable("inventories", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  stock: integer().notNull().default(100),
  warehouse_location: varchar({ length: 255 }).notNull(),
  last_updated: timestamp().notNull(),
});


