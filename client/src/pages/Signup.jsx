import React, { useState } from "react";

const defaultValues = {
    email: "",
    username: "",
    password: "",
};

export default function Signup() {
    const [signupInput, setSignupInput] = useState(defaultValues);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
        } catch (error) { }
    };

    //handle  on change event function
    const handleOnChange = (e) => {
        setSignupInput((preValue) => ({
            ...preValue,
            [e.target.name]: e.target.value,
        }));
        console.log(signupInput);
    };

    return (
        <div
            className="__Signup w-full h-[calc(100dvh-60px)]  bg-slate-800 text-white flex justify-center
         items-center flex-col gap-3"
        >
            <h1 className=" text-3xl  justify-center items-center">Signup Page</h1>
            <form onSubmit={handleSubmit} className=" rounded flex flex-col gap-2">
                <input
                    className="text-black outline-none p-2 rounded"
                    type="text"
                    placeholder="Username"
                    required
                    name="username"
                    value={signupInput.username}
                    onChange={handleOnChange}
                />
                <input
                    className="text-black outline-none p-2 rounded"
                    type="text"
                    placeholder="Email"
                    required
                    name="email"
                    value={signupInput.email}
                    onChange={handleOnChange}
                />

                <input
                    className="text-black outline-none p-2 rounded"
                    type="password"
                    placeholder="Password"
                    required
                    name="password"
                    value={signupInput.password}
                    onChange={handleOnChange}
                />
                <button className="primary-btn" type="submit">
                    Signup
                </button>
            </form>
        </div>
    );
}
