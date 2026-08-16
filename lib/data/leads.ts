import type { Lead } from "@/lib/types";
import { leads } from "@/lib/data";

export async function getLeads(): Promise<Lead[]> {
  return leads;
}
