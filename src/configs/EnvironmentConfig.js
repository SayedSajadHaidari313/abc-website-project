const dev = {
	API_ENDPOINT_URL: '/api'
  };
  
  const prod = {
	API_ENDPOINT_URL: '/api'
  };
  
  const test = {
	API_ENDPOINT_URL: '/api'
  };
  
  const getEnv = () => {
	switch (import.meta.env.MODE) {
	  case 'development':
		return dev;
	  case 'production':
		return prod;
	  case 'test':
		return test;
	  default:
		return prod; // fallback
	}
  };
  
  export const env = getEnv();
  