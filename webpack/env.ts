type AppEnv = 'development' | 'production';

const env: AppEnv = (process.env.NODE_ENV as AppEnv) || 'development';

export const isDev = env === 'development';
