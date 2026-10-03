import React, { useState } from "react";
import { Share2, Facebook, Linkedin, Link2, Check } from "lucide-react";

export default function ShareButtons({ title, url }) {
  const [copied, setCopied] = useState(false);
  const encodedTitle = encodeURIComponent(title);
  const encodedUrl = encodeURIComponent(url);

  const handleCopy = () => {
    navigator.clipboard.writeText(`${title} ${url}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleNativeShare = () => {
    if (navigator.share) {
      navigator.share({ title, url });
    } else {
      handleCopy();
    }
  };

  return (
    <div className="flex items-center gap-2">
      <span className="text-figma-18 font-normal text-figma-text-3 hidden md:inline">Share:</span>
      <a
        href={`https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        className="w-10 h-10 flex items-center justify-center rounded-full bg-figma-primary shadow-sm hover:opacity-80 transition-opacity"
      >
        <svg className="w-4 h-4 text-figma-text-3" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
      </a>
      <a
        href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}&quote=${encodedTitle}`}
        target="_blank"
        rel="noopener noreferrer"
        className="w-10 h-10 flex items-center justify-center rounded-full bg-figma-primary shadow-sm hover:opacity-80 transition-opacity"
      >
        <Facebook className="w-4 h-4 text-figma-text-3" />
      </a>
      <a
        href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        className="w-10 h-10 flex items-center justify-center rounded-full bg-figma-primary shadow-sm hover:opacity-80 transition-opacity"
      >
        <Linkedin className="w-4 h-4 text-figma-text-3" />
      </a>
      <button
        onClick={handleCopy}
        className="w-10 h-10 flex items-center justify-center rounded-full bg-figma-primary shadow-sm hover:opacity-80 transition-opacity"
      >
        {copied ? <Check className="w-4 h-4 text-[#14c686]" /> : <Link2 className="w-4 h-4 text-figma-text-3" />}
      </button>
      <button
        onClick={handleNativeShare}
        className="sm:hidden w-10 h-10 flex items-center justify-center rounded-full bg-[linear-gradient(230.27deg,_rgba(20,198,134,1.00)_0%,_rgba(34,211,238,1.00)_100%)] shadow-sm hover:opacity-90 transition-opacity"
      >
        <Share2 className="w-4 h-4 text-figma-primary" />
      </button>
    </div>
  );
}