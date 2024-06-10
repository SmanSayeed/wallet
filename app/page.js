"use client";
import Image from "next/image";
import styles from "./page.module.css";
import Layout from "./Components/Layout/Layout";
import DButton from "./Components/Atoms/DButton";
import Link from "next/link";

export default function Home() {
  const handleClick = () => alert("Hello World");
  return (
    <div className="container-fluid">
      <Layout>
        <div className="row">
          <div className="col-md-8 d-flex flex-column justify-content-center align-items-center mx-auto m-5 shadow-lg rounded border p-4 gap-5">
            <h4>Welcome to wallet denomination management system</h4>

            <div className=" col-md-8 mx-auto d-flex justify-content-center align-items-center border rounded p-4 gap-5 my-2">
            <Link href="/login">
              <DButton variant="success" size="md">
                Login
              </DButton>
            </Link>
            <Link href="/reg">
              <DButton variant="success" size="md">
                Registraion
              </DButton>
            </Link>
          </div>
          </div>

          
        </div>
      </Layout>
    </div>
  );
}
