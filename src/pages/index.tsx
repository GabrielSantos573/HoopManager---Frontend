import router from "next/router";
import { useEffect } from "react";
import Layout from "../components/Layout";
import useAuth from "../hook/withAuth";

export default function Home() {
  useAuth();

  useEffect(()=> {
    router.push("/");
  })

  return (
    <Layout pag="HOME">
      BEM VINDO
    </Layout>
  );
}
