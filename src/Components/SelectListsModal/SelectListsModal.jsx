import { useState } from "react";
import {
  Button,
  ListGroup,
  Modal,
  Container,
  Row,
  Col,
  ButtonGroup,
} from "react-bootstrap";
import { useSessionStorage } from "@uidotdev/usehooks";

import "./selectlistsmodal.css";

import { useCollectionOnce } from "react-firebase-hooks/firestore";
import { collection, query, where } from "firebase/firestore";
import SelectListButton from "./SelectListButton";

function ListsModal({ firestore, user }) {
  const [show, setShow] = useState(false);
  const [ids, setIds] = useSessionStorage("ids", []); // list of ids to get list during test
  const [practice, setPractice] = useState(false); // for the buttongroup false = original, true = practice

  const listRef = collection(firestore, "lists");
  let [listsData] = useCollectionOnce(
    practice
      ? query(
          listRef,
          where("uid", "==", user && user.uid),
          where("practice", "==", true)
        )
      : query(
          listRef,
          where("uid", "==", user && user.uid),
          where("practice", "==", false)
        )
  );

  const lists = listsData ? listsData.docs : [];

  return (
    <>
      <Button
        className="fw-bold fs-3"
        onClick={() => {
          setShow(!show);
        }}
        variant="white"
      >
        Select Lists
      </Button>
      <Modal show={show} centered onHide={() => setShow(!show)}>
        <Modal.Header>
          <Modal.Title className="fw-bold">Select Lists</Modal.Title>
        </Modal.Header>

        <Modal.Body className="d-flex flex-column justify-content-center">
          <ButtonGroup className="select">
            <Button
              onClick={() => {
                setPractice(false);
              }}
              variant={practice ? "white" : "pro"}
            >
              Original
            </Button>{" "}
            <Button
              onClick={() => {
                setPractice(true);
              }}
              variant={practice ? "pro" : "white"}
            >
              Practice
            </Button>
          </ButtonGroup>
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
