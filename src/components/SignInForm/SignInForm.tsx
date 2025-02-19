import Button from "../Button/Button";
import Input from "../Input/Input";
import "./SignInForm.css";

const SignInForm: React.FC = () => {
  return (
    <form>
      <Input
        label={"Username"}
        type={"text"}
        name={"username"}
        placeholder={"Enter your username..."}
      />
      <Input
        label={"Password"}
        type={"password"}
        name={"password"}
        placeholder={"Enter your password..."}
      />
      <a href="/">Sign Up now?</a>
      <Button type={"submit"} title={"Sign In"} />
    </form>
  );
};

export default SignInForm;
