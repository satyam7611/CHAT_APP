import { useEffect, useState } from "react";
import axios from "axios";
import useConversation from "../stateManageMent/useConversation";

const GetAllUser = () => {
  const [allUsers, setAllUser] = useState([]);
  const [loading, setLoading] = useState(false);
  const { setUnreadCounts } = useConversation();

  useEffect(() => {
    const getUsersAndUnread = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          "http://localhost:3000/api/v1/users/getUserProfile",
          {
            withCredentials: true,
          }
        );
        setAllUser(response.data);

        const unreadResponse = await axios.get(
          "http://localhost:3000/api/message/unread",
          {
            withCredentials: true,
          }
        );
        setUnreadCounts(unreadResponse.data);

      } catch (error) {
        console.log("error while getting users or unread counts", error.message);
      } finally {
        setLoading(false);
      }
    };

    getUsersAndUnread();
  }, [setUnreadCounts]);

  return [allUsers, loading];
};

export default GetAllUser;