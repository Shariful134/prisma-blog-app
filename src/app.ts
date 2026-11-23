import express from "express"
import { postRouter } from "./post/post.routes"
const app = express()


app.get("/", (req, res) => {
    res.send("Hello Shariful islam, Your server is working perfectly")
})
app.use(express.json());

app.use("/post", postRouter)
export default app
