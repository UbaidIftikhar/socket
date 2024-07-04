import React from "react";
// import Login from "../../components/Login/Login";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
// import { login } from "../../store/features/auth/authService";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from "../../components/Login/Login";
import { LoginAction } from "../../redux/user/userSlice";
import { useNavigate } from "react-router-dom/dist";
// import Login from "../../components/Layout/Login/Login";

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const { user, loader } = useSelector((state) => state.user);
  console.log(user);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: (values) => {
      dispatch(LoginAction(values));
    },
    validationSchema: Yup.object().shape({
      email: Yup.string().email("Invalid email").required("Email is required"),
      password: Yup.string()
        .min(6, "Password is too short")
        .max(20, "Password is too long")
        .required("Password is required"),
    }),
  });

  return (
    <>
      <Login
        handleSubmit={formik.handleSubmit}
        handleChange={formik.handleChange}
        handleValue={formik.values}
        touched={formik.touched}
        errors={formik.errors}
        loader={loader}
      />
      <ToastContainer />
    </>
  );
};

export default LoginPage;
