import mongoose from 'mongoose'
import app from './app'
import config from './config'

//  mongoose connection
const bootstrap = async () => {
  try {
    await mongoose.connect(config.database_url as string)
    // run
    app.listen(config.port, () => {
      console.log(`💡Example app listening on port ${config.port}`)
    })
  } catch (error) {
    console.log('🔥Failed to connection database', error)
  }
}

//  call function to running and connection database
bootstrap()
