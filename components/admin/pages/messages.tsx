import AdminPageFrame from "./AdminPageFrame";

export function MessagesPage() {
  return (
    <AdminPageFrame
      eyebrow="Client communication"
      title="Messages"
      description="Keep client communication visible and organized across active projects."
    >
      <div className="border border-dashed border-ink/20 bg-[#eee9df] p-10 text-center">
        <h2 className="font-serif text-2xl">No unread messages</h2>
        <p className="mt-2 text-sm text-ink/55">
          Your sample inbox is clear. New contact form submissions will appear
          here in a connected version.
        </p>
      </div>
    </AdminPageFrame>
  );
}
