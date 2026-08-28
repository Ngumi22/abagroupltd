"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "sonner";
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

  function performDelete() {
    setIsDeleting(true);
    const formData = new FormData();
    formData.append("id", projectId);

    startTransition(async () => {
      const result = await deleteProject({ status: "idle" }, formData);
      setIsDeleting(false);

      if (result?.status === "error") {
        toast.error(result.message ?? "Failed to delete project.");
        return;
      }
      toast.success("Project deleted.");
      router.refresh();
    });
  }

  function handleDelete() {
    setIsOpen(false);
    toast("Delete this project?", {
      description: "This action cannot be undone.",
      action: {
        label: "Delete",
        onClick: performDelete,
      },
      cancel: {
        label: "Cancel",
        onClick: () => {},
      },
      duration: 10000,
    });
  }

  function handleStatusToggle() {
    const newStatus =
      currentStatus === "Completed" ? "In progress" : "Completed";
    startTransition(async () => {
      const result = await updateProjectStatus(projectId, newStatus);
      if (result.success) {
        toast.success(
          newStatus === "Completed"
            ? "Marked as completed."
            : "Marked as in progress.",
        );
        router.refresh();
      } else {
        toast.error("Failed to update project status.");
      }
    });
  }

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
