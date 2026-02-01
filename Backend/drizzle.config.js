import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  schema: './models/*', 
  out: './drizzle',
  dialect: 'postgresql',
  dbCredentials: {
    url: "postgresql://neondb_owner:npg_8Lpg0sbUmhon@ep-fancy-heart-ahzwywku-pooler.c-3.us-east-1.aws.neon.tech/neondb?sslmode=require",
  },
});