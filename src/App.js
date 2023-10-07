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
      setLanguages(arrayOfData);
    } catch(error) {
      console.log(error);
    }
  };

  console.log("languages", languages);

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
        />
          <div className="arrow-container" onClick={handleClick}>
            <Arrows />
          </div>
        <TextBox 
          selectedLanguage={outputLanguage}
          style="output"
          setShowModal={setShowModal}
        />
      </>}
      {showModal && <Modal setShowModal={setShowModal} />}
    </div>
    
  );
}

export default App;
