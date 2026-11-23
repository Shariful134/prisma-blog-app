import express from "express"
const app = express()


app.get("/", (req, res) => {
    res.send("Hello Shariful islam, Your server is working perfectly")
})
export default app
