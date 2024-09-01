const { getApplications } = require('../../api/applications')
const processActiveApplications = async () => {
  try {
    // Process all applications that are active and check if contact details have changed, if changed then update the application and contact history.
    const applications = await getApplications()
    applications.forEach(element => {
      console.log(element)
    })
  } catch (error) {
    console.log(error)
  }
  return false
}

module.exports = processActiveApplications
