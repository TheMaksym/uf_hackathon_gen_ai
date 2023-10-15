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
            "https://www.stack-inference.com/run_deployed_flow?flow_id=652bdd705cf10c1614ca8eb1&org=0450b4eb-4409-4d33-865a-b41294dc13f9",
            {
                headers: {'Authorization':
                        'Bearer d41cfe42-6d20-478a-8f01-8f5e0e351693',
                    'Content-Type': 'application/json'
                },
                method: "POST",
                body: JSON.stringify(data),
            }
        );
        const result = await response.json();
        return result;
    }
    query({"in-0": message, "user_id": `<USER or Conversation ID>`}).then((response) => {
        console.log(JSON.stringify(response));
        // console.log(response.choices[0].message)
        res.json({
            message: JSON.stringify(response),
        });
    });
});

app.listen(port, () =>{
    console.log('example app listening at http://localhost:3000/')
});