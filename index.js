const OpenAI = require("openai");
const { Configuration, OpenAIApi } = OpenAI;

//React server
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = 3001;

const configuration = new Configuration({
   organization: "org-YaAxZBMPiP7GafQ0Hnr4rbgq",
   apikey: "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",
});
const openai = new OpenAIApi(configuration);
//bodyParse & Cors
app.use(bodyParser.json());
app.use(cors());

app.post('/', async (req, res) => {
    // const messages = [{"role": "user", "content" : "test"}];
    const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        prompt: "say this is a test",
        max_tokens: 7,
        temperature: 0,
    });
    console.log(response)
    res.json({
        message: "hello world!" //response.data.choices[0].text;
    });
});

app.listen(port, () => {
    console.log('Example app listening on port ' + port);
});
