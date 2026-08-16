import type { Service } from "@/lib/types";
import { services } from "@/lib/data";

export async function getServices(): Promise<Service[]> {
  return services;
}
