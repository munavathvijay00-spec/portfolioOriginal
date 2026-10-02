import { sqliteTable, text, integer, index } from "drizzle-orm/sqlite-core";
export const portfolio = sqliteTable("portfolio", {
 id: integer("id").primaryKey(), content: text("content").notNull(),
 contentVersion: integer("content_version").notNull().default(1),
 revision: integer("revision").notNull().default(1), updatedAt: text("updated_at").notNull(), updatedBy: text("updated_by")
});
export const assets = sqliteTable("assets", {
 id: text("id").primaryKey(), objectKey: text("object_key").notNull(), contentType: text("content_type").notNull(),
 size: integer("size").notNull(), createdAt: text("created_at").notNull()
});
export const messages = sqliteTable("messages", {
 id: text("id").primaryKey(), name: text("name").notNull(), email: text("email").notNull(), message: text("message").notNull(), createdAt: text("created_at").notNull(),
 notificationStatus:text("notification_status").notNull().default("not_configured"), notificationError:text("notification_error"),
 notificationPayload:text("notification_payload"), notificationStartedAt:text("notification_started_at"), notificationUpdatedAt:text("notification_updated_at"), providerId:text("provider_id")
} , table => [index("idx_messages_email_created_at").on(table.email,table.createdAt),index("idx_messages_created_at").on(table.createdAt)]);
