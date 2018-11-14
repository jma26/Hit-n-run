const env = process.env.NODE_ENV || 'dev'

const dev = {
  app: {
    port: parseInt(process.env.DEV_APP_PORT, 10) || 8000
  },
  db: {
    host: process.env.DEV_DB_HOST || 'localhost',
    databaseName: process.env.DEV_DB_NAME || 'hit-n-run',
    user: process.env.DEV_DB_USER || 'root',
    password: process.env.DEV_DB_PASSWORD || ''
  },
  jwt: {
    secret: process.env.DEV_JWT_SECRET || 'worldsbestsecretkey'
  },
};

const prod = {
    app: {
      port: parseInt(process.env.PROD_APP_PORT, 10)
    },
    db: {
      host: process.env.PROD_DB_HOST,
      databaseName: process.env.PROD_DB_NAME
    },
    jwt: {
      secret: process.env.PROD_JWT_SECRET
    },
  };

const config = {
    dev,
    prod
}

module.exports = config[env];