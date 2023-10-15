const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const OpenAI = require("openai");
const app = express();
const port = 3001;

const openai = new OpenAI({ apiKey:"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" });

app.use(bodyParser.json());
app.use(cors());

app.post('/', async (req,res)=>{
    const { message } = req.body;
    const testingMessage = [{"role": "user", "content" : message}];
    const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: testingMessage,
        max_tokens: 163,
        temperature: 0,
    });
    console.log(response.choices[0].message)
    const responseMessage = response.choices[0].message;

    res.json({
        message: responseMessage.content,
    });
});

app.listen(port, () =>{
    console.log('example app listening at http://localhost:3000/')
});