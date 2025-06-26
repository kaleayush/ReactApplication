
import React, { useState } from "react";
import { Button, Input, Logo } from "../../Components/index";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {UserSignupHandler} from "../../store/slices/authSlice"
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

function Signup() {
  const [file, setFile] = useState(null);
  const [firstName, setFirstName] = useState("");
  const [lastName,setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [previewImage, setPreViewImage] = useState();
  const [imageUrl] = useState(
    "https://th.bing.com/th?id=OIP.jPpVGcIUih5YWhUYbSKcwgHaHk&w=247&h=252&c=8&rs=1&qlt=90&o=6&pid=3.1&rm=2"
  );
  const navigate = useNavigate();
  const [error, setError] = useState();
  const dispatch = useDispatch();

  const handleFileChange = (event) => {
    console.log(event, "file");
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
    if (selectedFile) {
      const url = URL.createObjectURL(selectedFile);
      setPreViewImage(url);
    } else {
      setPreViewImage(imageUrl);
    }
  };
  const handleSubmit = async(value) => {
    console.log(value,"submit")
  
    dispatch(UserSignupHandler(value));
    navigate("/dashboard");
    
  }
  return (
    <div className="flex items-center justify-center">
      <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
        <div className="mb-2 flex justify-center">
          <span className="inline-block w-full max-w-[100px]">
            <Logo width="100%" />
          </span>
        </div>
        <h2 className="text-center text-2xl font-bold leading-tight">
          Sign up to create account
        </h2>
        <p className="mt-2 text-center text-base text-black/60">
          Already have an account?&nbsp;
          <Link
            to="/login"
            className="font-medium text-primary transition-all duration-200 hover:text-blue-500"
          >
            SignIn
          </Link>
        </p>

        {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
        <Formik
         enableReinitialize={true}
          initialValues={{
            FirstName: firstName,
            LastName: lastName,
            Email: email,
            Password: password,
            File:file
          }}
          //  validatationSchema={}
          onSubmit={handleSubmit}
        >
          <Form>
            <div className="mt-6 flex flex-row justify-center">
            <div className="relative drop-shadow-2">
              <img src={previewImage ? previewImage : imageUrl} alt="profile"  className="w-20 h-20 rounded-full cursor-pointer"/>
              <label
                htmlFor="profile"
                className="absolute bottom-0 right-0 flex h-8.5 w-8.5 cursor-pointer items-center justify-center rounded-full bg-blue-600 text-white hover:bg-opacity-90 sm:bottom-2 sm:right-2"
              >
                <svg
                  className="fill-current"
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M4.76464 1.42638C4.87283 1.2641 5.05496 1.16663 5.25 1.16663H8.75C8.94504 1.16663 9.12717 1.2641 9.23536 1.42638L10.2289 2.91663H12.25C12.7141 2.91663 13.1592 3.101 13.4874 3.42919C13.8156 3.75738 14 4.2025 14 4.66663V11.0833C14 11.5474 13.8156 11.9925 13.4874 12.3207C13.1592 12.6489 12.7141 12.8333 12.25 12.8333H1.75C1.28587 12.8333 0.840752 12.6489 0.512563 12.3207C0.184375 11.9925 0 11.5474 0 11.0833V4.66663C0 4.2025 0.184374 3.75738 0.512563 3.42919C0.840752 3.101 1.28587 2.91663 1.75 2.91663H3.77114L4.76464 1.42638ZM5.56219 2.33329L4.5687 3.82353C4.46051 3.98582 4.27837 4.08329 4.08333 4.08329H1.75C1.59529 4.08329 1.44692 4.14475 1.33752 4.25415C1.22812 4.36354 1.16667 4.51192 1.16667 4.66663V11.0833C1.16667 11.238 1.22812 11.3864 1.33752 11.4958C1.44692 11.6052 1.59529 11.6666 1.75 11.6666H12.25C12.4047 11.6666 12.5531 11.6052 12.6625 11.4958C12.7719 11.3864 12.8333 11.238 12.8333 11.0833V4.66663C12.8333 4.51192 12.7719 4.36354 12.6625 4.25415C12.5531 4.14475 12.4047 4.08329 12.25 4.08329H9.91667C9.72163 4.08329 9.53949 3.98582 9.4313 3.82353L8.43781 2.33329H5.56219Z"
                    fill=""
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M7.00004 5.83329C6.03354 5.83329 5.25004 6.61679 5.25004 7.58329C5.25004 8.54979 6.03354 9.33329 7.00004 9.33329C7.96654 9.33329 8.75004 8.54979 8.75004 7.58329C8.75004 6.61679 7.96654 5.83329 7.00004 5.83329ZM4.08337 7.58329C4.08337 5.97246 5.38921 4.66663 7.00004 4.66663C8.61087 4.66663 9.91671 5.97246 9.91671 7.58329C9.91671 9.19412 8.61087 10.5 7.00004 10.5C5.38921 10.5 4.08337 9.19412 4.08337 7.58329Z"
                    fill=""
                  />
                </svg>
                <input
                  type="file"
                  name="profile"
                  id="profile"
                  className="sr-only"
                  onChange={handleFileChange}
                />
              </label>
            </div>
            </div>
            <div className="w-full mt-4">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  FirstName
                </label>
                <Field
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  type="text"
                  name="FirstName"
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="Enter First Name"
                />
                <ErrorMessage name="FirstName" component="div"  className="text-red-700"/>
              </div>  
              <div className="w-full mt-4">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  LastName
                </label>
                <Field
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  type="text"
                  name="LastName"
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="Enter Last Name"
                />
                <ErrorMessage name="FirstName" component="div"  className="text-red-700"/>
              </div>  
              <div className="w-full mt-4">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Email
                </label>
                <Field
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  type="Email"
                  name="Email"
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter Email Id Name"
                />
                <ErrorMessage name="ProductName" component="div"  className="text-red-700"/>
              </div> 
              <div className="w-full mt-4">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Password
                </label>
                <Field
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  type="Password"
                  name="Password"
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter Password Name"
                />
                <ErrorMessage name="ProductName" component="div"  className="text-red-700"/>
              </div>  
              <button
              type="submit"
             // style={{ background:"blue"}}
              //disabled={isSubmitting}
              className="mt-4 text-white bg-blue-700 hover:bg-blue-900  font-medium rounded-lg text-sm px-5 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Signup
            </button>  
          </Form>
        </Formik>
       
      </div>
    </div>
  );
}

export default Signup;
