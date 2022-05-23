import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { register, reset } from "../../../redux/auth/authSlice";
import { FormContainer } from "../styles";
import Button from "./Button";
import Input from "./Input";

export default function RegisterForm() {
  const [formData, setFormData] = useState({
    name: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const { name, lastName, email, password, confirmPassword } = formData;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    if (isSuccess || user) {
      navigate("/training-plan");
    }
    dispatch(reset);
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
    } else {
      const userData = {
        name,
        lastName,
        email,
        password,
      };
      dispatch(register(userData));
    }
  };

  return (
    <div className="form-container">
      <h2>Not a member yet? Register now!</h2>
      <FormContainer onSubmit={onSubmit}>
        <Input onChange={onChange} name="name" placeholder="Name" type="text" />
        <Input
          onChange={onChange}
          name="lastName"
          placeholder="Last Name"
          type="text"
        />
        <Input
          onChange={onChange}
          name="email"
          placeholder="Email"
          type="email"
        />
        <Input
          onChange={onChange}
          name="password"
          placeholder="Password"
          type="password"
        />
        <Input
          onChange={onChange}
          name="confirmPassword"
          placeholder="Confirm password"
          type="password"
        />
        <Button text="Register" />
      </FormContainer>
    </div>
  );
}
