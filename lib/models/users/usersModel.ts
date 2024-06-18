import { pgTable, serial, varchar, boolean } from 'drizzle-orm/pg-core';

export type SelectUser = typeof users.$inferSelect;

export const users = pgTable('next_users', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 50 }),
  username: varchar('username', { length: 50 }),
  email: varchar('email', { length: 50 }),
  isadmin: boolean('isadmin').default(false)
});
