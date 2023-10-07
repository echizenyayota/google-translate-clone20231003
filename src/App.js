import TextBox from "./components/TextBox";
import Arrows from "./components/Arrows";
import Button from "./components/Button";
import Modal from "./components/Modal";
import { useState } from "react";

const App = () => {
  const [inputLanguage, setInputLanguage] = useState("English");
  const [outputLanguage, setOutputLanguage] = useState("Japanese");
  const [showModal, setShowModal] = useState(null);

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
