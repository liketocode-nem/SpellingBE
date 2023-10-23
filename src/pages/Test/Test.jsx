import { InputGroup, ButtonGroup, Form, Button, Alert } from "react-bootstrap";
import { useSessionStorage } from "@uidotdev/usehooks";

import "./test.css";

import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

function Test({ firestore, user }) {
  const [wordsLength, setWordsLength] = useSessionStorage("wordsLength", []);

  const [ids, setIds] = useSessionStorage("ids");
  const [titles, setTitles] = useSessionStorage("titles", []);

  const [words, setWords] = useState([]);
  const [defs, setDefs] = useState([]);
  const [count, setCount] = useSessionStorage("c", 0);
  const [show, setShow] = useState(false);
  const [message, setMessage] = useState("");
  const [correct, setCorrect] = useState();
  const [spelling, setSpelling] = useState("");
  const [rate, setRate] = useSessionStorage("rate", 1); // Initial slider value

  const [data, setData] = useSessionStorage("data", []);
  const [oldTime, setOldTime] = useState();
  const [percent, setPercent] = useSessionStorage("percent", []);

  const navigate = useNavigate();
  const [save, setSave] = useState(false);

  // keep track of list index
  const synthesis = window.speechSynthesis;

  useEffect(() => {
    setOldTime(performance.now());
    // This effect will run only once when the component is mounted (page loaded)
    const fetchData = async () => {
      const fetchedWords = []; // list used while processing ids
      const fetchedDefs = []; // list used while processing ids
      const fetchedTitles = [];
      for (const id of ids) {
        if (id && firestore) {
          const listRef = doc(firestore, "lists", id);
          const snapshot = await getDoc(listRef);
          const value = snapshot.data();

          if (value && value.words && value.defs && value.title) {
            fetchedWords.push(...value.words);

            fetchedDefs.push(...value.defs);
            fetchedTitles.push(
              value.title.length > 15
                ? `${value.title.slice(0, 15)}...`
                : value.title
            );
          }
        }
      }
      setWords(fetchedWords); // now that the list is fully updated the other useffect will fire
      setDefs(fetchedDefs); // now that the list is fully updated the other useffect will fire
      setWordsLength(fetchedWords.length);
      setTitles(fetchedTitles);
      setSave(true);
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
    const time = (performance.now() - oldTime) / 1000; // time it took to spell the word / 1000 bc it is in milliseconds

    setOldTime(performance.now());
    if (spelling.toLowerCase() == words[count].toLowerCase()) {
      setCorrect(true);
      if (percent[0]) {
        setPercent([percent[0] + 1, percent[1]]); //adding one to the correct item
      } else {
        setPercent([1, percent[1]]); //if the value hasn't been updated, hard code 1 to avoid error
      }
      setData([
        ...data,
        {
          seconds: +time.toFixed(1),
          word: words[count],
          def: defs[count],
          correct: true,
        },
      ]);
    } else {
      setCorrect(false);
      if (percent[1]) {
        setPercent([percent[0], percent[1] + 1]); //adding one to the incorrect item
      } else {
        setPercent([percent[0], 1]);
      }
      setData([
        ...data,
        {
          seconds: +time.toFixed(1),
          word: words[count],
          def: defs[count],
          correct: false,
        },
      ]);
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

  const handleData = async () => {
    const time = new Date();
    const analyticsRef = collection(firestore, "analytics");

    await addDoc(analyticsRef, {
      data: data,
      percent: percent,
      uid: user.uid,
      time: time.getTime(),
      titles: titles,
    });
  };
  useEffect(() => {
    if (count == words.length && save) {
      handleData();
      navigate("/end");
    }
  }, [count]);

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
