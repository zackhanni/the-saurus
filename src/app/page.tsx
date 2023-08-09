'use client'

import React, {useState} from "react";
import axios from "axios";


export default function Home() {

  const [synonyms, setSynonyms] = useState<string[]>([]);
  const [word, setWord] = useState<string>("");

  const API_KEY = "08801b8a-790f-4b25-8060-bc960dbfc581";
  const url = `https://www.dictionaryapi.com/api/v3/references/thesaurus/json/${word}?key=${API_KEY}`;

  const findThesaurus = async (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      try {
        const response = await axios.get(url);
        const data = response.data[0];
        const meta = data?.meta
        const syns: string[] = meta?.syns[0] || [];
        setSynonyms(syns);

      } catch (error) {
        console.error("Error fetching synonyms:", error);
      }
    }
  }


  return (
    <div className="container">
      <h1>THE-saurus</h1>
      <form>
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
            <li>test1</li>

            {/* {synonyms.map((synonym, index) => (
            <li key={index}>{synonym}</li>
            ))} */}
            
            {/* {synonyms.meta ? <li>{synonyms.meta.syns[0]}</li> : null} */}


          </ul>
      </div>
    </div>
  )
}
