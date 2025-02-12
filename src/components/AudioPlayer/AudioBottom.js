// source: https://codesandbox.io/s/5wwj02qy7k?file=/src/useAudioPlayer.js:0-1246
import React from "react";
import Play from "./Play";
import { Row, Col, Button } from "react-materialize";

function AudioBottom({
  pts,
  emitSessionPlayEvent,
  isReady,
  setIsReady,
  hidePlayBtn,
  sessionData,
}) {
  const handleStart = () => {
    setIsReady(true);
  };

  return (
    <>
      <Row className="player bottom">
        <Col s={4} className="points__container">
          <h1 className="points">{pts}</h1>
          <div className="divider"></div>
          <h3 className="points__label">score</h3>
        </Col>

        <Col s={4}>
          {
            !sessionData.isActive && !isReady ? (
              <Button
                className="ready_button btn_purple"
                style={isReady ? { backgroundColor: "red" } : null}
                onClick={handleStart}
              >
                Ready
              </Button>
            ) : null
            //  <Button className="finish_button btn_blue" onClick={handleFinish}>Finish</Button>
          }
        </Col>

        <Col s={4}>
          {!sessionData.isActive && isReady ? (
            <Play onClick={emitSessionPlayEvent} hidePlayBtn={hidePlayBtn} />
          ) : null}
        </Col>
      </Row>
    </>
  );
}

export default AudioBottom;
