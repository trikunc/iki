"use client";
import React, { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";

const Layout = ({ children }) => {
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const isLogged = JSON.parse(localStorage.getItem("isLogged"));
    if (!isLogged) router.push("/");
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    router.push("/");
  };

  const listPath = [
    { title: "Home", path: "/dashboard", children: ["/dashboard"] },
    {
      title: "Karyawan",
      path: "/karyawan",
      children: ["/karyawan", "/karyawan/add", "/karyawan/update"],
    },
    { title: "Transaksi", path: "/transaksi", children: ["/transaksi"] },
  ];
  return (
    <div className="h-screen flex flex-row">
      <div className="flex flex-col w-[20%] shadow p-8 gap-4 bg-white ">
        {listPath.map((item, index) => {
          return (
            <button
              key={index}
              className="p-5 hover:bg-slate-300"
              style={{
                color: item.children.includes(pathname) ? "green" : "black",
              }}
              onClick={() => router.push(item.path)}
            >
              {item.title}
            </button>
          );
        })}
        <button
          className="p-5 hover:bg-slate-300"
          style={{
            color: "black",
          }}
          onClick={() => handleLogout()}
        >
          Logout
        </button>
      </div>
      <div className="w-full py-[24px] px-[32px] bg-[#F7F9FB]">
        <div className="h-full bg-white p-8 rounded">{children}</div>
      </div>
    </div>
  );
};

export default Layout;
