import { useState } from "react";
import { Button, ListGroup, Modal, Container, Row, Col } from "react-bootstrap";
import { useCollectionOnce } from "react-firebase-hooks/firestore";
import { collection, query, where } from "firebase/firestore";
import ConfirmDeleteModal from "./ConfirmDeleteModal";
import ListButton from "./ListButton";
function ViewListsModal({ firestore, user }) {
  const [show, setShow] = useState(false);
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
                  <ListGroup.Item ckey={list.id}>
                    <Container fluid>
                      <Row className="d-flex row justify-content center text-center gap-2 align-items-center">
                        <Col sm={1}>
                          <ConfirmDeleteModal
                            firestore={firestore}
                            list={list}
                            reload={reload}
                            setO={setO}
                          />{" "}
                        </Col>
                        <Col sm={1}>
                          {" "}
                          <ListButton
                            setBigShow={setShow}
                            firestore={firestore}
                            list={list}
                            setO={setO}
                          />
                        </Col>

                        <Col sm={8}>{list.data().title}</Col>
                      </Row>
                    </Container>
                  </ListGroup.Item>
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
