import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, Search } from "lucide-react";
import { Link, useNavigate } from 'react-router-dom';
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { base44 } from "@/api/base44Client";
import { useComparison } from "@/hooks/useComparison";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

const trackCategoryClick = (category) => {
  base44.analytics.track({ eventName: "category_click", properties: { category } });
  if (typeof window.gtag === "function") window.gtag("event", "category_click", { category });
};

// --- Helper Components ---

const FadeIn = ({ children, delay = 0, className="", direction = "up" }) => {
  const directions = {
    up: { y: 40, x: 0 },
    down: { y: -40, x: 0 },
    left: { x: 40, y: 0 },
    right: { x: -40, y: 0 },
    none: { x: 0, y: 0 },
  };

  return (
    <motion.div
      initial={{ opacity: 0, ...directions[direction] }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

const HeaderLogo = () => (
  <div className="relative w-[157px] min-h-[44px] shrink-0">
    <img className="w-[5px] h-[5px] absolute top-0 left-0" src="https://media.base44.com/images/public/6a52896674219eaa2fe9325d/3f42ebe44_83102aa41_157_1672_157_1586.svg" alt="Vector" />
    <img className="w-[5px] h-[5px] absolute top-0 left-1.5" src="https://media.base44.com/images/public/6a52896674219eaa2fe9325d/f21eef14e_4a510e78a_157_1672_157_1594.svg" alt="Vector" />
    <img className="w-[5px] h-[5px] absolute top-0 left-[11px]" src="https://media.base44.com/images/public/6a52896674219eaa2fe9325d/b27dd72b1_85dcd8642_157_1672_157_1602.svg" alt="Vector" />
    <img className="w-[5px] h-[5px] absolute top-0 left-[17px]" src="https://media.base44.com/images/public/6a52896674219eaa2fe9325d/5360d8012_5dca037f4_157_1672_157_1606.svg" alt="Vector" />
    <img className="w-[5px] h-[5px] absolute top-1.5 left-0" src="https://media.base44.com/images/public/6a52896674219eaa2fe9325d/79f4c13f0_286353db1_157_1672_157_1587.svg" alt="Vector" />
    <img className="w-[5px] h-[5px] absolute top-1.5 left-1.5" src="https://media.base44.com/images/public/6a52896674219eaa2fe9325d/af2d40eb7_8006b8eba_157_1672_157_1595.svg" alt="Vector" />
    <img className="w-[5px] h-[5px] absolute top-1.5 left-[11px]" src="https://media.base44.com/images/public/6a52896674219eaa2fe9325d/74f3e3e8b_caa4883c4_157_1672_157_1603.svg" alt="Vector" />
    <img className="w-[5px] h-[5px] absolute top-1.5 left-[17px]" src="https://media.base44.com/images/public/6a52896674219eaa2fe9325d/ae90bd955_cb4afde98_157_1672_157_1607.svg" alt="Vector" />
    <img className="w-[5px] h-[5px] absolute top-1.5 left-[22px]" src="https://media.base44.com/images/public/6a52896674219eaa2fe9325d/bb9e3eb28_1cac3b9ee_157_1672_157_1611.svg" alt="Vector" />
    <img className="w-[5px] h-[5px] absolute top-1.5 left-7" src="https://media.base44.com/images/public/6a52896674219eaa2fe9325d/e3e7c6ef9_1918c73fc_157_1672_157_1617.svg" alt="Vector" />
    <img className="w-[17px] h-[25px] absolute top-[7px] left-[47px]" src="https://media.base44.com/images/public/6a52896674219eaa2fe9325d/eb3b95bb3_310085361_157_1672_157_1580.svg" alt="Vector" />
    <img className="w-4 h-[25px] absolute top-[7px] left-[66px]" src="https://media.base44.com/images/public/6a52896674219eaa2fe9325d/c005c6dee_6af96b157_157_1672_157_1581.svg" alt="Vector" />
    <img className="w-5 h-[25px] absolute top-[7px] left-[84px]" src="https://media.base44.com/images/public/6a52896674219eaa2fe9325d/aa023b7a2_dc0738e78_157_1672_157_1582.svg" alt="Vector" />
    <img className="w-[17px] h-[26px] absolute top-1.5 left-[104px]" src="https://media.base44.com/images/public/6a52896674219eaa2fe9325d/b1db6ce95_7df420198_157_1672_157_1583.svg" alt="Vector" />
    <img className="w-[18px] h-[25px] absolute top-[7px] left-[122px]" src="https://media.base44.com/images/public/6a52896674219eaa2fe9325d/1adad6fad_a33ef8023_157_1672_157_1584.svg" alt="Vector" />
    <img className="w-[19px] h-[25px] absolute top-[7px] left-[138px]" src="https://media.base44.com/images/public/6a52896674219eaa2fe9325d/985fc07c0_aab6d8598_157_1672_157_1585.svg" alt="Vector" />
    <img className="w-[5px] h-[5px] absolute top-[11px] left-0" src="https://media.base44.com/images/public/6a52896674219eaa2fe9325d/1e2ecffaf_bed5db68d_157_1672_157_1588.svg" alt="Vector" />
    <img className="w-[5px] h-[5px] absolute top-[11px] left-1.5" src="https://media.base44.com/images/public/6a52896674219eaa2fe9325d/20fbc082d_9b1ac505a_157_1672_157_1596.svg" alt="Vector" />
    <img className="w-[5px] h-[5px] absolute top-[11px] left-[22px]" src="https://media.base44.com/images/public/6a52896674219eaa2fe9325d/c431485d2_10d39a7ae_157_1672_157_1612.svg" alt="Vector" />
    <img className="w-[5px] h-[5px] absolute top-[11px] left-7" src="https://media.base44.com/images/public/6a52896674219eaa2fe9325d/907909bef_a4838a644_157_1672_157_1618.svg" alt="Vector" />
    <img className="w-[5px] h-[5px] absolute top-[17px] left-0" src="https://media.base44.com/images/public/6a52896674219eaa2fe9325d/125852db6_ccbd09c8f_157_1672_157_1589.svg" alt="Vector" />
    <img className="w-[5px] h-[5px] absolute top-[17px] left-1.5" src="https://media.base44.com/images/public/6a52896674219eaa2fe9325d/78d524443_87721fa90_157_1672_157_1597.svg" alt="Vector" />
    <img className="w-[5px] h-[5px] absolute top-[17px] left-[11px]" src="https://media.base44.com/images/public/6a52896674219eaa2fe9325d/15461c6b7_c78eccc4d_157_1672_157_1604.svg" alt="Vector" />
    <img className="w-[5px] h-[5px] absolute top-[17px] left-[17px]" src="https://media.base44.com/images/public/6a52896674219eaa2fe9325d/04d145eb2_15d19bdb3_157_1672_157_1608.svg" alt="Vector" />
    <img className="w-[5px] h-[5px] absolute top-[17px] left-[22px]" src="https://media.base44.com/images/public/6a52896674219eaa2fe9325d/3d99c035e_45188a603_157_1672_157_1613.svg" alt="Vector" />
    <img className="w-[5px] h-[5px] absolute top-[17px] left-7" src="https://media.base44.com/images/public/6a52896674219eaa2fe9325d/9f6401482_03c6c0033_157_1672_157_1619.svg" alt="Vector" />
    <img className="w-[5px] h-[5px] absolute top-[22px] left-0" src="https://media.base44.com/images/public/6a52896674219eaa2fe9325d/0bbfc094f_69fcc72b0_157_1672_157_1590.svg" alt="Vector" />
    <img className="w-[5px] h-[5px] absolute top-[22px] left-1.5" src="https://media.base44.com/images/public/6a52896674219eaa2fe9325d/4858beb67_228f43e9d_157_1672_157_1598.svg" alt="Vector" />
    <img className="w-[5px] h-[5px] absolute top-[22px] left-[11px]" src="https://media.base44.com/images/public/6a52896674219eaa2fe9325d/f3405af44_430ca1a68_157_1672_157_1605.svg" alt="Vector" />
    <img className="w-[5px] h-[5px] absolute top-[22px] left-[17px]" src="https://media.base44.com/images/public/6a52896674219eaa2fe9325d/41a5096d8_7fed887b9_157_1672_157_1609.svg" alt="Vector" />
    <img className="w-[5px] h-[5px] absolute top-7 left-0" src="https://media.base44.com/images/public/6a52896674219eaa2fe9325d/a6193dcbc_8e25414cc_157_1672_157_1591.svg" alt="Vector" />
    <img className="w-[5px] h-[5px] absolute top-7 left-1.5" src="https://media.base44.com/images/public/6a52896674219eaa2fe9325d/8aff6a278_5db27f279_157_1672_157_1599.svg" alt="Vector" />
    <img className="w-[5px] h-[5px] absolute top-7 left-[17px]" src="https://media.base44.com/images/public/6a52896674219eaa2fe9325d/69c1d8513_155d7493e_157_1672_157_1610.svg" alt="Vector" />
    <img className="w-[5px] h-[5px] absolute top-7 left-[22px]" src="https://media.base44.com/images/public/6a52896674219eaa2fe9325d/59296c177_9760dcafe_157_1672_157_1614.svg" alt="Vector" />
    <img className="w-[5px] h-[5px] absolute top-[34px] left-0" src="https://media.base44.com/images/public/6a52896674219eaa2fe9325d/efb3ec391_f527e9a90_157_1672_157_1592.svg" alt="Vector" />
    <img className="w-[5px] h-[5px] absolute top-[34px] left-1.5" src="https://media.base44.com/images/public/6a52896674219eaa2fe9325d/69d97bfc0_fcb122d70_157_1672_157_1600.svg" alt="Vector" />
    <img className="w-[5px] h-[5px] absolute top-[34px] left-[22px]" src="https://media.base44.com/images/public/6a52896674219eaa2fe9325d/f7c57c0aa_a13f168ed_157_1672_157_1615.svg" alt="Vector" />
    <img className="w-[5px] h-[5px] absolute top-[34px] left-7" src="https://media.base44.com/images/public/6a52896674219eaa2fe9325d/342f5e6d9_dd7bdffa4_157_1672_157_1620.svg" alt="Vector" />
    <img className="w-[5px] h-2 absolute top-[35px] left-14" src="https://media.base44.com/images/public/6a52896674219eaa2fe9325d/e04edcdb6_a64ac5121_157_1672_157_1623.svg" alt="Vector" />
    <img className="w-px h-2 absolute top-[35px] left-[92px]" src="https://media.base44.com/images/public/6a52896674219eaa2fe9325d/091c940f9_130fb08fd_157_1672_157_1630.svg" alt="Vector" />
    <img className="w-px h-2 absolute top-[35px] left-[110px]" src="https://media.base44.com/images/public/6a52896674219eaa2fe9325d/6d6a56374_62d221254_157_1672_157_1634.svg" alt="Vector" />
    <img className="w-[3px] h-[7px] absolute top-9 left-[137px]" src="https://media.base44.com/images/public/6a52896674219eaa2fe9325d/c44529825_f55d6fa9c_157_1672_157_1639.svg" alt="Vector" />
    <img className="w-[5px] h-2 absolute top-[35px] left-[152px]" src="https://media.base44.com/images/public/6a52896674219eaa2fe9325d/bd8e90058_6f46f5f29_157_1672_157_1642.svg" alt="Vector" />
    <img className="w-[5px] h-[5px] absolute top-[39px] left-0" src="https://media.base44.com/images/public/6a52896674219eaa2fe9325d/038c0eef6_859640178_157_1672_157_1593.svg" alt="Vector" />
    <img className="w-[5px] h-[5px] absolute top-[39px] left-1.5" src="https://media.base44.com/images/public/6a52896674219eaa2fe9325d/a02107cd9_64e04b664_157_1672_157_1601.svg" alt="Vector" />
    <img className="w-[5px] h-[5px] absolute top-[39px] left-[22px]" src="https://media.base44.com/images/public/6a52896674219eaa2fe9325d/ba7a2352c_66046aa6f_157_1672_157_1616.svg" alt="Vector" />
    <img className="w-[5px] h-[5px] absolute top-[39px] left-7" src="https://media.base44.com/images/public/6a52896674219eaa2fe9325d/c3e1b4bcc_4e698bf69_157_1672_157_1621.svg" alt="Vector" />
    <img className="w-2 h-1.5 absolute top-[37px] left-[47px]" src="https://media.base44.com/images/public/6a52896674219eaa2fe9325d/a81582060_a69de7fcc_157_1672_157_1622.svg" alt="Vector" />
    <img className="w-[5px] h-1.5 absolute top-[37px] left-[61px]" src="https://media.base44.com/images/public/6a52896674219eaa2fe9325d/48a6dcaed_2764daef6_157_1672_157_1624.svg" alt="Vector" />
    <img className="w-[3px] h-1.5 absolute top-[37px] left-[67px]" src="https://media.base44.com/images/public/6a52896674219eaa2fe9325d/b58175c0e_b7221bd19_157_1672_157_1625.svg" alt="Vector" />
    <img className="w-[5px] h-1.5 absolute top-[37px] left-[70px]" src="https://media.base44.com/images/public/6a52896674219eaa2fe9325d/a1963e12d_079caf04b_157_1672_157_1626.svg" alt="Vector" />
    <img className="w-[3px] h-1.5 absolute top-[37px] left-[78px]" src="https://media.base44.com/images/public/6a52896674219eaa2fe9325d/a73353b5f_acaa287ee_157_1672_157_1627.svg" alt="Vector" />
    <img className="w-[5px] h-1.5 absolute top-[37px] left-[81px]" src="https://media.base44.com/images/public/6a52896674219eaa2fe9325d/ab9db9bb3_a396f856f_157_1672_157_1628.svg" alt="Vector" />
    <img className="w-[5px] h-1.5 absolute top-[37px] left-[86px]" src="https://media.base44.com/images/public/6a52896674219eaa2fe9325d/fdec5c712_c38047ad0_157_1672_157_1629.svg" alt="Vector" />
    <img className="w-[3px] h-1.5 absolute top-[37px] left-24" src="https://media.base44.com/images/public/6a52896674219eaa2fe9325d/a296e8df1_1d524ad66_157_1672_157_1631.svg" alt="Vector" />
    <img className="w-[5px] h-1.5 absolute top-[37px] left-[99px]" src="https://media.base44.com/images/public/6a52896674219eaa2fe9325d/9b672036a_a4065bcbc_157_1672_157_1632.svg" alt="Vector" />
    <img className="w-[5px] h-1.5 absolute top-[37px] left-[105px]" src="https://media.base44.com/images/public/6a52896674219eaa2fe9325d/04f6348dd_fd0ef53d1_157_1672_157_1633.svg" alt="Vector" />
    <img className="w-[5px] h-1.5 absolute top-[37px] left-[112px]" src="https://media.base44.com/images/public/6a52896674219eaa2fe9325d/bd6bb63a9_478c0405c_157_1672_157_1635.svg" alt="Vector" />
    <img className="w-2 h-1.5 absolute top-[37px] left-[117px]" src="https://media.base44.com/images/public/6a52896674219eaa2fe9325d/94b1d902f_2c402cbaa_157_1672_157_1636.svg" alt="Vector" />
    <img className="w-1 h-1.5 absolute top-[37px] left-[125px]" src="https://media.base44.com/images/public/6a52896674219eaa2fe9325d/23a2ce1b1_8d948274d_157_1672_157_1637.svg" alt="Vector" />
    <img className="w-1 h-1.5 absolute top-[37px] left-[133px]" src="https://media.base44.com/images/public/6a52896674219eaa2fe9325d/f6504b003_52145c74c_157_1672_157_1638.svg" alt="Vector" />
    <img className="w-[5px] h-1.5 absolute top-[37px] left-[141px]" src="https://media.base44.com/images/public/6a52896674219eaa2fe9325d/22a52c741_702967b60_157_1672_157_1640.svg" alt="Vector" />
    <img className="w-1 h-1.5 absolute top-[37px] left-[146px]" src="https://media.base44.com/images/public/6a52896674219eaa2fe9325d/90c56954a_b6c0409f4_157_1672_157_1641.svg" alt="Vector" />
  </div>
);

const FooterLogo = () => (
  <div className="relative w-full max-w-[286px] min-h-[80px] shrink-0">
    <img className="w-[9px] h-[9px] absolute top-0 left-0" src="https://media.base44.com/images/public/6a52896674219eaa2fe9325d/3adf6d49b_3bd1fc632_37_869.svg" alt="Vector" />
    <img className="w-[9px] h-[9px] absolute top-0 left-2.5" src="https://media.base44.com/images/public/6a52896674219eaa2fe9325d/40ab12469_c62142875_37_877.svg" alt="Vector" />
    <img className="w-[9px] h-[9px] absolute top-0 left-5" src="https://media.base44.com/images/public/6a52896674219eaa2fe9325d/ca87ad1b4_39eb49c19_37_885.svg" alt="Vector" />
    <img className="w-[9px] h-[9px] absolute top-0 left-[31px]" src="https://media.base44.com/images/public/6a52896674219eaa2fe9325d/362e99585_cd71833aa_37_889.svg" alt="Vector" />
    <img className="w-[9px] h-[9px] absolute top-2.5 left-0" src="https://media.base44.com/images/public/6a52896674219eaa2fe9325d/8696b297f_c75061d47_37_870.svg" alt="Vector" />
    <img className="w-[9px] h-[9px] absolute top-2.5 left-2.5" src="https://media.base44.com/images/public/6a52896674219eaa2fe9325d/f1016a6c0_234422a1e_37_878.svg" alt="Vector" />
    <img className="w-[9px] h-[9px] absolute top-2.5 left-5" src="https://media.base44.com/images/public/6a52896674219eaa2fe9325d/d0f20f68d_080630dfa_37_886.svg" alt="Vector" />
    <img className="w-[9px] h-[9px] absolute top-2.5 left-[31px]" src="https://media.base44.com/images/public/6a52896674219eaa2fe9325d/a3a3407c5_0a1777946_37_890.svg" alt="Vector" />
    <img className="w-[9px] h-[9px] absolute top-2.5 left-[41px]" src="https://media.base44.com/images/public/6a52896674219eaa2fe9325d/04b031208_91232db10_37_894.svg" alt="Vector" />
    <img className="w-[9px] h-[9px] absolute top-2.5 left-[51px]" src="https://media.base44.com/images/public/6a52896674219eaa2fe9325d/01b8496b5_e316ed487_37_900.svg" alt="Vector" />
    <img className="w-[31px] h-[45px] absolute top-3 left-[86px]" src="https://media.base44.com/images/public/6a52896674219eaa2fe9325d/2aa4751c2_bc5772a09_37_863.svg" alt="Vector" />
    <img className="w-7 h-[45px] absolute top-3 left-[120px]" src="https://media.base44.com/images/public/6a52896674219eaa2fe9325d/873545170_3febe663c_37_864.svg" alt="Vector" />
    <img className="w-[35px] h-[45px] absolute top-3 left-[153px]" src="https://media.base44.com/images/public/6a52896674219eaa2fe9325d/5d5c365dc_0a5e600db_37_865.svg" alt="Vector" />
    <img className="w-8 h-[46px] absolute top-3 left-[189px]" src="https://media.base44.com/images/public/6a52896674219eaa2fe9325d/5196d4a81_fd9d66a6d_37_866.svg" alt="Vector" />
    <img className="w-8 h-[45px] absolute top-3 left-[222px]" src="https://media.base44.com/images/public/6a52896674219eaa2fe9325d/565baa2fa_45f78825d_37_867.svg" alt="Vector" />
    <img className="w-[35px] h-[45px] absolute top-3 left-[251px]" src="https://media.base44.com/images/public/6a52896674219eaa2fe9325d/f9f6d57c7_1615554c4_37_868.svg" alt="Vector" />
    <img className="w-[9px] h-[9px] absolute top-5 left-0" src="https://media.base44.com/images/public/6a52896674219eaa2fe9325d/eb4cfac31_0cdb2e94d_37_871.svg" alt="Vector" />
    <img className="w-[9px] h-[9px] absolute top-5 left-2.5" src="https://media.base44.com/images/public/6a52896674219eaa2fe9325d/6696b4fe4_9a2e87568_37_879.svg" alt="Vector" />
    <img className="w-[9px] h-[9px] absolute top-5 left-[41px]" src="https://media.base44.com/images/public/6a52896674219eaa2fe9325d/c8249060c_fc30ac263_37_895.svg" alt="Vector" />
    <img className="w-[9px] h-[9px] absolute top-5 left-[51px]" src="https://media.base44.com/images/public/6a52896674219eaa2fe9325d/34489be1d_72ded558c_37_901.svg" alt="Vector" />
    <img className="w-[9px] h-[9px] absolute top-[30px] left-0" src="https://media.base44.com/images/public/6a52896674219eaa2fe9325d/e5bf4ce2e_7136db27d_37_872.svg" alt="Vector" />
    <img className="w-[9px] h-[9px] absolute top-[30px] left-2.5" src="https://media.base44.com/images/public/6a52896674219eaa2fe9325d/dafe5e966_016d27cd0_37_880.svg" alt="Vector" />
    <img className="w-[9px] h-[9px] absolute top-[30px] left-5" src="https://media.base44.com/images/public/6a52896674219eaa2fe9325d/aafff672d_8709f0204_37_887.svg" alt="Vector" />
    <img className="w-[9px] h-[9px] absolute top-[30px] left-[31px]" src="https://media.base44.com/images/public/6a52896674219eaa2fe9325d/a0bf18889_230ae9126_37_891.svg" alt="Vector" />
    <img className="w-[9px] h-[9px] absolute top-[30px] left-[41px]" src="https://media.base44.com/images/public/6a52896674219eaa2fe9325d/2e1996ae4_954997217_37_896.svg" alt="Vector" />
    <img className="w-[9px] h-[9px] absolute top-[30px] left-[51px]" src="https://media.base44.com/images/public/6a52896674219eaa2fe9325d/6ed604365_7195c4b99_37_902.svg" alt="Vector" />
    <img className="w-[9px] h-[9px] absolute top-[41px] left-0" src="https://media.base44.com/images/public/6a52896674219eaa2fe9325d/4040fe464_3e694fd0d_37_873.svg" alt="Vector" />
    <img className="w-[9px] h-[9px] absolute top-[41px] left-2.5" src="https://media.base44.com/images/public/6a52896674219eaa2fe9325d/e46ce534c_08843cccf_37_881.svg" alt="Vector" />
    <img className="w-[9px] h-[9px] absolute top-[41px] left-5" src="https://media.base44.com/images/public/6a52896674219eaa2fe9325d/1e54b451a_bf8b84b49_37_888.svg" alt="Vector" />
    <img className="w-[9px] h-[9px] absolute top-[41px] left-[31px]" src="https://media.base44.com/images/public/6a52896674219eaa2fe9325d/8c1e43a71_1197fb69f_37_892.svg" alt="Vector" />
    <img className="w-[9px] h-[9px] absolute top-[51px] left-0" src="https://media.base44.com/images/public/6a52896674219eaa2fe9325d/bbbd46258_834976ff4_37_874.svg" alt="Vector" />
    <img className="w-[9px] h-[9px] absolute top-[51px] left-2.5" src="https://media.base44.com/images/public/6a52896674219eaa2fe9325d/071f66a02_e2b633832_37_882.svg" alt="Vector" />
    <img className="w-[9px] h-[9px] absolute top-[51px] left-[31px]" src="https://media.base44.com/images/public/6a52896674219eaa2fe9325d/4c263c391_1f6f2c813_37_893.svg" alt="Vector" />
    <img className="w-[9px] h-[9px] absolute top-[51px] left-[41px]" src="https://media.base44.com/images/public/6a52896674219eaa2fe9325d/b502e720c_134e0c9d7_37_897.svg" alt="Vector" />
    <img className="w-[9px] h-[9px] absolute top-[61px] left-0" src="https://media.base44.com/images/public/6a52896674219eaa2fe9325d/2bf845293_a6fca7fa9_37_875.svg" alt="Vector" />
    <img className="w-[9px] h-[9px] absolute top-[61px] left-2.5" src="https://media.base44.com/images/public/6a52896674219eaa2fe9325d/803900abb_43fd43cfd_37_883.svg" alt="Vector" />
    <img className="w-[9px] h-[9px] absolute top-[61px] left-[41px]" src="https://media.base44.com/images/public/6a52896674219eaa2fe9325d/2cb009b9e_0ea14fd21_37_898.svg" alt="Vector" />
    <img className="w-[9px] h-[9px] absolute top-[61px] left-[51px]" src="https://media.base44.com/images/public/6a52896674219eaa2fe9325d/71cdfa4c5_91b429af7_37_903.svg" alt="Vector" />
    <img className="w-2 h-3.5 absolute top-16 left-[101px]" src="https://media.base44.com/images/public/6a52896674219eaa2fe9325d/d0aec1eb8_7484ad441_37_906.svg" alt="Vector" />
    <img className="w-0.5 h-3.5 absolute top-16 left-[167px]" src="https://media.base44.com/images/public/6a52896674219eaa2fe9325d/8a541a2d7_8045d0922_37_913.svg" alt="Vector" />
    <img className="w-0.5 h-3.5 absolute top-[63px] left-[200px]" src="https://media.base44.com/images/public/6a52896674219eaa2fe9325d/6828ffc6b_cc68b20b3_37_917.svg" alt="Vector" />
    <img className="w-1.5 h-[13px] absolute top-[65px] left-[250px]" src="https://media.base44.com/images/public/6a52896674219eaa2fe9325d/5f58f4adc_c158c7b2c_37_922.svg" alt="Vector" />
    <img className="w-[9px] h-3.5 absolute top-16 left-[276px]" src="https://media.base44.com/images/public/6a52896674219eaa2fe9325d/3ce41f4e5_e5a50746b_37_925.svg" alt="Vector" />
    <img className="w-[9px] h-[9px] absolute top-[71px] left-0" src="https://media.base44.com/images/public/6a52896674219eaa2fe9325d/c2b24015f_b13c2c0d0_37_876.svg" alt="Vector" />
    <img className="w-[9px] h-[9px] absolute top-[71px] left-2.5" src="https://media.base44.com/images/public/6a52896674219eaa2fe9325d/e1e3bd1cd_4ada7b1c7_37_884.svg" alt="Vector" />
    <img className="w-[9px] h-[9px] absolute top-[71px] left-[41px]" src="https://media.base44.com/images/public/6a52896674219eaa2fe9325d/993031e27_b0b225ecf_37_899.svg" alt="Vector" />
    <img className="w-[9px] h-[9px] absolute top-[71px] left-[51px]" src="https://media.base44.com/images/public/6a52896674219eaa2fe9325d/a39ace7c9_fcfc1256a_37_904.svg" alt="Vector" />
    <img className="w-3.5 h-2.5 absolute top-[67px] left-[86px]" src="https://media.base44.com/images/public/6a52896674219eaa2fe9325d/a30ebd87d_b82d23e97_37_905.svg" alt="Vector" />
    <img className="w-[9px] h-[11px] absolute top-[67px] left-[111px]" src="https://media.base44.com/images/public/6a52896674219eaa2fe9325d/b4611b6a3_628f639d4_37_907.svg" alt="Vector" />
    <img className="w-[5px] h-2.5 absolute top-[67px] left-[121px]" src="https://media.base44.com/images/public/6a52896674219eaa2fe9325d/a3213448a_4db61e690_37_908.svg" alt="Vector" />
    <img className="w-[9px] h-[11px] absolute top-[67px] left-[127px]" src="https://media.base44.com/images/public/6a52896674219eaa2fe9325d/83c170e96_7de82b131_37_909.svg" alt="Vector" />
    <img className="w-[5px] h-2.5 absolute top-[67px] left-[142px]" src="https://media.base44.com/images/public/6a52896674219eaa2fe9325d/a1fa9eb33_d0ac0597f_37_910.svg" alt="Vector" />
    <img className="w-[9px] h-[11px] absolute top-[67px] left-[147px]" src="https://media.base44.com/images/public/6a52896674219eaa2fe9325d/120412f11_19bbfefc3_37_911.svg" alt="Vector" />
    <img className="w-2 h-[11px] absolute top-[67px] left-[157px]" src="https://media.base44.com/images/public/6a52896674219eaa2fe9325d/150a30be5_c0bb2bcc1_37_912.svg" alt="Vector" />
    <img className="w-[5px] h-2.5 absolute top-[67px] left-[175px]" src="https://media.base44.com/images/public/6a52896674219eaa2fe9325d/546d2ef33_2105c2e43_37_914.svg" alt="Vector" />
    <img className="w-[9px] h-[11px] absolute top-[67px] left-[181px]" src="https://media.base44.com/images/public/6a52896674219eaa2fe9325d/59e5c453f_a56b94829_37_915.svg" alt="Vector" />
    <img className="w-[9px] h-2.5 absolute top-[67px] left-[190px]" src="https://media.base44.com/images/public/6a52896674219eaa2fe9325d/36f611fdc_68bc4cd01_37_916.svg" alt="Vector" />
    <img className="w-[9px] h-[11px] absolute top-[67px] left-[204px]" src="https://media.base44.com/images/public/6a52896674219eaa2fe9325d/859c45169_4d840b239_37_918.svg" alt="Vector" />
    <img className="w-3.5 h-2.5 absolute top-[67px] left-[213px]" src="https://media.base44.com/images/public/6a52896674219eaa2fe9325d/4eace3a93_7339d7e3b_37_919.svg" alt="Vector" />
    <img className="w-2 h-[11px] absolute top-[67px] left-[228px]" src="https://media.base44.com/images/public/6a52896674219eaa2fe9325d/4fd45a5a8_20dd35837_37_920.svg" alt="Vector" />
    <img className="w-2 h-[11px] absolute top-[67px] left-[241px]" src="https://media.base44.com/images/public/6a52896674219eaa2fe9325d/bfd4e98eb_5929b323a_37_921.svg" alt="Vector" />
    <img className="w-2 h-[11px] absolute top-[67px] left-[256px]" src="https://media.base44.com/images/public/6a52896674219eaa2fe9325d/2b971968e_b81496bc1_37_923.svg" alt="Vector" />
    <img className="w-2 h-2.5 absolute top-[67px] left-[266px]" src="https://media.base44.com/images/public/6a52896674219eaa2fe9325d/6f64f550c_963890e9a_37_924.svg" alt="Vector" />
  </div>
);

const ProductCard = ({ product, badge, delay }) => {
  const navigate = useNavigate();
  const { comparisonIds, addToCompare, removeFromCompare } = useComparison();
  return (
  <FadeIn delay={delay} className="w-full max-w-[308px] mx-auto">
    <div onClick={() => navigate(`/ProductDetail/${product.id}`)} className="bg-background rounded-[20px] w-full min-h-[469px] relative flex flex-col p-2.5 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
      <div className="relative w-full h-[280px] rounded-[10px] overflow-clip bg-white flex items-center justify-center p-3 mb-4">
        <img className="w-full h-full object-contain" src={product.image_url} alt={product.name} />
        <div className="absolute top-5 left-6 flex flex-row justify-start items-center gap-2.5 py-[5px] px-[10px] min-h-[22px] bg-primary rounded-[20px]">
          <p className="text-figma-12 font-normal font-heading leading-figma-12 text-center text-figma-text-1 shrink-0 grow-0 w-auto h-auto">
            {badge}
          </p>
        </div>
      </div>

      <div className="px-1.5 flex-1 flex flex-col relative">
        <p className="text-figma-16 font-normal font-heading leading-figma-16 text-figma-text-1 mb-1">{product.brand}</p>
        <p className="text-figma-18 font-normal font-heading leading-figma-18 text-figma-text-2 mb-3 line-clamp-1">{product.name}</p>

        <div className="flex justify-between items-end mb-4">
          <div>
            <p className="text-figma-20 font-normal font-heading leading-figma-20 text-figma-text-2">
              <span className="text-figma-22 text-[#14c686]">{product.sentiment_score}</span>
              <span className="text-[#14c686]"> </span>
              <span className="text-figma-18">/10</span>
            </p>
            <p className="text-figma-14 font-light font-heading leading-figma-14 text-figma-text-1 mt-1">Sentiment</p>
          </div>
          <p className="text-figma-14 font-light font-heading leading-figma-14 text-right text-figma-text-1 max-w-[82px]">
            Based on:<br/>
            <span className="font-normal text-[#262628]">{product.total_reviews} Reviews</span>
          </p>
        </div>

        <div className="flex flex-row justify-between items-center gap-2.5 mt-auto" onClick={(e) => e.stopPropagation()}>
          <a href={product.affiliate_url} target="_blank" rel="noopener noreferrer" className="flex-1 flex flex-row justify-center items-center py-2.5 px-5 h-[39px] bg-[linear-gradient(230.27deg,_rgba(20,198,134,1.00)_0%,_rgba(34,211,238,1.00)_100%)] rounded-[32px] hover:opacity-90 transition-opacity">
            <p className="text-figma-16 font-normal font-heading leading-figma-19 text-primary shrink-0 grow-0 w-auto h-auto">Buy Now</p>
          </a>
          <button onClick={() => comparisonIds.includes(product.id) ? removeFromCompare(product.id) : addToCompare(product)} className={`flex-1 flex flex-row justify-center items-center py-2.5 px-5 h-[39px] rounded-[32px] transition-colors ${comparisonIds.includes(product.id) ? 'bg-[#dc2626] hover:bg-[#b91c1c]' : 'shadow-[inset_0_0_0_1px_#757575] hover:bg-gray-50'}`}>
            <p className={`text-figma-16 font-normal font-heading leading-figma-19 shrink-0 grow-0 w-auto h-auto whitespace-nowrap ${comparisonIds.includes(product.id) ? 'text-figma-primary' : 'text-figma-text-3'}`}>{comparisonIds.includes(product.id) ? 'Remove' : 'Add to compare'}</p>
          </button>
        </div>
      </div>
    </div>
  </FadeIn>
  );
};

const CategoryCard = ({ title, items, image, delay, onClick }) => (
  <FadeIn delay={delay} className="w-full max-w-[415px] mx-auto">
    <div onClick={onClick} className="relative w-full aspect-[415/533] rounded-[20px] overflow-clip group cursor-pointer">
      <img className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700" src={image} alt={title} />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />
      <div className="absolute bottom-[60px] left-[30px] z-10">
        <p className="text-[clamp(15px,1.94vw,28px)] font-normal font-heading leading-[1.0] text-primary mb-2">{title}</p>
        <p className="text-figma-20 font-normal font-heading leading-figma-20 text-primary">{items} Items</p>
      </div>
    </div>
  </FadeIn>
);

const TrustCard = ({ title, desc, icon, delay }) => (
  <FadeIn delay={delay} className="w-full max-w-[417px] mx-auto mt-[clamp(16px,2.4vw,35px)]">
    <div className="relative bg-primary rounded-[20px] w-full min-h-[166px] flex flex-col items-center justify-center px-6 text-center shadow-sm">
      <div className="absolute -top-[35px] left-1/2 -translate-x-1/2 w-[70px] min-h-[70px] bg-[linear-gradient(230.27deg,_rgba(20,198,134,1.00)_0%,_rgba(34,211,238,1.00)_100%)] rounded-full flex items-center justify-center shadow-md">
        <img className="w-9 h-9" src={icon} alt={title} />
      </div>
      <p className="text-figma-22 font-normal font-heading leading-figma-27 text-figma-text-2 mt-6 mb-3">{title}</p>
      <p className="text-figma-18 font-normal font-heading leading-figma-22 text-figma-text-1 max-w-[320px]">{desc}</p>
    </div>
  </FadeIn>
);

// --- Main Page Component ---

export default function Home() {
  const navigate = useNavigate();
  const [trendingProducts, setTrendingProducts] = useState([]);
  const [topRatedProducts, setTopRatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const { comparisonCount } = useComparison();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const trending = await base44.entities.Product.filter({ trending: true }, '-sentiment_score', 4);
        const topRated = await base44.entities.Product.filter({ top_rated: true }, '-sentiment_score', 4);
        setTrendingProducts(trending);
        setTopRatedProducts(topRated);
      } catch (e) {
        console.error("Failed to load products:", e);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const handleSearch = () => {
    if (searchQuery.trim()) {
      navigate(`/ProductsProductLisitng?search=${encodeURIComponent(searchQuery)}`);
    } else {
      navigate('/ProductsProductLisitng');
    }
  };

  return (
    <main className="w-full min-h-screen bg-background font-heading overflow-x-clip relative">

      <SiteHeader />

      {/* Hero Section */}
      <section className="relative w-full max-w-[1440px] mx-auto min-h-[700px] pt-[clamp(37px,10.3vw,148px)] pb-20 px-6 lg:px-[clamp(16px,5.3vw,76px)] flex flex-col lg:flex-row items-center justify-between gap-12 overflow-clip">
        {/* Abstract Background Pattern (Simplified representation of the massive vector dump) */}
        <div className="absolute top-[-150px] left-[10%] w-full max-w-[1087px] min-h-[1437px] opacity-40 pointer-events-none z-0 hidden lg:block">
           <img className="w-full h-full object-contain" src="https://media.base44.com/images/public/6a52896674219eaa2fe9325d/a2dba9059_8c0ff8091_37_550.svg" alt="Background Pattern" style={{ filter: 'blur(40px)' }} />
        </div>

        {/* Left Content */}
        <div className="relative z-10 w-full max-w-[743px] flex flex-col gap-8">
          <FadeIn>
            <h1 className="text-[clamp(35px,4.44vw,64px)] font-medium font-heading leading-[1.0] text-accent max-w-[465px]">
              <span className="font-normal">Where Real</span> <span className="font-normal">Reviews Stand</span>
            </h1>
          </FadeIn>

          <FadeIn delay={0.1}>
            <p className="text-[clamp(14px,1.67vw,24px)] font-normal font-heading leading-[1.2083] text-figma-text-1 max-w-[712px]">
              AI-powered product sentiment analysis from Meta, Reddit, and Quora
            </p>
          </FadeIn>

          <FadeIn delay={0.2} className="w-full max-w-[526px] relative mt-4">
            <div className="w-full min-h-[54px] bg-primary rounded-[50px] flex items-center px-4 shadow-sm border border-gray-100 focus-within:ring-2 ring-[#14c686]/20 transition-all">
              <input
                type="text"
                placeholder="Search for products (e.g., Iphone 15, earbuds etc)"
                className="flex-1 bg-transparent border-none outline-none text-figma-18 font-normal font-heading text-figma-text-4 placeholder:text-figma-text-4/60 h-full"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              />
              <button onClick={handleSearch} className="absolute right-0 top-0 h-[54px] flex flex-row justify-center items-center gap-2.5 py-[15px] px-[30px] bg-[#14c686] rounded-[32px] hover:bg-[#12b379] transition-colors">
                <Search className="w-5 h-5 text-primary" />
                <span className="text-figma-20 font-normal font-heading leading-figma-24 text-primary hidden sm:block">Search</span>
              </button>
            </div>
          </FadeIn>

          <FadeIn delay={0.25} className="mt-2">
            <Link to="/RequestProduct" className="text-figma-16 text-figma-text-1 hover:text-[#14c686] transition-colors">
              Can't find what you're looking for? Request a product →
            </Link>
          </FadeIn>

          <FadeIn delay={0.3} className="w-full max-w-[743px] mt-6">
            <img className="w-full h-px mb-5" src="https://media.base44.com/images/public/6a52896674219eaa2fe9325d/77cb7b013_23ffbd1b5_35_437.svg" alt="Divider" />
            <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
              <div className="flex items-center gap-2.5">
                <img className="w-[19px] h-[13px]" src="https://media.base44.com/images/public/6a52896674219eaa2fe9325d/75284aced_1805546bb_35_338.svg" alt="Check" />
                <span className="text-figma-22 font-normal font-heading leading-figma-27 text-figma-text-1">Multi-Platform Analysis</span>
              </div>
              <div className="flex items-center gap-2.5">
                <img className="w-[19px] h-[13px]" src="https://media.base44.com/images/public/6a52896674219eaa2fe9325d/fbe96f6ae_2ee425692_35_342.svg" alt="Check" />
                <span className="text-figma-22 font-normal font-heading leading-figma-27 text-figma-text-1">AI-Powered Insights</span>
              </div>
              <div className="flex items-center gap-2.5">
                <img className="w-[19px] h-[13px]" src="https://media.base44.com/images/public/6a52896674219eaa2fe9325d/53dbb47f4_57fae3497_35_346.svg" alt="Check" />
                <span className="text-figma-22 font-normal font-heading leading-figma-27 text-figma-text-1">Real-Time Updates</span>
              </div>
            </div>
            <img className="w-full h-px mt-6" src="https://media.base44.com/images/public/6a52896674219eaa2fe9325d/0318d09c1_2b768c3da_35_440.svg" alt="Divider" />
          </FadeIn>
        </div>

        {/* Right Collage (Parametric/Absolute layout made fluid) */}
        <FadeIn delay={0.4} direction="left" className="relative z-10 w-full max-w-[486px] aspect-[486/506] mx-auto lg:mx-0 mt-12 lg:mt-0">
          <div className="absolute inset-0">
            {/* Back Card */}
            <div className="absolute top-[4.7%] left-[4.5%] w-[54.5%] h-[56.7%] bg-primary rounded-[30px] shadow-sm" />
            <img className="absolute top-[6.7%] left-[6.5%] w-[50.6%] h-[52.7%] rounded-[20px] object-cover" src="https://media.base44.com/images/public/6a52896674219eaa2fe9325d/6d8046f39_65866fde2_0d26d48f23530d9a87a3fb16ecf123a9ef62d4bc.png" alt="Products" />

            {/* Front Card */}
            <div className="absolute top-[36.9%] left-[38.2%] w-[54.5%] h-[56.7%] bg-primary rounded-[30px] shadow-lg" />
            <img className="absolute top-[38.9%] left-[40.3%] w-[50.6%] h-[52.7%] rounded-[20px] object-cover" src="https://media.base44.com/images/public/6a52896674219eaa2fe9325d/a128b3390_66f7460a3_f56b4d7fab402b59e6f3fb979112f348e9c1267d.png" alt="Products" />

            {/* Floating Avatars */}
            <motion.img animate={{ y: [0, -10, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }} className="absolute top-[0.6%] left-[37.4%] w-[9%] h-[8.7%] rounded-full border-[3px] border-primary object-cover z-20" src="https://media.base44.com/images/public/6a52896674219eaa2fe9325d/6311a4fc3_d94e9e72d_e65070d8e961d0c927eb863a22bed2410c371c27.png" alt="Avatar" />
            <motion.img animate={{ y: [0, 10, 0] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }} className="absolute top-[30.4%] left-[1%] w-[9%] h-[8.7%] rounded-full border-[3px] border-primary object-cover z-20" src="https://media.base44.com/images/public/6a52896674219eaa2fe9325d/3fcd15c90_f4d9daa4f_f41ec5367ab0a330472016237e054a063e4911c4.png" alt="Avatar" />
            <motion.img animate={{ y: [0, -8, 0] }} transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 2 }} className="absolute top-[39.9%] left-[83.1%] w-[9%] h-[8.7%] rounded-full border-[3px] border-primary object-cover z-20" src="https://media.base44.com/images/public/6a52896674219eaa2fe9325d/f21b7c90d_937ab48bd_6559b1c0ba250f060a67c87a5a6708133144b569.png" alt="Avatar" />
            <motion.img animate={{ y: [0, 12, 0] }} transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }} className="absolute top-[51.7%] left-[36.8%] w-[9%] h-[8.7%] rounded-full border-[3px] border-primary object-cover z-20" src="https://media.base44.com/images/public/6a52896674219eaa2fe9325d/9684a0039_517841726_e7564c8ec49544a1d5ba7c0acfaccb81e23721b5.png" alt="Avatar" />
            <motion.img animate={{ y: [0, -15, 0] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1.5 }} className="absolute top-[50.5%] left-[40.7%] w-[9%] h-[8.7%] rounded-full border-[4px] border-muted shadow-[0px_4px_20px_0px_rgba(0,0,0,0.10)] object-cover z-10" src="https://media.base44.com/images/public/6a52896674219eaa2fe9325d/b7d3e627a_11e9d0aa9_ff7f8a430e52f3efb4bd86bef68ec2fdfc518203.png" alt="Avatar" />
            <motion.img animate={{ y: [0, 8, 0] }} transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut", delay: 2.5 }} className="absolute top-[89.1%] left-[62.7%] w-[9%] h-[8.7%] rounded-full border-[3px] border-primary shadow-[0px_4px_20px_0px_rgba(0,0,0,0.10)] object-cover z-20" src="https://media.base44.com/images/public/6a52896674219eaa2fe9325d/e3cc1ad62_19278f2c1_f02fa1df101295fe62868207970c6d2374403fd5.png" alt="Avatar" />
          </div>
        </FadeIn>
      </section>

      {/* Trending Products Section */}
      <section className="w-full bg-primary py-24 relative z-20">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-[clamp(16px,5.2vw,75px)]">
          <FadeIn>
            <h2 className="text-[clamp(28px,3.47vw,50px)] font-normal font-heading leading-[1.0] text-center text-accent mb-16">Trending Products</h2>
          </FadeIn>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-[clamp(16px,3vw,43px)]">
            {loading ? (
              <p className="col-span-full text-center text-figma-text-1 py-8">Loading trending products...</p>
            ) : trendingProducts.length === 0 ? (
              <p className="col-span-full text-center text-figma-text-1 py-8">No trending products found.</p>
            ) : (
              trendingProducts.map((p, i) => (
                <ProductCard key={p.id} product={p} badge="🔥 Trending" delay={0.1 * (i + 1)} />
              ))
            )}
          </div>

          <FadeIn delay={0.5} className="flex justify-center mt-16">
            <button onClick={() => navigate('/ProductsProductLisitng')} className="flex flex-row justify-center items-center gap-2.5 py-[15px] px-[30px] rounded-[32px] shadow-[inset_0_0_0_1px_#09090a] min-h-[54px] hover:bg-gray-50 transition-colors">
              <span className="text-figma-20 font-normal font-heading leading-figma-24 text-accent">View All</span>
            </button>
          </FadeIn>

          <FadeIn delay={0.5} className="flex justify-center mt-16">
            <button className="flex flex-row justify-center items-center gap-2.5 py-[15px] px-[30px] rounded-[32px] shadow-[inset_0_0_0_1px_#09090a] min-h-[54px] hover:bg-gray-50 transition-colors">
              <span className="text-figma-20 font-normal font-heading leading-figma-24 text-accent">View All</span>
            </button>
          </FadeIn>
        </div>
      </section>

      {/* Popular Categories Section */}
      <section className="w-full py-24 relative z-20">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-[clamp(16px,5.3vw,77px)]">
          <FadeIn>
            <h2 className="text-[clamp(28px,3.47vw,50px)] font-normal font-heading leading-[1.0] text-center text-accent mb-16">Popular Categories</h2>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            <CategoryCard title="Smart Phones" items="123" image="https://media.base44.com/images/public/6a52896674219eaa2fe9325d/339b3fcd6_de39a96d5_c82486de95e67c985ae799a1cecdf7e4e590f3eb.png" delay={0.1} onClick={() => { trackCategoryClick("Smart Phones"); navigate('/ProductsProductLisitng?category=Smart%20Phones'); }} />
            <CategoryCard title="Earbuds" items="43" image="https://media.base44.com/images/public/6a52896674219eaa2fe9325d/8803c2da3_d7fd7eb91_3c6cad9bd3a8f8ece6f16904d64ae86c5d6e6cc9.png" delay={0.2} onClick={() => { trackCategoryClick("Earbuds"); navigate('/ProductsProductLisitng?category=Earbuds'); }} />
            <CategoryCard title="Smart Watches" items="123" image="https://media.base44.com/images/public/6a52896674219eaa2fe9325d/a128b3390_66f7460a3_f56b4d7fab402b59e6f3fb979112f348e9c1267d.png" delay={0.3} onClick={() => { trackCategoryClick("Smart Watches"); navigate('/ProductsProductLisitng?category=Smart%20Watches'); }} />
            <CategoryCard title="Laptops" items="123" image="https://media.base44.com/images/public/6a52896674219eaa2fe9325d/d1945fb46_0268d7070_fb72e2d09d5d21b1afcb38e948a4e3fe35b33e85.png" delay={0.4} onClick={() => { trackCategoryClick("Laptops"); navigate('/ProductsProductLisitng?category=Laptops'); }} />
            <CategoryCard title="Tablets" items="123" image="https://media.base44.com/images/public/6a52896674219eaa2fe9325d/6d8046f39_65866fde2_0d26d48f23530d9a87a3fb16ecf123a9ef62d4bc.png" delay={0.5} onClick={() => { trackCategoryClick("Tablets"); navigate('/ProductsProductLisitng?category=Tablets'); }} />
            <CategoryCard title="Accessories" items="132" image="https://media.base44.com/images/public/6a52896674219eaa2fe9325d/4d569975b_b1c65fea0_7f003c8cc835215949d96f9d4d8b33c3cf285e19.png" delay={0.6} onClick={() => { trackCategoryClick("Accessories"); navigate('/ProductsProductLisitng?category=Accessories'); }} />
          </div>
        </div>
      </section>

      {/* Top Rated Products Section */}
      <section className="w-full bg-primary py-24 relative z-20">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-[clamp(16px,5.2vw,75px)]">
          <FadeIn>
            <h2 className="text-[clamp(28px,3.47vw,50px)] font-normal font-heading leading-[1.0] text-center text-accent mb-16">Top Rated Products</h2>
          </FadeIn>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-[clamp(16px,3vw,43px)]">
            {loading ? (
              <p className="col-span-full text-center text-figma-text-1 py-8">Loading top rated products...</p>
            ) : topRatedProducts.length === 0 ? (
              <p className="col-span-full text-center text-figma-text-1 py-8">No top rated products found.</p>
            ) : (
              topRatedProducts.map((p, i) => (
                <ProductCard key={p.id} product={p} badge="⭐ Top Rated" delay={0.1 * (i + 1)} />
              ))
            )}
          </div>

          <FadeIn delay={0.5} className="flex justify-center mt-16">
            <button onClick={() => navigate('/ProductsProductLisitng')} className="flex flex-row justify-center items-center gap-2.5 py-[15px] px-[30px] rounded-[32px] shadow-[inset_0_0_0_1px_#09090a] min-h-[54px] hover:bg-gray-50 transition-colors">
              <span className="text-figma-20 font-normal font-heading leading-figma-24 text-accent">View All</span>
            </button>
          </FadeIn>
        </div>
      </section>

      {/* Why Trust Revsta Section */}
      <section className="w-full py-24 relative z-20">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-[clamp(16px,5.2vw,75px)]">
          <FadeIn>
            <h2 className="text-[clamp(28px,3.47vw,50px)] font-normal font-heading leading-[1.0] text-center text-accent mb-20">Why Trust Revsta?</h2>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-5">
            <TrustCard
              title="Multi-Platform Analysis"
              desc="We aggregate reviews from Meta, Reddit, and Quora for comprehensive insights"
              icon="https://media.base44.com/images/public/6a52896674219eaa2fe9325d/8d2d31a16_87d931ccf_194_922_194_910.svg"
              delay={0.1}
            />
            <TrustCard
              title="AI-Powered Insights"
              desc="Advanced sentiment analysis reveals what users really think"
              icon="https://media.base44.com/images/public/6a52896674219eaa2fe9325d/4e4b77874_086a31429_194_928_194_910.svg"
              delay={0.2}
            />
            <TrustCard
              title="Real-Time Updates"
              desc="Sentiment scores update daily to reflect the latest opinions"
              icon="https://media.base44.com/images/public/6a52896674219eaa2fe9325d/715c5dddf_6bfbad1a9_194_934_194_910.svg"
              delay={0.3}
            />
          </div>
        </div>
      </section>

      <SiteFooter />

    </main>
  );
}