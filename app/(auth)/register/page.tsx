import AuthFormWrapper from "@/forms/AuthFormWrapper";
import RegisterFormWrapper from "@/forms/RegisterForm/RegisterFormWrapper";

const RegisterPage = () => {
  return (
    <AuthFormWrapper
      gotoHref="/login"
      gotoLabel="Back to login"
      title="Register"
    >
      <RegisterFormWrapper />
    </AuthFormWrapper>
  );
};
export default RegisterPage;
