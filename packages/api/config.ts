export const dbConnection =
  process.env.DATABASE_URL ||
  `postgres://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/${process.env.DB_NAME}`;

export const dbPoolMin = parseInt(process.env.DB_POOL_MIN || "", 10) || 2;
export const dbPoolMax = parseInt(process.env.DB_POOL_MAX || "", 10) || 30;
