import { BookHeart } from "lucide-react";
import Link from "next/link";
import { getSettings } from "@/lib/settings-store";
import { SITE, FOOTER } from "@/lib/constants";

export async function SiteFooter() {
  const settings = await getSettings();

  return (
    <footer className="w-full bg-[#1A1A1A] text-white/80 border-t border-white/10">
      <div className="container py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-8 mb-12">
           {/* Brand */}
           <div className="space-y-4">
              <div className="flex items-center gap-2">
                 <BookHeart className="h-6 w-6 text-primary" />
                 <span className="text-xl font-bold font-garamond text-white">{FOOTER.brand}</span>
              </div>
              <p className="text-sm leading-relaxed text-white/60 max-w-xs">
                 {FOOTER.tagline}
              </p>
           </div>

           {/* Links */}
           <div className="flex flex-col gap-3 text-sm md:items-end">
             <h3 className="font-semibold text-white mb-2">{FOOTER.legalHeading}</h3>
             <div className="flex flex-col gap-3 md:items-end">
               {settings.footerLinks.map((link, index) => (
                 <Link key={index} href={link.url} className="hover:text-primary transition-colors w-fit">{link.label}</Link>
               ))}
             </div>
           </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-white/40">
           <p>© {new Date().getFullYear()} {SITE.author}. All Rights Reserved.</p>
           <div className="text-center md:text-right">
             <p>{FOOTER.rightsNote}</p>
             <p className="mt-1">{FOOTER.designedBy}</p>
           </div>
        </div>
      </div>
    </footer>
  );
}
