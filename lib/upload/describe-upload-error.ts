import {
  ImageKitAbortError,
  ImageKitInvalidRequestError,
  ImageKitServerError,
  ImageKitUploadNetworkError,
} from "@imagekit/next";

export function describeUploadError(err: unknown): string {
  if (err instanceof ImageKitAbortError) return "Upload cancelled.";
  if (err instanceof ImageKitInvalidRequestError)
    return "Invalid file for upload.";
  if (err instanceof ImageKitUploadNetworkError)
    return "Network error — try again.";
  if (err instanceof ImageKitServerError)
    return "Upload server error — try again.";
  return "Upload failed.";
}
