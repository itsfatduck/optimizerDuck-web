export function ImagePreview(props: any) {
  return (
    <div className="border rounded-md overflow-hidden my-4 shadow-sm bg-black/5 p-4 flex items-center justify-center">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={props.src} alt={props.alt || "Preview"} className="max-w-full rounded-md" />
    </div>
  );
}
