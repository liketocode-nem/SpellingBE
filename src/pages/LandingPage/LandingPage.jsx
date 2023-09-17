import React from "react";
import { Container, Col, Row, Button } from "react-bootstrap";
import "./landingpage.css";

function LandingPage() {
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
          <b className="text-pro">SpellingBE</b> is an inclusive platform for
          learning spelling. Ideal for those struggling with spelling who seek a
          user-friendly practice solution.
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
          style={{ marginRight: "6.8750vw", paddingTop: "5vh" }}
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
              <Col lg={9}>
                <p className="left text-gray">
                  <b className="">SpellingBE </b>
                  Lists provide a simple way to organize words for practice.
                  Create custom lists or choose our carefully crafted presets.
                </p>
              </Col>
            </Col>
            <Col lg={1}>
              <div className="mx-auto pro icon-box hidden">
                <i className="fs-4 bi bi-graph-up"></i>
              </div>
            </Col>
            <Col className="left hidden delay-400" lg={5}>
              <h4>Analysis</h4>
              <Col lg={9}>
                <p className="left text-gray">
                  <b className="">SpellingBE </b>
                  Analysis tracks your progress and provides specialized data on
                  your performance.
                </p>
              </Col>
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
              <Col lg={9}>
                <p className="left text-gray">
                  <b className="">SpellingBE </b>
                  Personalized Content offers custom practice lists exclusively
                  for you, targeting words you've struggled with and chosen, for
                  rapid spelling improvement.
                </p>
              </Col>
            </Col>
            <Col lg={1}>
              <div className=" mx-auto pro icon-box hidden">
                <i className="fs-4 bi bi-send"></i>
              </div>
            </Col>
            <Col className="left hidden delay-400" lg={5}>
              <h4>Sharing</h4>
              <Col lg={9}>
                <p className="left text-gray">
                  <b className="">SpellingBE </b>
                  Sharing is the simple way to share Analytics or Lists. Whether
                  it's for a spelling test or showing off new Analytics, it's
                  the perfect choice.
                </p>
              </Col>
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
          <Button style={{ marginTop: "6vh" }} variant="yellow" size="lg">
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
