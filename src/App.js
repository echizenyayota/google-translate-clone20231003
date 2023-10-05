import TextBox from "./components/TextBox";
import Arrows from "./components/Arrows";
import Button from "./components/Button";
import Modal from "./components/Modal";
import { useState } from "react";

const App = () => {
  const [inputLanguage, setInputLanguage] = useState("English");
  const [outputLanguage, setOutputLanguage] = useState("Japanese");

  const handleClick = () => {
    setInputLanguage(outputLanguage);
    setOutputLanguage(inputLanguage);
  }

  return (
    <div className="app">
      <TextBox 
        selectedLanguage={inputLanguage}
        style="input" 
      />
        <div className="arrow-container" onClick={handleClick}>
          <Arrows />
        </div>
      <TextBox 
        selectedLanguage={outputLanguage}
        style="output" 
      />
    </div>
  );
}

export default App;
