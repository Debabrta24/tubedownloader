const express = require("express")
const app = express();
app.use(express.json())



app.get("/videourlget", (req, res) => {
    console.log(req.query.url);
    res.send("server working at download")
})
app.get("/", (req, res) => {
    res.send("server working perfectly ")
})
app.listen(3000, () => {
    console.log("Server started");

})