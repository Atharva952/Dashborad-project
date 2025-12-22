import { Navigate, Outlet } from "react-router-dom";
import { Layout } from "./Layout";
import Header from "./Header";

export const PrivateRoutes = () => {
  const token = sessionStorage.getItem("token");

  return (
    <>
      {token ? (
        <>
          <Outlet />
        </>
      ) : (
        <Navigate to={"/signUp"} />
      )}
    </>
  );
};
