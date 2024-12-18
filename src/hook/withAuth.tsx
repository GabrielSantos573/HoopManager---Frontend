import axios from 'axios';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const useAuth = () => {
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      if (localStorage.getItem("access_token") === null) {
        router.push("/login");
      } else {
        try {
          const { data } = await axios.get("http://localhost:8000/auth/home/", {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            },
          });
        } catch (e) {
          console.log("not auth");
          router.push("/login");
        }
      }
    };

    checkAuth();
  }, [router]);
};

export default useAuth;
