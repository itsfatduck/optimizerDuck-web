export function GitHubRelease({ repo }: { repo: string }) {
  return (
    <div className="p-6 border rounded-lg bg-card my-4">
      <h3 className="font-semibold text-xl mb-2">Latest Release</h3>
      <a href={`https://github.com/${repo}/releases/latest`} className="inline-block bg-[#3eaf7c] hover:bg-[#328e64] text-white px-4 py-2 rounded-md transition-colors mt-2">
        Download from GitHub
      </a>
    </div>
  );
}
