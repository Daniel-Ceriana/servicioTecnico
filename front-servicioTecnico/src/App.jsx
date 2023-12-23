import "./styles/App.css";

// import Footer from "./components/navBar/footer";
import { Routes, Route } from "react-router-dom";
import Landing from "./components/Landing/Landing";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import Nav from "./components/Nav/Nav"
// import Footer from "./components/Footer/Footer";
import { useEffect } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { verifyToken } from "./redux/actions/userActions";

function App() {
  // const user = useSelector((store) => store.user);
  // const dispatch = useDispatch();
  useEffect(() => {
    // const userToken = localStorage.getItem("token");
    // if (userToken) {
    //   dispatch(verifyToken(userToken));
    // } else {
    //   console.log("no hay token");
    // }
    // eslint-disable-next-line
  }, []);
  return (
    <div className="App">
      {" "}
      {/* <Nav /> */}
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



