import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import {
  Row,
  Col,
  Container,
  Card,
  Stack,
  Button,
  Modal,
  ListGroup,
  Form,
} from "react-bootstrap";
import { useSessionStorage } from "@uidotdev/usehooks";

import CountUp from "react-countup";
import "./end.css";
import { useEffect, useState } from "react";
import { collection, addDoc } from "firebase/firestore";

function End({ firestore, user }) {
  //   const data = [
  //     { seconds: 1, word: "hello" },
  //     { seconds: 5, word: "goodbye" },
  //     { seconds: 0.5, word: "strategy" },
  //     { seconds: 2, word: "book" },
  //     { seconds: 2.5, word: "microphone" },
  //     { seconds: 1, word: "hello" },
  //     { seconds: 5, word: "goodbye" },
  //     { seconds: 0.5, word: "strategy" },
  //     { seconds: 2, word: "book" },
  //     { seconds: 8, word: "microphone" },
  //   ];
  const [data, setData] = useSessionStorage("data", []);
  const [percent, setPercent] = useSessionStorage("percent", []);
  const numPercent = (percent[0] / (percent[0] + percent[1])) * 100;
  const [correct, setCorrect] = useState();
  const [show, setShow] = useState(false);
  const [testing, setTesting] = useSessionStorage("testing", false);
  const [titles, setTitles] = useSessionStorage("titles", []);
  const [practice, setPractice] = useState(false);
  const [input, setInput] = useState("");

  const listRef = collection(firestore, "lists");

  const handlePracticeAdd = async () => {
    let newWords = [];
    let newDefs = [];
    data.forEach((obj) => {
      obj.correct || newWords.push(obj.word);
      obj.correct || newDefs.push(obj.def);
    });

    await addDoc(listRef, {
      title: input,
      words: newWords,
      defs: newDefs,
      uid: user.uid,
      practice: true,
    });
  };

  return (
    <section>
      <Modal show={show} centered onHide={() => setShow(false)}>
        <Modal.Header>
          <Modal.Title
            className={`fw-bold ${correct ? " text-pro" : "text-yellow"}`}
          >
            {correct ? "Correct" : "Incorrect"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div
            style={{
              maxHeight: "67vh",
              minWidth: "100%",
              paddingRight: "15px",
            }}
            className="over p-0"
          >
            <ListGroup
              style={{
                paddingRight: "15px",
              }}
            >
              {data.map((obj) => {
                return correct // what button is selected
                  ? obj.correct && ( // only display correct items
                      <ListGroup.Item className="list text-center">
                        {obj.word}
                      </ListGroup.Item>
                    )
                  : obj.correct || ( // only display correct items
                      <ListGroup.Item className="list text-center">
                        {obj.word}
                      </ListGroup.Item>
                    );
              })}
              <div className="text-center">
                {correct ? (
                  percent[0] ? null : (
                    <h1>No Correct Words</h1>
                  )
                ) : percent[1] ? null : (
                  <h1>No Incorrect Words</h1>
                )}
              </div>
            </ListGroup>
          </div>
        </Modal.Body>
      </Modal>
      <Container fluid>
        <Row>
          <Col sm={2}>
            <Stack className="h-100" gap={4}>
              <Card className=" w-100 h-50 shadow-sm">
                {" "}
                <Card.Body
                  style={{ color: "var(--basic)" }}
                  className="d-flex justify-content-center align-items-center side-card"
                >
                  <CountUp end={numPercent} duration={3} />%
                </Card.Body>
              </Card>
              <Card
                onClick={() => {
                  setShow(true);
                  setCorrect(true);
                }}
                className=" card-button w-100 h-50 "
              >
                <Card.Body
                  style={{ color: "var(--pro)" }}
                  className="d-flex justify-content-center align-items-center side-card"
                >
                  <CountUp end={percent[0]} duration={3} />
                </Card.Body>
              </Card>
              <Card
                onClick={() => {
                  setShow(true);
                  setCorrect(false);
                }}
                className="card-button  w-100 h-50"
              >
                {" "}
                <Card.Body
                  style={{ color: "var(--yellow)" }}
                  className="d-flex justify-content-center align-items-center side-card"
                >
                  <CountUp end={percent[1]} duration={3} />
                </Card.Body>
              </Card>
            </Stack>
          </Col>
          <Col sm={percent[1] ? 8 : 10}>
            <Card className="shadow-sm w-100 h-100">
              <Card.Body className="d-flex justify-content-center align-items-center ">
                <ResponsiveContainer width="100%" height={600}>
                  <LineChart data={data}>
                    <CartesianGrid stroke="#d2d4d4" strokeDasharray="3 3" />
                    <XAxis dy={10} stroke="#131316" dataKey="word" />
                    <YAxis dx={-10} stroke="#131316" />

                    <Tooltip />

                    <Line
                      dataKey="seconds"
                      strokeWidth={3}
                      stroke="#f39e1f"
                      animationEasing="ease-out"
                      animationDuration={3000}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </Card.Body>
            </Card>
          </Col>
          {percent[1] && (
            <Col lg={2}>
              <Card
                onClick={() => {
                  //data doesn't have titles, add that in test.jsx
                  let newTitles = "";
                  titles.map((title, i) => {
                    // i +1 or .length -1 because index starts at 0 and length starts at 1
                    if (titles.length != i + 1) {
                      // not the last item in the list so there is no comma
                      newTitles += `${title}, `;
                    } else {
                      newTitles += `${title} `;
                    }
                  });
                  setInput(newTitles);
                  setPractice(true);
                }}
                className=" card-button w-100 h-100 "
              >
                <Card.Body
                  style={{ color: "var(--pro)" }}
                  className="d-flex justify-content-center align-items-center side-card"
                >
                  <i className="bi bi-plus-lg"></i>
                </Card.Body>
              </Card>
            </Col>
          )}
        </Row>
      </Container>

      <Modal show={practice} centered onHide={() => setPractice(false)}>
        <Modal.Header>
          <Modal.Title className="fw-bold">New Practice List</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <div className="d-flex  gap-2">
              {" "}
              <Form.Control
                value={input}
                onChange={(e) => {
                  setInput(e.target.value);
                }}
                type="text"
              />
              <Button
                onClick={() => {
                  setPractice(false);
                  handlePracticeAdd();
                }}
                variant="pro"
              >
                Create
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </section>
  );
}
export default End;
