import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./Home/Home";
import Protectedroute from "./ProtectedRouth/Protectedroute";
import Success from "./Success/Success";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/protected" element={<Protectedroute />}>
          <Route path="/protected/success" element={<Success />} />
        </Route>
      </Routes>
      <ToastContainer position="top-left" theme="dark" />
    </>
  );
}

export default App;
