/* eslint-disable no-undef */
// eslint-disable-next-line no-undef
import dotenv from 'dotenv'
import path from 'path'

dotenv.config({ path: path.join(process.cwd(), '.env') })

export default {
  env: process.env.NODE_ENV,
  port: process.env.PORT,
  database_url: process.env.DATABASE_URL,
}

// cow_hut
// sNeWpoprRW6FMcKU
