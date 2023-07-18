import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import styles from "../css/Login.module.css";
import "../css/global.css";
import { LoadingSpinner } from "../components/LoadingSpinner";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle, faApple } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope, faUser } from "@fortawesome/free-solid-svg-icons";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

const Login = ({ CheckLocalAuthentication }) => {
  useEffect(() => {
    const isLoggedOut = sessionStorage.getItem("isLoggedOut");
    if (isLoggedOut === "true") {
      toast.success("Successfully logged out!", { autoClose: 3000 });
      sessionStorage.removeItem("isLoggedOut");
    }
  }, []);
  const navigate = useNavigate();
  const { loginWithRedirect } = useAuth0();
  const [account, setAccount] = useState("LogIn");
  const [passwordHidden, setPasswordHidden] = useState(true);
  const [confirmPasswordHidden, setConfirmPasswordHidden] = useState(true);
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const [signUpData, setSignUpData] = useState({
    name: "",
    email: "",
    password: "",
    confirmpassword: "",
  });
  const [loginEmailError, setLoginEmailError] = useState("");
  const [loginPasswordError, setloginPasswordError] = useState("");

  const [signUpNameError, setSignUpNameError] = useState("");
  const [signUpEmailError, setSignUpEmailError] = useState("");
  const [signUpPasswordError, setSignUpPasswordError] = useState("");
  const [signUpConfirmPasswordError, setSignUpConfirmPasswordError] =
    useState("");
  const [loadingSpinner, setLoadingSpinner] = useState(false);
  const [hideEverything, sethideEverything] = useState(true);

  const ToggleAccount = () => {
    if (account === "LogIn") {
      setAccount("SignUp");
      toast("Welcome! Please create an account to continue.");
    } else {
      setAccount("LogIn");
      toast("Welcome back! Please enter your email and password to log in.");
    }
  };

  const togglePasswordVisibility = () => {
    setPasswordHidden(!passwordHidden);
  };
  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordHidden(!confirmPasswordHidden);
  };

  const OnLoginValueChange = (e) => {
    const Name = e.target.name;
    const Value = e.target.value;
    setLoginData((prev) => {
      return {
        ...prev,
        [Name]: Value,
      };
    });
  };
  const OnSignUpValueChange = (e) => {
    const Name = e.target.name;
    const Value = e.target.value;
    setSignUpData((prev) => {
      return {
        ...prev,
        [Name]: Value,
      };
    });
  };

  const SubmitLoginUserData = (e) => {
    e.preventDefault();
    const { email, password } = loginData;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (email === "" || !email.match(emailRegex)) {
      setloginPasswordError("");
      setLoginEmailError("Please enter a valid email address.");
    } else if (
      password === "" ||
      !password.match(passwordRegex) ||
      password.includes("password")
    ) {
      setLoginEmailError("");
      setloginPasswordError("Invalid password format.");
    } else {
      setloginPasswordError("");
      setLoginEmailError("");
      VerifyAuthentication();
    }
  };

  const VerifyAuthentication = () => {
    sethideEverything(false);
    setLoadingSpinner(true);
    setTimeout(() => {
      if (
        loginData.email === signUpData.email &&
        loginData.password === signUpData.password
      ) {
        CheckLocalAuthentication();
        sessionStorage.setItem("isLoggedIn", "true");
        navigate("/dashboard");
        console.log("Successfully login!");
      } else if (
        loginData.email === signUpData.email &&
        loginData.password !== signUpData.password
      ) {
        toast.error("The password you entered is incorrect. Please try again.");
      } else if (
        loginData.email !== signUpData.email &&
        loginData.password === signUpData.password
      ) {
        toast.error("The email you entered is incorrect. Please try again.");
      } else {
        ToggleAccount();
        toast.error("Please create an account before attempting to log in.");
      }
      setLoadingSpinner(false);
      sethideEverything(true);
    }, 3000);
  };
  const LoginWithRedirect = () => {
    loginWithRedirect();
    sessionStorage.setItem("isLoggedIn", "true");
  };

  const SubmitSignUpUserData = async (e) => {
    e.preventDefault();
    const { name, email, password, confirmpassword } = signUpData;
    const nameRegex = /^[A-Za-z\s]+$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (name === "" || !name.match(nameRegex) || name.length < 2) {
      setSignUpEmailError("");
      setSignUpPasswordError("");
      setSignUpConfirmPasswordError("");
      setSignUpNameError("Please enter a valid name");
    } else if (email === "" || !email.match(emailRegex)) {
      setSignUpNameError("");
      setSignUpPasswordError("");
      setSignUpConfirmPasswordError("");
      setSignUpEmailError("Please enter a valid email address.");
    } else if (
      password === "" ||
      !password.match(passwordRegex) ||
      password.includes("password")
    ) {
      setSignUpNameError("");
      setSignUpEmailError("");
      setSignUpConfirmPasswordError("");
      setSignUpPasswordError("Invalid password format.");
    } else if (confirmpassword === "" || confirmpassword !== password) {
      setSignUpNameError("");
      setSignUpEmailError("");
      setSignUpPasswordError("");
      setSignUpConfirmPasswordError("Passwords do not match.");
    } else {
      setSignUpNameError("");
      setSignUpEmailError("");
      setSignUpPasswordError("");
      setSignUpConfirmPasswordError("");
      console.log("Successfully signed up!");
      sethideEverything(false);
      setLoadingSpinner(true);
      setTimeout(() => {
        ToggleAccount();
        setLoadingSpinner(false);
        sethideEverything(true);
        toast.success("Successfully signed up!");
      }, 3000);
    }
  };

  return (
    <>
      {loadingSpinner && <LoadingSpinner />}
      {hideEverything && (
        <>
          <div className={styles.loginContainer}>
            <div className={styles.left}></div>
            <div className={styles.right}>
              {account === "LogIn" ? (
                <div>
                  {/* Heading */}
                  <div>
                    <b className={styles.signInHeading}>Log In</b>
                    <div className={styles.signInSubHeading}>
                      Log in to your account
                    </div>
                  </div>
                  {/* One Tap Login */}
                  <div className={styles.oneTabLogin}>
                    <button
                      className={styles.oneTabLoginBtn}
                      onClick={() => LoginWithRedirect()}>
                      <FontAwesomeIcon
                        icon={faGoogle}
                        className={styles.oneTabLoginIcon}
                      />
                      Sign in with Google
                    </button>
                    <button
                      className={styles.oneTabLoginBtn}
                      onClick={() => LoginWithRedirect()}>
                      <FontAwesomeIcon
                        icon={faApple}
                        className={styles.oneTabLoginIcon}
                      />
                      Sign in with Apple
                    </button>
                  </div>
                  {/* Form Data Card */}
                  <form className={styles.formDataCard}>
                    <div className={styles.emailSubHeading}>Email address</div>
                    <label className={styles.flexRow}>
                      <input
                        type="email"
                        name="email"
                        value={loginData.email}
                        onChange={OnLoginValueChange}
                        placeholder="johndoe@gmail.com"
                        className={styles.emailInput}
                      />
                      <FontAwesomeIcon
                        icon={faEnvelope}
                        className={styles.fontAwesomeIcon}
                      />
                    </label>
                    {loginEmailError && (
                      <span className={styles.displayError}>
                        {loginEmailError}
                      </span>
                    )}
                    <div className={styles.passwordSubHeading}>Password</div>
                    <label className={styles.flexRow}>
                      <input
                        type={passwordHidden ? "password" : "text"}
                        name="password"
                        value={loginData.password}
                        onChange={OnLoginValueChange}
                        placeholder="Password"
                        className={styles.passwordInput}
                      />
                      {passwordHidden ? (
                        <FontAwesomeIcon
                          icon={faEyeSlash}
                          className={styles.fontAwesomeIcon}
                          onClick={() => togglePasswordVisibility()}
                        />
                      ) : (
                        <FontAwesomeIcon
                          icon={faEye}
                          className={styles.fontAwesomeIcon}
                          onClick={() => togglePasswordVisibility()}
                        />
                      )}
                    </label>
                    {loginPasswordError && (
                      <span className={styles.displayError}>
                        {loginPasswordError}
                      </span>
                    )}
                    <div
                      className={styles.forgotPassword}
                      onClick={() => ToggleAccount()}>
                      Forgot password?
                    </div>
                    {/* Log In Button */}
                    <button
                      className={styles.signBtn}
                      onClick={SubmitLoginUserData}>
                      Log In
                    </button>
                  </form>
                  {/* Sign In Toggle */}
                  <div className={styles.DontHaveAnAccount}>
                    Don’t have an account?
                    <span
                      className={styles.register}
                      onClick={() => ToggleAccount()}>
                      Sign Up
                    </span>
                  </div>
                </div>
              ) : (
                <div>
                  {/* Heading */}
                  <div>
                    <b className={styles.signInHeading}>Sign In</b>
                    <div className={styles.signInSubHeading}>
                      Sign in to your account
                    </div>
                  </div>
                  {/* Form Data Card */}
                  <form className={styles.signUpFormDataCard}>
                    <div className={styles.nameSubHeading}>Name</div>
                    <label className={styles.flexRow}>
                      <input
                        type="text"
                        name="name"
                        value={signUpData.name}
                        onChange={OnSignUpValueChange}
                        placeholder="John Doe"
                        className={styles.nameInput}
                      />
                      <FontAwesomeIcon
                        icon={faUser}
                        className={styles.fontAwesomeIcon}
                      />
                    </label>
                    {signUpNameError && (
                      <span className={styles.displayError}>
                        {signUpNameError}
                      </span>
                    )}
                    <div className={styles.emailSubHeading}>Email address</div>
                    <label className={styles.flexRow}>
                      <input
                        type="email"
                        name="email"
                        value={signUpData.email}
                        onChange={OnSignUpValueChange}
                        placeholder="johndoe@gmail.com"
                        className={styles.emailInput}
                      />
                      <FontAwesomeIcon
                        icon={faEnvelope}
                        className={styles.fontAwesomeIcon}
                      />
                    </label>
                    {signUpEmailError && (
                      <span className={styles.displayError}>
                        {signUpEmailError}
                      </span>
                    )}
                    <div className={styles.passwordSubHeading}>Password</div>
                    <label className={styles.flexRow}>
                      <input
                        type={passwordHidden ? "password" : "text"}
                        name="password"
                        value={signUpData.password}
                        onChange={OnSignUpValueChange}
                        placeholder="Password"
                        className={styles.passwordInput}
                      />
                      {passwordHidden ? (
                        <FontAwesomeIcon
                          icon={faEyeSlash}
                          className={styles.fontAwesomeIcon}
                          onClick={() => togglePasswordVisibility()}
                        />
                      ) : (
                        <FontAwesomeIcon
                          icon={faEye}
                          className={styles.fontAwesomeIcon}
                          onClick={() => togglePasswordVisibility()}
                        />
                      )}
                    </label>
                    {signUpPasswordError && (
                      <span className={styles.displayError}>
                        {signUpPasswordError}
                      </span>
                    )}
                    <div className={styles.passwordSubHeading}>
                      Confirm Password
                    </div>
                    <label className={styles.flexRow}>
                      <input
                        type={confirmPasswordHidden ? "password" : "text"}
                        name="confirmpassword"
                        value={signUpData.confirmpassword}
                        onChange={OnSignUpValueChange}
                        placeholder="Confirm Password"
                        className={styles.passwordInput}
                      />
                      {confirmPasswordHidden ? (
                        <FontAwesomeIcon
                          icon={faEyeSlash}
                          className={styles.fontAwesomeIcon}
                          onClick={() => toggleConfirmPasswordVisibility()}
                        />
                      ) : (
                        <FontAwesomeIcon
                          icon={faEye}
                          className={styles.fontAwesomeIcon}
                          onClick={() => toggleConfirmPasswordVisibility()}
                        />
                      )}
                    </label>
                    {signUpConfirmPasswordError && (
                      <span className={styles.displayError}>
                        {signUpConfirmPasswordError}
                      </span>
                    )}
                    {/* Sign In Button */}
                    <button
                      className={styles.signBtn}
                      onClick={SubmitSignUpUserData}>
                      Sign In
                    </button>
                  </form>
                  {/* Login Toggle */}
                  <div className={styles.DontHaveAnAccount}>
                    Already have an account?
                    <span
                      className={styles.register}
                      onClick={() => ToggleAccount()}>
                      Log In
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </>
      )}
      <ToastContainer />
    </>
  );
};

export { Login };
