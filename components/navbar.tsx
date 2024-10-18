'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { EnvVarWarning } from "@/components/env-var-warning";
import { hasEnvVars } from "@/utils/supabase/check-env-vars";

export default function NavBar() {
  const pathname = usePathname();

  return (
    <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
      <div className="w-3/4 flex justify-between items-center p-3 px-5 text-sm">
        {pathname !== '/' && (
          <Link href="/" className="hover:text-primary transition-colors">
              <svg className="h-8 w-8 text-primary"
                   fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"
                      d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/>
              </svg>
          </Link>
        )}
        {!hasEnvVars ? <EnvVarWarning/> : null}
      </div>
    </nav>
  );
}