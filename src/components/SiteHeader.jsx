import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useComparison } from "@/hooks/useComparison";
import { useAuth } from "@/lib/AuthContext";
import HeaderLogo from "@/components/HeaderLogo";

const NAV_LINKS = [
  { name: "Home", path: "/" },
  { name: "Products", path: "/ProductsProductLisitng" },
  { name: "Categories", path: "/CategoriesPage" },
  { name: "Analytics", path: "/Analytics", adminOnly: true },
];

export default function SiteHeader() {
  const navigate = useNavigate();
  const location = useLocation();
  const { comparisonCount } = useComparison();
  const { user } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);

  const isAdmin = user?.role === "admin";
  const visibleNavLinks = NAV_LINKS.filter(link => !link.adminOnly || isAdmin);

  const isActive = (path) => {
    if (path === "/") return location.pathname === "/";
    return location.pathname.startsWith(path);
  };

  const linkClass = (path) =>
    `text-figma-20 font-normal font-heading leading-figma-24 transition-colors ${
      isActive(path) ? "text-[#14c686]" : "text-figma-text-3 hover:text-[#14c686]"
    }`;

  const mobileLinkClass = (path) =>
    `text-2xl font-normal font-heading ${
      isActive(path) ? "text-[#14c686]" : "text-figma-text-3"
    }`;

  return (
    <>
      {/* Top Banner */}
      <div className="w-full min-h-[50px] bg-figma-secondary relative z-40 flex items-center justify-center py-3 px-4">
        <div className="flex items-center gap-3 max-w-[610px] w-full justify-center">
          <span className="w-1.5 h-1.5 bg-[#14c686] rounded-full shrink-0" />
          <p className="text-figma-18 font-normal font-heading leading-figma-22 text-center text-figma-accent truncate">
            Get AI-powered product sentiment analysis from Meta, Reddit, and Quora
          </p>
          <span className="w-1.5 h-1.5 bg-[#14c686] rounded-full shrink-0" />
        </div>
      </div>

      {/* Navigation */}
      <nav className="w-full min-h-[91px] bg-figma-primary sticky top-0 z-50 shadow-sm">
        <div className="max-w-[1440px] mx-auto h-full px-6 lg:px-[clamp(16px,5.3vw,76px)] flex items-center justify-between py-4">
          <Link to="/" className="shrink-0">
            <HeaderLogo />
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-[clamp(16px,3.5vw,50px)]">
            {visibleNavLinks.map((link) => (
              <Link key={link.name} to={link.path} className={linkClass(link.path)}>
                {link.name}
              </Link>
            ))}
          </div>

          {/* Desktop Compare Button */}
          <div className="hidden md:flex items-center relative">
            <button
              onClick={() => navigate("/ComparisonPage0Products")}
              className="flex flex-row justify-center items-center gap-2.5 py-[15px] px-[30px] bg-figma-accent rounded-[32px] min-h-[54px] hover:bg-gray-200 transition-colors"
            >
              <span className="text-figma-20 font-normal font-heading leading-figma-24 text-figma-text-1">
                Compare Products
              </span>
            </button>
            <div className="absolute -top-1 -right-1 w-[26px] min-h-[26px] bg-[linear-gradient(230.27deg,_rgba(20,198,134,1.00)_0%,_rgba(34,211,238,1.00)_100%)] rounded-full flex items-center justify-center shadow-sm">
              <span className="text-figma-18 font-normal font-heading leading-figma-22 text-figma-primary">
                {comparisonCount}
              </span>
            </div>
          </div>

          {/* Mobile Menu */}
          <div className="md:hidden">
            <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
              <SheetTrigger asChild>
                <button className="p-2 text-figma-text-1">
                  <Menu size={28} />
                </button>
              </SheetTrigger>
              <SheetContent side="right" className="w-full max-w-[300px] bg-figma-primary flex flex-col gap-8 pt-16">
                {visibleNavLinks.map((link) => (
                  <Link
                    key={link.name}
                    to={link.path}
                    onClick={() => setMobileOpen(false)}
                    className={mobileLinkClass(link.path)}
                  >
                    {link.name}
                  </Link>
                ))}
                <button
                  onClick={() => {
                    setMobileOpen(false);
                    navigate("/ComparisonPage0Products");
                  }}
                  className="mt-auto flex flex-row justify-center items-center gap-2.5 py-[15px] px-[30px] bg-figma-accent rounded-[32px] min-h-[54px] relative w-full"
                >
                  <span className="text-figma-20 font-normal font-heading leading-figma-24 text-figma-text-1">
                    Compare Products
                  </span>
                  <div className="absolute -top-2 -right-2 w-[26px] min-h-[26px] bg-[linear-gradient(230.27deg,_rgba(20,198,134,1.00)_0%,_rgba(34,211,238,1.00)_100%)] rounded-full flex items-center justify-center">
                    <span className="text-figma-18 font-normal font-heading leading-figma-22 text-figma-primary">
                      {comparisonCount}
                    </span>
                  </div>
                </button>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </nav>
    </>
  );
}