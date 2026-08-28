// app/og-preview/page.tsx
export default function OGPreviewPage() {
  return (
    <div className="min-h-screen bg-paper p-8">
      <h1 className="text-2xl font-serif mb-6">OG Image Preview</h1>
      <div className="border border-ink/10 rounded-lg overflow-hidden shadow-lg">
        <img
          src="/api/og/preview"
          alt="OG Image Preview"
          className="w-full max-w-3xl"
        />
      </div>
      <div className="mt-4 text-sm text-ink/60">
        <p>Dimensions: 1200 × 630</p>
        <p>URL: /api/og/preview</p>
      </div>
    </div>
  );
}
