import { Link } from "react-router-dom";
import Logout from "../components/Logout";

export default function Dashboard(){
    const userId=JSON.parse(localStorage.getItem("user-details")).googleId;
    const userName=JSON.parse(localStorage.getItem("user-details")).profileObj.name;
    const admin=(localStorage.getItem("is-admin")=="true");
    return (
      <div className="p-4">
        <Logout/>
        <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <h1 className="text-4xl font-bold mb-4">Welcome {userName}</h1>
      
      <p className="text-lg mb-8">Manage your projects efficiently.</p>
      <div className="flex space-x-4">
        <Link to="/projects">
          <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700">View Projects</button>
        </Link>
        {admin && <Link to="/users">
          <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700">View Users</button>
        </Link>}
      </div>
    </div>
    </div>
    )
}
