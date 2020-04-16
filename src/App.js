import React, { useState } from 'react';
import axios from 'axios';
import './styles/css/App.css';
import { render } from '@testing-library/react';

function App() {
  const [file, setFile] = useState(null)
  const [submitting, setSubmitting] = useState(false)
  const [killFeed, setKillFeed] = useState([])

  function handleFileChange(e) {
    setFile(e.target.files[0])
  }

  async function handleSubmit(e) {
    e.preventDefault()
    let res = await uploadFile(file);

    setKillFeed(res.data)
    console.log(res.data);
  }

  async function uploadFile(file) {
    const formData = new FormData();

    formData.append('teste', file)

    setSubmitting(true)
    const res = await axios.post(`http://localhost:3030/kill-feed`, formData, {
      headers: {
        'content-type': 'multipart/form-data'
      }
    });
    setSubmitting(false)

    return res
  }

  function renderKillFeed() {
    return (
      <ul className="killFeed">
        {
          killFeed.map(killFeedItem => {
            return renderKillFeedItem(killFeedItem)
          })
        }
      </ul>
    )
  }

  function renderKillFeedItem(killFeedItem) {
    return (
      <li>
        <span className="attacker">{killFeedItem.attackerName}</span>
        <span className="weapon">{killFeedItem.weapon}</span>
        {killFeedItem.headshotText.length > 0 &&
          <span className="headshot">{killFeedItem.headshotText}</span>}
        <span className="victim">{killFeedItem.victimName}</span>
      </li>
    )
  }

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <label>
          Arquivo de demo:
          <br />
          <input
            type="file"
            placeholder="Carregar arquivo de demo"
            onChange={handleFileChange}
          />
        </label>
        <br />
        <button type="submit">Enviar</button>

        <br />

        {submitting && <p>Enviando...</p>}

        <br />

        {killFeed.length > 0 && renderKillFeed()}
      </form>
    </div>
  );
}

export default App;
