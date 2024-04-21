"use client";
import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";

const Dashboard = () => {
  const [user, setUser] = useState("");
  useEffect(() => {
    const isUser = JSON.parse(localStorage.getItem("user"));

    setUser(isUser);
  }, []);

  console.log("user => ", user);
  return (
    <Layout>
      <h4>Hi, {user.User_Name}.</h4>
      <h4>Selamat Datang di Dashboard Administrator Penggajian</h4>
    </Layout>
  );
};

export default Dashboard;
