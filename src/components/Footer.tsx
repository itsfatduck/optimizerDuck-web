import Link from 'next/link';
import { Github } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t mt-24 py-12 bg-background">
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h3 className="font-semibold mb-4">Legal</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><a href="https://github.com/itsfatduck/optimizerDuck/blob/master/PRIVACY.md" className="hover:text-foreground">Privacy Policy</a></li>
            <li><a href="https://github.com/itsfatduck/optimizerDuck/blob/master/TERMS.md" className="hover:text-foreground">Terms of Service</a></li>
            <li><a href="https://github.com/itsfatduck/optimizerDuck/blob/master/DISCLAIMER.md" className="hover:text-foreground">Disclaimer</a></li>
            <li><a href="https://github.com/itsfatduck/optimizerDuck/blob/master/LICENSE" className="hover:text-foreground">License</a></li>
          </ul>
        </div>
        <div>
          <h3 className="font-semibold mb-4">Links</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><a href="https://github.com/itsfatduck/optimizerDuck" className="hover:text-foreground">GitHub</a></li>
            <li><a href="https://discord.gg/tDUBDCYw9Q" className="hover:text-foreground">Discord</a></li>
          </ul>
        </div>
      </div>
      <div className="max-w-6xl mx-auto px-4 mt-12 pt-8 border-t flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
        <p>© {new Date().getFullYear()} optimizerDuck Developers. All rights reserved.</p>
        <p>GPL-3.0 Licensed</p>
      </div>
    </footer>
  );
}
