import "./styles/App.css";

// import Footer from "./components/navBar/footer";
import { Routes, Route } from "react-router-dom";
import Landing from "./components/Landing/Landing";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Nav from "./components/Nav/Nav"
// import Footer from "./components/Footer/Footer";
import { useEffect } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { verifyToken } from "./redux/actions/userActions";

function App() {

  useEffect(() => {

    // eslint-disable-next-line
  }, []);
  return (
    <div className="App">
      {" "}
      <Nav />
      <Routes>
        {" "}
        <Route path="*" element={<Landing />} />{" "}
      </Routes>{" "}
      {/* <Footer /> */}
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </div>
  );
}

export default App;



