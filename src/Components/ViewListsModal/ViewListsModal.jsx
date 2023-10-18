import { useState } from "react";
import { Button, ListGroup, Modal, Container, Row, Col } from "react-bootstrap";
import { useCollectionOnce } from "react-firebase-hooks/firestore";
import { collection, query, where } from "firebase/firestore";
import ListButton from "./ListButton";
import ConfirmDeleteModal from "./ConfirmDeleteModal";
import ShareListModal from "./ShareListModal";

function ViewListsModal({ firestore, user }) {
  const [show, setShow] = useState(false);
  const [listButton, setListButton] = useState(false);
  const [o, setO] = useState("");
  const listRef = collection(firestore, "lists");
  let [listsData, loading, error, reload] = useCollectionOnce(
    query(listRef, where("uid", "==", user && user.uid))
  );
  const lists = listsData ? listsData.docs : [];

  return (
    <>
      <Button
        className="fw-bold fs-3 "
        onClick={() => {
          reload();
          setShow(true);
        }}
        variant="white"
      >
        View Lists
      </Button>
      <Modal
        onHide={() => {
          setShow(false);
        }}
        show={show}
        centered
        className={o}
      >
        <Modal.Header>
          <Modal.Title className="fw-bold">View Lists</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ListGroup>
            {lists.length > 0 ? (
              lists.map((list) => {
                return (
                  <>
                    <ListGroup.Item className="p-0" key={list.id}>
                      <Container fluid>
                        <Row className="d-flex row justify-content center text-center  flex-grow-1 ">
                          <Col className="flex-grow-1 p-0 " sm={2}>
                            <ConfirmDeleteModal
                              firestore={firestore}
                              list={list}
                              reload={reload}
                              setO={setO}
                            />{" "}
                          </Col>
                          <Col className="flex-grow-1 p-0 " sm={2}>
                            <ShareListModal
                              firestore={firestore}
                              list={list}
                              reload={reload}
                              setO={setO}
                            />{" "}
                          </Col>
                          <Col className="flex-grow-1 p-0 " sm={8}>
                            <ListButton
                              setListButton={setListButton}
                              listButton={listButton}
                              firestore={firestore}
                              list={list}
                              setO={setO}
                              reload={reload}
                            />
                          </Col>
                        </Row>
                      </Container>
                    </ListGroup.Item>
                  </>
                );
              })
            ) : (
              <h1 className="text-center">No lists</h1>
            )}
          </ListGroup>
        </Modal.Body>
      </Modal>
    </>
  );
}
export default ViewListsModal;
