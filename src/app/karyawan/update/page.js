"use client";
import Layout from "@/app/components/Layout";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Input from "@/app/components/Input";
import Dropdown from "@/app/components/Dropdown";
import Button from "@/app/components/Button";

const Add = (props) => {
  const router = useRouter();

  console.log(props.params);
  // const { myData } = router?.query;
  // const [data, setData] = React.useState({});

  // useEffect(() => {
  //   if (myData) setData(JSON.parse(myData));
  // }, [router.query]);

  const [karyawan, setKaryawan] = useState({});
  const [listJabatan, setListJabatan] = useState([]);

  const [nik, setNik] = useState("");
  const [Nama, setNama] = useState("");
  const [jabatan, setJabatan] = useState(null);
  const [Gaji_Pokok, setGaji_Pokok] = useState(0);
  const [Tunjangan_Jabatan, setTunjangan_Jabatan] = useState(0);
  const [Status, setStatus] = useState(null);
  const [Jumlah_Anak, setJumlah_Anak] = useState(0);
  const [Tunjangan_Anak, setTunjangan_Anak] = useState(0);

  useEffect(() => {
    const karyawan = JSON.parse(localStorage.getItem("karyawan"));
    setKaryawan(karyawan);
    // setNik(`KAR-${karyawan.id.toString().padStart(2, "0")}`);
    // setNama(karyawan.Nama);

    getJabatan(karyawan);
  }, []);

  const getJabatan = async (karyawan) => {
    const response = await axios.get("http://localhost:3000/api/jabatan");

    if (response.status === 200) {
      setListJabatan(response?.data?.data);
      updateState(response?.data?.data, karyawan);
    }
  };

  const listStatus = [
    {
      id: 1,
      title: "Kawin",
    },
    {
      id: 2,
      title: "Belum Kawin",
    },
  ];

  const updateState = (list, karyawan) => {
    setNik(`KAR-${karyawan.id.toString().padStart(2, "0")}`);
    setNama(karyawan.Nama);

    const karyawanFilter = list.filter(
      (filter) => filter.id === karyawan.Id_Jabatan
    );
    const statusFilter = listStatus.filter(
      (filter) => filter.title === karyawan.Status
    );
    setJabatan(karyawanFilter[0]);
    console.log("karyawanFilter => ", karyawanFilter);
    console.log("statusFilter => ", statusFilter);
    setGaji_Pokok(karyawanFilter[0].Gaji_Pokok);
    setTunjangan_Jabatan(karyawanFilter[0].Tunjangan_Jabatan);
    setStatus(statusFilter[0]);
    setJumlah_Anak(karyawan.Jumlah_Anak);
    setJumlah_Anak(karyawan.Jumlah_Anak);
    setTunjangan_Anak(karyawan.Tunjangan_Anak);
  };

  const handleTunjanganAnak = (jumlahAnak) => {
    if (Gaji_Pokok > 0 && jumlahAnak > 0) {
      const totalTunjangan = jumlahAnak * 0.05 * Gaji_Pokok;
      return parseInt(totalTunjangan);
    }
    return 0;
  };

  const handleSubmit = () => {
    if (Nama === "" || jabatan === null || Status === null) {
      alert("Please isi semua");
    } else {
      postKaryawan();
    }
  };

  const postKaryawan = async () => {
    const body = {
      id: karyawan.id,
      Nama,
      Id_Jabatan: jabatan.id,
      Status: Status.title,
      Jumlah_Anak,
      Tunjangan_Anak,
    };

    const response = await axios.put(
      "http://localhost:3000/api/karyawan",
      body
    );

    if (response?.status === 200) {
      router.push("/karyawan");
    }
  };

  console.log("listJabatan => ", listJabatan);

  return (
    <Layout>
      <div className="flex justify-center">
        <div className="w-[800px] shadow p-8 flex flex-col gap-8">
          <div className="w-full pb-4 border-b-4">
            <h4>Update Karyawan</h4>
          </div>
          <div className="flex flex-col gap-4 w-full">
            <Input title="NIK Karyawan" disabled={true} value={nik} />
            <Input title="Nama" value={Nama} onChange={(e) => setNama(e)} />
            <Dropdown
              title="Jabatan"
              value={jabatan}
              menus={listJabatan}
              valueKey="Nama_Jabatan"
              onSet={(item) => {
                setJabatan(item);
                setGaji_Pokok(item.Gaji_Pokok);
                setTunjangan_Jabatan(item.Tunjangan_Jabatan);
              }}
            />
            <Input title="Gaji Pokok" disabled={true} value={Gaji_Pokok} />
            <Input
              title="Tunjangan Jabatan"
              disabled={true}
              value={Tunjangan_Jabatan}
            />
            <Dropdown
              title="Status"
              value={Status}
              menus={listStatus}
              onSet={(item) => setStatus(item)}
            />
            <Input
              title="Jumlah Anak"
              value={Jumlah_Anak}
              disabled={Status?.title === "Kawin" ? false : true}
              type="number"
              onChange={(e) => {
                setJumlah_Anak(parseInt(e));
                setTunjangan_Anak(handleTunjanganAnak(e));
              }}
            />
            <Input
              title="Tunjangan Anak"
              disabled={true}
              value={Tunjangan_Anak}
            />
          </div>

          <div className="w-full flex justify-center">
            <Button onClick={() => handleSubmit()}>Save</Button>
            <Button onClick={() => router.push("/karyawan")} type="close">
              Close
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Add;
