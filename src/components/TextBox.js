import SelectDropDown from "./SelectDropDown";

const TextBox = ({ 
  style, 
  selectedLanguage, 
  setShowModal, 
  textToTranslate,
  setTextToTranslate,
  setTranslatedText,
  translatedText
}) => {

  const handleClick = () => {
    setTextToTranslate("");
    setTranslatedText("");
  }

  return (

    <div className={style}>
      <SelectDropDown 
        style={style}
        selectedLanguage={selectedLanguage}
        setShowModal={setShowModal}
      />
      <textarea 
        placeholder={style === "input" ?  "Enter text" : "Translation"}
        disabled={style === "output"}
        onChange={(e) => setTextToTranslate(e.target.value)}
        value={style === "input" ? textToTranslate : translatedText}
      />
      {style === "input" && (
        <div className="delete" onClick={handleClick}>x</div>
      )}
    </div>
  )
}

export default TextBox;