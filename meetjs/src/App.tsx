import bg from "/bg.jpg";
import rock from "/rock.png";
import "./App.css";
import useWebSocket from "react-use-websocket";
import { useEffect, useState } from "react";

function App() {
  // const apiBase = "localhost:65534";
  const apiBase = "frog01.mikr.us:22077";
  // Trzyma pozycje kamienia
  const [position, setPosition] = useState(0);

  /**
   * Effect do ustawienia początkowej pozycji kamienia
   * w razie refresha
   */
  useEffect(() => {
    const setUp = async () => {
      const requestOptions = {
        method: "GET",
      };
      const newPosition = await fetch(
        `http://${apiBase}/app/initial`,
        requestOptions,
      );
      const position = parseInt((await newPosition.json()).position);
      setPosition(position * 10);
    };
    setUp();
  }, []);

  // Dwa websockety pozwalające "ciągnąć" w obie strony.
  const {
    sendMessage: pullBlue,
    lastMessage: lastMessageBlue,
    readyState: readyStateBlue,
  } = useWebSocket(`ws://${apiBase}/app/blue`);
  const {
    sendMessage: pullRed,
    lastMessage: lastMessageRed,
    readyState: readyStateRed,
  } = useWebSocket(`ws://${apiBase}/app/red`);

  // Effecty reagujące na wiadomości zwrotne z serwera
  useEffect(() => {
    setPosition(parseInt(lastMessageRed?.data || "0") * 10);
  }, [lastMessageRed]);
  useEffect(() => {
    setPosition(parseInt(lastMessageBlue?.data || "0") * 10);
  }, [lastMessageBlue]);
  return (
    <>
      <div
        style={{
          position: "relative",
        }}
      >
        <img src={bg} />
        <img
          src={rock}
          style={{
            width: "10%",
            position: "absolute",
            left: `calc(50% - ${position}px`,
            transform: "translate(-50%, 0)",
            bottom: "70px",
          }}
        />
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-evenly",
          marginTop: "100px",
        }}
      >
        <button disabled={readyStateRed !== 1} onClick={() => pullRed("pull!")}>
          Pull Red!
        </button>
        <button
          disabled={readyStateBlue !== 1}
          onClick={() => pullBlue("pull!")}
        >
          Pull Blue!
        </button>
      </div>
      <div
        style={{ display: "flex", flexDirection: "column", marginTop: "50px" }}
      >
        credits:
        <a href="https://istockphoto.com/pl/portfolio/George_Chairborn?mediatype=illustration">
          Background
        </a>
        <a href="https://www.vecteezy.com/png/19527056-an-8-bit-retro-styled-pixel-art-illustration-of-a-stone-rock">
          Stone
        </a>
      </div>
    </>
  );
}

export default App;
