import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { MutationOpts } from "@/types/query";

interface UseMails {
  month?: number;
}

export const useMails = (params?: UseMails) => {
  return useQuery({
    queryKey: ["mails", params],
    queryFn: () => api.get("/mail").then((res) => res.data),
  });
};

export const useCreateMail = (opts: MutationOpts) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: Record<string, any>) => api.post("/mail", payload),
    onSettled: () => {
      return queryClient.invalidateQueries({ queryKey: ["mails"] });
    },
    onSuccess: opts?.onSuccess,
    onError: opts?.onError,
  });
};

export const useUpdateMail = (opts: MutationOpts) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, ...payload }: Record<string, any>) => api.patch(`/mail/${id}`, payload),
    onSettled: () => {
      return queryClient.invalidateQueries({ queryKey: ["mails"] });
    },
    onSuccess: opts?.onSuccess,
    onError: opts?.onError,
  });
};

export const useDeleteMail = (opts: MutationOpts) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => api.delete(`/mail/${id}`),
    onSettled: () => {
      return queryClient.invalidateQueries({ queryKey: ["mails"] });
    },
    onSuccess: opts?.onSuccess,
    onError: opts?.onError,
  });
};

export const useSendMail = (opts: MutationOpts) => {
  return useMutation({
    mutationFn: (id: string) => api.post(`/mail/${id}/send`),
    onSuccess: opts?.onSuccess,
    onError: opts?.onError,
  });
};
