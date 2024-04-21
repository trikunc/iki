"use client";
import Layout from "@/app/components/Layout";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Input from "@/app/components/Input";
import Dropdown from "@/app/components/Dropdown";
import Button from "@/app/components/Button";
import moment from "moment";

const Transaksi = () => {
  const router = useRouter();
  const user = JSON.parse(localStorage.getItem("user"));

  const [listKaryawan, setListKaryawan] = useState([]);
  const [listJabatan, setListJabatan] = useState([]);

  // const [Nama, setNama] = useState("");
  const [jabatan, setJabatan] = useState(null);
  const [Gaji_Pokok, setGaji_Pokok] = useState(0);
  const [Tunjangan_Jabatan, setTunjangan_Jabatan] = useState(0);
  const [Status, setStatus] = useState("");
  const [Jumlah_Anak, setJumlah_Anak] = useState(0);
  const [Tunjangan_Anak, setTunjangan_Anak] = useState(0);

  const [idGaji, setIdGaji] = useState("");
  const [Nama_Jabatan, setNama_Jabatan] = useState("");
  const [Tanggal, setTanggal] = useState("");
  const [karyawan, setKaryawan] = useState("");
  const [BPJS, setBPJS] = useState(0);
  const [PPh, setPPh] = useState(0);
  const [Total_Pendapatan, setTotal_Pendapatan] = useState(0);
  const [Total_Potongan, setTotal_Potongan] = useState(0);
  const [Gaji_Bersih, setGaji_Bersih] = useState(0);

  useEffect(() => {
    getJabatan();
    getKaryawan();
  }, []);

  const getJabatan = async () => {
    const response = await axios.get("http://localhost:3000/api/jabatan");

    if (response.status === 200) {
      setListJabatan(response?.data?.data);
    }
  };
  const getKaryawan = async () => {
    const response = await axios.get("http://localhost:3000/api/karyawan");

    if (response.status === 200) {
      setListKaryawan(response?.data?.data);
    }
  };

  const handleSubmit = () => {
    if (Tanggal === "" || karyawan === "" || Status === "") {
      alert("Please isi semua");
    } else {
      postGaji();
    }
  };

  const postGaji = async () => {
    const body = {
      Tanggal: "2024-04-21T12:00:00Z",
      Id_Karyawan: karyawan.id, // 9000000 + 900000 + 900000
      BPJS, // 4% dari Gaji Pokok.
      PPh, // 2% dari Gaji Pokok
      Total_Pendapatan, // Gaji Pokok + Tunjangan Jabatan + Tunjangan Anak
      Total_Potongan, // BPJS + PPh21
      Gaji_Bersih, // Total Pendapatan - Total Potongan
      Id_User: user.id,
    };

    const response = await axios.post("http://localhost:3000/api/gaji", body);

    console.log("res gaji => ", response);

    if (response?.status === 200) {
      // router.push("/karyawan");
      alert("data sudah ditambah");
    }
  };

  return (
    <Layout>
      <div className="flex justify-center h-full">
        <div className="w-[800px] shadow p-8 flex flex-col gap-8 overflow-hidden">
          <div className="w-full pb-4 border-b-4">
            <h4>Transaksi Penggajian</h4>
          </div>
          <div className="flex flex-col gap-4 w-full overflow-y-auto">
            <Input title="ID Gaji" disabled={true} value={idGaji} />
            <Input
              title="Tanggal"
              type="date"
              value={Tanggal}
              onChange={(e) => setTanggal(e)}
              onBlur={(e) =>
                setTanggal(new Date(e.target.value).toISOString().slice(0, 10))
              }
            />
            <Dropdown
              title="Nama Karyawan"
              value={karyawan}
              menus={listKaryawan}
              valueKey="Nama"
              onSet={(item) => {
                const filterJabatan = listJabatan.filter(
                  (filter) => filter.id === item.Id_Jabatan
                );
                setKaryawan(item);
                setJumlah_Anak(item.Jumlah_Anak);
                setStatus(item.Status);
                setTunjangan_Anak(item.Tunjangan_Anak);
                setIdGaji(
                  `TR-${item?.id.toString().padStart(2, "0")}-${moment().format(
                    "MM"
                  )}-${moment().format("YYYY")}`
                );

                setJabatan(filterJabatan[0]);
                setGaji_Pokok(filterJabatan[0].Gaji_Pokok);
                setNama_Jabatan(filterJabatan[0].Nama_Jabatan);
                setTunjangan_Jabatan(filterJabatan[0].Tunjangan_Jabatan);
                setBPJS(filterJabatan[0].Gaji_Pokok * 0.04);
                setPPh(filterJabatan[0].Gaji_Pokok * 0.02);
                setTotal_Pendapatan(
                  filterJabatan[0].Gaji_Pokok +
                    filterJabatan[0].Tunjangan_Jabatan +
                    item.Tunjangan_Anak
                );
                setTotal_Potongan(filterJabatan[0].Gaji_Pokok * 0.06);
                setGaji_Bersih(
                  filterJabatan[0].Gaji_Pokok +
                    filterJabatan[0].Tunjangan_Jabatan +
                    item.Tunjangan_Anak -
                    filterJabatan[0].Gaji_Pokok * 0.06
                );
              }}
            />
            <Input title="Jabatan" disabled={true} value={Nama_Jabatan} />
            <Input title="Gaji Pokok" disabled={true} value={Gaji_Pokok} />
            <Input
              title="Tunjangan Jabatan"
              disabled={true}
              value={Tunjangan_Jabatan}
            />
            <Input title="Status" disabled={true} value={Status} />
            <Input
              title="Jumlah Anak"
              value={Jumlah_Anak}
              disabled={Status?.title === "Kawin" ? false : true}
              type="number"
            />
            <Input
              title="Tunjangan Anak"
              disabled={true}
              value={Tunjangan_Anak}
            />
            <Input title="BPJS" disabled={true} value={BPJS} />
            <Input title="PPh21" disabled={true} value={PPh} />
            <Input
              title="Total Pendapatan"
              disabled={true}
              value={Total_Pendapatan}
            />
            <Input
              title="Total Potongan"
              disabled={true}
              value={Total_Potongan}
            />
            <Input title="Gaji Bersih" disabled={true} value={Gaji_Bersih} />
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

export default Transaksi;
