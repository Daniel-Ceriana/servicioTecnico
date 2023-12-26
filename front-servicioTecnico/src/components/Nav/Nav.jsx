import { useEffect } from "react";
import "./nav.css";
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
        <button>Sign In</button>
        <button>Sign Up</button>
    </div>
  );
}

export default Nav;
