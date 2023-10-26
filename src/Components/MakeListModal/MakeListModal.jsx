import { useState } from "react";
import { Button, Modal, Container, Row, Col, Form } from "react-bootstrap";
import "./makelistmodal.css";
import { collection, addDoc } from "firebase/firestore";
import AutoDef from "./AutoDef";
function MakeListModal({ firestore, user }) {
  const [show, setShow] = useState(false);
  const [title, setTitle] = useState("");
  const [letAddItems, setLetAddItems] = useState(false);
  const [word, setWord] = useState("");
  const [def, setDef] = useState("");
  const [words, setWords] = useState([]);
  const [defs, setDefs] = useState([]);
  const [problem, setProblem] = useState("");
  const [thisO, setThisO] = useState("");
  const [practice, setPractice] = useState(false);
  const listsRef = collection(firestore, "lists");

  const handleListCreate = async () => {
    if (words && defs) {
      await addDoc(listsRef, {
        practice: "false",
        title: title,
        words: words,
        defs: defs,
        uid: user.uid,
      });
      setTitle("");
      setProblem("");
      setShow(false);
    }
  };

  const handleListAdd = () => {
    if (word) {
      setWords([...words, word]);
      def ? setDefs([...defs, def]) : setDefs([...defs, "No definition"]);
      setWord("");
      setDef("");
      return;
    }
    setProblem("Word is blank");
  };
  return (
    <>
      <Button
        className="fw-bold fs-3 text-white"
        onClick={() => {
          setShow(!show);
          setLetAddItems();
          setProblem("");
          setWords([]);
          setDefs([]);
        }}
        variant="yellow"
      >
        New List
      </Button>
      <Modal
        onHide={() => {
          setShow(false);
          setTitle("");
          setDef("");
          setDefs([]);
          setWord("");
          setWords([]);
        }}
        show={show}
        className={`${thisO}`}
        centered
      >
        <Modal.Header>
          <Modal.Title className="fw-bold">Make List</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={(e) => e.preventDefault()}>
            {letAddItems ? (
              <div className="d-flex flex-column gap-2">
                <Form.Control
                  value={word}
                  onChange={(e) => {
                    setWord(e.target.value);
                    setProblem("");
                  }}
                  placeholder="Word"
                />
                <Row>
                  <Col lg={9}>
                    <Form.Control
                      value={def}
                      onChange={(e) => {
                        setDef(e.target.value);
                        setProblem("");
                      }}
                      placeholder="Definition"
                    />
                  </Col>
                  <Col lg={3}>
                    <AutoDef
                      word={word}
                      setMasterDef={setDef}
                      masterDef={def}
                      setThisO={setThisO}
                    />
                  </Col>
                </Row>

                <Button onClick={handleListAdd} variant="yellow">
                  Add
                </Button>
                <Button
                  onClick={() => {
                    handleListCreate();
                  }}
                  variant="white"
                >
                  Save
                </Button>
              </div>
            ) : (
              <div className="d-flex gap-2">
                <Form.Control
                  value={title}
                  onChange={(e) => {
                    setTitle(e.target.value);
                    setProblem("");
                  }}
                  placeholder="Enter List Title"
                />
                <Button
                  onClick={() => {
                    if (title) {
                      setLetAddItems(true);
                      return;
                    }
                    setProblem("Title is blank");
                  }}
                  variant="yellow"
                >
                  Next
                </Button>
              </div>
            )}
          </Form>
        </Modal.Body>
        {problem && (
          <Modal.Footer className="d-flex justify-content-start fw-semibold text-yellow">
            {problem}
          </Modal.Footer>
        )}
      </Modal>
    </>
  );
}
export default MakeListModal;

// add there is no def to the functionality
