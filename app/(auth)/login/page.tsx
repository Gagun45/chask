import AuthFormWrapper from "@/forms/AuthFormWrapper";
import LoginForm from "@/forms/LoginForm/LoginForm";

const LoginPage = () => {
  return (
    <AuthFormWrapper
      gotoHref="/register"
      gotoLabel="Don`t have an account? Register"
      title="Login"
    >
      <div className="authFormWrapper">
        <LoginForm />
      </div>
    </AuthFormWrapper>
  );
};
export default LoginPage;
