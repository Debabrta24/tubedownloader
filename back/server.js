const express = require("express")
const cors = require("cors");
const getInfo = require("./DonloadLogic/Download_algo");
const app = express();
app.use(express.json())


app.use(cors({
    origin: ["http://localhost:5173","https://atozdownloader.vercel.app/"],//only allowed origin
    methods: ['get']
}))



app.get("/videourlget", async (req, res) => {
    const url = req.query.url;
    console.log(url);
    if (url) {
        const response = await getInfo(url)
        // console.log(response)
        res.status(200).json(response)
    }

    else {
        res.status(400).json({
            message: "pls sent a link "
        })
    }
})
app.get("/", (req, res) => {
    res.send("server working perfectly ")
})
app.listen(3000, () => {
    console.log("Server started");

})