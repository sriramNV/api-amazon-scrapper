const express = require('express');
const request = require('request-promise');

const app = express();
const PORT = process.env.PORT || 5000;

const apiKey = 'b4f3daa45789f6bff9964a209da0a117';
const baseURL = 'http://api.scraperapi.com?api_key=${apiKey}&autoparse=true';

app.use(express.json());

app.get('/',(req,res) =>{
    res.send('welcome to amazon scrapper api');
});

// get product details
app.get('/products/:productId', async(req, res)=>{
    const { poductId } = req.params;

    try{
        const response = await request(`${baseURL}&url=https://www.amazon.com/dp/${poductId}`);

        res.json(JSON.parse(response));

    }catch(error){
        res.json(error);
    }
});

app.listen(PORT, ()=>console.log(`server running on port ${PORT}`));