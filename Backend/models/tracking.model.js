import { pgTable, serial, varchar, integer, text, timestamp } from 'drizzle-orm/pg-core';

export const linkTrackingTable = pgTable('link_tracking', {
    id: serial('id').primaryKey(),
    shortCode: varchar('short_code').notNull(),
    userId: integer('user_id'),
    eventType: varchar('event_type').notNull(),
    timeSpent: integer('time_spent_ms'),
    userAgent: text('user_agent'),
    referrer: text('referrer'),
    createdAt: timestamp('created_at').defaultNow()
});
