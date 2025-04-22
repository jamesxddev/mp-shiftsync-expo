type Env = 'development' | 'production' | 'test';

const ENV = (process.env.NODE_ENV as Env) || 'development';

const ENV_CONFIG: Record<Env, { API_URL: string }> = {
  development: {
    API_URL: 'https://localhost:44305/api',
  },
  production: {
    API_URL: 'https://api.myproduction.com',
  },
  test: {
    API_URL: 'https://api.mytestenv.com',
  },
};

export default ENV_CONFIG[ENV];