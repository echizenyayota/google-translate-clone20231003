import TextBox from "./components/TextBox";
import Arrows from "./components/Arrows";
import Button from "./components/Button";
import Modal from "./components/Modal";
import { useEffect, useState } from "react";
import axios from "axios";


const App = () => {
  const [inputLanguage, setInputLanguage] = useState("English");
  const [outputLanguage, setOutputLanguage] = useState("Japanese");
  const [showModal, setShowModal] = useState(null);
  const [languages, setLanguages] = useState(null);
  const [textToTranslate, setTextToTranslate] = useState("");
  const [translatedText, setTranslatedText] = useState("");

  console.log("inputLanguage", inputLanguage);

  const getLanguages = async() => {
    const options = {
      method: 'GET',
      url: 'https://g-translate1.p.rapidapi.com/languages',
      headers: {
        'X-RapidAPI-Host': process.env.REACT_APP_RAPID_API_HOST,
        'X-RapidAPI-Key': process.env.REACT_APP_RAPID_API_KEY,
      }    
    };

    try {
      const response = await axios.request(options);
      console.log(response.data);
      const arrayOfData = Object.keys(response.data.data).map(key => response.data.data[key]);
      arrayOfData.shift();
      setLanguages(arrayOfData);
    } catch(error) {
      console.log(error);
    }
  };

  console.log("languages", languages);

  const translate = async () => {
    const options = {
      method: "GET",
      url: "https://g-translate1.p.rapidapi.com/translate",
      params: {
        text: textToTranslate,
        tl: outputLanguage,
        sl: inputLanguage
      },
      headers: {
        'X-RapidAPI-Host': process.env.REACT_APP_RAPID_API_HOST,
        'X-RapidAPI-Key': process.env.REACT_APP_RAPID_API_KEY,
      }
    };

    try {
      const response = await axios.request(options);
      console.log(response.data);
      setTranslatedText(response.data.data.translation);
    } catch(error) {
      console.log(error);
    }
  }

  console.log("translatedText", translatedText);

  useEffect(() => {
    getLanguages();
  }, []);

  const handleClick = () => {
    setInputLanguage(outputLanguage);
    setOutputLanguage(inputLanguage);
  }

  console.log("showModal", showModal);

  return (
    <div className="app">
      {!showModal && <>
        <TextBox 
          selectedLanguage={inputLanguage}
          style="input"
          setShowModal={setShowModal}
          textToTranslate={textToTranslate}
          setTextToTranslate={setTextToTranslate}
          setTranslatedText={setTranslatedText}
        />
          <div className="arrow-container" onClick={handleClick}>
            <Arrows />
          </div>
        <TextBox 
          selectedLanguage={outputLanguage}
          style="output"
          setShowModal={setShowModal}
          translatedText={translatedText}
        />
        <div className="button-container" onClick={translate}>
          <Button />
        </div>
      </>}

      {showModal && <Modal 
        setShowModal={setShowModal} 
        languages={languages}
        chosenLanguage={showModal === "input" ? inputLanguage : outputLanguage}
        setChosenLanguage={showModal === "input" ? setInputLanguage : setOutputLanguage}
      />}
    </div>
    
  );
}

export default App;
