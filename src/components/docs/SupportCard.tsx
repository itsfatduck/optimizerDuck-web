export function SupportCard({ title, description, url, ctaText }: any) {
  return (
    <div className="p-6 border rounded-lg bg-card text-center my-4 shadow-sm">
      <h3 className="font-semibold text-xl mb-2">{title}</h3>
      <p className="text-muted-foreground text-sm mb-4">{description}</p>
      <a href={url} className="inline-block bg-[#FF5E5B] hover:bg-[#E55552] text-white px-4 py-2 rounded-md font-medium transition-colors">
        {ctaText}
      </a>
    </div>
  );
}
