import { useQuery } from "@tanstack/react-query";
import axios from "axios";

interface Me {
  id: string;
  name: string;
  email: string;
}

async function fetchMe(): Promise<Me> {
  const response = await axios.get<Me>("/api/auth/me");
  return response.data;
}

export function useMe() {
  const { data, isLoading } = useQuery({
    queryKey: ["me"],
    queryFn: fetchMe,
    staleTime: 1000 * 60 * 5,
  });

  return { user: data, isLoading };
}