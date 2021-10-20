import { sendEmail, generatePDF } from "../helpers"

/**
 * handleSafetySummeryReport takes the projects object
 * came from safetySummeryReport event, generate pdf report for each 
 * project and sends the relevant emails
 * 
 * @param {object} projects - the projects object came from safetySummeryReport event
 * @returns {Promise<*>} sends emails promise
 */
export const handleSafetySummeryReport = async (projects) => {
  // define emailsToPdfs object.
  // will hold projectid as key
  // and array of related pdf urls as value
  const emailsToPdfs = {}

  // for each project id, generate pdf report and add the pdf-url
  // to the emailsToPdfs object structure
  const safetySummeryReportPrms = Object.keys(projects).map(async projectId => {
    // generate pdf from project id
    const pdfUrl = await generatePDF(projectId)

    // pulls relevant email address attached to 
    // project id
    const relevantEmails = Object.values(
      projects[projectId]
        .safetySummeryReport
        .formTemplatesIds["-safetySummeryReport"]
        .targetEmails
    )
    
    // add to emailsToPdfs structure the relevant pdf
    relevantEmails.forEach(email => {
      // init array for the first iteration
      if (!Array.isArray(emailsToPdfs[email])) {
        emailsToPdfs[email] = []
      }
      
      emailsToPdfs[email].push(pdfUrl)
    })

    // send emails
    await Promise.all(
      Object
        .entries(emailsToPdfs)
        .map(async ([emailDestination, pdfUrls]) => {
          await sendEmail(emailDestination, pdfUrls)
        })
    )    
  })

  // resolve all promises
  await Promise.all(safetySummeryReportPrms)
}