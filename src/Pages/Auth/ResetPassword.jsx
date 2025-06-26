import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Input, Logo, Button } from "../../Components";
import { Link ,useNavigate} from "react-router-dom";
import { useDispatch } from "react-redux";
import {ResetPasswordHandler} from "../../store/slices/authSlice"
import { toast } from "react-toastify";

function ResetPassword() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { idToken } = useParams();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordsMatch, setPasswordsMatch] = useState(true);

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setPasswordsMatch(e.target.value === confirmPassword);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
    setPasswordsMatch(e.target.value === password);
  };

  const resetPass = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setPasswordsMatch(false);
      return;
    }
    const data={
      password: password,
      token: idToken,
    }
    dispatch(ResetPasswordHandler(data)).then((response)=>{
      toast.success(response?.payload?.message,{
        position: "top-right",
        autoClose: 2500
      })
      navigate("/signin")
    })
  };

  return (
    <div>
      <div className="flex items-center justify-center h-screen bg-gray-100 ">
        <div className="mx-auto  bg-gray-200 rounded-xl p-10 border max-w-5xl border-black/10">
          <div className="mb-2 flex justify-center">
            <span className="inline-block w-full max-w-[100px]">
              <Logo width="100%" height="100%" />
            </span>
          </div>
          <h2 className="text-center text-2xl font-bold leading-tight">
            Sign in to Your Account
          </h2>
          <p className="mt-2 text-center text-base text-black/60">
            Don&apos;t have any account ?&nbsp;
            <Link
              to="/signin"
              className="font-medium text-primary transition-all duration-200 hover:underline"
            >
              signin
            </Link>
          </p>

          <form onSubmit={resetPass} className="mt-8 space-y-6">
            <div className="space-y-2">
              <Input
                type="password"
                label="New Password"
                placeholder="Enter Password "
                value={password}
                onChange={handlePasswordChange}
              />
              <Input
                type="password"
                label="Confirm Password"
                placeholder="Enter Password "
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
              />
              {!passwordsMatch && (
                <p className="text-red-500">Passwords do not match</p>
              )}
            </div>
            <Button type="submit" className="w-full space-y-1" disabled={!passwordsMatch}>
              Signin
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
export default ResetPassword;
