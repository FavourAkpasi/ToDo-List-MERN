import FactCheckOutlinedIcon from "@mui/icons-material/FactCheckOutlined";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Heading from "./Heading";
import React from "react";
import axios from "axios";
import { useGlobalContext } from "../context/GlobalContext";
import { useNavigate } from "react-router-dom";

function Authentication({ register }) {
  const { getCurrentUser, user } = useGlobalContext();
  const navigate = useNavigate();
  const [email, setEmail] = React.useState("");
  const [name, setName] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState();
  const [loading, setLoading] = React.useState(false);
  const [errors, setErrors] = React.useState({});

  React.useEffect(() => {
    if (user && navigate) {
      navigate("/dashboard");
    }
  }, [user, navigate]);

  const onSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    let data = {};

    if (register) {
      data = {
        name,
        email,
        password,
        confirmPassword,
      };
    } else {
      data = {
        email,
        password,
      };
    }
    axios
      .post(register ? "/api/auth/register" : "/api/auth/login", data)
      .then(() => {
        getCurrentUser();
      })
      .catch((err) => {
        setLoading(false);
        if (err?.response?.data) {
          setErrors(err.response.data);
        }
      });
  };

  return (
    <div className="auth container">
      <Heading />
      <h2>{register ? "Register" : "Login"}</h2>
      <form onSubmit={onSubmit}>
        {register && (
          <div className="field">
            <TextField
              required
              size="small"
              id="outlined-required"
              label="Name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              helperText={errors.name}
            />
          </div>
        )}
        <div className="field">
          <TextField
            required
            size="small"
            id="outlined-required"
            label="Email"
            type="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            helperText={errors.email}
          />
        </div>
        <div className="field">
          <TextField
            required
            size="small"
            id="outlined-password-input"
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            helperText={register ? errors.password : errors.error}
          />
        </div>
        {register && (
          <div className="field">
            <TextField
              required
              size="small"
              id="outlined-password-required"
              label="Confirm Password"
              type="Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              helperText={errors.password}
            />
          </div>
        )}
        <div className="field">
          <Button
            variant="outlined"
            color="inherit"
            type="submit"
            disabled={loading}
          >
            {register ? "RGISTER" : "LOGIN"}
          </Button>
        </div>
      </form>
    </div>
  );
}

export default Authentication;
