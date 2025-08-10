import AuthFormWrapper from "@/forms/AuthFormWrapper";
import LoginFormWrapper from "@/forms/LoginForm/LoginFormWrapper";

const LoginPage = () => {
  return (
    <AuthFormWrapper
      gotoHref="/register"
      gotoLabel="Don`t have an account? Register"
      title="Login"
    >
      <LoginFormWrapper />
    </AuthFormWrapper>
  );
};
export default LoginPage;
