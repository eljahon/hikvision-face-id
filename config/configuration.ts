
import * as dontenv from 'dotenv'
dontenv.config()
export default () => ({
    port: parseInt(process.env.PORT, 10) || 3000,
    database: {
      type: process.env.DATABASE_TYPE,
      host: process.env.DATABASE_HOST,
      port: parseInt(process.env.DATABASE_PORT, 10) || 5432,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      username: process.env.DATABASE_USER_NAME,
			entities: ['./dist/**/*.entity.js'],
			synchronize: true
    }
  });