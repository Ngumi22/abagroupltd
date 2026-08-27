"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import { Table } from "@tiptap/extension-table";
import TableRow from "@tiptap/extension-table-row";
import TableCell from "@tiptap/extension-table-cell";
import TableHeader from "@tiptap/extension-table-header";
import { TiptapToolbar, type UploadResource } from "./tiptap-toolbar";

interface TiptapEditorProps {
  content: string;
  onChange: (html: string) => void;
  resource: UploadResource;
  imageFolder?: string;
}

export function TiptapEditor({
  content,
  onChange,
  resource,
  imageFolder = "/blog/content",
}: TiptapEditorProps) {
  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit,
      Link.configure({
        openOnClick: false,
      }),
      Image,
      Table.configure({ resizable: false }),
      TableRow,
      TableHeader,
      TableCell,
    ],
    content,
    editorProps: {
      attributes: {
        class: "tiptap min-h-75 max-w-none px-4 py-3 text-sm outline-none",
      },
    },
    onUpdate: ({ editor }) => onChange(editor.getHTML()),
  });

  if (!editor) return null;

  return (
    <div className="border border-ink/15 bg-white/60">
      <TiptapToolbar editor={editor} folder={imageFolder} resource={resource} />
      <EditorContent editor={editor} />
    </div>
  );
}
