import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = ({ authUser }) => {
  if (!authUser) {
    return <Navigate to={"/"} replace={true} />;
  } else {
    return <Outlet />;
  }
};

export default PrivateRoute;
