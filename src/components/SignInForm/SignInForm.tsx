import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import Button from "../Button/Button";
import Input from "../Input/Input";
import { getAllUsers } from "../../services/userService";
import "./SignInForm.css";
import { User } from "../../models/User";
import ErrorMessage from "../ErrorMessage/ErrorMessage";

const SignInForm: React.FC = () => {
  const [formData, setFormData] = useState<User>({
    email: "",
    password: "",
  });
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersData = await getAllUsers();
        setUsers(usersData);
      } catch (error) {
        if (error instanceof Error) {
          setError(`Failed to Sign In!`);
          throw new Error(error.message);
        } else {
          setError(`Failed to Sign In!`);
          throw new Error("Error occured!");
        }
      }
    };
    fetchUsers();
  }, []);

  const handleSubmit = (ev: FormEvent<HTMLElement>) => {
    ev.preventDefault();
    const { email, password } = formData;

    if (!email || !password) {
      setError("Both fields are required!");
      return;
    }

    const user = users.find((u) => u.email === email);

    if (user && user.password === password) {
      console.log(formData.email);
      console.log(formData.password);
      setError("");
    } else {
      setError("Wrong email or password!");
    }
    setFormData({ email: "", password: "" });
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
      <ErrorMessage message={error}/>
      <a href="/">Sign Up now?</a>
      <Button type={"submit"} title={"Sign In"} />
    </form>
  );
};

export default SignInForm;
