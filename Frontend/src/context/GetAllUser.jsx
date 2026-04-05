import { useEffect, useState } from "react";
import axiosInstance from "../utils/axiosConfig";
import useConversation from "../stateManageMent/useConversation";

const GetAllUser = () => {
  const [allUsers, setAllUser] = useState([]);
  const [loading, setLoading] = useState(false);
  const { setUnreadCounts } = useConversation();

  useEffect(() => {
    const getUsersAndUnread = async () => {
      setLoading(true);
      try {
        const response = await axiosInstance.get("/api/v1/users/getUserProfile");
        setAllUser(response.data);

        const unreadResponse = await axiosInstance.get("/api/message/unread");
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