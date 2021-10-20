/**
 * validateEventConfiguration middleware checks if
 * the request body that hits the callback endpoint
 * came in valid structure
 * 
 * @param {object} req - the incoming request 
 * @param {object} res - incoming response
 * @param {Function} next - next middleware function
 */
export const validateEventConfiguration = (req, res, next) => {
  // destract event object
  const { definitions = {} } = req.body

  // validate event configuration object
  if (!Object.keys(definitions.eventConfigurations || {}).length) {
    throw new Error("invalid event configuration structure.")
  }

  // if structure if valid, move forward
  next()
}