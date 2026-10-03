import React from "react";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

export default function InfoPageLayout({ title, children }) {
  return (
    <div className="min-h-screen bg-figma-accent font-heading flex flex-col">
      <SiteHeader />

      <main className="flex-1 max-w-[800px] mx-auto w-full px-6 py-[clamp(40px,8vw,100px)]">
        <h1 className="text-[clamp(28px,4vw,50px)] font-normal leading-[1.1] text-figma-secondary mb-8">{title}</h1>
        <div className="text-figma-18 leading-relaxed text-figma-text-1 space-y-4">{children}</div>
      </main>

      <SiteFooter />
    </div>
  );
}