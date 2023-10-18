import { Button, Modal, Accordion, ListGroup, Form } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useSessionStorage } from "@uidotdev/usehooks";
function AutoDef({ word, setThisO, setMasterDef, masterDef }) {
  const [showDef, setShowDef] = useState(false);
  const [data, setData] = useState([]);
  const [form, setForm] = useState(false); // should it display the defs or a form
  const [wordCapital, setWordCapital] = useState(
    word.charAt(0).toUpperCase() + word.slice(1)
  );
  const handleDefFetch = () => {
    setThisO("o");

    setShowDef(true);
    console.log(word);
    fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((responseData) => {
        setData(responseData[0].meanings);
      })
      .catch((error) => {
        if (error) {
          setForm(true); // if there is an error have them put in the definition
        }
      });
  };

  return (
    <>
      <Button onClick={handleDefFetch} variant="white">
        Auto Def
      </Button>
      <Modal
        centered
        onHide={() => {
          setShowDef(false);
          setThisO("");
        }}
        show={showDef}
      >
        <Modal.Header>
          <Modal.Title className="fw-bold">
            {" "}
            {form
              ? "We do not have that word"
              : `Auto Definition: ${wordCapital}`}{" "}
            {/*  first letter uppercase */}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {!form ? (
            <Accordion>
              {data.map((defList, i) => {
                return (
                  <Accordion.Item key={i} eventKey={`${i}`}>
                    <Accordion.Header>
                      {defList.partOfSpeech.charAt(0).toUpperCase() +
                        defList.partOfSpeech.slice(1)}{" "}
                      {/*  first letter uppercase */}
                    </Accordion.Header>
                    <Accordion.Body>
                      <ListGroup>
                        {defList.definitions.map((def, i) => {
                          return (
                            <ListGroup.Item className="p-0">
                              <Button
                                onClick={() => {
                                  setShowDef(false);
                                  setThisO("");
                                  setMasterDef(def.definition);
                                }}
                                className="w-100 h-100 list"
                                key={i}
                                variant="white-full"
                              >
                                {def.definition}
                              </Button>
                            </ListGroup.Item>
                          );
                        })}
                      </ListGroup>
                    </Accordion.Body>
                  </Accordion.Item>
                );
              })}
            </Accordion>
          ) : (
            <Form.Control
              value={masterDef}
              onChange={(e) => {
                setMasterDef(e.target.value);
              }}
              placeholder="Definition"
            />
          )}
        </Modal.Body>
      </Modal>
    </>
  );
}
export default AutoDef;
