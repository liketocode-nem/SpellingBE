import { useState } from "react";
import { Button, ListGroup, Modal, Container, Row, Col } from "react-bootstrap";
import { useSessionStorage } from "@uidotdev/usehooks";

import "./selectlistsmodal.css";

import { useCollectionOnce } from "react-firebase-hooks/firestore";
import { collection, query, where } from "firebase/firestore";
import SelectListButton from "./SelectListButton";

function ListsModal({ firestore, user }) {
  const [show, setShow] = useState(false);
  const [ids, setIds] = useSessionStorage("ids", []);

  const listRef = collection(firestore, "lists");
  let [listsData, loading, error, reload] = useCollectionOnce(
    query(listRef, where("uid", "==", user && user.uid))
  );

  const lists = listsData ? listsData.docs : [];

  return (
    <>
      <Button
        className="fw-bold fs-3"
        onClick={() => setShow(!show)}
        variant="white"
      >
        Select Lists
      </Button>
      <Modal show={show} centered onHide={() => setShow(!show)}>
        <Modal.Header>
          <Modal.Title className="fw-bold">Select Lists</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <ListGroup>
            {lists.length > 0 ? (
              lists.map((list) => {
                return (
                  <>
                    <SelectListButton
                      ids={ids}
                      setIds={setIds}
                      show={show}
                      list={list}
                      key={list.id}
                    />
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
export default ListsModal;
