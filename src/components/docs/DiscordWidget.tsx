export function DiscordWidget({ guildId }: { guildId: string }) {
  return (
    <div className="p-4 border rounded-lg bg-card my-4 text-center">
      <h3 className="font-medium text-lg mb-2">Join our Discord</h3>
      <a href={`https://discord.gg/tDUBDCYw9Q`} className="inline-block bg-[#5865F2] hover:bg-[#4752C4] text-white px-4 py-2 rounded-md transition-colors">
        Join Server
      </a>
    </div>
  );
}
