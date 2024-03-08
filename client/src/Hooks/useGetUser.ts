import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../config/axiosInstance";
import constants from "../config/constants";

const useGetUser = () => useQuery({
  queryKey: ['user'],
  queryFn: async () => axiosInstance.get(constants.PROFILE_API)
    .then(({ data }) => data),  
});

export default useGetUser;
