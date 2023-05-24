import { Box, Button, Card, CardBody } from "@chakra-ui/react";
import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { auth, db } from "../Firebase/Config";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import "./Success.css";
const Success = () => {
  const [allData, setAllData] = useState({});

  const navigate = useNavigate();
  const handleLogout = async (e) => {
    e.preventDefault();
    await signOut(auth);
    localStorage.removeItem("email");
    navigate("/", { replace: true });
  };

  const getDetails = async () => {
    const docRefs = doc(db, "users", auth.currentUser.uid);
    const docSnap = await getDoc(docRefs);
    if (docSnap.exists()) {
      setAllData(docSnap.data());
    }
  };
  useEffect(() => {
    getDetails();
  }, []);

  return (
    <React.Fragment>
      <div className="success__top">
        <div className="success">
          <div className="success__content">
            <Card maxW={"md"} className="card__background">
              <CardBody>
                <p>
                  Congratulations {allData.fullname} you have securely signed in
                  to CET324 Assignments 2
                </p>
              </CardBody>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  marginBottom: "10px",
                }}
              >
                <Button
                  variant={"outline"}
                  colorScheme="twitter"
                  onClick={handleLogout}
                >
                  Logout
                </Button>
              </Box>
            </Card>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Success;
