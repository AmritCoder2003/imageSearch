import express from 'express';
import axios from 'axios';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import cors from 'cors';

const app = express();
dotenv.config();
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

const apikey = process.env.API_KEY;

const url = "https://pixabay.com/api/";

app.post('/image', async (req, res) => {
    const { query } = req.body; 

    try {
        const response = await axios.get(url, {
            params: {
                key: apikey,
                q: query,
                image_type: "photo", 
                per_page: 100, 
                safesearch: true, 
                order: "popular" 
            },
        });
        res.send(response.data);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});


app.listen(8000, () => {
    console.log("Server running");
})