"use client";

import { useRef, useState } from "react";
import { upload } from "@imagekit/next";
import { Loader2, Plus, X } from "lucide-react";
import Image from "next/image";
import { getUploadAuthParams } from "@/lib/upload/get-auth-params";
import { describeUploadError } from "@/lib/upload/describe-upload-error";

interface GalleryUploaderProps {
  value: string[];
  onChange: (urls: string[]) => void;
  folder?: string;
}

interface PendingItem {
  id: string;
  previewUrl: string;
}

export function GalleryUploader({
  value,
  onChange,
  folder = "/uploads/gallery",
}: GalleryUploaderProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState("");
  const [pending, setPending] = useState<PendingItem[]>([]);

  async function handleFilesSelect(event: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(event.target.files ?? []);
    if (files.length === 0) return;

    setError("");

    const batch: PendingItem[] = files.map((file) => ({
      id: crypto.randomUUID(),
      previewUrl: URL.createObjectURL(file),
    }));
    setPending((prev) => [...prev, ...batch]);
    setIsUploading(true);

    try {
      const { publicKey, params } = await getUploadAuthParams(files.length);

      const results = await Promise.allSettled(
        files.map((file, i) =>
          upload({
            file,
            fileName: file.name,
            token: params[i].token,
            expire: params[i].expire,
            signature: params[i].signature,
            publicKey,
            folder,
            useUniqueFileName: true,
          }),
        ),
      );

      const uploaded: string[] = [];
      let lastFailureMessage = "";
      let failureCount = 0;

      results.forEach((result) => {
        if (result.status === "fulfilled" && result.value.url) {
          uploaded.push(result.value.url);
        } else if (result.status === "rejected") {
          failureCount += 1;
          lastFailureMessage = describeUploadError(result.reason);
        }
      });

      if (uploaded.length > 0) onChange([...value, ...uploaded]);

      if (failureCount > 0) {
        setError(
          failureCount === files.length
            ? lastFailureMessage
            : `${failureCount} of ${files.length} images failed to upload — ${lastFailureMessage}`,
        );
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed.");
    } finally {
      batch.forEach((item) => URL.revokeObjectURL(item.previewUrl));
      setPending((prev) => prev.filter((item) => !batch.includes(item)));
      setIsUploading(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  }

  function removeAt(index: number) {
    onChange(value.filter((_, i) => i !== index));
  }

  return (
    <div>
      <div className="mt-1 flex flex-wrap gap-3">
        {value.map((url, index) => (
          <div
            key={url}
            className="relative h-16 w-16 overflow-hidden border border-ink/15"
          >
            <Image
              height={400}
              width={400}
              src={url}
              alt=""
              className="h-full w-full object-cover"
            />
            <button
              type="button"
              onClick={() => removeAt(index)}
              aria-label="Remove image"
              className="absolute right-0 top-0 bg-ink/70 p-0.5 text-paper"
            >
              <X size={12} />
            </button>
          </div>
        ))}

        {pending.map((item) => (
          <div
            key={item.id}
            className="relative h-16 w-16 overflow-hidden border border-ink/15"
          >
            {/* Local blob preview — not a hosted URL, so plain <img> rather
                than next/image (which can't run it through the optimizer). */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={item.previewUrl}
              alt=""
              className="h-full w-full object-cover opacity-60"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-ink/30">
              <Loader2 size={16} className="animate-spin text-paper" />
            </div>
          </div>
        ))}

        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={isUploading}
          aria-label="Add gallery images"
          className="flex h-16 w-16 items-center justify-center border border-dashed border-ink/30 text-ink/40 disabled:opacity-60"
        >
          {isUploading ? (
            <Loader2 size={16} className="animate-spin" />
          ) : (
            <Plus size={16} />
          )}
        </button>
      </div>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        multiple
        onChange={handleFilesSelect}
        className="hidden"
      />
      {error && <p className="mt-1 text-[11px] text-red-700">{error}</p>}

      {value.map((url) => (
        <input key={url} type="hidden" name="gallery" value={url} />
      ))}
    </div>
  );
}
