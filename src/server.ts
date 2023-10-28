import mongoose from 'mongoose'
import app from './app'
import config from './config'
import { errorlogger, logger } from './shared/logger'

//  mongoose connection
const bootstrap = async () => {
  try {
    await mongoose.connect(config.database_url as string)
    // run
    app.listen(config.port, () => {
      logger.info(`💡Example app listening on port ${config.port}`)
    })
  } catch (error) {
    errorlogger.error('🔥Failed to connection database', error)
  }
}

//  call function to running and connection database
bootstrap()
