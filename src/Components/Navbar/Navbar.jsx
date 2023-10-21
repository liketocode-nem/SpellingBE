import { useRef, useEffect, useState, forwardRef } from "react";
import {
  Navbar,
  Nav,
  Container,
  Button,
  Image,
  Dropdown,
  Form,
  ProgressBar,
} from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import "./navbar.css";

import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useSessionStorage } from "@uidotdev/usehooks";
import { useNavigate } from "react-router-dom";
import { collection, addDoc } from "firebase/firestore";

//weird name because of bootstrap navbar
function SpellingBENavbar({ auth, user, firestore }) {
  const analyticsRef = collection(firestore, "analytics");
  const [data, setData] = useSessionStorage("data", []);
  const [percent, setPercent] = useSessionStorage("percent", []);
  const [titles, setTitles] = useSessionStorage("titles", []);

  const leftLength = useRef(null); // getting a ref to change the margin of elements
  const rightLength = useRef(null);

  let right = null;
  const navLogoClass = user ? "" : "inactive";

  let [left, setLeft] = useState([]);

  let location = useLocation();

  const [rate, setRate] = useSessionStorage("rate", 1); // Initial slider value
  const thumbPosition = rate - 1; // Calculate thumb position as a percentage

  const thumb = {
    "--thumb-position": `${thumbPosition}`,
  };

  const [wordsLength, setWordsLength] = useSessionStorage("wordsLength", []);
  const [count, setCount] = useSessionStorage("c", 0);
  const [testing, setTesting] = useSessionStorage("testing", false);
  const navigate = useNavigate();
  useEffect(() => {
    // changing the left side of nav depending on page

    if (location.pathname == "/") {
      setTesting(false);
      setLeft(
        user
          ? ["Lists", "Analytics", "Sharing"]
          : ["About", "Features", "Get Started"]
      );
      document.title = user ? "SpellingBE - Home" : "SpellingBE";
    } else if (location.pathname == "/Lists") {
      if (!user) {
        navigate("/");
      }

      setLeft(["Lists", "Analytics", "Sharing"]);
      document.title = "SpellingBE - Lists";
    } else if (location.pathname == "/Analytics") {
      if (!user) {
        navigate("/");
      }

      document.title = "SpellingBE - Analytics";
      setLeft(["Lists", "Analytics", "Sharing"]);
    } else if (location.pathname == "/test") {
      if (!user) {
        navigate("/");
      }
      document.title = "SpellingBE - Test";

      setLeft([`${count + 1}/${wordsLength}`]);
    } else if (location.pathname == "/end") {
      setTesting(false);
      if (!user) {
        navigate("/");
      }
      document.title = "SpellingBE - End";
      setLeft(["Lists", "Analytics", "Sharing"]);
    } else if (location.pathname == "/Sharing") {
      setTesting(false);
      if (!user) {
        navigate("/");
      }
      document.title = "SpellingBE | Sharing";
      setLeft(["Lists", "Analytics", "Sharing"]);
    }
  }, [location, user]);

  useEffect(() => {
    if (testing) {
      setLeft([`${Math.min(count + 1, wordsLength)}/${wordsLength}`]); // word number is correct and not too high
    }
  }, [count]);

  useEffect(() => {
    if (leftLength.current && rightLength.current) {
      // making sure both sides of nav are even so logo is centred
      right = leftLength.current.offsetWidth - rightLength.current.offsetWidth;
      rightLength.current.style.marginLeft = `${right}px`;
    }
  }, [left]);

  const handleAuth = () => {
    if (!user) {
      const provider = new GoogleAuthProvider();
      provider.setCustomParameters({
        prompt: "select_account",
      });
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

  const handleData = async () => {
    await addDoc(analyticsRef, {
      data: data,
      percent: percent,
      uid: user.uid,
      time: new Date(),
      titles: titles,
    });
  };

  return (
    <Navbar expand="lg" fixed="top">
      <Container fluid className="m-2">
        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav" className="justify-content-around">
          <Nav ref={leftLength} className="navbar-nav">
            {left.map((item, i) => {
              // displaying the left side of navbar

              return user ? (
                testing ? ( // testing or no
                  <div key={i}>{item}</div> // not a Nav.Link bc you shouldn't be able to click
                ) : (
                  <Nav.Link as={Link} key={i} to={`/${item}`}>
                    {item}
                  </Nav.Link>
                )
              ) : (
                <Nav.Link href={`#${item}`} key={item} className="nav-link">
                  {" "}
                  {item}
                </Nav.Link>
              );
            })}
          </Nav>
          {user ? ( // is there a user signed in
            <Navbar.Brand
              className={`navbar-brand ${navLogoClass}`}
              href="#spellingbe"
              as={Link}
              to={testing ? "/end" : "/"}
              onClick={
                testing
                  ? () => {
                      handleData();
                    }
                  : null
              }
            >
              <b>
                {testing ? (
                  "End"
                ) : (
                  <>
                    Spelling<span className="text-yellow">BE</span>
                  </>
                )}
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
            {testing ? (
              <>
                <Form.Range
                  style={thumb}
                  min="1"
                  max="2"
                  step=".1"
                  value={rate}
                  onChange={(e) => {
                    setRate(e.target.value);
                  }}
                />
              </>
            ) : (
              <Nav.Link style={{ padding: "0" }}>
                {user ? (
                  <>
                    <Dropdown>
                      <Dropdown.Toggle as={PictureDrop}>
                        <Image src={user.photoURL} width="50px" roundedCircle />{" "}
                        {/*old 45 */}
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
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default SpellingBENavbar;
