const express = require('express')
const axios = require('axios')

const PORT = process.env.PORT || 5000


const generateScraperUrl = (apiKey) => `http://api.scraperapi.com?api_key=${apiKey}&autoparse=true`

const app = express()

app.use(express.json())

app.get('/', (req, res)=>{
    res.send("Welcome to amazon scrapper API")
})

//Get item details by product id
app.get('/products/:productId',async (req, res)=>{
    const { productId } = req.params
    const { api_key } = req.query

    try {
        axios.get(`${generateScraperUrl(api_key)}&url=https://www.amazon.com/dp/${productId}`)
        .then(response => res.json(response.data))
        
    } catch (error) {
        res.json(error)
    }
})


//Get product reviews
app.get('/products/:productId/reviews',async (req, res)=>{
    const { productId } = req.params
    const { api_key } = req.query

    try {
        axios.get(`${generateScraperUrl(api_key)}&url=https://www.amazon.com/product-reviews/${productId}`)
        .then(response => res.json(response.data))
        
    } catch (error) {
        res.json(error)
    }
})

//Get product offers
app.get('/products/:productId/offers',async (req, res)=>{
    const { productId } = req.params
    const { api_key } = req.query

    try {
        axios.get(`${generateScraperUrl(api_key)}&url=https://www.amazon.com/gp/offer-listing/${productId}`)
        .then(response => res.json(response.data))
        
    } catch (error) {
        res.json(error)
    }
})

//Get search results
app.get('/search/:searchQuery',async (req, res)=>{
    const { searchQuery } = req.params
    const { api_key } = req.query

    try {
        axios.get(`${generateScraperUrl(api_key)}&url=https://www.amazon.com/s?k=${searchQuery}`)
        .then(response => res.json(response.data))
        
    } catch (error) {
        res.json(error)
    }
})


app.listen(PORT, ()=>{
    console.log(`App is listening on port : ${PORT}`)
})