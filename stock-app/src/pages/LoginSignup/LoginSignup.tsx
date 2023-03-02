import React, { FC, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch } from "../../redux/Store";
import axios from "axios";
import { LOGIN } from "../../redux/userSlice";
import "./Login.css";
import * as yup from "yup";

const LoginSignup: FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const userParams = useRef({
    firstName: "",
    lastName: "",
    password: "",
    copassword: "",
    email: "",
  });
  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    password: "",
    copassword: "",
    email: "",
  });

  //@ts-ignore
  const handleChange = (e) => {
    //@ts-ignore
    userParams.current[e.target.id] = e.target.value;
  };

  const validationSchema = yup.object().shape({
    firstName: yup
      .string()
      .required("Please enter first name")
      .min(2, "not enough letters!"),
    lastName: yup
      .string()
      .required("Please enter last name")
      .min(2, "not enough letters!"),
    email: yup.string().email("invalid email").required("Required"),
    password: yup
      .string()
      .min(6, "password must contain at least 6 letter")
      .required("Please enter password"),
    copassword: yup
      .string()
      .oneOf([yup.ref("password")], "The password verification does not match")
      .required("Please enter confirm password"),
  });

  const handleSubmit = async () => {
    try {
      if (params.is == "login") {
        const res = await axios.post(
          `http://localhost:${process.env.REACT_APP_URL}/user/login`,
          {
            email: userParams.current.email,
            password: userParams.current.password,
          }
        );
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("name", res.data.user.userName);
        const redux_promiss = () => {
          return new Promise((resolve) => {
            dispatch(
              LOGIN({
                name: res.data.user.userName,
                token: res.data.token,
              })
            );
            resolve("resolved");
          });
        };
        await redux_promiss();
        navigate("/");
      } else {
        setErrors({
          firstName: "",
          lastName: "",
          password: "",
          copassword: "",
          email: "",
        });

        await validationSchema
          .validate(userParams.current, { abortEarly: false })
          .then(async () => {
            try {
              await axios
                .post(
                  `http://localhost:${process.env.REACT_APP_URL}/user/register`,
                  userParams.current
                )
                .then(async (res) => {
                  localStorage.setItem("token", res.data.token);
                  localStorage.setItem("name", res.data.user.userName);
                  const redux_promiss = () => {
                    return new Promise((resolve) => {
                      dispatch(
                        LOGIN({
                          name: res.data.user.userName,
                          token: res.data.token,
                        })
                      );
                      resolve("resolved");
                    });
                  };
                  await redux_promiss();
                  navigate("/");
                });
            } catch (err) {
              console.log(err);
            }
          })
          .catch((err) => {
            
            
            //@ts-ignore
            err.inner.forEach((e) => {
              //@ts-ignore
            console.log(e);
              setErrors((prev) => ({
                ...prev,
                [e.path]: e.message,
              }));
            });
          });
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="LoginContainer">
      <div id="login" className="login-form-container">
        <header>{params.is == "login" ? "LOGIN" : "SIGN UP"}</header>
        <fieldset>
          <div className="input-wrapper">
            <input
              type="text"
              id="email"
              placeholder="your@email.com"
              onChange={handleChange}
            />
          </div>
          {errors.email !== null && <p>{errors.email}</p>}
          <div className="input-wrapper">
            <input
              type="password"
              id="password"
              placeholder="password"
              onChange={handleChange}
            />
          </div>
          {errors.password !== null && <p>{errors.password}</p>}
          {params.is == "signin" ? (
            <>
              <div className="input-wrapper">
                <input
                  type="password"
                  id="copassword"
                  placeholder="confirm password"
                  onChange={handleChange}
                />
              </div>
              {errors.copassword !== null && <p>{errors.copassword}</p>}
              <div className="input-wrapper">
                <input
                  type="text"
                  id="firstName"
                  placeholder="first name"
                  onChange={handleChange}
                />
              </div>
              {errors.firstName !== null && <p>{errors.firstName}</p>}
              <div className="input-wrapper">
                <input
                  type="text"
                  id="lastName"
                  placeholder="last name"
                  onChange={handleChange}
                />
              </div>
              {errors.lastName !== null && <p>{errors.lastName}</p>}
            </>
          ) : null}
          <button id="continue" type="button" onClick={handleSubmit}>
            <b>CONTINUE</b>
          </button>
        </fieldset>
      </div>
    </div>
  );
};

export default LoginSignup;
