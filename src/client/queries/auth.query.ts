import { useMutation } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { MutationOpts } from "@/types/query";

export const useRegister = (opts?: MutationOpts) => {
  return useMutation({
    mutationFn: (payload: Record<string, any>) => api.post("/auth/register", payload),
    onSuccess: opts?.onSuccess,
    onError: opts?.onError,
  });
};

export const useLogin = (opts?: MutationOpts) => {
  return useMutation({
    mutationFn: (payload: Record<string, any>) => api.post("/auth/login", payload),
    onSuccess: opts?.onSuccess,
    onError: opts?.onError,
  });
};
