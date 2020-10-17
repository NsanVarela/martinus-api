const express = require("express")
const app = express()
const port = 3000
const cors = require("cors")
const bodyParser = require("body-parser")
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors())

const router = express.Router()

router.route('/')
.all(function(req,res) { 
  res.json({ 
    message : `Bienvenue sur notre Martinus API `,
    methode : req.method
  })
});

router.route('/news')
.post(function(req,res) {
  res.json({ 
    message : `Demande une inscription à la newsletter de la Team Martinus`,
    name : req.body.name,
    firstname : req.body.firstname,
    email: req.body.email,
    methode : req.method
  })
});

router.route('/contact')
.post(function(req,res) {
  res.json({ 
    message : `Adresse un message à la Team Martinus`,
    name : req.body.name,
    firstname : req.body.firstname,
    email: req.body.email,
    message: req.body.message,
    methode : req.method
  })
});

router.route('/event')
.post(function(req, res) {
  res.json({
    message : `Ajoute un/des participant(s) à un event Martinus`,
    eventId: req.body.id,
    name : req.body.name,
    firstname : req.body.firstname,
    count : req.body.count,
    methode: req.method
  })
})

router.route('/shop')
.post(function(req, res) {
  res.json({
    message : `Demande un article du shop Martinus`,
    itemId: req.body.id,
    name : req.body.name,
    firstname : req.body.firstname,
    count : req.body.count,
    email: req.body.email,
    methode: req.method
  })
})

app.use(router)

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})