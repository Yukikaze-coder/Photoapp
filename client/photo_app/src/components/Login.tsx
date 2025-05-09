import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

interface LoginProps {
  setStatusMessage: (message: string) => void;
  setLoginToken: (token: string) => void;
  loginToken: string;
  handleLogout: () => void;
}

const Login: React.FC<LoginProps> = ({
  setStatusMessage,
  setLoginToken,
  loginToken,
  handleLogout,
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignup, setIsSignup] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    setStatusMessage("aaaaaaaaarghhh");

    e.preventDefault();
    if (isSignup) {
      // manage the user creation (email, password)
      const req = await fetch("http://127.0.0.1:3000/api/signup", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
          name: "batman",
        }),
      });
      const resp = await req.json();
      if (resp.resultCode !== 1) {
        setStatusMessage("Account creation failed: ");
      } else {
        // setLoginToken(resp.token);
        setStatusMessage("Account created");
      }
      console.log("response from signup api: ", resp);
    } else {
      // manage the use login (email, password)
      const req = await fetch("http://127.0.0.1:3000/api/login", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });
      const resp = await req.json();
      if (resp.resultCode !== 1) {
        setStatusMessage("login failed !");
      } else {
        setLoginToken(resp.token);
        setStatusMessage("Logged IN !");
        if (rememberMe) {
          localStorage.setItem("loginToken", resp.token);
        }
      }
      console.log("response from login api: ", resp);
    }
  };

  const handleLogoutClick = () => {
    handleLogout();
    navigate("/login"); // Redirect to /login after logout
  };

  return (
    <div className={loginToken.length > 0 ? "auth-form" : "auth-form"}>
      {loginToken.length > 0 ? (
        <button
          onClick={handleLogoutClick}
          className="navbar-btn"
          style={{ marginBottom: "1em" }}
        >
          Log out
        </button>
      ) : (
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="navbar-input"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="navbar-input"
            required
          />
          <input
            type="checkbox"
            checked={rememberMe}
            onChange={() => setRememberMe(!rememberMe)}
            id="rememberMe"
          />
          <label htmlFor="rememberMe">Remember me</label>
          <button type="submit" className="navbar-btn">
            {isSignup ? "Create Account" : "Log In"}
          </button>
        </form>
      )}
      <button
        className="button-signup"
        onClick={() => setIsSignup(!isSignup)}
        disabled={loginToken.length > 0}
      >
        {isSignup ? "Log in instead" : "No account ? click to sign up"}
      </button>
    </div>
  );
};

export default Login;
