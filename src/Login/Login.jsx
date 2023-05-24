/* eslint-disable react/no-unescaped-entities */
import React, { useState, useEffect, useRef } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate, useLocation, Link } from "react-router-dom";
import {
  isSignInWithEmailLink,
  sendSignInLinkToEmail,
  signInWithEmailLink,
} from "firebase/auth";
import { Box, Button, Input } from "@chakra-ui/react";
import ReCAPTCHA from "react-google-recaptcha";
import { auth } from "../Firebase/Config";
import "./Login.css";
// eslint-disable-next-line react/prop-types
const Login = ({ setHide, setShow }) => {
  const [email, setEmail] = useState("");
  const [user] = useAuthState(auth);
  const navigate = useNavigate();
  const location = useLocation();
  const { search } = location;

  const [loginLoading, setLoginLoading] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [infoMsg, setInfoMsg] = useState("");
  const [initialLoading, setInitialLoading] = useState(false);
  const [initialError, setInitialError] = useState("");
  const [token, setToken] = useState(false);
  const captchaRef = useRef(null);

  function onChange(value) {
    setToken(value);
  }

  const handleShow = () => {
    setShow(false);
    setHide(true);
  };
  useEffect(() => {
    if (user) {
      // user is already signed in
      // navigate("/protected/welcome");
    } else {
      // user is not signed in but the link is valid
      if (isSignInWithEmailLink(auth, window.location.href)) {
        // now in case user clicks the email link on a different device, we will ask for email confirmation
        let email = localStorage.getItem("email");
        if (!email) {
          email = window.prompt("Please provide your email");
        }
        // after that we will complete the login process
        setInitialLoading(true);
        signInWithEmailLink(
          auth,
          localStorage.getItem("email"),
          window.location.href
        )
          .then((result) => {
            // we can get the user from result.user but no need in this case
            console.log(result.user);
            localStorage.removeItem("email");
            setInitialLoading(false);
            setInitialError("");
            navigate("/protected/success");
          })
          .catch((err) => {
            setInitialLoading(false);
            setInitialError(err.message);
            navigate("/protected/success");
          });
      } else {
        // console.log("enter email and sign in");
        // captchaRef.current.reset();
      }
    }
  }, [user, search, navigate]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoginLoading(true);
    sendSignInLinkToEmail(auth, email, {
      url: "https://neyo-cybersecurity.netlify.app/protected/success",
      handleCodeInApp: true,
    })
      .then(() => {
        localStorage.setItem("email", email);
        setLoginLoading(false);
        setLoginError("");
        setInfoMsg("We have sent a link to your email to sign in");
        e.target.reset();
      })
      .catch((err) => {
        setLoginLoading(false);
        if (err.code === "auth/quota-exceeded") {
          setLoginError("You have exceeded daily quota for email sign-in.");
        }
      });
  };
  return (
    <React.Fragment>
      <div className="login">
        <div className="login__content">
          <div className="login__card">
            <div className="box">
              {initialLoading ? (
                <div>Loading...</div>
              ) : (
                <>
                  {initialError !== "" ? (
                    <div className="error-msg">{initialError}</div>
                  ) : (
                    <>
                      <div className="form">
                        <div className="form__content">
                          <h2>Login here</h2>
                          <form onSubmit={handleSubmit}>
                            <label>Email</label>
                            <Input
                              type={"email"}
                              required
                              variant="outline"
                              placeholder="Enter Email"
                              value={email || ""}
                              onChange={(e) => setEmail(e.target.value)}
                            />
                            <label>Password</label>
                            <Input
                              type="password"
                              required
                              name="password"
                              variant="outline"
                              placeholder="Enter Password"
                            />
                            <div className="captacha">
                              <ReCAPTCHA
                                sitekey="6LcNaTQmAAAAAAkBu0T5UaCjw80KLGQo6XBEJK_3"
                                onChange={onChange}
                                ref={captchaRef}
                              />
                            </div>

                            <Box sx={{ pt: "20px", textAlign: "center" }}>
                              {token ? (
                                <Button
                                  type="submit"
                                  variant={"solid"}
                                  colorScheme="twitter"
                                >
                                  {loginLoading ? (
                                    <span>Logging you in</span>
                                  ) : (
                                    <span>Login</span>
                                  )}
                                </Button>
                              ) : (
                                <Button
                                  type="submit"
                                  variant={"ghost"}
                                  colorScheme="twitter"
                                >
                                  Login
                                </Button>
                              )}
                            </Box>
                            {loginError !== "" && (
                              <div className="error-msg">{loginError}</div>
                            )}
                            {infoMsg !== "" && (
                              <div className="info-msg">{infoMsg}</div>
                            )}
                          </form>
                        </div>
                      </div>
                    </>
                  )}
                </>
              )}
            </div>
          </div>
          <div
            className="already"
            style={{ marginTop: "10px", textAlign: "center" }}
          >
            Don't have an account ? <Link onClick={handleShow}>Register</Link>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Login;
