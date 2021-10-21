import express from "express"
import cors from "cors"

import eventRoutes from "./api/v1/events"

// init express instance
const app = express()

// determine app's port
const port = process.env.PORT || 5000

// cors settings
app.use(cors())

// express json responses
app.use(express.json())
app.use(express.urlencoded({
  extended: true
}))

// handle health check
app.get("/status", (req, res) => res.json({ status: "ok" }))

// expose cemento's events routes
app.use("/api/v1/events", eventRoutes)

// listen to app instance
app.listen(port, () => console.log(`Cemento server is running on port ${port}...`))