import express from "express"
import mongoose, { Schema } from "mongoose"
import cors from "cors"
const app = express()
app.use(express.json())
app.use(cors())
const port = 3100


const BlogSchema = new Schema({
    name: String,
    title: String
})
const BlogModel = mongoose.model("Blog", BlogSchema)
app.get('/', async (req, res) => {
    try {

        const data = await BlogModel.find({})
        res.send(data)
    } catch (error) {
        res.send(error.message)
    }
})
app.get('/:id', async (req, res) => {
    try {
        const { id } = req.params
        const data = await BlogModel.findById({ id })
        res.send(data)
    } catch (error) {
        res.send(error.message)
    }
})
app.post('/', (req, res) => {
    try {
        const { name, title } = req.body
        const data = new BlogModel({ name, title })
        data.save();
        res.send(data)
    } catch (error) {
        res.send(error.message)
    }
})

app.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params

        const data = await BlogModel.findByIdAndDelete({ id })
        res.send(data)
    } catch (error) {
        res.send(error.message)
    }
})
mongoose.connect("mongodb+srv://mi829361s:1mz01mz0@salayev.kgfgf1t.mongodb.net/")
    .then(() => console.log("connect"))
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})