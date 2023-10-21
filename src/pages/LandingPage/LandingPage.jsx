import React from "react";
import { Container, Col, Row, Button } from "react-bootstrap";
import "./landingpage.css";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";

function LandingPage({ auth, user }) {
  const handleAuth = () => {
    if (!user) {
      const provider = new GoogleAuthProvider();
      signInWithPopup(auth, provider).then(() => {});
    }

    auth.signOut();
  };
  return (
    <div>
      <section id="spellingbe" className="white">
        <h1 className="title first">
          <span className="text-black">Spelling</span>
          <span className="text-yellow">BE</span>
        </h1>
      </section>

      <section className="black" id="About">
        <p className="hidden" id="about">
          <b className="text-pro">SpellingBE</b> is an easy to use and fun app
          designed to elevate your spelling skills, by tailoring your spelling
          experience.
        </p>
        <div className="custom-shape-divider-top-1691527340">
          <svg
            data-name="Layer 1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
          >
            <path
              d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
              className="shape-fill"
            />
          </svg>
        </div>
      </section>

      <section id="Features" className="white text-black">
        <h1
          className=""
          style={{ fontSize: "4em", marginBottom: "8vh", marginTop: "16vh" }}
        >
          Features
        </h1>

        <Container
          style={{ paddingTop: "5vh" }}
          // marginRight: "6.8750vw",
          // <Col className="left hidden delay-400" lg={5}>
          //     <h4>Analytics</h4>
          //     <Col lg={9}>
          //       <p className="left text-gray">
          //         <b className="">Analytics </b>
          //         tracks your progress and provides helpful data on your
          //         performance.
          //       </p>
          //     </Col>
          //   </Col>
          className=""
        >
          <Row className="text-black">
            <Col lg={1}>
              <div className=" mx-auto pro icon-box hidden">
                <i className="fs-4 bi bi-list-ul"></i>
              </div>
            </Col>
            <Col className="left hidden delay-400" lg={5}>
              <h4>Lists</h4>

              <p className="left text-gray">
                <b className="">Lists </b>
                provide a simple way to organize words for practice. You may
                create custom lists tailored to your needs.
              </p>
            </Col>
            <Col lg={1}>
              <div className="mx-auto pro icon-box hidden">
                <i className="fs-4 bi bi-graph-up"></i>
              </div>
            </Col>
            <Col className="left hidden delay-400" lg={5}>
              <h4>Analytics</h4>

              <p className="left text-gray">
                <b className="">Analytics </b>
                tracks your progress and provides helpful data on your
                performance.
              </p>
            </Col>
          </Row>
          <Row style={{ marginTop: "10vh" }} className="text-black">
            <Col lg={1}>
              <div className=" mx-auto pro icon-box hidden">
                <i className="fs-4 bi bi-filter-square"></i>
              </div>
            </Col>
            <Col className="left hidden delay-400" lg={5}>
              <h4>Personalized Content</h4>

              <p className="left text-gray">
                <b className="">Personalized Content </b>
                helps you improve by creating custom lists based on the words
                you've spelled incorrectly.
              </p>
            </Col>
            <Col lg={1}>
              <div className=" mx-auto pro icon-box hidden">
                <i className="fs-4 bi bi-send"></i>
              </div>
            </Col>
            <Col className="left hidden delay-400" lg={5}>
              <h4>Sharing</h4>

              <p className="left text-gray">
                <b className="">Sharing </b>
                is the simple way for students and teachers to share word lists,
                whether that be for a spelling or vocabulary skills.
              </p>
            </Col>
          </Row>
        </Container>
        <div className="custom-shape-divider-top-1693019884">
          <svg
            data-name="Layer 1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
          >
            <path
              d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
              className="shape-fill"
            ></path>
          </svg>
        </div>
      </section>
      <section id="Get Started" className="yellow">
        <h1 className="title">Get Started</h1>
        <div className="d-flex align-items-center ">
          <Button
            style={{ marginTop: "6vh" }}
            className=""
            variant="yellow"
            size="lg"
          >
            Demo
          </Button>{" "}
          <div className="vl"></div>
          <Button
            style={{ marginTop: "6vh" }}
            onClick={handleAuth}
            variant="yellow"
            size="lg"
          >
            Sign Up
          </Button>{" "}
        </div>
        <div className="custom-shape-divider-top-1693068403">
          <svg
            data-name="Layer 1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
          >
            <path
              d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
              className="shape-fill"
            ></path>
          </svg>
        </div>
      </section>
    </div>
  );
}

export default LandingPage;
