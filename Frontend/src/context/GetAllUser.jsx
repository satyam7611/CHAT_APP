import { useEffect, useState } from "react";
import axios from "axios";

const GetAllUser = () => {
  const [allUsers, setAllUser] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getUsers = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          "http://localhost:3000/api/v1/users/getUserProfile",
          {
            withCredentials: true,
          }
        );

        setAllUser(response.data);
      } catch (error) {
        console.log("error while getting users", error.message);
      } finally {
        setLoading(false);
      }
    };

    getUsers();
  }, []);

  return [allUsers, loading];
};

export default GetAllUser;