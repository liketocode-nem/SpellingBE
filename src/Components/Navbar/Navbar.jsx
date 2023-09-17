import { useRef, useEffect, useState, forwardRef } from "react";
import {
  Navbar,
  Nav,
  Container,
  Button,
  Image,
  Dropdown,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import "./navbar.css";

import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";

const SpellingBENavbar = ({ left, auth, user }) => {
  const leftLength = useRef(null);
  const rightLength = useRef(null);

  let right = null;
  const navLogoClass = user ? "" : "inactive";

  useEffect(() => {
    if (leftLength.current && rightLength.current) {
      right = leftLength.current.offsetWidth - rightLength.current.offsetWidth;
      rightLength.current.style.marginLeft = `${right}px`;
    }
  }, [left]);

  const handleAuth = () => {
    if (!user) {
      const provider = new GoogleAuthProvider();
      signInWithPopup(auth, provider).then(() => {});
    }

    auth.signOut();
  };

  const PictureDrop = forwardRef(({ children, onClick }, ref) => (
    <div
      ref={ref}
      onClick={(e) => {
        e.preventDefault();
        onClick(e);
      }}
    >
      {children}
    </div>
  ));
  return (
    <Navbar expand="lg" fixed="top">
      <Container fluid className="m-2">
        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav" className="justify-content-around">
          <Nav ref={leftLength} className="navbar-nav">
            {left.map((item) => {
              return user ? (
                <Nav.Link as={Link} key={item} to={`/${item}`}>
                  {item}
                </Nav.Link>
              ) : (
                <Nav.Link href={`#${item}`} key={item} className="nav-link">
                  {" "}
                  {item}
                </Nav.Link>
              );
            })}
          </Nav>
          {user ? (
            <Navbar.Brand
              className={`navbar-brand ${navLogoClass}`}
              href="#spellingbe"
              as={Link}
              to="/"
            >
              <b>
                Spelling<span className="text-yellow">BE</span>
              </b>
            </Navbar.Brand>
          ) : (
            <Navbar.Brand
              className={`navbar-brand ${navLogoClass}`}
              href="#spellingbe"
            >
              <b>
                Spelling<span className="text-yellow">BE</span>
              </b>
            </Navbar.Brand>
          )}

          <Nav
            style={{ marginLeft: `${right}px` }}
            ref={rightLength}
            className="navbar-nav"
          >
            <Nav.Link style={{ padding: "0" }}>
              {user ? (
                <>
                  <Dropdown>
                    <Dropdown.Toggle
                      as={PictureDrop}
                      id="dropdown-custom-components"
                    >
                      <Image src={user.photoURL} width="45px" roundedCircle />
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item onClick={handleAuth}>
                        Logout <i className=" bi bi-box-arrow-in-left"></i>
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </>
              ) : (
                <Button onClick={handleAuth} variant="white">
                  Login
                  <i className=" bi bi-box-arrow-in-right"></i>
                </Button>
              )}
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default SpellingBENavbar;
