import React, { useState } from "react";
import MicrosoftLogin from "react-microsoft-login";
import { useSelector, useDispatch } from "react-redux";
import { useMsal } from "@azure/msal-react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Logo, Input, Button } from "../../Components/index";
import { Link } from "react-router-dom";
import {
  LoginHandler,
  GetUserInformationHandler,
} from "../../store/slices/authSlice";
import * as actions from "../../store/actions/index";
import { toast } from "react-toastify";
import { config } from "../../config/config";
import { EventType } from "@azure/msal-browser";
function Login() {
  const { message } = useSelector((state) => state.auth);
  const { instance } = useMsal();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [error, setError] = useState();
  const { register, handleSubmit } = useForm();
  const login = (data) => {
    try {
      dispatch(LoginHandler(data)).then((response) => {
        console.log(response);
        if (response.type === "login/fulfilled") {
          toast.success(response?.payload?.message, {
            autoClose: 2000,
            position: "top-right",
          });
          navigate("/dashboard");
        } else if (response.type === "login/rejected") {
          toast.error(response?.payload?.response?.data?.message, {
            position: "top-right",
            autoClose: 2500,
          });
        }
      });
    } catch (e) {
      console.log(e.message);
    }
  };
  const handleMicrosoftSignIn = () => {
    instance.loginRedirect({
      scopes: ["user.read"],
    });
  };
  instance
    .handleRedirectPromise()
    .then((response) => {
      console.log(response, "after login");
      const loginModel = {
        email: response?.account?.username,
        name: response?.account?.name,
      };
      console.log(loginModel, "inside microsoft login function");
      console.log(response, "inside login ");
    })
    .catch((error) => console.log(error, "error is microsoft login"));

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100 ">
      <div className="mx-auto bg-gray-200 rounded-xl p-10 border max-w-5xl border-black/10">
        <div className="mb-2 flex justify-center">
          <span className="inline-block w-full max-w-[100px]">
            <Logo width="100%" height="100%" />
          </span>
        </div>
        <h2 className=" text-center text-2xl font-bold leading-tight">
          Sign in to Your Account
        </h2>
        <p className="mt-2 text-center text-base text-black/60">
          Don&apos;t have any account ?&nbsp;
          <Link
            to="/signup"
            className="font-medium  transition-all duration-200 hover:text-blue-500"
          >
            signup
          </Link>
        </p>
        <p className="mt-2 text-center font-medium  transition-all duration-200 hover:text-blue-500">
          <Link to="/forget-password">forget password ?</Link>
        </p>
        {/* {message && <p className="text-red-500 text-center">{message}</p>} */}

        <form onSubmit={handleSubmit(login)} className="mt-8 space-y-6">
          <div className="space-y-2">
            <Input
              type="email"
              label="Email"
              className="w-full border rounded-md border-gray-500"
              placeholder="Enter Your Email "
              {...register("email", {
                required: true,
                validate: {
                  matchPattern: (value) => {
                    /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/.test(
                      value
                    ) || "Email address must be valid Address";
                  },
                },
              })}
            />
            <Input
              type="password"
              label="Password"
              placeholder="Enter Password "
              {...register("password", {
                required: true,
                maxLength: 8,
              })}
            />
          </div>
          <Button type="submit" className="w-full space-y-1  hover:bg-blue-600">
            SignIn
          </Button>
        </form>
        <div className="py-4 ">
          <Button
            className="w-full hover:bg-blue-600"
            onClick={handleMicrosoftSignIn}
          >
            {" "}
            Microsoft Login
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Login;
