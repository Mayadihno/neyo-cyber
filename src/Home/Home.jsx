import { Box, Button, Card, CardBody } from "@chakra-ui/react";
import React, { useState } from "react";
import "./Home.css";
import Register from "../Register/Register";
const Home = () => {
  const [show, setShow] = useState(false);
  return (
    <React.Fragment>
      <div className="home">
        <div className="home__content">
          <div className="home__card">
            <Card maxW={"md"} className="card__background">
              <CardBody>
                <h2>The University of Sunderland</h2>
                <h4>
                  CET324 Advanced Cyber Security Assignment 2
                  <span> By: Olaniyi Olatunji Salami</span>
                </h4>
                <Box sx={{ display: "flex", justifyContent: "center" }}>
                  <Button
                    variant={"solid"}
                    colorScheme="twitter"
                    onClick={() => setShow(!show)}
                  >
                    Click here to register/log in
                  </Button>
                </Box>
              </CardBody>
              {show && <Register />}
            </Card>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Home;
