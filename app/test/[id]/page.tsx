const TestPage = ({ params }: { params: { pid: string } }) => {
  console.log(params);
  return <div>TestPage: {params.pid}</div>;
};
export default TestPage;
