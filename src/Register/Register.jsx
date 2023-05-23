import React, { useRef, useState } from "react";
import "./Register.css";
import { Box, Button, Input } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import zxcvbn from "zxcvbn";
import ReCAPTCHA from "react-google-recaptcha";
import Login from "../Login/Login";
import { auth, db } from "../Firebase/Config";

const Register = () => {
  const [change, setChange] = useState("");
  const [show, setShow] = useState(false);
  const [hide, setHide] = useState(true);
  const [msg, setMsg] = useState("");
  const [score, setScore] = useState("null");
  const [token, setToken] = useState(false);
  const captchaRef = useRef(null);

  function onChange(value) {
    setToken(value);
  }
  const handleChange = (e) => {
    const newInput = { [e.target.name]: e.target.value };
    setChange({ ...change, ...newInput });
    if (e.target.value !== "") {
      const formDataCopy = { ...change };
      let pass = zxcvbn(formDataCopy.password);
      setScore(pass.score);
    } else {
      setScore(0);
    }
    if (score === 0) {
      setMsg("Poor ");
    } else if (score === 1) {
      setMsg("Weak ");
    } else if (score === 2) {
      setMsg("Good ");
    } else if (score === 3) {
      setMsg("Very Good");
    } else if (score === 4) {
      setMsg("Excellent");
    }
  };

  const { password, fullname, email, phoneNumber } = change;

  const handleClick = () => {
    setShow(true);
    setHide(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const users = await createUserWithEmailAndPassword(auth, email, password);
      updateProfile(auth.currentUser, {
        displayName: fullname,
        PhoneNumber: phoneNumber,
        Email: email,
      });

      const usersData = users.user;
      const formDataCopy = { ...change, score: score };
      delete formDataCopy.password;
      delete formDataCopy.confirm;
      formDataCopy.timestamp = serverTimestamp();

      await setDoc(doc(db, "users", usersData.uid), formDataCopy);
      toast.success("You have successfull create account");
      e.target.reset();
      setShow(true);
      setHide(false);
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        toast.error("Email have already been used");
        console.log(error);
      } else if (error.code === "auth/weak-password") {
        toast.warning("Password should be more than 6 letters");
      } else {
        toast.error("Something went wrong");
        console.log(error.message);
      }
    }
  };
  return (
    <React.Fragment>
      {hide && (
        <div className="register">
          <div className="rgister__content">
            <div className="register__card">
              <h2>Register here</h2>
              <form onSubmit={handleSubmit}>
                <div className="name">
                  <label htmlFor="name">Username:</label>
                  <Input
                    type="text"
                    placeholder="Username"
                    id="name"
                    size="md"
                    name="fullname"
                    variant="outline"
                    required
                    onChange={handleChange}
                  />
                </div>
                <div className="email">
                  <label htmlFor="email">Email</label>
                  <Input
                    type="email"
                    placeholder="Email"
                    id="email"
                    name="email"
                    size="md"
                    variant="outline"
                    required
                    onChange={handleChange}
                  />
                </div>
                <div className="password">
                  <label htmlFor="password">Password</label>
                  <Input
                    type="password"
                    placeholder="Password"
                    id="password"
                    name="password"
                    required
                    onChange={handleChange}
                    size="md"
                    variant="outline"
                  />
                </div>
                <span className="password_strength">
                  Password Strength: {msg.toUpperCase()}
                </span>
                <div className="box__center">
                  <span className="caution">
                    Password Must be 8-16 characters and contain
                    uppercase/lowecase letters,digits and symbols
                  </span>
                  <div className="captacha">
                    <ReCAPTCHA
                      sitekey="6LcNaTQmAAAAAAkBu0T5UaCjw80KLGQo6XBEJK_3"
                      onChange={onChange}
                      ref={captchaRef}
                    />
                  </div>
                  <Box sx={{ pt: "10px" }}>
                    {token ? (
                      <Button
                        type="submit"
                        variant={"solid"}
                        colorScheme="facebook"
                      >
                        Sign Up
                      </Button>
                    ) : (
                      <Button variant={"ghost"} colorScheme="linkedin">
                        Sign Up
                      </Button>
                    )}
                  </Box>
                </div>
              </form>
              <div className="already">
                <p>
                  Already have an account?
                  <Link onClick={handleClick}>log in</Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
      {show && <Login />}
    </React.Fragment>
  );
};

export default Register;
