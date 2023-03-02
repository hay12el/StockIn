// import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/Store";
import { LOGOUT } from "../../redux/userSlice";
import bit from "../../utils/bit.png";

import "./navbar.css";

const NavBar = () => {
  const user = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(LOGOUT());
    navigate("/");
  };

  const handleClick = (e) => {
    navigate(`loginsignup/${e.target.id}`);
  };

  return (
    <div className="container">
      <div className="navContainer">
        <img
          className="logo"
          src={bit}
          alt="logo"
          onClick={() => navigate("/")}
        />
        <div className="buttons">
          {user.name !== "" ? (
            <div>
              <button className="btn" onClick={() => navigate('/MyStock')}>My Account</button>
              <button className="btn" onClick={handleLogout}>
                Log Out
              </button>
            </div>
          ) : (
            <div>
              <button className="btn" id="signin" onClick={handleClick}>
                Sign In
              </button>
              <button className="btn" id="login" onClick={handleClick}>
                Log In
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NavBar;
