import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import Button from "../Button/Button";
import Input from "../Input/Input";
import { createUser, getAllUsers } from "../../services/userService";
import "./SignUpForm.css";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import {
  arePasswordsMatching,
  isValidEmail,
  passwordValidation,
} from "../../utils/validation";
import { handleError } from "../../utils/errorHandler";
import { FormDataSignUp } from "../../models/FormData";
import { User } from "../../models/User";

const SignUpForm: React.FC = () => {
  const [formData, setFormData] = useState<FormDataSignUp>({
    username: "",
    email: "",
    password: "",
    repassword: "",
  });
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersData = await getAllUsers();
        setUsers(usersData);
      } catch (error) {
        handleError(error, setError);
      }
    };
    fetchUsers();
  }, []);

  const handleSubmit = async (ev: FormEvent<HTMLElement>) => {
    ev.preventDefault();
    const { username, email, password, repassword } = formData;
    const trimmedUsername = username.trim();
    const trimmedEmail = email.trim();

    if (!trimmedUsername || !trimmedEmail || !password || !repassword) {
      setError("All fields are required!");
      return;
    }

    if (!isValidEmail(trimmedEmail)) {
      setError("Email is not valid!");
      return;
    }
    if (!passwordValidation(password)) {
      setError("Password should be at least 8 characters!");
      return;
    }
    if (!arePasswordsMatching(password, repassword)) {
      setError("Passwords do not match!");
      return;
    }

    const isRegistered = users.find((u) => u.email === trimmedEmail);

    if (!isRegistered) {
      try {
        await createUser(trimmedUsername, trimmedEmail, password);
        setError("");
      } catch (error) {
        handleError(error, setError);
      }
      setFormData({ username: "", email: "", password: "", repassword: "" });
    } else {
      setError("User is already registered!");
    }
  };

  const handleChange = (ev: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = ev.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <form onSubmit={handleSubmit}>
      <Input
        label={"Username"}
        type={"text"}
        name={"username"}
        value={formData.username}
        onChange={handleChange}
        placeholder={"Enter your username..."}
      />
      <Input
        label={"Email"}
        type={"text"}
        name={"email"}
        value={formData.email}
        onChange={handleChange}
        placeholder={"Enter your email..."}
      />
      <Input
        label={"Password"}
        type={"password"}
        name={"password"}
        value={formData.password}
        onChange={handleChange}
        placeholder={"Enter your password..."}
      />
      <Input
        label={"Repeat password"}
        type={"password"}
        name={"repassword"}
        value={formData.repassword}
        onChange={handleChange}
        placeholder={"Enter your password..."}
      />
      <ErrorMessage message={error} />
      <a href="/">Sign In now?</a>
      <Button type={"submit"} title={"Sign Up"} />
    </form>
  );
};

export default SignUpForm;
