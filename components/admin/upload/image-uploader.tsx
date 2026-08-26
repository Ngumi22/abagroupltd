"use client";

import { useRef, useState } from "react";
import {
  ImageKitAbortError,
  ImageKitInvalidRequestError,
  ImageKitServerError,
  ImageKitUploadNetworkError,
  upload,
} from "@imagekit/next";
import { Loader2, Upload, X } from "lucide-react";
import Image from "next/image";

interface ImageUploaderProps {
  value?: string;
  onChange: (url: string) => void;
  folder?: string;
  label?: string;
}

async function getAuthParams() {
  const response = await fetch("/api/upload-auth");
  if (!response.ok) throw new Error("Not authorized to upload images.");
  return response.json() as Promise<{
    token: string;
    expire: number;
    signature: string;
    publicKey: string;
  }>;
}

export function ImageUploader({
  value,
  onChange,
  folder = "/uploads",
  label = "image",
}: ImageUploaderProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [progress, setProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState("");

  async function handleFileSelect(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;

    setError("");
    setIsUploading(true);
    setProgress(0);

    try {
      const { token, expire, signature, publicKey } = await getAuthParams();
      const result = await upload({
        file,
        fileName: file.name,
        token,
        expire,
        signature,
        publicKey,
        folder,
        useUniqueFileName: true,
        onProgress: (evt) =>
          setProgress(Math.round((evt.loaded / evt.total) * 100)),
      });
      if (result.url) onChange(result.url);
    } catch (err) {
      if (err instanceof ImageKitAbortError) setError("Upload cancelled.");
      else if (err instanceof ImageKitInvalidRequestError)
        setError("Invalid file for upload.");
      else if (err instanceof ImageKitUploadNetworkError)
        setError("Network error — try again.");
      else if (err instanceof ImageKitServerError)
        setError("Upload server error — try again.");
      else setError("Upload failed.");
    } finally {
      setIsUploading(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  }

  return (
    <div>
      <div className="mt-1 flex items-center gap-3">
        {value && (
          <div className="relative h-16 w-16 shrink-0 overflow-hidden border border-ink/15">
            <Image
              height={400}
              width={400}
              src={value}
              alt=""
              className="h-full w-full object-cover"
            />
            <button
              type="button"
              onClick={() => onChange("")}
              aria-label={`Remove ${label}`}
              className="absolute right-0 top-0 bg-ink/70 p-0.5 text-paper"
            >
              <X size={12} />
            </button>
          </div>
        )}
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={isUploading}
          className="flex items-center gap-2 border border-ink/30 px-3 py-2 text-xs uppercase tracking-widest disabled:opacity-60"
        >
          {isUploading ? (
            <>
              <Loader2 size={14} className="animate-spin" /> {progress}%
            </>
          ) : (
            <>
              <Upload size={14} />{" "}
              {value ? `Replace ${label}` : `Upload ${label}`}
            </>
          )}
        </button>
      </div>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        className="hidden"
      />
      {error && <p className="mt-1 text-[11px] text-red-700">{error}</p>}
    </div>
  );
}
