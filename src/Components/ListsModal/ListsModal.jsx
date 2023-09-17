import { useState } from "react";
import { Button, Modal, Container, Row, Col, Form } from "react-bootstrap";
import "./listsmodal.css";

import { useCollectionOnce } from "react-firebase-hooks/firestore";
import { collection, query, where } from "firebase/firestore";

function ListsModal({ firestore, user }) {
  const [show, setShow] = useState(false);

  const listRef = collection(firestore, "lists");
  const [lists] = useCollectionOnce(
    query(listRef, where("uid", "==", user.uid))
  );

  return (
    <>
      <Button
        className="fw-bold fs-3"
        onClick={() => setShow(!show)}
        variant="white"
      >
        Select Lists
      </Button>
      <Modal show={show} fullscreen={true} onHide={() => setShow(!show)}>
        <Modal.Header closeButton>
          <Modal.Title className="fw-bold">Select Lists</Modal.Title>
        </Modal.Header>

        <div className="d-flex flex-column h-100 justify-content-center gap-3 m-5">
          {lists ? (
            lists.docs.map((list) => {
              return (
                <Button
                  key={list.id}
                  className="fw-bold fs-3 d-flex"
                  variant="white"
                >
                  <Container fluid>
                    <Row>
                      <Col xs={1}>
                        {" "}
                        <Form.Check type={"checkbox"} id={"checkbox"} />
                      </Col>
                      <Col xs={10}> {list.data().title}</Col>
                    </Row>
                  </Container>
                </Button>
              );
            })
          ) : (
            <h1 className="text-center">You have no lists</h1>
          )}
        </div>
      </Modal>
    </>
  );
}
export default ListsModal;
