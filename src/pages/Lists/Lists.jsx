import { Card } from "react-bootstrap";
import MakeListModal from "../../Components/MakeListModal/MakeListModal";
import ViewListsModal from "../../Components/ViewListsModal/ViewListsModal";
import { useEffect } from "react";

function Lists({ firestore, user }) {
  return (
    <section className="white">
      <Card className=" shadow-sm">
        <Card.Body>
          <div className="d-flex flex-column h-100 justify-content-center gap-3 ">
            <ViewListsModal firestore={firestore} user={user} />
            <MakeListModal firestore={firestore} user={user} />
          </div>
        </Card.Body>
      </Card>
    </section>
  );
}
export default Lists;
