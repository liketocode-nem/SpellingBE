import {
  Button,
  Card,
  Modal,
  Form,
  Col,
  Row,
  Container,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { useSessionStorage } from "@uidotdev/usehooks";

import SelectListsModal from "../../Components/SelectListsModal/SelectListsModal";
import "./home.css";

function Home({ user, auth, firestore }) {
  const [count, setCount] = useSessionStorage("c", 0);
  const [testing, setTesting] = useSessionStorage("testing", false);
  const [data, setData] = useSessionStorage("data", []);
  const [percent, setPercent] = useSessionStorage("percent", []);
  const [titles, setTitles] = useSessionStorage("titles", []);

  return (
    <section className="white">
      <Card className=" shadow-sm">
        <Card.Body>
          <div className="d-flex flex-column h-100 justify-content-center gap-3 ">
            <SelectListsModal firestore={firestore} user={user} auth={auth} />
            <Button
              className="fw-bold fs-3"
              variant="yellow"
              as={Link}
              to="/test"
              onClick={() => {
                setCount(0);
                setTesting(true);
                setData([]);
                setPercent([]);
                setTitles([]);
              }}
            >
              Start
            </Button>
          </div>
        </Card.Body>
      </Card>
    </section>
  );
}
export default Home;
