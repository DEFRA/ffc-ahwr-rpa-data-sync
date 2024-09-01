const Joi = require('joi')
const authConfig = require('./auth')

const schema = Joi.object({
  appInsights: Joi.object(),
  namespace: Joi.string().optional(),
  env: Joi.string().valid('development', 'test', 'production').default(
    'development'
  ),
  ActiveAppScheduler: {
    enabled: Joi.bool().default(true),
    schedule: Joi.string().default('0 18 * * 1-5')
  },
  isDev: Joi.boolean().default(false),
  port: Joi.number().default(3000),
  applicationApiUri: Joi.string().uri()
})

const config = {
  appInsights: require('applicationinsights'),
  namespace: process.env.NAMESPACE,
  env: process.env.NODE_ENV,
  ActiveAppScheduler: {
    enabled: process.env.ACTIVE_APP_PROCESS_ENABLED,
    schedule: process.env. ACTIVE_APP_PROCESS_SCHEDULE
  },
  isDev: process.env.NODE_ENV === 'development',
  port: process.env.PORT,
  applicationApiUri: process.env.APPLICATION_API_URI
}

const result = schema.validate(config, {
  abortEarly: false
})

if (result.error) {
  throw new Error(`The server config is invalid. ${result.error.message}`)
}

const value = result.value
value.authConfig = authConfig

module.exports = value
