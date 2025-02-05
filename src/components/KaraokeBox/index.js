import React, { useEffect, useState } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { Row, Col } from "react-materialize";
import LyricsContainer from "../LyricsContainer/";
import "./style.css";

function KaraokeBox({
  pts,
  setPts,
  lyrics,
  curTime,
  duration,
  language,
  isPlaying,
  sessionData,
  handleFinish,
}) {
  // store user mic inputs here with timestamp
  // Note: time value is at time of printing, not time of recording start
  const [userInput, setUserInput] = useState([
    // {
    //     time: 0,
    //     vocals: "This hit that ice cold Michelle Pfeiffer that white gold This one for them hood girls Them good girls straight masterpieces Stylin′ whilen livin it up in the city Got Chucks on with Saint Laurent Got kiss myself I am so pretty I am too hot hot damn "
    // },
    // {
    //     time: 34
    // }
    { time: 0 },
  ]);

  // deconstructed properties needed from the WebSpeechAPI / react-speech-recognition
  const { /*listening,*/ finalTranscript, resetTranscript } =
    useSpeechRecognition();

  // activate / deactivate mic when play/pause is clicked
  useEffect(() => {
    if (isPlaying) {
      // navigator.mediaDevices
      //   .getUserMedia({ video: false, audio: true })
      //   .then((stream) => {
      //     window.localStream = stream; // A
      //     window.localAudio.srcObject = stream; // B
      //     window.localAudio.autoplay = true; // C
      //   })
      //   .catch((err) => {
      //     console.error(`you got an error: ${err}`);
      //   });
      SpeechRecognition.startListening({ continuous: true, language });
      console.log("mic on");
    } else {
      SpeechRecognition.stopListening();
      console.log("mic off");
    }
  }, [isPlaying, language]);

  useEffect(() => {
    console.log(userInput);
  }, [userInput]);

  useEffect(() => {
    if (finalTranscript !== "") {
      // make copy of 'userInput', collect new data object and add to copy.
      var copy = [...userInput];
      var thisInput = {};
      copy[copy.length - 1].text = finalTranscript;
      thisInput.time = Math.floor(curTime);
      thisInput.text = null;
      copy.push(thisInput);
      // set updated copy as new state
      setUserInput(copy);
      // empty the 'finalTranscript' container.
      resetTranscript();
    }
  }, [finalTranscript]);

  // Note: Browser support is limited with WebSpeechAPI.
  // if the browser is not supported, alert user.
  if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
    return (
      <h6>
        Your browser does not support speech recognition software! Please use{" "}
        <a href="https://www.google.com/chrome/" target="about_blank">
          Google Chrome
        </a>{" "}
        (desktop version only) thanks!.
      </h6>
    );
  } else {
    return (
      <Row className="player left-align">
        <Col s={12}>
          <LyricsContainer
            pts={pts}
            setPts={setPts}
            lyrics={lyrics}
            curTime={curTime}
            duration={duration}
            isPlaying={isPlaying}
            userInput={userInput}
            sessionData={sessionData}
            handleFinish={handleFinish}
          />
        </Col>
      </Row>
    );
  }
}

export default KaraokeBox;
