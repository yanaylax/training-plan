import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { login, reset } from "../../../redux/auth/authSlice";
import { FormContainer } from "../styles";
import Button from "./Button";
import Input from "./Input";

export default function LoginForm() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { email, password } = formData;
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

    if (!email && !password) return;

    const userData = {
      email,
      password,
    };

    dispatch(login(userData));
  };

  return (
    <div className="form-container">
      <h2>Log in</h2>
      <FormContainer onSubmit={onSubmit}>
        {" "}
        <Input
          onChange={onChange}
          name="email"
          required
          placeholder="Email"
          type="email"
          autocomplete
        />
        <Input
          onChange={onChange}
          name="password"
          required
          placeholder="Password"
          type="password"
          autocomplete
        />
        <Button text="Log in" />
      </FormContainer>
    </div>
  );
}
