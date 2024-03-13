const express = require("express")
const collection = require("./mongo")
const cors = require("cors")
const app = express()
app.use(express.json())
// app.use(express.urlencoded({ extended: true }))

app.use(cors({
    origin: '*',
    methods: ['GET', 'POST'],
    credentials: true
}));
app.get('/', (req, res) => {
    res.send("Deepak Bhagat");
});
app.post("/", async (req, res) => {
    const { email, password } = req.body


    const check = await collection.findOne({
        email: email,
        password: password 
    })

    if (check) {
        res.send("exist")
    }
    else {
        res.send("notexist")
    }


})



app.post("/signup", async (req, res) => {
    const { email, password } = req.body

    const data = {
        email: email,
        password: password
    }

    const check = await collection.findOne({
        email: email
    })

    if (check){
        res.json("exist")
    }
    else {
        const helper = await collection.findOne({
            email: email,
        })
        if(helper){
            alert("email already in use")
        }
        else{
            await collection.insertMany([data])
            res.json("notexist")
        }
    }

})
const port = process.env.PORT || 5000; // Use port specified in environment variable, or default to 3000
app.listen(port, () => {
    console.log("port running on 5000");
})

