'use client'

import React, {useState} from "react";
import axios from "axios";

// stop page from reloading when submitting the form
const handleSubmit = (event) => {
  event.preventDefault();
}

export default function Home() {

  const [synonyms, setSynonyms] = useState<string[]>([]);
  const [word, setWord] = useState<string>("");

  const API_KEY = "08801b8a-790f-4b25-8060-bc960dbfc581";
  const url = `https://www.dictionaryapi.com/api/v3/references/thesaurus/json/${word}?key=${API_KEY}`;

  const findThesaurus = async (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      const url = `https://www.dictionaryapi.com/api/v3/references/thesaurus/json/${word}?key=${API_KEY}`;

      try {
        const response = await axios.get(url);
        const syns = response.data[0]?.meta?.syns.flat() || [];
        setSynonyms(syns);

      } catch (error) {
        console.error("Error fetching synonyms:", error);
      }
    }
  }

  return (
    <div className="container">
      <h1>THE-saurus</h1>
      <form onSubmit={handleSubmit}>
          <input 
              type="text"
              placeholder="Search a word..."
              onChange={(event) => setWord(event.target.value)}
              onKeyUp={findThesaurus}
              value={word}
          />

          <button>Roar!</button>
      </form>

      <div className="results">
          <ul>

            {synonyms.slice(0, 8).map((synonym, index) => (
            <li key={index}>{synonym}</li>
            ))}
            
          </ul>
      </div>
    </div>
  )
}
