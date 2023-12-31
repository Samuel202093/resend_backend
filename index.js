const express = require('express')
const cors = require('cors')
const { Resend } = require('resend')
const bodyParser = require('body-parser')
const dotenv = require('dotenv').config()
const PORT =  6000 || process.env.PORT


const app = express()

const resend = new Resend(process.env.RESEND_API_KEY)

app.use(cors())

app.use(bodyParser.json())

app.get('/tests', (req, res)=>{
    try {
        res.status(200).send('Hello World')
    } catch (error) {
        res.status(500).send(error)
    }
})


app.post('/api/v1', async(req, res)=>{
    try {
        const { name, email, message } = req.body
        const result = await resend.emails.send({
            //  from: "onboarding@resend.dev",
             from: "portfolio@resend.dev",
             to: "onyebuekes93@gmail.com",
             subject: 'Message from portfolio contact form',
             reply_to: email,
             text: `Sender:${name} and Message:${message} `
             })

             res.status(200).send(result)
    } catch (error) {
        res.status(500).send('Network error!!!')
    }
})


app.listen(PORT, ()=>{
    console.log(`server running on port ${PORT}`)
})


