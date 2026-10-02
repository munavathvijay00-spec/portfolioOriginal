declare namespace Cloudflare {
  interface Env {
    DB?: D1Database;
    PORTFOLIO_ADMIN_EMAIL?: string;
    RESEND_API_KEY?: string;
    PORTFOLIO_EMAIL_FROM?: string;
    BUCKET?: R2Bucket;
  }
}
