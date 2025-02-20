import SignUpForm from "../../components/SignUpForm/SignUpForm";
import "./SignUpPage.css"

const SignUpPage: React.FC = () => {
  return (
    <div id="sign-up-page">
      <h2>Sign Up</h2>
      <SignUpForm />
    </div>
  );
};

export default SignUpPage;