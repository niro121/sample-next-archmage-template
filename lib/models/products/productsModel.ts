import {
  pgTable,
  boolean,
  serial,
  varchar,
  timestamp,
  doublePrecision
} from 'drizzle-orm/pg-core';

export type SelectProduct = typeof products.$inferSelect;

export const products = pgTable('next_products', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 60 }).notNull(),
  price: doublePrecision('price').notNull(),
  image: varchar('image', { length: 500 }).notNull(),
  created_at: timestamp('created_at').notNull().defaultNow()
});
