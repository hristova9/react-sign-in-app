import SignInForm from "../../components/SignInForm/SignInForm";
import "./SignInPage.css"

const SignInPage: React.FC = () => {
  return (
    <div id="sign-in-page">
      <h2>Sign In</h2>
      <SignInForm />
    </div>
  );
};

export default SignInPage;
