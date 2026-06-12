export function GitHubChangelog({ repo }: { repo: string }) {
  return (
    <div className="p-4 border rounded-lg bg-card my-4">
      <p className="text-muted-foreground mb-2">View the latest changes and updates for optimizerDuck.</p>
      <a href={`https://github.com/${repo}/releases`} className="text-[#3eaf7c] hover:underline font-medium">
        View full changelog on GitHub
      </a>
    </div>
  );
}
