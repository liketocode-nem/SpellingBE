import { useEffect, useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import { doc, deleteDoc } from "firebase/firestore";
function ConfirmDeleteModal({ list, firestore, reload, setO }) {
  const [show, setShow] = useState(false);
  const [input, setInput] = useState("");
  const [tinyText, setTinyText] = useState("incorrect");
  const [classTinyText, setClassTinyText] = useState("m-1 text-yellow");
  const [disabled, setDisabled] = useState(true);

  const handleListDelete = () => {
    deleteDoc(doc(firestore, "lists", list.id)).then(() => {
      reload();
    });
  };

  return (
    <>
      <Button
        className="rounded-circle"
        onClick={() => {
          setShow(true);
          setO("o");
          setInput("");
          setClassTinyText("m-1 text-yellow fw-semibold");
          setTinyText("incorrect");

          setDisabled(true);
        }}
        variant="white-full"
      >
        {" "}
        <i className="bi bi-trash-fill"></i>
      </Button>
      <Modal
        centered
        show={show}
        onHide={() => {
          setShow(false);
          setO("");
        }}
      >
        <Modal.Header>
          <Modal.Title>
            <Modal.Title className="fw-bold">Verify Delete</Modal.Title>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Control
                value={input}
                onChange={(e) => {
                  setInput(e.target.value);
                  if (e.target.value === list.data().title) {
                    setClassTinyText("m-1 text-pro fw-semibold");
                    setTinyText("correct");
                    setDisabled(false);
                  } else {
                    setClassTinyText("m-1 text-yellow fw-semibold");
                    setTinyText("incorrect");
                    setDisabled(true);
                  }
                }}
                type="text"
                placeholder={`Type ${list.data().title}`}
              />
              <Form.Label>
                {" "}
                <p className={`${classTinyText} fw-semibold mt-2 text-start`}>
                  {tinyText}
                </p>
              </Form.Label>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          {disabled ? (
            <Button
              variant="white"
              disabled
              onClick={() => {
                handleListDelete();
              }}
            >
              Delete
            </Button>
          ) : (
            <Button
              variant="white"
              onClick={() => {
                handleListDelete();
                setShow(false);
                setO("");
              }}
            >
              Delete
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    </>
  );
}
export default ConfirmDeleteModal;
