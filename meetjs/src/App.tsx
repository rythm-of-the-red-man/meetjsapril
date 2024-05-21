import bg from "/bg.jpg";
import rock from "/rock.png";
import "./App.css";
import useWebSocket from "react-use-websocket";
import { useEffect, useState } from "react";

function App() {
  const {
    sendMessage: pullBlue,
    lastMessage: lastMessageBlue,
    readyState: readyStateBlue,
  } = useWebSocket("ws://frog01.mikr.us:22077/app/blue");
  // const {
  //   sendMessage: pullRed,
  //   lastMessage: lastMessageRed,
  //   readyState: readyStateRed,
  // } = useWebSocket("ws://frog01.mikr.us:22077/app/red");
  const [position, setPosition] = useState(0);
  const reset = async () => {
    const requestOptions = {
      method: "POST",
    };
    await fetch("http://frog01.mikr.us:22077/app/reset", requestOptions);
  };
  // useEffect(() => {
  //   console.log(lastMessageRed);
  //   setPosition(parseInt(lastMessageRed?.data || "0") * 10);
  // }, [lastMessageRed]);

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
        {/* <button disabled={readyStateRed !== 1} onClick={() => pullRed("pull!")}>
          Pull Red!
        </button> */}
        <button
          disabled={readyStateBlue !== 1}
          onClick={() => pullBlue("pull!")}
        >
          Pull Blue!
        </button>
      </div>
      <button onClick={reset}>Reset</button>
    </>
  );
}

export default App;
