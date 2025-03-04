import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { handleError } from "../utils/handleError";
import { toast } from "react-toastify";

axios.defaults.withCredentials = true;

const defaultValues = {
  email: "",
  password: "",
};

export default function Login() {
  const [loginInput, setLoginInput] = useState(defaultValues);
  const navigate = useNavigate();

  // Handle form submission

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting login data:", loginInput);
    try {
      await axios.post("http://localhost:4000/user/login", {
        email: loginInput.email,
        password: loginInput.password,
      });
      navigate("/login");
      toast.success("Login successful");
    } catch (error) {
      handleError(error);
    }
  };

  // Handle input changes
  const handleOnChange = (e) => {
    setLoginInput((prevVal) => ({
      ...prevVal,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="__Login w-full h-[calc(100dvh-60px)] bg-slate-800 text-white flex justify-center items-center flex-col gap-3">
      <h1 className="text-3xl">Login Page</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <input
          className="text-black outline-none p-2 rounded"
          type="email"
          placeholder="Email"
          required
          name="email"
          value={loginInput.email}
          onChange={handleOnChange}
        />
        <input
          className="text-black outline-none p-2 rounded"
          type="password"
          placeholder="Password"
          required
          name="password"
          value={loginInput.password}
          onChange={handleOnChange}
        />
        <button className="primary-btn" type="submit">
          Login
        </button>
      </form>
    </div>
  );
}
