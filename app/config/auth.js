const Joi = require('joi')

const authSchema = Joi.object({
  ruralPaymentsAgency: {
    hostname: Joi.string(),
    getPersonSummaryUrl: Joi.string(),
    getOrganisationPermissionsUrl: Joi.string(),
    getOrganisationUrl: Joi.string()
  },
  apim: {
    hostname: Joi.string(),
    oAuthPath: Joi.string(),
    clientId: Joi.string(),
    clientSecret: Joi.string(),
    scope: Joi.string(),
    ocpSubscriptionKey: Joi.string()
  }
})

const authConfig = {
  ruralPaymentsAgency: {
    hostname: process.env.RPA_HOST_NAME,
    getPersonSummaryUrl: process.env.RPA_GET_PERSON_SUMMARY_URL,
    getOrganisationPermissionsUrl: process.env.RPA_GET_ORGANISATION_PERMISSIONS_URL,
    getOrganisationUrl: process.env.RPA_GET_ORGANISATION_URL
  },
  apim: {
    hostname: process.env.APIM_HOST_NAME,
    oAuthPath: process.env.APIM_OAUTH_PATH,
    clientId: process.env.APIM_CLIENT_ID,
    clientSecret: process.env.APIM_CLIENT_SECRET,
    scope: process.env.APIM_SCOPE,
    ocpSubscriptionKey: process.env.APIM_OCP_SUBSCRIPTION_KEY
  }
}

const authResult = authSchema.validate(authConfig, {
  abortEarly: false
})

if (authResult.error) {
  console.log(authResult.error.message)
  throw new Error(`The auth config is invalid. ${authResult.error.message}`)
}

module.exports = authResult.value
