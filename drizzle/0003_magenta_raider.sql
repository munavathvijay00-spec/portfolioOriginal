ALTER TABLE `messages` ADD `notification_status` text DEFAULT 'not_configured' NOT NULL;--> statement-breakpoint
ALTER TABLE `messages` ADD `notification_error` text;--> statement-breakpoint
ALTER TABLE `messages` ADD `notification_payload` text;--> statement-breakpoint
ALTER TABLE `messages` ADD `notification_started_at` text;--> statement-breakpoint
ALTER TABLE `messages` ADD `notification_updated_at` text;--> statement-breakpoint
ALTER TABLE `messages` ADD `provider_id` text;