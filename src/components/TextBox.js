const TextBox = ({ style }) => {
  return (
    <div>
      <textarea 
        placeholder={style === "input" ?  "Enter text" : "Translation"}
        disabled={style === "output"}
      />
    </div>
  )
}

export default TextBox