import { validateEventConfiguration } from "../../../middlewares/events"
import { handleSafetySummeryReport } from "../../../helpers/reports"

// init Router
const router = require("express").Router({ mergeParams: true })

// handle cemento's event callback (probably using cron job)
router.post("/callback", [validateEventConfiguration], async (req, res) => {
  try {
    // build array of events
    const triggeredEvents = Object.values(req.body.definitions.eventConfigurations)

    // handle each event and collect array of promises
    const eventsPrms = triggeredEvents.map(async ev => {
      switch (ev.id) {
      case "safetySummeryReport":
        return handleSafetySummeryReport(req.body.definitions.projects || {})
      default:
        throw new Error("unknown event id triggerd the callback handler.")
      }
    })

    // resolve promises
    await Promise.all(eventsPrms)

    // returns successful response
    res.json({ successfulEvents: true })
  } catch (e) {
    res.status(400).json({ error: e.message || "unable to handle cemento's event." })
  }
})

// export router
export default router