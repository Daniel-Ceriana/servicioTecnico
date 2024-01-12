import { useEffect } from "react";
import "./nav.css";
import {Link as LinkRouter} from "react-router-dom"
function Nav() {

  useEffect(() => {
  }, []);
  return (
    <div className="Nav">
      <picture><img src="" alt="logo" /></picture>
        <ul>
            <li>Home</li>
            <li>Started tasks</li>
            <li>Done tasks</li>
            <li>Admin Panel</li>
        </ul>
        <div className="dev">
        <LinkRouter to="/signin"><button>Sign In</button></LinkRouter>
        <LinkRouter to="/signup"><button>Sign Up</button></LinkRouter>
        <LinkRouter to="/user/updateUser"><button>updateUser</button></LinkRouter>
        <LinkRouter to="/changeRole"><button>Change role</button></LinkRouter>
        <LinkRouter to="/restorePassword/"><button>Restore password</button></LinkRouter>
        <LinkRouter to="/"><button>Home</button></LinkRouter>
        </div>
        
    </div>
  );
}

export default Nav;
