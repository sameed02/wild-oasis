import styled from "styled-components";
import GlobalStyles from "../styles/GlobalStyles.js";

const LoginLayout = styled.main`
  min-height: 100vh;
  display: grid;
  grid-template-columns: 48rem;
  align-content: center;
  justify-content: center;
  gap: 3.2rem;
  background-color: var(--color-grey-50);
`;

function Login() {
  return (
    <>
      <GlobalStyles />
      <LoginLayout>Login</LoginLayout>
    </>
  );
}

export default Login;
