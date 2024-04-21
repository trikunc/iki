"use client";
import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import axios from "axios";
import { useRouter } from "next/navigation";

const Karyawan = () => {
  const router = useRouter();

  const [listKaryawan, setListKaryawan] = useState([]);
  const [listJabatan, setListJabatan] = useState([]);
  useEffect(() => {
    getKaryaans();
    getJabatan();
  }, []);

  const getKaryaans = async () => {
    const response = await axios.get("http://localhost:3000/api/karyawan");

    if (response.status === 200) {
      const sortedData = response?.data?.data.sort((a, b) =>
        a.Nama.localeCompare(b.Nama)
      );
      setListKaryawan(response?.data?.data);
    }
  };
  const getJabatan = async () => {
    const response = await axios.get("http://localhost:3000/api/jabatan");

    if (response.status === 200) {
      setListJabatan(response?.data?.data);
    }
  };

  const renderJabatan = (id) => {
    const filterJabatan = listJabatan.filter((jabatan) => jabatan.id === id);
    return filterJabatan[0]?.Nama_Jabatan;
  };

  const deleteKaryawan = async (id) => {
    const body = {
      data: {
        id,
      },
    };

    const response = await axios.delete(
      "http://localhost:3000/api/karyawan",
      body
    );

    if (response?.status === 200) {
      getKaryaans();
    }
  };

  return (
    <Layout>
      <div className="w-full flex flex-col gap-8">
        <div className="w-full flex justify-end">
          <button
            onClick={() => router.push("/karyawan/add")}
            className="p-3 shadow rounded hover:shadow-md"
          >
            Add
          </button>
        </div>

        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="border p-2">No.</th>
              <th className="border p-2">Nama Karyawan</th>
              <th className="border p-2">Jabatan</th>
              <th className="border p-2">Status</th>
              <th className="border p-2">Proses</th>
            </tr>
          </thead>
          <tbody>
            {listKaryawan.map((employee, index) => (
              <tr key={index}>
                <td className="border p-2 text-center">{index + 1}</td>
                <td className="border p-2 ">{employee.Nama}</td>
                {/* <td className="border p-2">{employee.Id_Jabatan}</td> */}
                <td className="border p-2">
                  {renderJabatan(employee.Id_Jabatan)}
                </td>
                <td className="border p-2 text-center">{employee.Status}</td>
                <td className="border p-2 flex gap-2 justify-center">
                  <button
                    onClick={() => {
                      localStorage.setItem(
                        "karyawan",
                        JSON.stringify(employee)
                      );
                      router.push("/karyawan/update");
                    }}
                    className="bg-blue-500 text-white px-2 py-1 rounded w-20"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteKaryawan(employee.id)}
                    className="bg-red-500 text-white px-2 py-1 rounded w-20"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Layout>
  );
};

export default Karyawan;
