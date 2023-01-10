import React, { useEffect, useState } from 'react';
import Styles from "./Login.module.css";
import { data } from 'autoprefixer';
import axios from 'axios';
import { Route, Redirect } from "react-router-dom";
import logo from '../../images/logo-black-rock.png'

const Login = () => {
  const [data, setData] = useState({ email: "", password: "" });
  const [notif, setNotif] = useState(false);

  const onChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  }

  const onClick = async () => {
    console.log(data)

    await axios.post('https://localhost:8080/api/admin', data).then(
      (response) => {
        localStorage.setItem("user", response.data)
        localStorage.setItem("jwt", response.data.jwt)
        localStorage.setItem("page", "users")
        window.location.href = "/users";
      })
      .catch(error => {
        setNotif(true)
        console.error(error.message)
      });
  }

  useEffect(() => {
    if (localStorage.getItem("jwt")) {
      // redirect si la personne est déjà connecté par la verification du JWT
      window.location.href = "/" + localStorage.getItem("page");
    }
  })

  return (
    <div className={Styles.Login}>
      {localStorage.getItem("jwt") ?
        window.location = "/"
        : ""
      }
      <div className="text-center">
        <img src={logo} alt=""  className={Styles.Black}  />
      </div>
      <div className="container mx-auto px-4 h-full">
        <div className="flex content-center items-center justify-center h-full">
          <div className="w-full lg:w-4/12 px-4">
            <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0">
              <div className="rounded-t mb-0 px-6 py-6 bg-white">
                <div className="text-center mb-3" style={{background:"white"}}>
                  <h6 className="text-blueGray-500 text-sm font-bold">
                    Connexion admin
                  </h6>
                </div>
                <hr className="mt-6 border-b-1 border-blueGray-300" />
              </div>
              <div className="flex-auto px-4 lg:px-10 py-10 pt-0 bg-white">
                <div className="text-blueGray-400 text-center mb-3 font-bold">
                </div>
                <form>
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlhtmlFor="grid-password"
                    >
                      Pseudo
                    </label>
                    <input
                      onChange={(e) => onChange(e)} name="email" id="email"
                      
                      type="email"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="Email"
                    />
                  </div>

                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlhtmlFor="grid-password"
                    >
                      Mot de passe
                    </label>
                    <input
                      onChange={(e) => onChange(e)} name="password" id="password"
                      type="password"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="Password"
                    />
                  </div>
                  <div>
                    <label className="inline-flex items-center cursor-pointer">
                      {!notif ? "" :
                        <span className="ml-2 text-sm text-red font-semibold text-red-600">
                          Mot de passe incorrect !
                        </span>
                      }

                    </label>
                  </div>

                  <div className="text-center mt-6">
                    <button
                      onClick={() => onClick()}
                      className={"bg-custom text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150 " +Styles.bg}
                      type="button"
                      style={{ backgroundColor: "rgb(30, 41, 59)" }}>
                      
                      Sign In
                      
                    </button>
                  </div>
                </form>
              </div>
            </div>
            <div className="flex flex-wrap mt-6 relative">
              <div className="w-1/2">
                <a
                  href="#pablo"
                  onClick={(e) => e.preventDefault()}
                  className="text-blueGray-200"
                >
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
