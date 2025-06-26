import React from "react";
import { Link } from "react-router-dom";
import { Input, Button, Logo } from "../../Components/index";
import { useForm } from "react-hook-form";
import { useDispatch,useSelector } from "react-redux";
import { ForgetPasswordHandler, setMessageEmpty } from "../../store/slices/authSlice";
import { toast } from "react-toastify";
function ForgetPassword() {
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const forgetPassword = async (data) => {
    dispatch(ForgetPasswordHandler(data)).then((response)=>{
      toast.success(response?.payload?.message,{
        position: "top-right",
        autoClose: 2500
      })      
    });
  
  };
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100 ">
      <div className="mx-auto  bg-gray-200 rounded-xl p-10 border max-w-5xl border-black/10">
        <div className="mb-2 flex justify-center">
          <span className="inline-block w-full max-w-[100px]">
            <Logo width="100%" height="100%" />
          </span>
        </div>
        <h2 className=" text-center text-2xl font-bold leading-tight">
          Forgot Password
        </h2>
        <p className="mt-2 text-center text-base text-black/60">
          {/* Don&apos;t */}
          have any account ?&nbsp;
          <Link
            to="/"
            className="font-medium text-primary transition-all duration-200 hover:underline"
          >
            Login
          </Link>
        </p>
        <form
          onSubmit={handleSubmit(forgetPassword)}
          className="mt-8 space-y-6"
        >
          <div className="space-y-2">
            <Input
              type="email"
              label="Email"
              className="w-full border rounded-md border-gray-500"
              placeholder="Enter Your Email "
              {...register("email", {
                required: true,
                validate: {
                  matchPatern: (value) => {
                    /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/.test(
                      value
                    ) || "Email address must be valid Address";
                  },
                },
              })}
            />
          </div>
          <Button type="submit" className="w-full space-y-1">
            Send
          </Button>
        </form>
      </div>
    </div>
  );
}

export default ForgetPassword;
