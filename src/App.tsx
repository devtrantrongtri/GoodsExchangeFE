import { useEffect } from "react";
import RouteConfig from "./routes/RouteConfig";
import { useGetProfileQuery } from "./services/user/user.service";
import { useNavigate } from "react-router-dom";
import LoadingPopup from "./components/Util/LoadingPopup";



function App() {
  const navigate = useNavigate();
  const { isError, isFetching, data } = useGetProfileQuery();
  const token = localStorage.getItem('token')

  useEffect(() => {
    if (isError || !data || !token) {
      // Redirect to login page if there's an error or no token
      navigate('/auth/login');
    } else {
      // If profile data is available and token exists, you might want to handle other logic here
      console.log('User data:', data);
    }
  }, [isError, data, navigate]);

  if (isFetching) {
    return <LoadingPopup/>;
  }


  return (
    <>
    <RouteConfig/>
    </>
  );
}

export default App
