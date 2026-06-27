import { useRouter } from "next/navigation";
import { useTaskStore } from "@/stores/useTaskStore";

export function useLogout() {
  const router = useRouter();
  const setTasks = useTaskStore((state) => state.setTasks);

  async function logout() {
    await fetch("/api/auth/logout", { method: "POST" });
    setTasks([]);
    router.push("/login");
  }

  return { logout };
}