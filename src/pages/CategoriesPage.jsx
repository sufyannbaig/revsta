import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { Link, useNavigate } from 'react-router-dom';
import { useComparison } from "@/hooks/useComparison";
import { base44 } from "@/api/base44Client";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

const categories = [
  { title: "Smart Phones", items: "123 Items", img: "https://media.base44.com/images/public/6a52896674219eaa2fe9325d/763609c48_c29c6530a_c82486de95e67c985ae799a1cecdf7e4e590f3eb.png" },
  { title: "Earbuds", items: "43 Items", img: "https://media.base44.com/images/public/6a52896674219eaa2fe9325d/40d8ea0e5_a53a75456_3c6cad9bd3a8f8ece6f16904d64ae86c5d6e6cc9.png" },
  { title: "Smart Watches", items: "123 Items", img: "https://media.base44.com/images/public/6a52896674219eaa2fe9325d/593a94ac9_bcea72059_f56b4d7fab402b59e6f3fb979112f348e9c1267d.png" },
  { title: "Laptops", items: "123 Items", img: "https://media.base44.com/images/public/6a52896674219eaa2fe9325d/86c3711b1_804d0cef0_fb72e2d09d5d21b1afcb38e948a4e3fe35b33e85.png" },
  { title: "Tablets", items: "123 Items", img: "https://media.base44.com/images/public/6a52896674219eaa2fe9325d/1640280de_a93834e9d_0d26d48f23530d9a87a3fb16ecf123a9ef62d4bc.png" },
  { title: "Smart Phones", items: "123 Items", img: "https://media.base44.com/images/public/6a52896674219eaa2fe9325d/1d1c1f46e_cb49a1da3_7f003c8cc835215949d96f9d4d8b33c3cf285e19.png" },
];

const navLinks = [
  { name: "Home", path: "/", active: false },
  { name: "Products", path: "/ProductsProductLisitng", active: false },
  { name: "Categories", path: "/CategoriesPage", active: true },
];

export default function CategoriesPage() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { comparisonCount } = useComparison();
  const [categoryCounts, setCategoryCounts] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const products = await base44.entities.Product.list();
        const counts = {};
        products.forEach(p => {
          counts[p.category] = (counts[p.category] || 0) + 1;
        });
        setCategoryCounts(counts);
      } catch (e) {
        console.error("Failed to load category counts:", e);
      }
    };
    fetchCounts();
  }, []);

  return (
    <div className="min-h-screen bg-figma-accent font-heading flex flex-col w-full overflow-x-clip">
      <SiteHeader />

      {/* Main Content */}
      <main className="flex-1 w-full max-w-[1440px] mx-auto px-6 lg:px-[clamp(16px,5.2vw,75px)] pt-[clamp(25px,6.9vw,100px)] pb-[clamp(40px,11.1vw,160px)]">
        {/* Header Section */}
        <div className="mb-[clamp(27px,7.6vw,109px)] max-w-2xl">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-[clamp(35px,4.44vw,64px)] font-normal leading-[1.0] text-figma-secondary mb-5"
          >
            Browse by Category
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-[clamp(14px,1.67vw,24px)] font-normal leading-[1.2083] text-figma-text-1"
          >
            Explore products organized by category
          </motion.p>
        </div>

        {/* Category Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {categories.map((category, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, delay: index * 0.1 }}
              onClick={() => navigate('/ProductsProductLisitng')}
              className="relative w-full aspect-[415/533] rounded-[20px] overflow-clip group cursor-pointer bg-figma-primary"
            >
              <img
                src={category.img}
                alt={category.title}
                className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
              />
              {/* Subtle gradient overlay for text readability, inferred from standard practices for white text on images */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-transparent opacity-60 transition-opacity duration-500 group-hover:opacity-80" />

              <div className="absolute bottom-[30px] left-[30px] flex flex-col gap-2 z-10">
                <h3 className="text-[clamp(15px,1.94vw,28px)] font-normal leading-[1.0] text-figma-primary">
                  {category.title}
                </h3>
                <p className="text-figma-20 font-normal leading-figma-20 text-figma-primary opacity-90">
                  {categoryCounts[category.title] || 0} Items
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}