require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = 3001;

app.use(bodyParser.json());
app.use(cors());

app.post('/', async (req,res)=>{
    const { message } = req.body;
    async function query(data) {
        const response = await fetch(
            "https://www.stack-inference.com/run_deployed_flow?flow_id=652c3b24de6f96a6105e5d48&org=1d129d0e-5e29-4f99-993d-077f358738a7",
            {
                headers: {'Authorization':
                        'Bearer d81ebe16-7310-4e75-9ef1-fad8bd2ce01b',
                    'Content-Type': 'application/json'
                },
                method: "POST",
                body: JSON.stringify(data),
            }
        );
        const result = await response.json();
        return result;
    }
    query({ "in-0": message, "user_id": "<USER or Conversation ID>" }).then((response) => {
        console.log(JSON.stringify(response));

        if (response && response.hasOwnProperty("out-0")) {
            const content = response["out-0"];
            res.json({
                message: content,
            });
        } else {
            res.status(500).json({ error: "Invalid response format" });
        }
    });
});

app.listen(port, () =>{
    console.log('example app listening at http://localhost:3000/')
});