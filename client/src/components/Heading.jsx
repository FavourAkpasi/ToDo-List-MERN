import Button from "@mui/material/Button";
import LogoutIcon from "@mui/icons-material/Logout";
import LoginIcon from "@mui/icons-material/Login";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import { Link, useLocation } from "react-router-dom";
import { useGlobalContext } from "../context/GlobalContext";

function Heading() {
  const { user, logout } = useGlobalContext();
  const { pathname } = useLocation();

  return (
    <div className="header">
      <div className="heading">
        <h1>To-Do List</h1>
      </div>
      <div className="btn-group">
        {user ? (
          <div className="btn">
            <Button
              onClick={logout}
              color="inherit"
              size="small"
              variant="outlined"
              endIcon={<LogoutIcon />}
            >
              Logout
            </Button>
          </div>
        ) : pathname === "/" ? (
          <Link className="btn" to="/register">
            <Button
              color="inherit"
              size="small"
              variant="outlined"
              startIcon={<PersonAddAltIcon />}
            >
              Register
            </Button>
          </Link>
        ) : (
          <Link className="btn" to="/">
            <Button
              color="inherit"
              size="small"
              variant="outlined"
              startIcon={<LoginIcon />}
            >
              login
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
}

export default Heading;
