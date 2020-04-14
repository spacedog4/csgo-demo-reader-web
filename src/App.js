import React, {useState} from 'react';
import logo from './logo.svg';
import './styles/css/App.css';

function App() {
  const [file, setFile] = useState(null)

  const handleFileChange = (e) => {
    console.log(e.target.files[0])
  }

  return (
    <div className="App">
      <input
        type="file" 
        placeholder="Carregar arquivo de demo" 
        onChange={handleFileChange}
      />
    </div>
  );
}

export default App;
