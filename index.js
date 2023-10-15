require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const OpenAI = require("openai");
const app = express();
const port = 3001;

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY});

app.use(bodyParser.json());
app.use(cors());

app.post('/', async (req,res)=>{
    const { message } = req.body;
    const prompt_pre = "Ok you are a Verizon customer support agent and only discuss verizon products and services,"
    const products_and_services = "Here is a single-lined list with no links of all Samsung and iPhone phones since 2020: Samsung: Galaxy S20, S20+, S20 Ultra, Note 20, Note 20 Ultra, Z Fold 2, Z Flip, S21, S21+, S21 Ultra, Note 21 Ultra, Z Fold 3, Z Flip 3, S22, S22+, S22 Ultra, Z Fold 4, Z Flip 4 iPhone: 12, 12 mini, 12 Pro, 12 Pro Max, 13, 13 mini, 13 Pro, 13 Pro Max, SE (3rd generation), 14, 14 Plus, 14 Pro, 14 Pro Max"+
        "Unlimited Plans\n" +
        "\n" +
        "Unlimited Start: $70/month for one line, $140/month for two lines, $180/month for three lines, and $200/month for four lines. Includes unlimited talk, text, and data on 5G Nationwide/4G LTE. Data speeds may be temporarily slowed during times of congestion.\n" +
        "Unlimited Play More: $80/month for one line, $160/month for two lines, $200/month for three lines, and $220/month for four lines. Includes everything in Unlimited Start, plus 50GB of mobile hotspot data, Apple Music on us, Disney+, Hulu, and ESPN+ on us, and 6 months of free Google Cloud storage.\n" +
        "Unlimited Do More: $90/month for one line, $180/month for two lines, $220/month for three lines, and $240/month for four lines. Includes everything in Unlimited Play More, plus 150GB of mobile hotspot data, 600GB of Verizon Cloud storage, and 12 months of free Google Cloud storage.\n" +
        "Unlimited Ultimate: $90/month for one line, $180/month for two lines, $220/month for three lines, and $240/month for four lines. Includes everything in Unlimited Do More, plus unlimited premium data, 60GB of mobile hotspot data, international connectivity with 10GB per month of international premium data, Global Choice, and unlimited text while abroad and calls within 210+ countries and back to the USA.\n" +
        "Prepaid Plans\n" +
        "\n" +
        "Verizon Prepaid Unlimited: $60/month for one line, $110/month for two lines, $150/month for three lines, and $170/month for four lines. Includes unlimited talk, text, and data on 5G Nationwide/4G LTE. Data speeds may be temporarily slowed during times of congestion.\n" +
        "Verizon Prepaid LTE: $40/month for 4GB of data, $50/month for 8GB of data, and $60/month for 12GB of data. Includes unlimited talk and text.\n" +
        "Connected Device Plans\n" +
        "\n" +
        "Connected Device Plan: $10/month per device for unlimited data on tablets, laptops, smartwatches, and other connected devices.\n" +
        "International Plans\n" +
        "\n" +
        "Verizon International Calling: $5/month for 100 minutes of international calling to Mexico and Canada, $10/month for 200 minutes of international calling to Mexico and Canada, and $15/month for 300 minutes of international calling to Mexico and Canada.\n" +
        "Verizon Global Travel Pass: $10/day for unlimited data, talk, and text in over 200 countries.\n" +
        "Verizon also offers a variety of other plans and discounts, such as plans for businesses and families, and discounts for military members and seniors. \n Source:https://www.verizon.com/about/news/myplan#:~:text=Update%3A%20Beginning%20August%2031%2C%20all,and%20back%20to%20the%20USA."
    const prompt_post = "Provide a response to the following question in 2000 characters or less. Only return the response and nothing else.\n###\n"
    const testingMessage = [{"role": "user", "content" : prompt_pre + products_and_services + prompt_post + message + "\n###"}];
    const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: testingMessage,
        max_tokens: 500,
        temperature: 0,
    });
    console.log(response.choices[0].message)
    console.log("Tokens used in API call: ", response['usage']['total_tokens']);
    const responseMessage = response.choices[0].message;

    res.json({
        message: responseMessage.content,
    });
});

app.listen(port, () =>{
    console.log('example app listening at http://localhost:3000/')
});