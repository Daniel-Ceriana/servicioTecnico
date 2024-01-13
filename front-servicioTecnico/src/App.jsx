import "./styles/App.css";

// import Footer from "./components/navBar/footer";
import { Routes, Route } from "react-router-dom";
import Landing from "./components/Landing/Landing";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Nav from "./components/Nav/Nav"
// import Footer from "./components/Footer/Footer";
import { useEffect } from "react";
import SignUp from "./components/User/SignUp/SignUp";
import SignIn from "./components/User/SignIn/SignIn";
import RestorePassword from "./components/User/RestorePassword/RestorePassword";
import UpdateUser from "./components/User/UpdateUser/UpdateUser";
import RestorePasswordTEST from "./components/User/RestorePassword/RestorePasswordStep1Test";
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
        <Route path="/SignUp" element={<SignUp />} />{" "}
        <Route path="/SignIn" element={<SignIn />} />{" "}
        {/* step 1 de restore Password (para test, BORRAR) */}
        <Route path="/restorePassword" element={<RestorePasswordTEST />} />{" "}
        {/* user tiene que existir, tiene que haber mandado solicitud para restorePassword */}
        <Route path="/restorePassword/:uniqueString" element={<RestorePassword />} />{" "}
        {/* user tiene que existir */}
        <Route path="/user/updateUser" element={<UpdateUser />} />{" "}

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



