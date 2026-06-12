export function ContributorList({ repo }: { repo: string }) {
  return (
    <div className="p-4 border rounded-lg bg-card text-center my-4">
      <p className="text-sm text-muted-foreground mb-2">Contributors for {repo}</p>
      <a href={`https://github.com/${repo}/graphs/contributors`} className="text-[#3eaf7c] hover:underline">
        View Contributors on GitHub
      </a>
    </div>
  );
}
