// components/admin/upload/image-uploader.tsx
"use client";

import { useRef, useState } from "react";
import { upload } from "@imagekit/next";
import { ImageIcon, Loader2, RefreshCw, Trash2, Upload } from "lucide-react";
import Image from "next/image";
import { getUploadAuthParams } from "@/lib/upload/get-auth-params";
import { describeUploadError } from "@/lib/upload/describe-upload-error";

interface ImageUploaderProps {
  value?: string;
  onChange: (url: string) => void;
  folder?: string;
  label?: string;
  resource: "blog" | "project" | "branch";
}

export function ImageUploader({
  value,
  onChange,
  folder = "/uploads",
  label = "image",
  resource,
}: ImageUploaderProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [progress, setProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState("");
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  async function handleFileSelect(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;

    setError("");
    setIsUploading(true);
    setProgress(0);

    const localPreview = URL.createObjectURL(file);
    setPreviewUrl(localPreview);

    try {
      const { publicKey, params } = await getUploadAuthParams(1, resource);
      const result = await upload({
        file,
        fileName: file.name,
        token: params[0].token,
        expire: params[0].expire,
        signature: params[0].signature,
        publicKey,
        folder,
        useUniqueFileName: true,
        onProgress: (evt) =>
          setProgress(Math.round((evt.loaded / evt.total) * 100)),
      });
      if (result.url) onChange(result.url);
    } catch (err) {
      setError(describeUploadError(err));
    } finally {
      URL.revokeObjectURL(localPreview);
      setPreviewUrl(null);
      setIsUploading(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  }

  const displaySrc = previewUrl ?? value;
  const hasImage = Boolean(displaySrc);

  return (
    <div>
      <div className="group relative mt-2 aspect-video w-full max-w-sm overflow-hidden border border-ink/15 bg-white/40">
        {hasImage ? (
          <>
            {previewUrl ? (
              <img
                src={previewUrl}
                alt=""
                className="h-full w-full object-cover"
              />
            ) : (
              <Image
                src={value!}
                alt=""
                fill
                sizes="250px"
                className="object-cover"
              />
            )}

            {isUploading ? (
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-ink/60">
                <Loader2 size={22} className="animate-spin text-paper" />
                <div className="w-2/3">
                  <div className="h-1 w-full overflow-hidden bg-paper/25">
                    <div
                      className="h-full bg-bronze transition-all duration-200"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                  <p className="mt-1.5 text-center text-[10px] uppercase tracking-widest text-paper/80">
                    Uploading — {progress}%
                  </p>
                </div>
              </div>
            ) : (
              <div className="absolute inset-0 flex items-center justify-center gap-2 bg-ink/0 opacity-0 transition group-hover:bg-ink/50 group-hover:opacity-100">
                <button
                  type="button"
                  onClick={() => inputRef.current?.click()}
                  className="flex items-center gap-1.5 bg-paper px-3 py-2 text-[10px] uppercase tracking-widest text-ink transition hover:bg-bronze"
                >
                  <RefreshCw size={13} /> Replace
                </button>
                <button
                  type="button"
                  onClick={() => onChange("")}
                  aria-label={`Remove ${label}`}
                  className="flex items-center gap-1.5 bg-paper px-3 py-2 text-[10px] uppercase tracking-widest text-red-700 transition hover:bg-red-50"
                >
                  <Trash2 size={13} />
                </button>
              </div>
            )}
          </>
        ) : (
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            className="flex h-full w-full flex-col items-center justify-center gap-2 border border-dashed border-ink/25 text-ink/40 transition hover:border-bronze-dark hover:text-bronze-dark"
          >
            <ImageIcon size={24} />
            <span className="flex items-center gap-1.5 text-[10px] uppercase tracking-widest">
              <Upload size={12} /> Upload {label}
            </span>
          </button>
        )}
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        className="hidden"
      />
      {error && <p className="mt-1.5 text-[11px] text-red-700">{error}</p>}
    </div>
  );
}
