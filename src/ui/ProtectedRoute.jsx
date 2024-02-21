import styled from "styled-components";
import { useFetchUser } from "../features/authentication/useFetchUser.js";
import Spinner from "./Spinner.jsx";
import { useNavigate } from "react-router";
import { useEffect } from "react";

const FullPage = styled.div`
  height: 100vh;
  background-color: var(--color-grey-50);
  display: flex;
  justify-content: center;
  align-items: center;
`;

function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  // 1. load authenticated user
  const { currentUser, isAuthenticated, isLoading, fetchStatus } =
    useFetchUser();

  // 3. if there is no authenticated user then redirect to login page
  useEffect(() => {
    if (!isLoading && !isAuthenticated && fetchStatus !== "fetching") {
      navigate("/login");
    }
  }, [isAuthenticated, navigate, isLoading, fetchStatus]);

  // 2. while loading, display spinner
  if (isLoading) {
    console.log(isLoading);
    return (
      <FullPage>
        <Spinner />
      </FullPage>
    );
  }

  // 4.if there is a user then render rest of the app
  if (isAuthenticated) return children;
}

export default ProtectedRoute;
