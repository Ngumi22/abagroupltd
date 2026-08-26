"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  MoreVertical,
  Eye,
  Edit,
  Trash2,
  CheckCircle,
  Clock,
  Loader2,
} from "lucide-react";
import { deleteProject, updateProjectStatus } from "@/lib/actions/projects";

interface ProjectDropdownProps {
  projectId: string;
  projectSlug: string;
  currentStatus: "Completed" | "In progress";
}

export function ProjectDropdown({
  projectId,
  projectSlug,
  currentStatus,
}: ProjectDropdownProps) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this project?")) return;

    setIsDeleting(true);
    const formData = new FormData();
    formData.append("id", projectId);

    startTransition(async () => {
      await deleteProject({ status: "idle" }, formData);
      setIsDeleting(false);
    });
  };

  const handleStatusToggle = async () => {
    const newStatus =
      currentStatus === "Completed" ? "In progress" : "Completed";
    startTransition(async () => {
      const result = await updateProjectStatus(projectId, newStatus);
      if (result.success) {
        router.refresh();
      }
    });
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="rounded-full p-1.5 hover:bg-ink/10 transition-colors"
        aria-label="Project actions"
      >
        <MoreVertical size={18} />
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 top-8 z-20 min-w-45 border border-ink/10 bg-white py-1 shadow-lg">
            <Link
              href={`/admin/projects/${projectSlug}`}
              target="_blank"
              className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-ink/5 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              <Eye size={16} />
              View
            </Link>

            <Link
              href={`/admin/projects/${projectSlug}/edit`}
              className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-ink/5 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              <Edit size={16} />
              Edit
            </Link>

            <button
              onClick={handleStatusToggle}
              disabled={isPending}
              className="flex w-full items-center gap-2 px-4 py-2 text-sm hover:bg-ink/5 transition-colors disabled:opacity-50"
            >
              {isPending ? (
                <Loader2 size={16} className="animate-spin" />
              ) : currentStatus === "Completed" ? (
                <Clock size={16} />
              ) : (
                <CheckCircle size={16} />
              )}
              {currentStatus === "Completed"
                ? "Mark in progress"
                : "Mark completed"}
            </button>

            <hr className="my-1 border-ink/10" />

            <button
              onClick={handleDelete}
              disabled={isDeleting}
              className="flex w-full items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors disabled:opacity-50"
            >
              {isDeleting ? (
                <Loader2 size={16} className="animate-spin" />
              ) : (
                <Trash2 size={16} />
              )}
              Delete
            </button>
          </div>
        </>
      )}
    </div>
  );
}
