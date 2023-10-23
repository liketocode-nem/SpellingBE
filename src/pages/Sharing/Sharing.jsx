import {
  Button,
  Card,
  Modal,
  Form,
  Col,
  Row,
  Container,
} from "react-bootstrap";

import { useState } from "react";
import { doc, addDoc, getDoc, collection } from "firebase/firestore";
function Sharing({ firestore, user }) {
  const [code, setCode] = useState("");
  const listRef = collection(firestore, "lists");
  const handleGetList = async (e) => {
    e.preventDefault();
    const docRef = doc(firestore, "lists", code);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      await addDoc(listRef, {
        title: docSnap.data().title,
        words: docSnap.data().words,
        defs: docSnap.data().defs,
        uid: user.uid,
        practice: false,
      });
      setCode("Added List");
    } else {
      setCode("Not a valid Share Code");
    }
  };

  return (
    <section className="white">
      <Card className=" shadow-sm">
        <Card.Body>
          <div
            style={{ padding: " 0 15rem 0 15rem" }}
            className="d-flex flex-column h-100 justify-content-center"
          >
            <Form
              onSubmit={(e) => {
                handleGetList(e);
              }}
            >
              <Form.Control
                size="lg"
                value={code}
                onChange={(e) => {
                  setCode(e.target.value);
                }}
                placeholder="Share Code"
              />
            </Form>
          </div>
        </Card.Body>
      </Card>
    </section>
  );
}
export default Sharing;
