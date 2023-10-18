import { useState, useEffect } from "react";
import {
  Card,
  ListGroup,
  ButtonGroup,
  Button,
  Container,
  Row,
  Col,
} from "react-bootstrap";

import "./analytics.css";
import { query, where, collection } from "firebase/firestore";
import { useCollectionDataOnce } from "react-firebase-hooks/firestore";
import { useSessionStorage } from "@uidotdev/usehooks";
import { useNavigate } from "react-router-dom";

function Analytics({ user, firestore }) {
  const [b1, setB1] = useState(true); // seven days
  const [b2, setB2] = useState(false); // one month
  const [b3, setB3] = useState(false); // six months

  const [time, setTime] = useState(new Date());
  const [changeTime, setChangeTime] = useState(7);

  const [data, setData] = useSessionStorage("data", []);
  const [percent, setPercent] = useSessionStorage("percent", []);
  const [titles, setTitles] = useSessionStorage("titles", []);

  const navigate = useNavigate();

  useEffect(() => {
    setData([]);
    // To subtract 7 days from the current date
    setTime((prevTime) => {
      const newTime = new Date(); // Create a new Date object from the previous state
      const timeRangeDate = new Date(
        newTime.getTime() - changeTime * 24 * 60 * 60 * 1000
      ); // Subtract 7 days worth of milliseconds (hence the multiplication) from the new Date object

      return timeRangeDate; // Return the updated state value
    });
    console.log(analytics);
  }, [changeTime]);

  const analyticsRef = collection(firestore, "analytics");

  let [analyticsData, loading, error, reload] = useCollectionDataOnce(
    query(analyticsRef, where("uid", "==", user && user.uid))
  );

  const analytics = [];

  analyticsData &&
    analyticsData.forEach((doc) => {
      if (doc.time > time.getTime()) {
        analytics.push(doc);
      }
    });

  const handleTimeChange = (timeAgo) => {
    if (timeAgo == 7) {
      // seven days ago
      setB1(true);
      setB2(false);
      setB3(false);
      setChangeTime(7);
    } else if (timeAgo == 1) {
      // 1 month ago
      setB1(false);
      setB2(true);
      setB3(false);
      setChangeTime(30);
    } else if (timeAgo == 6) {
      // 6 months ago
      setB1(false);
      setB2(false);
      setB3(true);
      setChangeTime(182);
    }
  };

  return (
    <section>
      <Card className=" shadow-sm">
        <Card.Body>
          <div className="d-flex flex-column h-100 justify-content-center  gap-3 ">
            <ButtonGroup className="mb-auto button-group">
              <Button
                onClick={() => {
                  handleTimeChange(7);
                }}
                variant={b1 ? "yellow" : "white"}
              >
                7 Days
              </Button>
              <Button
                onClick={() => {
                  handleTimeChange(1);
                }}
                variant={b2 ? "yellow" : "white"}
              >
                1 Month
              </Button>
              <Button
                onClick={() => {
                  handleTimeChange(6);
                }}
                variant={b3 ? "yellow" : "white"}
              >
                6 Month
              </Button>
            </ButtonGroup>

            {analytics ? (
              <ListGroup className="d-flex flex-column h-100 justify-content-center list-group ">
                <div
                  style={{ maxHeight: "45vh", minWidth: "100%" }}
                  className="over"
                >
                  {analytics.map((doc, i) => {
                    return (
                      <ListGroup.Item
                        className={`p-0 text-center 
                        ${
                          analytics.length == 1 ||
                          (analytics.length == i + 1 && "round-bottom")
                        } 
                        ${analytics.length == 1 || (i == 0 && "round-top")}
                        ${analytics.length == 1 && "round-both"}
                        `} // analytics.length == 1 || because the other styles override round-both
                        key={i}
                      >
                        <Container fluid className="p-0">
                          <Button
                            onClick={() => {
                              setData(doc.data);
                              console.log(doc.data);
                              setPercent(doc.percent);
                              setTitles(doc.titles);
                              navigate("/end");
                            }}
                            className={`w-100 h-100 list fw-bold fs-3 
                            ${
                              analytics.length == 1 ||
                              (analytics.length == i + 1 && "round-bottom")
                            } 
                        ${analytics.length == 1 || (i == 0 && "round-top")}
                        ${analytics.length == 1 && "round-both"}
                        `} // analytics.length == 1 || because the other styles override round-both
                            variant="white-full"
                          >
                            <Row>
                              <Col className="text-yellow">
                                {new Date(doc.time).toDateString()}
                              </Col>
                              <Col className="text-basic">{`${
                                doc.percent && doc.percent[0]
                                  ? Math.round(
                                      (doc.percent[0] /
                                        (doc.percent[0] + doc.percent[1])) *
                                        100
                                    ) // percent of the data rounded to a int
                                  : 0
                              }%`}</Col>
                              <Col className="text-pro">
                                {doc.titles.map((title, i) => {
                                  // i +1 or .length -1 because index starts at 0 and length starts at 1
                                  if (doc.titles.length != i + 1) {
                                    // not the last item in the list so there is no comma
                                    return `${title}, `;
                                  } else {
                                    return `${title} `;
                                  }
                                })}
                              </Col>
                            </Row>
                          </Button>
                        </Container>
                      </ListGroup.Item>
                    );
                  })}
                </div>
              </ListGroup>
            ) : (
              <div className="d-flex flex-column h-100 justify-content-center  ">
                <h1 className="text-center">No Analytics</h1>
              </div>
            )}
          </div>
        </Card.Body>
      </Card>
    </section>
  );
}
export default Analytics;
