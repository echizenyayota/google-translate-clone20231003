import SelectDropDown from "./SelectDropDown";

const TextBox = ({ style }) => {
  return (
    <div>
      <SelectDropDown />
      <textarea 
        placeholder={style === "input" ?  "Enter text" : "Translation"}
        disabled={style === "output"}
      />
    </div>
  )
}

export default TextBox;