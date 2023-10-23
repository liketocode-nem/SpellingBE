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
        style={{ borderRadius: ".375rem 0 0 .375rem" }}
        onClick={() => {
          setShow(true);
          setO("o");
          setInput("");
          setClassTinyText("m-1 text-yellow fw-semibold");
          setTinyText("incorrect");

          setDisabled(true);
        }}
        variant="white-full "
        className="w-100 h-100 list"
      >
        {" "}
        <i className="bi bi-trash-fill fs-5"></i>
      </Button>
      <Modal
        centered
        show={show}
        onHide={() => {
          setO("");
          setShow(false);
        }}
      >
        <Modal.Header>
          <Modal.Title>
            <Modal.Title className="fw-bold">Verify Delete</Modal.Title>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p className="long text-start">
            Type <b>{list.data().title}</b> to confirm delete
          </p>
          <Form>
            <Form.Group>
              <Form.Control
                value={input}
                onChange={(e) => {
                  setInput(e.target.value);
                  if (
                    e.target.value.replace(/\s/g, "") ===
                    list.data().title.replace(/\s/g, "") // taking out the spaces in the values
                  ) {
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
                placeholder={list.data().title}
              />
              {/* <Form.Label>
                {" "}
                <p className={`${classTinyText} fw-semibold mt-2 text-start`}>
                  {tinyText}
                </p>
              </Form.Label> */}
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
              variant="yellow"
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
