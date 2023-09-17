import { useState } from "react";
import { Modal, Button, Container, Row, Col, Form } from "react-bootstrap";
import { setDoc, doc } from "firebase/firestore";
import "./viewlistsmodal.css";

function ListButton({ list, firestore, setO }) {
  const [show, setShow] = useState(false);
  const [add, setAdd] = useState(false);
  const [words, setWords] = useState([...list.data().words]);
  const [defs, setDefs] = useState([...list.data().defs]);
  const [word, setWord] = useState("");
  const [def, setDef] = useState("");

  const handleListUpdate = async () => {
    await setDoc(doc(firestore, "lists", list.id), {
      words: words,
      defs: defs,
      title: list.data().title,
      uid: list.data().uid,
    });
    setShow(false);
    setO("");
  };

  const handleItemDelete = (i) => {
    if (words.length > 1) {
      console.log(words);
      const newWords = words.splice(i, 1);
      const newDefs = defs.splice(i, 1);
      setWords(newWords);
      console.log(words);
      setDefs(newDefs);
    }
  };

  const handleItemAdd = () => {
    setWords([word, ...words]);
    setDefs([def, ...defs]);
    setWord("");
    setDef("");
  };
  return (
    <>
      <Button
        className="rounded-circle"
        onClick={() => {
          setShow(true);
          setO("o");
        }}
        variant="white-full"
      >
        {" "}
        <i className="bi bi-pencil-fill"></i>
      </Button>
      <Modal centered show={show} onHide={handleListUpdate}>
        <Modal.Header>
          <Modal.Title className="fw-bold">Edit and View List</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container
            className="d-flex flex-column h-100 justify-content-center"
            fluid
          >
            <Button
              onClick={() => {
                setShow(false);
                setAdd(true);
              }}
              variant="yellow mb-5 mt-4 "
            >
              <i className="bi bi-plus-lg"></i>
            </Button>
            <Row className="pt-2 pb-2  ">
              <Col sm={1}></Col>
              <Col
                sm={5}
                className="text-center fw-semibold  d-flex justify-content-center align-items-center text-break"
              >
                Words
              </Col>
              <Col
                sm={1}
                className="text-center  d-flex justify-content-center align-items-center"
              >
                <div className="vl"></div>
              </Col>
              <Col
                sm={5}
                className="text-center fw-semibold  d-flex justify-content-center align-items-center text-break"
              >
                Definitions
              </Col>
            </Row>
            {words.map((word, i) => {
              return (
                <Row key={i} className="pt-2 pb-2  ">
                  <Col
                    sm={1}
                    className=" d-flex justify-content-center align-items-center"
                  >
                    <Button
                      className="rounded-circle"
                      onClick={() => handleItemDelete(i)}
                      variant="white-full"
                    >
                      {" "}
                      <i className="bi bi-trash-fill"></i>
                    </Button>
                  </Col>
                  <Col
                    sm={5}
                    className=" d-flex justify-content-center align-items-center"
                  >
                    <Form.Control
                      value={words[i]}
                      onChange={(e) => {
                        const updatedWords = [...words];
                        updatedWords[i] = e.target.value;
                        setWords(updatedWords);
                      }}
                      placeholder="Word"
                    />
                  </Col>
                  <Col
                    sm={1}
                    className="  d-flex justify-content-center align-items-center"
                  >
                    <div className="vl"></div>
                  </Col>
                  <Col
                    sm={5}
                    className="  d-flex justify-content-center align-items-center"
                  >
                    <Form.Control
                      value={defs[i]}
                      onChange={(e) => {
                        const updatedDefs = [...defs];
                        updatedDefs[i] = e.target.value;
                        setDefs(updatedDefs);
                      }}
                      placeholder="Word"
                    />
                  </Col>
                </Row>
              );
            })}
          </Container>
        </Modal.Body>
      </Modal>
      <Modal
        centered
        onHide={() => {
          setAdd(false);
          setShow(true);
        }}
        show={add}
      >
        <Modal.Body>
          <Form onSubmit={(e) => e.preventDefault()}>
            <div className="d-flex flex-column gap-2">
              <Form.Control
                value={word}
                onChange={(e) => {
                  setWord(e.target.value);
                }}
                placeholder="Word"
              />
              <Form.Control
                value={def}
                onChange={(e) => {
                  setDef(e.target.value);
                }}
                placeholder="Definition"
              />
              <Button onClick={handleItemAdd} variant="yellow">
                Add
              </Button>
              <Button
                onClick={() => {
                  setAdd(false);
                  setShow(true);
                }}
                variant="white"
              >
                Save
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default ListButton;
