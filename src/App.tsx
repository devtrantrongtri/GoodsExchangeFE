import RouteConfig from "./routes/RouteConfig";
import { useGetProfileQuery } from "./services/user/user.service";



function App() {
  const {isError,isFetching,data} =  useGetProfileQuery()

  console.log(data,isError,isFetching)

  // neu error -> login , gotoHomepage


  return (
    <>
    <RouteConfig/>
    </>
  );
}

export default App
