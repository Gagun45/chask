import AuthFormWrapper from "@/forms/AuthFormWrapper";
import TeamCreateForm from "@/forms/TeamCreateForm/TeamCreateForm";

const CreateTeamPage = () => {
  return (
    <AuthFormWrapper title="Create a team">
      <div className="authFormWrapper mb-12">
        <TeamCreateForm />
      </div>
    </AuthFormWrapper>
  );
};
export default CreateTeamPage;
