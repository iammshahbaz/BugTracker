const express = require("express")
const {connection} = require("./config/db")
const {userRouter} = require("./routes/user.routes")
const {bugRouter} = require("./routes/bug.routes")



const app = express()
app.use(express.json())

app.use("/user",userRouter)
app.use("/bugs",bugRouter)




app.listen(process.env.port,async()=>{
    try {
        await connection
        console.log("Connected to DB")
        console.log(`Server is running at ${process.env.port}`)
    } catch (error) {
        console.log(error)
    }
})
