import * as React from "react";
import "./styles.css";
import { useRandomDog, State } from "./useRandomDog";

export default function App() {
  const { imageUrl, load, state, error } = useRandomDog();

  if (state === State.Error) {
    console.log(error)
    return (
      <>
        <h1>Error fetching dog</h1>
        <div>
        <button onClick={load}>Try Again</button>
      </div>
        <code>
          <pre>{JSON.stringify(error?.statusText, null, 2)}</pre>
        </code>
      </>
    );
  }
  return (
    <div className="App">
      <h1>Thwack Demo</h1>
      <h2>🐶 Random Dog Image 🐶</h2>
      <div>
        <button onClick={load}>Fetch a New Dog</button>
      </div>
      {imageUrl && <img src={imageUrl} alt="dog" />}
    </div>
  );
}
