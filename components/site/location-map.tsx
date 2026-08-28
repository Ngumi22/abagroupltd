interface LocationMapProps {
  query?: string;
  address?: string;
  className?: string;
}

export function LocationMap({
  query = "Nairobi, Kenya",
  address = "Ruiru, Nairobi, Kenya",
  className = "",
}: LocationMapProps) {
  const mapSrc = `https://www.google.com/maps?q=${encodeURIComponent(query)}&output=embed`;

  return (
    <div className={`border border-ink/10 bg-paper p-2 shadow-sm ${className}`}>
      <div className="relative aspect-video w-full overflow-hidden bg-[#eee9df]">
        <iframe
          title="Location Map"
          src={mapSrc}
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="absolute inset-0 size-full grayscale contrast-125 transition-all duration-500 hover:grayscale-0"
        />
      </div>
      <div className="p-3">
        <p className="text-[10px] uppercase tracking-[.18em] text-bronze-dark">
          Visit Us
        </p>
        <p className="mt-1 text-xs text-ink/70">{address}</p>
      </div>
    </div>
  );
}
