import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import settingsApi from "@/api/settings.api";

export function useAccountSettings() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["accountSettings"],
    queryFn: async () => await settingsApi.getAccountSettings(),
  });

  return {
    profile: data?.profile,
    security: data?.security,
    notifications: data?.notifications,
    api: data?.api,
    isLoading,
    error,
  };
}

export function useUpdateProfile() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: settingsApi.updateProfile,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["accountSettings"] });
    },
  });
}

export function useUpdateSecurity() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: settingsApi.updateSecurity,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["accountSettings"] });
    },
  });
}

export function useUpdateNotifications() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: settingsApi.updateNotifications,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["accountSettings"] });
    },
  });
}

export function useRotateApiKey() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: settingsApi.rotateApiKey,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["accountSettings"] });
    },
  });
}
