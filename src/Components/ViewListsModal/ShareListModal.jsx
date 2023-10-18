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

function ShareListModal({ setO, list }) {
  const [show, setShow] = useState(false);

  return (
    <>
      <Button
        style={{ borderRadius: "0" }}
        className="w-100 h-100 list"
        onClick={async () => {
          setShow(true);
          await navigator.clipboard.writeText(list.id);
        }}
        variant="white-full"
      >
        {" "}
        {show ? (
          <i class="bi bi-check-lg fs-5"></i>
        ) : (
          <i class="bi bi-clipboard2 fs-5"></i>
        )}
      </Button>
    </>
  );
}
export default ShareListModal;
