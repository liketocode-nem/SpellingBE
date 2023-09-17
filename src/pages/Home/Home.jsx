import {
  Button,
  Card,
  Modal,
  Form,
  Col,
  Row,
  Container,
} from "react-bootstrap";
import ListsModal from "../../Components/ListsModal/ListsModal";
import "./home.css";

function Home({ user, auth, firestore }) {
  return (
    <section className="white">
      <Card className=" shadow-sm">
        <Card.Body>
          <div className="d-flex flex-column h-100 justify-content-center gap-3 ">
            <ListsModal firestore={firestore} user={user} auth={auth} />
          </div>
        </Card.Body>
      </Card>
    </section>
  );
}
export default Home;

//   <Container fluid>
//     <Row>
//       <Col className="d-flex justify-content-center">
//         <ButtonGroup vertical>
//           <Button size="xxl" variant="outline-white">
//             Hello
//           </Button>
//           <Button size="xxl" variant="outline-white">
//             Hello
//           </Button>
//           <Button size="xxl" variant="outline-white">
//             Hello
//           </Button>
//         </ButtonGroup>
//       </Col>
//       <Col className="d-flex justify-content-center">
//         <ButtonGroup vertical>
//           <Button size="xxl" variant="yellow">
//             Hello
//           </Button>
//           <Button size="xxl" variant="yellow">
//             Hello
//           </Button>
//           <Button size="xxl" variant="yellow">
//             Hello
//           </Button>
//         </ButtonGroup>
//       </Col>
//       <Col className="d-flex justify-content-center">
//         <ButtonGroup vertical>
//           <Button size="xxl" variant="pro">
//             Start
//           </Button>
//         </ButtonGroup>
//       </Col>
//     </Row>
//   </Container>
