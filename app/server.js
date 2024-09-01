const Hapi = require('@hapi/hapi')
const activeAppScheduler = require('./crons/process-rpa-sync/scheduler')

async function createServer () {
  const server = Hapi.server({
    port: process.env.PORT
  })

  const routes = [].concat(
    require('./routes/healthy'),
    require('./routes/healthz')
  )

  server.route(routes)

  await server.register(require('@hapi/inert'))
  await server.register(activeAppScheduler)

  return server
}

module.exports = createServer
