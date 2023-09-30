import { InputGroup, ButtonGroup, Form, Button, Alert } from "react-bootstrap";
import { useSessionStorage } from "@uidotdev/usehooks";

import "./test.css";

import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
function Test({ firestore }) {
  const [wordsLength, setWordsLength] = useSessionStorage("wordsLength", []);

  const [ids, setIds] = useSessionStorage("ids");

  const [words, setWords] = useState([]);
  const [defs, setDefs] = useState([]);
  const [count, setCount] = useSessionStorage("c", 0);
  const [show, setShow] = useState(false);
  const [message, setMessage] = useState("");
  const [correct, setCorrect] = useState();
  const [spelling, setSpelling] = useState("");
  const [rate, setRate] = useSessionStorage("rate", 1); // Initial slider value

  // keep track of list index
  const synthesis = window.speechSynthesis;

  useEffect(() => {
    // This effect will run only once when the component is mounted (page loaded)
    const fetchData = async () => {
      const fetchedWords = []; // list used while processing ids
      const fetchedDefs = []; // list used while processing ids

      for (const id of ids) {
        const docRef = doc(firestore, "lists", id);
        const snapshot = await getDoc(docRef);
        const value = snapshot.data();

        if (value && value.words && value.defs) {
          fetchedWords.push(...value.words);
          fetchedDefs.push(...value.defs);
        }
      }
      setWords(fetchedWords); // now that the list is fully updated the other useeffect will fire
      setDefs(fetchedDefs); // now that the list is fully updated the other useeffect will fire
      setWordsLength(fetchedWords.length);
    };

    fetchData();
  }, []); // Empty dependency array to run the effect once when the component is mounted

  useEffect(() => {
    if (synthesis) {
      sayWord(count, true);
    }
  }, [words]);

  useEffect(() => {
    if (show == true) {
      setTimeout(() => {
        setShow(false);
      }, 5600);
    }
  }, [show]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (spelling && spelling.toLowerCase() == words[count].toLowerCase()) {
      setCorrect(true);
    } else {
      setCorrect(false);
    }
    setShow(false);

    setShow(true);
    setMessage(words[count]);
    setSpelling("");

    if (synthesis) {
      const newCount = count + 1;
      sayWord(newCount, true);
      setCount((prevCount) => prevCount + 1); // Update count using the previous value
    }
  };

  const sayWord = (c, wordsORdef) => {
    synthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(
      wordsORdef ? words[c] : defs[c]
    );

    utterance.rate = rate;
    utterance.onerror = (event) => {
      console.error("Speech synthesis error:", event.error);
    };
    // Use the speechSynthesis object to speak the text
    synthesis.speak(utterance);
  };

  return (
    <section>
      {show && (
        <Alert className="fade-inout" variant={correct ? "success" : "danger"}>
          <Alert.Heading className="fw-bold text-center">
            {" "}
            {correct ? "Correct " : "Incorrect"}
          </Alert.Heading>
          <hr />
          <p className="mb-0">
            The correct selling is <b>{message}</b>
          </p>
        </Alert>
      )}
      <Form onSubmit={handleSubmit}>
        <InputGroup
          style={{ padding: "0 15rem 6rem 15rem" }}
          className="fixed-bottom"
          size="lg"
        >
          <Form.Control
            value={spelling}
            onChange={(e) => setSpelling(e.target.value)}
            aria-label="Large"
            aria-describedby="inputGroup-sizing-sm"
          />
        </InputGroup>
        <ButtonGroup
          style={{ padding: "0 20rem 2rem 20rem" }}
          className="fixed-bottom"
        >
          <Button
            className="border fs-5"
            onClick={() => sayWord(count, true)}
            variant="white"
          >
            <b>Repeat</b>
          </Button>
          <Button
            className="border fs-5"
            onClick={() => sayWord(count, false)}
            variant="yellow"
          >
            <b>Definition</b>
          </Button>
        </ButtonGroup>
      </Form>
    </section>
  );
}
export default Test;
