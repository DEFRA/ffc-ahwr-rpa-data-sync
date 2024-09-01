const cron = require('node-cron')
const config = require('../../config')
const processActiveApplications = require('./process')

module.exports = {
  plugin: {
    name: 'ActiveAppScheduler',
    register: async () => {
      console.log(`${new Date().toISOString()} processing Active applications:Running Active application scheduler... ${JSON.stringify(
        config.ActiveAppScheduler
      )}`)
      cron.schedule(config.ActiveAppScheduler.schedule, async () => {
        try {
          await processActiveApplications()
        } catch (error) {
          console.log(`${new Date().toISOString()} processing Active applications:Error processing Active applications: ${error}`)
        }
      }, {
        scheduled: config.ActiveAppScheduler.enabled
      })
    }
  }
}
