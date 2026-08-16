import type { ProcessStep } from "@/lib/types";
import { process } from "@/lib/data";

export async function getProcessSteps(): Promise<ProcessStep[]> {
  return process;
}
