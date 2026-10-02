CREATE INDEX `idx_messages_email_created_at` ON `messages` (`email`,`created_at`);--> statement-breakpoint
CREATE INDEX `idx_messages_created_at` ON `messages` (`created_at`);