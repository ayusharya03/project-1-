const express = require("express");
const app = express();
const path = require("path")
const usermodel = require("./models/user")

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static(path.join(__dirname,"public")))
app.set("view engine","ejs")

app.get("/", (req, res) => {
  res.render("index");
}); 

app.get("/read", async (req, res) => {
  let users = await usermodel.find()
  res.render("read", {users});
}); 

app.post("/create", async(req,res)=>{
  let{name, email, iamge} = req.body;

  let createduser = await usermodel.create({
    name,
    email,
    iamge
  })
res.redirect("/read")
})

app.listen(3000)