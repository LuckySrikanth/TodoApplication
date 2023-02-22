const express = require("express");
const mongoose = require("mongoose");
const TaskSchema = require("./model")
const cors = require("cors")


const app = express();
app.use(express.json())
app.use(cors({
    origin : "*"
}))

mongoose.connect("mongodb+srv://<username>:<password>@cluster0.jsmfma8.mongodb.net/?retryWrites=true&w=majority").then(() => 
console.log("DB Connceted")
)

app.get("/", (req,res) => {
    res.send("Hello")
})

app.post("/addtasks", async(req,res) => {
    const {todo} = req.body;
    try {
        const AddNewTask = new TaskSchema({
            todo : todo
        })
        await AddNewTask.save()
        return res.json(await TaskSchema.find())
    } catch (error) {
        console.log(error)
    }
})

app.get("/gettask", async(req,res) => {
    try {
        return res.json(await TaskSchema.find())
    } catch (error) {
        console.log(error)
    }
})

app.delete('/delete/:id',async(req,res) => {
    try{
        await TaskSchema.findByIdAndDelete(req.params.id);
        return res.json(await TaskSchema.find())
    }
    catch(err){
        console.log(err)
    }
})

app.listen(5000, () => console.log("express 5000 port is running"))
