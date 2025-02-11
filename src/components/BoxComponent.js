import React, { useState, useEffect } from "react";
import { useGame } from "../GameContext.js";
import {
  Container,
  Row,
  Col,
  ProgressBar,
  Button,
  Card,
} from "react-bootstrap";
import "animate.css"; // Optional for animations

function BoxComponent() {
  const { numbers, timeList } = useGame();
  const [now, setNow] = useState("");
  const [nextIndex, setNextIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [remainingTime, setRemainingTime] = useState(0);
  const [preparing, setPreparing] = useState(true);

  const [slideIn, setSlideIn] = useState(false);

  useEffect(() => {
    if (numbers.length > 0) {
      startPreparingPhase(0);
    }
  }, []);

  const startPreparingPhase = (index) => {
    if (index >= numbers.length) {
      setNow("Finished");
      return;
    }

    setProgress(0);
    let progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 1.25; // 8s / 100 steps = 1.25 per step
      });
    }, 80);

    setTimeout(() => {
      setProgress(0);
      setPreparing(false);
      startNextGame(index);
    }, 8000);
  };

  const startNextGame = (index) => {
    if (index >= numbers.length) {
      setNow("Finished");
      setProgress(0);
      return;
    }

    setSlideIn(true);
    setNow(numbers[index]);
    setRemainingTime(timeList[index]);
    const currentTime = timeList[index];

    setSlideIn(false);
    setNextIndex(index + 1);

    const countdown = setInterval(() => {
      setRemainingTime((prev) => {
        if (prev <= 1) {
          clearInterval(countdown);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    setTimeout(() => {
      startNextGame(index + 1);
    }, currentTime * 1000);
  };

  return (
    <Container className="d-flex flex-column align-items-center justify-content-center vh-100 bg-black text-white text-center position-relative">
      <h1 className="fw-bold mt-4">{preparing ? "Preparing" : "Playing"}</h1>
      <ProgressBar
        now={progress}
        className="w-80 mx-auto my-3"
        style={{ width: "80%", margin: "10% auto" }}
        variant="success"
      />

      <Row className="w-50 text-center">
        <Col>
          <p className="text-success fw-bold">Now</p>
          <Card
            className={`p-3 fw-bold ${
              slideIn ? "animate__animated animate__fadeInUp" : ""
            }`}
          >
            <Card.Body className="text-dark">{now || "Waiting..."}</Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="w-50 text-center mt-3">
        <Col>
          <p className="text-success fw-bold">Time Remaining</p>
          <Card className="bg-danger text-white p-3 fw-bold">
            <Card.Body>{remainingTime > 0 ? remainingTime : "..."}</Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="w-50 text-center mt-3">
        <Col>
          <p className="text-success fw-bold">Next game</p>
          <Card className="p-3 fw-bold">
            <Card.Body className="text-dark">
              {numbers[nextIndex] || "Finished"}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default BoxComponent;
