const express = require('express');
const request = require('request-promise');

const app = express();
const PORT = process.env.PORT || 5000;

const apiKey = '';  //use an api key from scrapperapi.com                                                                                                                                                                                                                                   b4f3daa45789f6bff9964a209da0a117

const baseURL = `http://api.scraperapi.com?api_key=${apiKey}&autoparse=true`;

app.use(express.json());

app.get('/',(req,res) =>{
    res.send('welcome to amazon scrapper api');
});

// get product details
app.get('/products/:productId', async(req, res)=>{
    const { productId } = req.params;

    try{
        const response = await request(`${baseURL}&url=https://www.amazon.com/dp/${productId}`);

        res.json(JSON.parse(response));

    }catch(error){
        res.json(error);
    }
});

// get product reviews
app.get('/products/:productId/reviews', async(req, res)=>{
    const { productId } = req.params;

    try{
        const response = await request(`${baseURL}&url=https://www.amazon.com/product-reviews/${productId}`);

        res.json(JSON.parse(response));

    }catch(error){
        res.json(error);
    }
});

// get product offers
app.get('/products/:productId/offers', async(req, res)=>{
    const { productId } = req.params;

    try{
        const response = await request(`${baseURL}&url=https://www.amazon.com/gp/offer-listing/${productId}`);

        res.json(JSON.parse(response));

    }catch(error){
        res.json(error);
    }
});

// get search results
app.get('/search/:searchQuery', async(req, res)=>{
    const { searchQuery } = req.params;

    try{
        const response = await request(`${baseURL}&url=https://www.amazon.com/s?k=${searchQuery}`);

        res.json(JSON.parse(response));

    }catch(error){
        res.json(error);
    }
});

app.listen(PORT, ()=>console.log(`server running on port ${PORT}`));