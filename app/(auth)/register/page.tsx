import AuthFormWrapper from "@/forms/AuthFormWrapper";
import RegisterForm from "@/forms/RegisterForm/RegisterForm";

const RegisterPage = () => {
  return (
    <AuthFormWrapper
      gotoHref="/login"
      gotoLabel="Back to login"
      title="Register"
    >
      <div className="authFormWrapper">
        <RegisterForm />
      </div>
    </AuthFormWrapper>
  );
};
export default RegisterPage;
