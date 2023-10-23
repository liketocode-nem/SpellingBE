import { useEffect, useState } from "react";
import {
  Modal,
  Button,
  Container,
  Row,
  Col,
  Form,
  InputGroup,
} from "react-bootstrap";
import { setDoc, doc } from "firebase/firestore";
import "./viewlistsmodal.css";
import { AutoDef as ListAutoDef } from "./AutoDef";
import AutoDef from "../MakeListModal/AutoDef";

function ListButton({
  list,
  firestore,
  setO,

  reload,
}) {
  const [show, setShow] = useState(false);
  const [add, setAdd] = useState(false);
  const [words, setWords] = useState([...list.data().words]);

  const [defs, setDefs] = useState([...list.data().defs]);
  const [word, setWord] = useState("");
  const [def, setDef] = useState("");
  const [problem, setProblem] = useState("");
  const [scrollWidth, setScrollWidth] = useState("");

  useEffect(() => {
    // Creating invisible container
    const outer = document.createElement("div");
    outer.style.visibility = "hidden";
    outer.style.overflow = "scroll"; // forcing scrollbar to appear
    outer.style.msOverflowStyle = "scrollbar"; // needed for WinJS apps
    document.body.appendChild(outer);

    // Creating inner element and placing it in the container
    const inner = document.createElement("div");
    outer.appendChild(inner);

    // Calculating difference between container's full width and the child width
    setScrollWidth(outer.offsetWidth - inner.offsetWidth);
    // Removing temporary elements from the DOM
    outer.parentNode.removeChild(outer);
  }, []);

  const [thisO, setThisO] = useState("");

  const handleListUpdate = async () => {
    await setDoc(doc(firestore, "lists", list.id), {
      words: words,
      defs: defs,
      title: list.data().title,
      uid: list.data().uid,
    });
  };

  const handleItemDelete = (i) => {
    if (words.length > 1) {
      setWord(words.splice(i, 1));
      setDef(defs.splice(i, 1));
    }
  };

  const handleItemAdd = (e) => {
    e.preventDefault();
    if (word) {
      setWords([word, ...words]);
      def ? setDefs([def, ...defs]) : setDefs(["No definition", ...defs]);
      setWord("");
      setDef("");
      return;
    }
    setProblem("Word is blank");
  };
  return (
    <>
      <Button
        style={{ borderRadius: " 0 .375rem .375rem 0 " }}
        className="w-100 h-100 list"
        onClick={() => {
          setShow(true);
          setO("o");
        }}
        variant="white-full"
      >
        {" "}
        {list.data().title.length > 30
          ? `${list.data().title.slice(1, 30)}...`
          : list.data().title}
      </Button>

      <Modal
        centered
        show={show}
        onHide={() => {
          handleListUpdate();
          setShow(false);
          setO("");
        }}
        className={`${thisO} `}
      >
        <Modal.Header>
          <Modal.Title className="fw-bold">Edit and View List</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Container
            className="d-flex  flex-column  justify-content-center"
            fluid
          >
            <Button
              onClick={() => {
                setShow(false);
                setAdd(true);
              }}
              variant="yellow mb-5 mt-4 "
            >
              <i
                style={{ paddingLeft: `${scrollWidth}px` }}
                className="bi bi-plus-lg"
              ></i>
            </Button>

            <Row
              style={{ paddingRight: `${scrollWidth}px` }}
              className="pt-2 pb-2  "
            >
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
                <div className="vll"></div>
              </Col>
              <Col
                sm={5}
                className="text-center fw-semibold  d-flex justify-content-center align-items-center text-break"
              >
                Definitions
              </Col>
            </Row>
            <div
              style={{
                maxHeight: "67vh",
                minWidth: "100%",
              }}
              className=" over"
            >
              {words.map((word, i) => {
                return (
                  <Row key={i} className="pt-2 pb-2  ">
                    <Col
                      sm={1}
                      className=" d-flex justify-content-center align-items-center"
                    >
                      <Button
                        style={{
                          marginLeft: "30px",
                          display: "inline-block",
                        }}
                        className="rounded-circle "
                        onClick={() => handleItemDelete(i)}
                        variant="white-full"
                      >
                        {" "}
                        <i className="bi  bi-trash-fill "></i>
                      </Button>
                    </Col>
                    <Col
                      sm={5}
                      className=" d-flex justify-content-center align-items-center"
                    >
                      <Form.Control
                        style={{
                          marginLeft: "10px",
                        }}
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
                      <div
                        // style={{
                        //   marginRight: "10px",
                        // }}
                        className="vl"
                      ></div>
                    </Col>
                    <Col
                      sm={5}
                      className="  d-flex justify-content-center align-items-center"
                    >
                      {defs[i] == "No definition" || defs[i] == "" ? (
                        <ListAutoDef
                          setThisO={setThisO}
                          masterDefs={defs}
                          setMasterDefs={setDefs}
                          index={i}
                          word={words[i]}
                        />
                      ) : (
                        <Form.Control
                          style={{
                            marginRight: "10px",
                          }}
                          value={defs[i]}
                          onChange={(e) => {
                            const updatedDefs = [...defs];
                            updatedDefs[i] = e.target.value;
                            setDefs(updatedDefs);
                          }}
                          placeholder="Definition"
                        />
                      )}
                    </Col>
                  </Row>
                );
              })}
            </div>
          </Container>
        </Modal.Body>
      </Modal>
      <Modal
        centered
        onHide={() => {
          setAdd(false);
          setShow(true);
          handleListUpdate();
        }}
        className={`${thisO}`}
        show={add}
      >
        <Modal.Header>
          <Modal.Title className="fw-bold">Add Items</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleItemAdd}>
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
                  {" "}
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

              <Button type="submit" variant="yellow">
                Add
              </Button>
            </div>
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

export default ListButton;
