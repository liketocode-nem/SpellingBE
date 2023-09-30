import { Button, ListGroup, Container, Row, Col } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useSessionStorage } from "@uidotdev/usehooks";

function SelectListButton({ list, ids, setIds }) {
  const [select, setSelect] = useSessionStorage(`select ${list.id}`, false);
  const [practice, setPractice] = useSessionStorage(
    `practice ${list.id}`,
    false
  );
  // const sessionList = JSON.parse(sessionStorage.getItem(list.id)) || [
  //   false,
  //   false,
  // ];

  // useEffect(() => {
  //   setSelect(sessionList[0]);
  //   setPractice(sessionList[1]);
  // }, []);

  // useEffect(() => {
  //   sessionStorage.setItem(list.id, JSON.stringify([select, practice]));
  // }, [select, practice]);

  return (
    <ListGroup.Item className="p-0">
      <Container fluid>
        <Row className="d-flex row justify-content center text-center  flex-grow-1 ">
          <Col className="flex-grow-1 p-0 " sm={3}>
            <Button
              style={{ borderRadius: ".375rem 0 0 .375rem" }}
              className={"w-100 h-100 list"}
              onClick={() => {
                setSelect((prevSelect) => !prevSelect);
                const newSelect = !select;
                setPractice(false);

                if (newSelect) {
                  setIds([...ids, list.id]);
                } else {
                  setIds(ids.filter((id) => id !== list.id));
                }
              }}
              variant={select ? "pro" : "white-full"}
            >
              {" "}
              {/* {select ? (
                <i className="bi bi-check2"></i>
              ) : (
                <i className="bi bi-x-lg"></i>
              )} */}
              <i className="bi bi-plus-circle fs-5"></i>
            </Button>
          </Col>

          <Col className="flex-grow-1 p-0 " sm={9}>
            <Button
              style={{ borderRadius: " 0 .375rem .375rem 0" }}
              className="w-100 h-100 list"
              onClick={() => {
                select && setPractice((prevPractice) => !prevPractice);
              }}
              variant={practice ? "pro" : "white-full"}
            >
              {" "}
              {/* seeing if the list title is too long  */}
              {list.data().title.length > 30 ? (
                // we need two because one has the ...
                // two outcomes:
                //  check practice where you need a shorten word
                practice ? (
                  <>
                    <span>practice</span>
                    {` ${list.data().title.slice(1, 15)}...`}
                  </>
                ) : (
                  `${list.data().title.slice(1, 30)}...`
                )
              ) : // check for practice where you don't need shorten the word
              practice ? (
                <>
                  <span>Practice List: </span>
                  <b>{` ${" "}${list.data().title}`}</b>
                </>
              ) : (
                list.data().title
              )}
            </Button>
          </Col>
        </Row>
      </Container>
    </ListGroup.Item>
  );
}
export default SelectListButton;
