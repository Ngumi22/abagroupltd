export interface UploadAuthParams {
  token: string;
  expire: number;
  signature: string;
}

export interface UploadAuthBatch {
  publicKey: string;
  params: UploadAuthParams[];
}

export async function getUploadAuthParams(
  count: number,
  resource: string,
): Promise<UploadAuthBatch> {
  const response = await fetch(
    `/api/upload-auth?count=${count}&resource=${resource}`,
  );
  if (!response.ok) throw new Error("Not authorized to upload images.");
  return response.json() as Promise<UploadAuthBatch>;
}
