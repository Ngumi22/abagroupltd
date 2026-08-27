"use client";

import { useRef, useState } from "react";
import type { Editor } from "@tiptap/react";
import { upload } from "@imagekit/next";
import {
  Bold,
  Italic,
  Strikethrough,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  Quote,
  Link as LinkIcon,
  Table as TableIcon,
  ImageIcon,
  Undo,
  Redo,
  Loader2,
} from "lucide-react";
import { getUploadAuthParams } from "@/lib/upload/get-auth-params";
import { describeUploadError } from "@/lib/upload/describe-upload-error";

export type UploadResource = "blog" | "project" | "contactInfo";

function ToolbarButton({
  onClick,
  active,
  disabled,
  label,
  children,
}: {
  onClick: () => void;
  active?: boolean;
  disabled?: boolean;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      aria-pressed={active}
      className={`p-2 transition disabled:opacity-40 ${
        active
          ? "bg-ink text-paper"
          : "text-ink/60 hover:bg-ink/5 hover:text-ink"
      }`}
    >
      {children}
    </button>
  );
}

export function TiptapToolbar({
  editor,
  folder,
  resource,
}: {
  editor: Editor;
  folder: string;
  resource: UploadResource;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState("");

  async function handleImageSelect(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;

    setError("");
    setIsUploading(true);

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
      });
      if (result.url) {
        editor
          .chain()
          .focus()
          .setImage({ src: result.url, alt: file.name })
          .run();
      }
    } catch (err) {
      setError(describeUploadError(err));
    } finally {
      setIsUploading(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  }

  function insertLink() {
    const url = window.prompt("Link URL");
    if (!url) return;
    editor.chain().focus().setLink({ href: url }).run();
  }

  function insertTable() {
    editor
      .chain()
      .focus()
      .insertTable({ rows: 3, cols: 3, withHeaderRow: true })
      .run();
  }

  return (
    <div>
      <div className="flex flex-wrap items-center gap-1 border-b border-ink/15 bg-white/60 p-2">
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBold().run()}
          active={editor.isActive("bold")}
          label="Bold"
        >
          <Bold size={16} />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleItalic().run()}
          active={editor.isActive("italic")}
          label="Italic"
        >
          <Italic size={16} />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleStrike().run()}
          active={editor.isActive("strike")}
          label="Strikethrough"
        >
          <Strikethrough size={16} />
        </ToolbarButton>

        <div className="mx-1 h-5 w-px bg-ink/15" />

        <ToolbarButton
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
          active={editor.isActive("heading", { level: 2 })}
          label="Heading 2"
        >
          <Heading2 size={16} />
        </ToolbarButton>
        <ToolbarButton
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 3 }).run()
          }
          active={editor.isActive("heading", { level: 3 })}
          label="Heading 3"
        >
          <Heading3 size={16} />
        </ToolbarButton>

        <div className="mx-1 h-5 w-px bg-ink/15" />

        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          active={editor.isActive("bulletList")}
          label="Bullet list"
        >
          <List size={16} />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          active={editor.isActive("orderedList")}
          label="Numbered list"
        >
          <ListOrdered size={16} />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          active={editor.isActive("blockquote")}
          label="Quote"
        >
          <Quote size={16} />
        </ToolbarButton>

        <div className="mx-1 h-5 w-px bg-ink/15" />

        <ToolbarButton
          onClick={insertLink}
          active={editor.isActive("link")}
          label="Insert link"
        >
          <LinkIcon size={16} />
        </ToolbarButton>
        <ToolbarButton onClick={insertTable} label="Insert table">
          <TableIcon size={16} />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => inputRef.current?.click()}
          disabled={isUploading}
          label="Insert image"
        >
          {isUploading ? (
            <Loader2 size={16} className="animate-spin" />
          ) : (
            <ImageIcon size={16} />
          )}
        </ToolbarButton>

        <div className="mx-1 h-5 w-px bg-ink/15" />

        <ToolbarButton
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().undo()}
          label="Undo"
        >
          <Undo size={16} />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().redo()}
          label="Redo"
        >
          <Redo size={16} />
        </ToolbarButton>
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={handleImageSelect}
        className="hidden"
      />
      {error && (
        <p className="border-b border-ink/15 bg-white/60 px-2 py-1 text-[11px] text-red-700">
          {error}
        </p>
      )}
    </div>
  );
}
