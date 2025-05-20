type Env = 'development' | 'production' | 'test';

const ENV = (process.env.NODE_ENV as Env) || 'development';

const ENV_CONFIG: Record<Env, { API_URL: string }> = {
  development: {
    // API_URL: 'https://localhost:44305/api', // web
    // API_URL: 'http://192.168.100.27:5000/api', // mobile
    // API_URL: 'http://192.168.100.27:3001/api', // IIS 
    API_URL: 'https://malayanprints.cc/api'

  },
  production: {
    API_URL: 'https://malayanprints.cc/api'
  },
  test: {
    // API_URL: 'http://192.168.100.27:3001/api'
    API_URL: 'https://malayanprints.cc/api'
  },
};

export default ENV_CONFIG[ENV];