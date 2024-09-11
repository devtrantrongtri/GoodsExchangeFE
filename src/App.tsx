import { useEffect } from "react";
import RouteConfig from "./routes/RouteConfig";
import { useGetProfileQuery } from "./services/user/user.service";
import { useNavigate } from "react-router-dom";
import LoadingPopup from "./components/Util/LoadingPopup";
import ErrorPopup from "./components/Util/ErrorPopup";
import { SocketProvider } from "./contexts/SocketContext";



function App() {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  // Invoke the query hook at the top level
  const { isError, isFetching, data,refetch } = useGetProfileQuery(undefined, {
    skip: !token,  // Skip query if no token
  });

  useEffect(() => {
    if (token) {
      if (isError) {
        localStorage.removeItem('token');
      }
      refetch();
    }
  }, [isError, token]);

  // Conditional rendering based on query states
  if (isFetching) {
    return <LoadingPopup />;
  }

  if (isError) {
    return <ErrorPopup message="Error when getting your profile or expired token." />;
  }

  return (
    <>
    <SocketProvider>
    <RouteConfig/>
    </SocketProvider>
    </>
  );
}

export default App
