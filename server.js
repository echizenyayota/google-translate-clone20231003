const PORT = 8000;
const axios = require("axios").default;
const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());

app.listen(PORT, () => console.log("Server running on PORT" + PORT));

app.get("/languages", async(req, res) => {
  const options = {
    method: "GET",
    headers: {
      'X-RapidAPI-Host': process.env.REACT_APP_RAPID_API_HOST,
      'X-RapidAPI-Key': process.env.REACT_APP_RAPID_API_KEY,
    },
  }

  try {
    const response = await axios("https://g-translate1.p.rapidapi.com/languages", options);
    const arrayOfData = Object.keys(response.data.data).map(key => 
      response.data.data[key]
    );
    arrayOfData.shift();
    res.status(200).json(arrayOfData);
  } catch(err) {
    console.log(err);
    res.status(500).json({message: err});
  }
});

app.get("/translation", async(req, res) => {
  const {textToTranslate, outputLanguage, inputLanguage} = req.query;
  const options = {
    method: "GET",
    params: {
      text: textToTranslate,
      tl: outputLanguage,
      sl: inputLanguage,
    },
    headers: {
      'X-RapidAPI-Host': process.env.REACT_APP_RAPID_API_HOST,
      'X-RapidAPI-Key': process.env.REACT_APP_RAPID_API_KEY,
    },
  }

  try {
    const response = await axios("https://g-translate1.p.rapidapi.com/translate", options);
    res.status(200).json(response.data.data.translation);
  } catch(err) {
    console.log(err);
    res.status(500).json({message: err});
  }
});
