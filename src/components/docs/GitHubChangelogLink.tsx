export function GitHubChangelogLink({ repo, text }: { repo: string, text: string }) {
  return (
    <a href={`https://github.com/${repo}/releases`} className="text-[#3eaf7c] hover:underline font-medium inline-block my-2">
      {text}
    </a>
  );
}
