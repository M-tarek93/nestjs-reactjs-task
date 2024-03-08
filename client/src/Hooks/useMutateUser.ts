import { UseMutationOptions, useMutation } from '@tanstack/react-query';
import { AxiosRequestConfig } from 'axios';
import axiosInstance from '../config/axiosInstance';

type mutatePropsType<T> = {
  endpoint: string;
  options?: UseMutationOptions<unknown, ErrorQuery, T>;
  axiosConfig?: AxiosRequestConfig<T>;
};

const useMutateUser = <T>({
  options,
  axiosConfig,
  endpoint,
}: mutatePropsType<T>) =>
  useMutation<unknown, ErrorQuery, T>({
    mutationFn: async (data: T): Promise<unknown> => {
      return axiosInstance.post(endpoint, data, axiosConfig);
    },
    ...options
  });

export default useMutateUser;
