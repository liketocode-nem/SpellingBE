import { Button, ListGroup, Container, Row, Col } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useSessionStorage } from "@uidotdev/usehooks";

function SelectListButton({ list, ids, setIds }) {
  const [select, setSelect] = useSessionStorage(`select ${list.id}`, false);

  return (
    <ListGroup.Item className="p-0">
      <Container fluid className="p-0">
        <Button
          className="w-100 h-100 list  "
          onClick={() => {
            setSelect((prevSelect) => !prevSelect);
            const newSelect = !select;

            if (newSelect) {
              setIds([...ids, list.id]); // if it is being selected add id to list
            } else {
              setIds(ids.filter((id) => id !== list.id)); // if it is being deselected remove id
            }
          }}
          variant={select ? "pro" : "white-full"}
        >
          <Row className="d-flex  align-items-center text-center  ">
            <Col className="flex-grow-1 p-0 " sm={3}>
              <i className="bi bi-plus-circle fs-5"></i>
            </Col>

            <Col className="flex-grow-1 p-0 " sm={9}>
              {list.data().title.length > 30
                ? `${list.data().title.slice(1, 30)}...`
                : list.data().title}
            </Col>
          </Row>
        </Button>
      </Container>
    </ListGroup.Item>
  );
}
export default SelectListButton;
