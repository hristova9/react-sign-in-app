import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import Button from "../Button/Button";
import Input from "../Input/Input";
import { createUser, getAllUsers } from "../../services/userService";
import "./SignUpForm.css";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import { RegisteredUser } from "../../models/RegisteredUser";

const SignUpForm: React.FC = () => {
  const [formData, setFormData] = useState<{
    username: string;
    email: string;
    password: string;
    repassword: string;
  }>({
    username: "",
    email: "",
    password: "",
    repassword: "",
  });
  const [users, setUsers] = useState<RegisteredUser[]>([]);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersData = await getAllUsers();
        setUsers(usersData);
      } catch (error) {
        if (error instanceof Error) {
          setError(`Failed to get users!`);
          throw new Error(error.message);
        } else {
          setError(`Failed to get users!`);
          throw new Error("Error occured!");
        }
      }
    };
    fetchUsers();
  }, []);

  const handleSubmit = async (ev: FormEvent<HTMLElement>) => {
    ev.preventDefault();
    const { username, email, password, repassword } = formData;

    if (!username || !email.trim() || !password || !repassword) {
      setError("All fields are required!");
      return;
    }

    if (password.length < 8) {
      setError("Password should be at least 8 characters!");
      return;
    }
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,20}$/;

    console.log(emailRegex.test(email));
    console.log(email);

    if (!emailRegex.test(email.trim())) {
      console.log("email");

      setError("Email is not valid!");
      return;
    }

    if (password !== repassword) {
      setError("Passwords do not match!");
      return;
    }

    const isRegistered = users.find((u) => u.email === email.trim());

    if (!isRegistered) {
      try {
        await createUser(
          formData.username,
          formData.email.trim(),
          formData.password
        );
        setError("");
      } catch (error) {
        if (error instanceof Error) {
          throw new Error(error.message);
        } else {
          throw new Error("Error occured!");
        }
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
