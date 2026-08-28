interface StatusBadgeProps {
  status: "Completed" | "In progress";
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const styles = {
    Completed: "bg-green-100 text-green-800",
    "In progress": "bg-yellow-100 text-yellow-800",
  };

  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 text-xs font-medium rounded-full ${styles[status]}`}
    >
      {status}
    </span>
  );
}
