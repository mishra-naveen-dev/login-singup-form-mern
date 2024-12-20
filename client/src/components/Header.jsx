import { useNavigate } from "react-router-dom";
import axios from "axios";
axios.defaults.withCredentials = true;
import { handleError } from "../utils/handleError";

export default function Header() {
  const navigate = useNavigate();

  //logout function
  const handleLogout = async () => {
    try {
      const response = await axios.post("http://localhost:4000/user/logout");
      console.log(response.data);
      navigate("/login");
    } catch (error) {
      handleError(error);
    }
  };

  return (
    <nav className="h-[60px]  w-full bg-slate-900 text-white flex p-3 justify-between items-center align-center">
      <h2
        onClick={() => navigate("/")}
        className="font-bold text-xl cursor-pointer select-none"
      >
        {" "}
        React Login
      </h2>
      <ul className="flex gap-1">
        <li>
          <button onClick={() => navigate("/login")} className="primary-btn">
            Login
          </button>
        </li>
        <li>
          <button onClick={() => navigate("/signup")} className="primary-btn">
            Signup
          </button>
        </li>
        <li>
          <button onClick={handleLogout} className="danger-btn  ">
            Logout
          </button>
        </li>
      </ul>
    </nav>
  );
}
