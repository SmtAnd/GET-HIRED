
import {createBrowserRouter} from "react-router-dom";
import App from "../App";
import Home from "../Pages/Home";
import About from "../Pages/About";
import CreateJob from "../Pages/CreateJob";
import MyJobs from "../Pages/MyJobs";
import Salarypage from "../Pages/Salarypage";
import UpdateJob from "../Pages/UpdateJob";
import Login from "../components/Login";
import JobDetails from "../Pages/JobDetails";

const router = createBrowserRouter([
    {
      path: "/",
      element: <App/>,
      children:[
        {path: "/", element:<Home/>},
        {
          path:"/post-job",
          element: <CreateJob/>
        },
        {
          path:"/my-job",
          element: <MyJobs/>
        },
        {
          path:"salary",
          element: <Salarypage/>
        },
        {
          path:"edit-job/:id",
          element: <UpdateJob/>,
          loader: ({params}) => fetch(`http://localhost:3000/all-jobs/${params.id}`)
        },
      ],
    },

    {
      path: "/login",
      element: <Login/>
    },

    {
      path: "/job/:id",
      element: <JobDetails/>
    }
  ]);

  export default router;