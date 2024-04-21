"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const [Email, setEmail] = useState("ambar@yahoo.com");
  const [Password, setPassword] = useState("ambar123");

  useEffect(() => {
    const isLogged = JSON.parse(localStorage.getItem("isLogged"));
    if (isLogged) router.push("/dashboard");
  }, []);

  const handleSubmit = async () => {
    try {
      const body = {
        Email,
        Password,
      };
      const response = await axios.post("http://localhost:3000/api/auth", body);
      console.log("Post Auth => ", response);
      if (response.status === 200) {
        localStorage.setItem("isLogged", true);
        localStorage.setItem("user", JSON.stringify(response?.data?.data));
        router.push("/dashboard");
      }
    } catch (error) {
      console.log("Error: ", error);
      if (error?.response?.status === 401) {
        alert("Email dan Password Salah!");
      }
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>
        <h3>Login to System</h3>

        <div>
          <div>
            <h6>Email:</h6>
            <input
              type="text"
              value={Email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <h6>Password:</h6>
            <input
              type="text"
              value={Password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button onClick={() => handleSubmit()}>Login</button>
        </div>
      </div>
    </main>
  );
}
