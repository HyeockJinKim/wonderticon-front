import React, { useState } from 'react';
import './App.css';

function App() {
  const title = '이상한 나라의 이모티콘'
  const [imgBase64, setImgBase64] = useState("");
  const [outBase64, setOutBase64] = useState("");
  const handleChangeFile = (event) => {
    let reader = new FileReader();
    reader.onloadend = () => {
      const base64 = reader.result;
      if (base64) {
        setImgBase64(base64.toString());
      }
        console.log(base64)
        fetch('http://168.188.125.48:8002/draw', {
            method: "POST",
            body: JSON.stringify({
                base64
            })
        })
            .then(res => res.json())
            .then(res => {
                setOutBase64(base64.slice(0, 22) + res.out)
            })
    }
    if (event.target.files[0]) {
      reader.readAsDataURL(event.target.files[0]);
    }
  }

  return (
    <div className="App">
      <h3>{title}</h3>
      <h4>입력 이모티콘</h4>
      <img src={imgBase64}/>
      <br/>

      <h4>생성 이모티콘</h4>
      <img src={outBase64}/>
      <br/>
      <input type="file" name="imgFile" onChange={handleChangeFile} />
    </div>
  );
}

export default App;
