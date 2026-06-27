"use client";

import { useTasks } from "@/hooks/useTasks";

export function AppInitializer() {
  useTasks();
  return null;
}