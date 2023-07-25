import React, { useState } from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import prettier from "prettier/standalone";
import babelParser from "prettier/parser-babel";

const App = () => {
  const [codeEnteredbyUser, setCodeEnteredbyUser] = useState("");
  const [codeToShow, setCodeToShow] = useState("");


  const onChangearea = (e) => {
    setCodeEnteredbyUser(e.target.value);
  }
  const submitbtn = () => {
    const formattedCode = prettier.format(codeEnteredbyUser, {
      parser: "babel",
      plugins: [babelParser]
    });
    setCodeToShow(formattedCode);
  };
  const clearbtn = () => {
    setCodeEnteredbyUser("");
    setCodeToShow("");
  }

  const onCopyBtnClick = () => {

    var textField = document.createElement('textarea')
    textField.innerText = codeToShow
    document.body.appendChild(textField)
    textField.select()
    document.execCommand('copy');
    textField.remove()

  };
  return (
    <div>
      <h1>Code Syntax Highlighting App</h1>
      <div>
        <textarea style={{ height: "35vh", width: "1250px", marginLeft: "10px" }}
          value={codeEnteredbyUser} onChange={(e) => { onChangearea(e) }}
          placeholder="Paste the code here"></textarea>
      </div>
      <button onClick={submitbtn}>Submit</button>
      <button onClick={clearbtn}>Clear</button>
      <div style={{ display: "flex", justifyContent: "flex-end" }} >
        <SyntaxHighlighter language="javascript" style={docco}>
          {codeToShow}
        </SyntaxHighlighter>
        <button style={{ height: "25px" }} onClick={onCopyBtnClick}>copy</button>
      </div>
    </div>
  );
}

export default App;
