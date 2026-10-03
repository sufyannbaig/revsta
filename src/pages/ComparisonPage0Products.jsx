import React, { useEffect, useState } from "react";
import { Menu, ArrowLeft, Plus, Facebook, Instagram, Linkedin } from "lucide-react";
import { motion } from "framer-motion";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Link, useNavigate } from 'react-router-dom';
import { useComparison } from "@/hooks/useComparison";
import { base44 } from "@/api/base44Client";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

const HeaderLogo = () => (
  <div className="relative w-[157px] h-11 shrink-0">
    <img className="w-[5px] h-[5px] absolute top-0 left-0" src="https://static.wixstatic.com/media/12d367_4f26ccd17f8f4e3a8958306ea08c2332~mv2.png" alt="Vector" />
    <img className="w-[5px] h-[5px] absolute top-0 left-1.5" src="https://static.wixstatic.com/media/12d367_4f26ccd17f8f4e3a8958306ea08c2332~mv2.png" alt="Vector" />
    <img className="w-[5px] h-[5px] absolute top-0 left-[11px]" src="https://static.wixstatic.com/media/12d367_4f26ccd17f8f4e3a8958306ea08c2332~mv2.png" alt="Vector" />
    <img className="w-[5px] h-[5px] absolute top-0 left-[17px]" src="https://static.wixstatic.com/media/12d367_4f26ccd17f8f4e3a8958306ea08c2332~mv2.png" alt="Vector" />
    <img className="w-[5px] h-[5px] absolute top-1.5 left-0" src="https://static.wixstatic.com/media/12d367_4f26ccd17f8f4e3a8958306ea08c2332~mv2.png" alt="Vector" />
    <img className="w-[5px] h-[5px] absolute top-1.5 left-1.5" src="https://static.wixstatic.com/media/12d367_4f26ccd17f8f4e3a8958306ea08c2332~mv2.png" alt="Vector" />
    <img className="w-[5px] h-[5px] absolute top-1.5 left-[11px]" src="https://static.wixstatic.com/media/12d367_4f26ccd17f8f4e3a8958306ea08c2332~mv2.png" alt="Vector" />
    <img className="w-[5px] h-[5px] absolute top-1.5 left-[17px]" src="https://static.wixstatic.com/media/12d367_4f26ccd17f8f4e3a8958306ea08c2332~mv2.png" alt="Vector" />
    <img className="w-[5px] h-[5px] absolute top-1.5 left-[22px]" src="https://static.wixstatic.com/media/12d367_4f26ccd17f8f4e3a8958306ea08c2332~mv2.png" alt="Vector" />
    <img className="w-[5px] h-[5px] absolute top-1.5 left-7" src="https://static.wixstatic.com/media/12d367_4f26ccd17f8f4e3a8958306ea08c2332~mv2.png" alt="Vector" />
    <img className="w-[17px] h-[25px] absolute top-[7px] left-[47px]" src="https://static.wixstatic.com/media/12d367_4f26ccd17f8f4e3a8958306ea08c2332~mv2.png" alt="Vector" />
    <img className="w-4 h-[25px] absolute top-[7px] left-[66px]" src="https://static.wixstatic.com/media/12d367_4f26ccd17f8f4e3a8958306ea08c2332~mv2.png" alt="Vector" />
    <img className="w-5 h-[25px] absolute top-[7px] left-[84px]" src="https://static.wixstatic.com/media/12d367_4f26ccd17f8f4e3a8958306ea08c2332~mv2.png" alt="Vector" />
    <img className="w-[17px] h-[26px] absolute top-1.5 left-[104px]" src="https://static.wixstatic.com/media/12d367_4f26ccd17f8f4e3a8958306ea08c2332~mv2.png" alt="Vector" />
    <img className="w-[18px] h-[25px] absolute top-[7px] left-[122px]" src="https://static.wixstatic.com/media/12d367_4f26ccd17f8f4e3a8958306ea08c2332~mv2.png" alt="Vector" />
    <img className="w-[19px] h-[25px] absolute top-[7px] left-[138px]" src="https://static.wixstatic.com/media/12d367_4f26ccd17f8f4e3a8958306ea08c2332~mv2.png" alt="Vector" />
    <img className="w-[5px] h-[5px] absolute top-[11px] left-0" src="https://static.wixstatic.com/media/12d367_4f26ccd17f8f4e3a8958306ea08c2332~mv2.png" alt="Vector" />
    <img className="w-[5px] h-[5px] absolute top-[11px] left-1.5" src="https://static.wixstatic.com/media/12d367_4f26ccd17f8f4e3a8958306ea08c2332~mv2.png" alt="Vector" />
    <img className="w-[5px] h-[5px] absolute top-[11px] left-[22px]" src="https://static.wixstatic.com/media/12d367_4f26ccd17f8f4e3a8958306ea08c2332~mv2.png" alt="Vector" />
    <img className="w-[5px] h-[5px] absolute top-[11px] left-7" src="https://static.wixstatic.com/media/12d367_4f26ccd17f8f4e3a8958306ea08c2332~mv2.png" alt="Vector" />
    <img className="w-[5px] h-[5px] absolute top-[17px] left-0" src="https://static.wixstatic.com/media/12d367_4f26ccd17f8f4e3a8958306ea08c2332~mv2.png" alt="Vector" />
    <img className="w-[5px] h-[5px] absolute top-[17px] left-1.5" src="https://static.wixstatic.com/media/12d367_4f26ccd17f8f4e3a8958306ea08c2332~mv2.png" alt="Vector" />
    <img className="w-[5px] h-[5px] absolute top-[17px] left-[11px]" src="https://static.wixstatic.com/media/12d367_4f26ccd17f8f4e3a8958306ea08c2332~mv2.png" alt="Vector" />
    <img className="w-[5px] h-[5px] absolute top-[17px] left-[17px]" src="https://static.wixstatic.com/media/12d367_4f26ccd17f8f4e3a8958306ea08c2332~mv2.png" alt="Vector" />
    <img className="w-[5px] h-[5px] absolute top-[17px] left-[22px]" src="https://static.wixstatic.com/media/12d367_4f26ccd17f8f4e3a8958306ea08c2332~mv2.png" alt="Vector" />
    <img className="w-[5px] h-[5px] absolute top-[17px] left-7" src="https://static.wixstatic.com/media/12d367_4f26ccd17f8f4e3a8958306ea08c2332~mv2.png" alt="Vector" />
    <img className="w-[5px] h-[5px] absolute top-[22px] left-0" src="https://static.wixstatic.com/media/12d367_4f26ccd17f8f4e3a8958306ea08c2332~mv2.png" alt="Vector" />
    <img className="w-[5px] h-[5px] absolute top-[22px] left-1.5" src="https://static.wixstatic.com/media/12d367_4f26ccd17f8f4e3a8958306ea08c2332~mv2.png" alt="Vector" />
    <img className="w-[5px] h-[5px] absolute top-[22px] left-[11px]" src="https://static.wixstatic.com/media/12d367_4f26ccd17f8f4e3a8958306ea08c2332~mv2.png" alt="Vector" />
    <img className="w-[5px] h-[5px] absolute top-[22px] left-[17px]" src="https://static.wixstatic.com/media/12d367_4f26ccd17f8f4e3a8958306ea08c2332~mv2.png" alt="Vector" />
    <img className="w-[5px] h-[5px] absolute top-7 left-0" src="https://static.wixstatic.com/media/12d367_4f26ccd17f8f4e3a8958306ea08c2332~mv2.png" alt="Vector" />
    <img className="w-[5px] h-[5px] absolute top-7 left-1.5" src="https://static.wixstatic.com/media/12d367_4f26ccd17f8f4e3a8958306ea08c2332~mv2.png" alt="Vector" />
    <img className="w-[5px] h-[5px] absolute top-7 left-[17px]" src="https://static.wixstatic.com/media/12d367_4f26ccd17f8f4e3a8958306ea08c2332~mv2.png" alt="Vector" />
    <img className="w-[5px] h-[5px] absolute top-7 left-[22px]" src="https://static.wixstatic.com/media/12d367_4f26ccd17f8f4e3a8958306ea08c2332~mv2.png" alt="Vector" />
    <img className="w-[5px] h-[5px] absolute top-[34px] left-0" src="https://static.wixstatic.com/media/12d367_4f26ccd17f8f4e3a8958306ea08c2332~mv2.png" alt="Vector" />
    <img className="w-[5px] h-[5px] absolute top-[34px] left-1.5" src="https://static.wixstatic.com/media/12d367_4f26ccd17f8f4e3a8958306ea08c2332~mv2.png" alt="Vector" />
    <img className="w-[5px] h-[5px] absolute top-[34px] left-[22px]" src="https://static.wixstatic.com/media/12d367_4f26ccd17f8f4e3a8958306ea08c2332~mv2.png" alt="Vector" />
    <img className="w-[5px] h-[5px] absolute top-[34px] left-7" src="https://static.wixstatic.com/media/12d367_4f26ccd17f8f4e3a8958306ea08c2332~mv2.png" alt="Vector" />
    <img className="w-[5px] h-2 absolute top-[35px] left-14" src="https://static.wixstatic.com/media/12d367_4f26ccd17f8f4e3a8958306ea08c2332~mv2.png" alt="Vector" />
    <img className="w-px h-2 absolute top-[35px] left-[92px]" src="https://static.wixstatic.com/media/12d367_4f26ccd17f8f4e3a8958306ea08c2332~mv2.png" alt="Vector" />
    <img className="w-px h-2 absolute top-[35px] left-[110px]" src="https://static.wixstatic.com/media/12d367_4f26ccd17f8f4e3a8958306ea08c2332~mv2.png" alt="Vector" />
    <img className="w-[3px] h-[7px] absolute top-9 left-[137px]" src="https://static.wixstatic.com/media/12d367_4f26ccd17f8f4e3a8958306ea08c2332~mv2.png" alt="Vector" />
    <img className="w-[5px] h-2 absolute top-[35px] left-[152px]" src="https://static.wixstatic.com/media/12d367_4f26ccd17f8f4e3a8958306ea08c2332~mv2.png" alt="Vector" />
    <img className="w-[5px] h-[5px] absolute top-[39px] left-0" src="https://static.wixstatic.com/media/12d367_4f26ccd17f8f4e3a8958306ea08c2332~mv2.png" alt="Vector" />
    <img className="w-[5px] h-[5px] absolute top-[39px] left-1.5" src="https://static.wixstatic.com/media/12d367_4f26ccd17f8f4e3a8958306ea08c2332~mv2.png" alt="Vector" />
    <img className="w-[5px] h-[5px] absolute top-[39px] left-[22px]" src="https://static.wixstatic.com/media/12d367_4f26ccd17f8f4e3a8958306ea08c2332~mv2.png" alt="Vector" />
    <img className="w-[5px] h-[5px] absolute top-[39px] left-7" src="https://static.wixstatic.com/media/12d367_4f26ccd17f8f4e3a8958306ea08c2332~mv2.png" alt="Vector" />
    <img className="w-2 h-1.5 absolute top-[37px] left-[47px]" src="https://static.wixstatic.com/media/12d367_4f26ccd17f8f4e3a8958306ea08c2332~mv2.png" alt="Vector" />
    <img className="w-[5px] h-1.5 absolute top-[37px] left-[61px]" src="https://static.wixstatic.com/media/12d367_4f26ccd17f8f4e3a8958306ea08c2332~mv2.png" alt="Vector" />
    <img className="w-[3px] h-1.5 absolute top-[37px] left-[67px]" src="https://static.wixstatic.com/media/12d367_4f26ccd17f8f4e3a8958306ea08c2332~mv2.png" alt="Vector" />
    <img className="w-[5px] h-1.5 absolute top-[37px] left-[70px]" src="https://static.wixstatic.com/media/12d367_4f26ccd17f8f4e3a8958306ea08c2332~mv2.png" alt="Vector" />
    <img className="w-[3px] h-1.5 absolute top-[37px] left-[78px]" src="https://static.wixstatic.com/media/12d367_4f26ccd17f8f4e3a8958306ea08c2332~mv2.png" alt="Vector" />
    <img className="w-[5px] h-1.5 absolute top-[37px] left-[81px]" src="https://static.wixstatic.com/media/12d367_4f26ccd17f8f4e3a8958306ea08c2332~mv2.png" alt="Vector" />
    <img className="w-[5px] h-1.5 absolute top-[37px] left-[86px]" src="https://static.wixstatic.com/media/12d367_4f26ccd17f8f4e3a8958306ea08c2332~mv2.png" alt="Vector" />
    <img className="w-[3px] h-1.5 absolute top-[37px] left-24" src="https://static.wixstatic.com/media/12d367_4f26ccd17f8f4e3a8958306ea08c2332~mv2.png" alt="Vector" />
    <img className="w-[5px] h-1.5 absolute top-[37px] left-[99px]" src="https://static.wixstatic.com/media/12d367_4f26ccd17f8f4e3a8958306ea08c2332~mv2.png" alt="Vector" />
    <img className="w-[5px] h-1.5 absolute top-[37px] left-[105px]" src="https://static.wixstatic.com/media/12d367_4f26ccd17f8f4e3a8958306ea08c2332~mv2.png" alt="Vector" />
    <img className="w-[5px] h-1.5 absolute top-[37px] left-[112px]" src="https://static.wixstatic.com/media/12d367_4f26ccd17f8f4e3a8958306ea08c2332~mv2.png" alt="Vector" />
    <img className="w-2 h-1.5 absolute top-[37px] left-[117px]" src="https://static.wixstatic.com/media/12d367_4f26ccd17f8f4e3a8958306ea08c2332~mv2.png" alt="Vector" />
    <img className="w-1 h-1.5 absolute top-[37px] left-[125px]" src="https://static.wixstatic.com/media/12d367_4f26ccd17f8f4e3a8958306ea08c2332~mv2.png" alt="Vector" />
    <img className="w-1 h-1.5 absolute top-[37px] left-[133px]" src="https://static.wixstatic.com/media/12d367_4f26ccd17f8f4e3a8958306ea08c2332~mv2.png" alt="Vector" />
    <img className="w-[5px] h-1.5 absolute top-[37px] left-[141px]" src="https://static.wixstatic.com/media/12d367_4f26ccd17f8f4e3a8958306ea08c2332~mv2.png" alt="Vector" />
    <img className="w-1 h-1.5 absolute top-[37px] left-[146px]" src="https://static.wixstatic.com/media/12d367_4f26ccd17f8f4e3a8958306ea08c2332~mv2.png" alt="Vector" />
  </div>
);

const FooterLogo = () => (
  <div className="relative w-full max-w-[286px] h-20 shrink-0">
    <img className="w-[9px] h-[9px] absolute top-0 left-0" src="https://static.wixstatic.com/media/12d367_4f26ccd17f8f4e3a8958306ea08c2332~mv2.png" alt="Vector" />
    <img className="w-[9px] h-[9px] absolute top-0 left-2.5" src="https://static.wixstatic.com/media/12d367_4f26ccd17f8f4e3a8958306ea08c2332~mv2.png" alt="Vector" />
    <img className="w-[9px] h-[9px] absolute top-0 left-5" src="https://static.wixstatic.com/media/12d367_4f26ccd17f8f4e3a8958306ea08c2332~mv2.png" alt="Vector" />
    <img className="w-[9px] h-[9px] absolute top-0 left-[30px]" src="https://static.wixstatic.com/media/12d367_4f26ccd17f8f4e3a8958306ea08c2332~mv2.png" alt="Vector" />
    <img className="w-[9px] h-[9px] absolute top-2.5 left-0" src="https://static.wixstatic.com/media/12d367_4f26ccd17f8f4e3a8958306ea08c2332~mv2.png" alt="Vector" />
    <img className="w-[9px] h-[9px] absolute top-2.5 left-2.5" src="https://static.wixstatic.com/media/12d367_4f26ccd17f8f4e3a8958306ea08c2332~mv2.png" alt="Vector" />
    <img className="w-[9px] h-[9px] absolute top-2.5 left-5" src="https://static.wixstatic.com/media/12d367_4f26ccd17f8f4e3a8958306ea08c2332~mv2.png" alt="Vector" />
    <img className="w-[9px] h-[9px] absolute top-2.5 left-[30px]" src="https://static.wixstatic.com/media/12d367_4f26ccd17f8f4e3a8958306ea08c2332~mv2.png" alt="Vector" />
    <img className="w-[9px] h-[9px] absolute top-2.5 left-[41px]" src="https://static.wixstatic.com/media/12d367_4f26ccd17f8f4e3a8958306ea08c2332~mv2.png" alt="Vector" />
    <img className="w-[9px] h-[9px] absolute top-2.5 left-[51px]" src="https://static.wixstatic.com/media/12d367_4f26ccd17f8f4e3a8958306ea08c2332~mv2.png" alt="Vector" />
    <img className="w-[31px] h-[45px] absolute top-3 left-[86px]" src="https://static.wixstatic.com/media/12d367_4f26ccd17f8f4e3a8958306ea08c2332~mv2.png" alt="Vector" />
    <img className="w-7 h-[45px] absolute top-3 left-[120px]" src="https://static.wixstatic.com/media/12d367_4f26ccd17f8f4e3a8958306ea08c2332~mv2.png" alt="Vector" />
    <img className="w-[35px] h-[45px] absolute top-3 left-[152px]" src="https://static.wixstatic.com/media/12d367_4f26ccd17f8f4e3a8958306ea08c2332~mv2.png" alt="Vector" />
    <img className="w-8 h-[46px] absolute top-3 left-[189px]" src="https://static.wixstatic.com/media/12d367_4f26ccd17f8f4e3a8958306ea08c2332~mv2.png" alt="Vector" />
    <img className="w-8 h-[45px] absolute top-3 left-[222px]" src="https://static.wixstatic.com/media/12d367_4f26ccd17f8f4e3a8958306ea08c2332~mv2.png" alt="Vector" />
    <img className="w-[35px] h-[45px] absolute top-3 left-[251px]" src="https://static.wixstatic.com/media/12d367_4f26ccd17f8f4e3a8958306ea08c2332~mv2.png" alt="Vector" />
    <img className="w-[9px] h-[9px] absolute top-5 left-0" src="https://static.wixstatic.com/media/12d367_4f26ccd17f8f4e3a8958306ea08c2332~mv2.png" alt="Vector" />
    <img className="w-[9px] h-[9px] absolute top-5 left-2.5" src="https://static.wixstatic.com/media/12d367_4f26ccd17f8f4e3a8958306ea08c2332~mv2.png" alt="Vector" />
    <img className="w-[9px] h-[9px] absolute top-5 left-[41px]" src="https://static.wixstatic.com/media/12d367_4f26ccd17f8f4e3a8958306ea08c2332~mv2.png" alt="Vector" />
    <img className="w-[9px] h-[9px] absolute top-5 left-[51px]" src="https://static.wixstatic.com/media/12d367_4f26ccd17f8f4e3a8958306ea08c2332~mv2.png" alt="Vector" />
    <img className="w-[9px] h-[9px] absolute top-[30px] left-0" src="https://static.wixstatic.com/media/12d367_4f26ccd17f8f4e3a8958306ea08c2332~mv2.png" alt="Vector" />
    <img className="w-[9px] h-[9px] absolute top-[30px] left-2.5" src="https://static.wixstatic.com/media/12d367_4f26ccd17f8f4e3a8958306ea08c2332~mv2.png" alt="Vector" />
    <img className="w-[9px] h-[9px] absolute top-[30px] left-5" src="https://static.wixstatic.com/media/12d367_4f26ccd17f8f4e3a8958306ea08c2332~mv2.png" alt="Vector" />
    <img className="w-[9px] h-[9px] absolute top-[30px] left-[30px]" src="https://static.wixstatic.com/media/12d367_4f26ccd17f8f4e3a8958306ea08c2332~mv2.png" alt="Vector" />
    <img className="w-[9px] h-[9px] absolute top-[30px] left-[41px]" src="https://static.wixstatic.com/media/12d367_4f26ccd17f8f4e3a8958306ea08c2332~mv2.png" alt="Vector" />
    <img className="w-[9px] h-[9px] absolute top-[30px] left-[51px]" src="https://static.wixstatic.com/media/12d367_4f26ccd17f8f4e3a8958306ea08c2332~mv2.png" alt="Vector" />
    <img className="w-[9px] h-[9px] absolute top-[41px] left-0" src="https://static.wixstatic.com/media/12d367_4f26ccd17f8f4e3a8958306ea08c2332~mv2.png" alt="Vector" />
    <img className="w-[9px] h-[9px] absolute top-[41px] left-2.5" src="https://static.wixstatic.com/media/12d367_4f26ccd17f8f4e3a8958306ea08c2332~mv2.png" alt="Vector" />
    <img className="w-[9px] h-[9px] absolute top-[41px] left-5" src="https://static.wixstatic.com/media/12d367_4f26ccd17f8f4e3a8958306ea08c2332~mv2.png" alt="Vector" />
    <img className="w-[9px] h-[9px] absolute top-[41px] left-[30px]" src="https://static.wixstatic.com/media/12d367_4f26ccd17f8f4e3a8958306ea08c2332~mv2.png" alt="Vector" />
    <img className="w-[9px] h-[9px] absolute top-[51px] left-0" src="https://static.wixstatic.com/media/12d367_4f26ccd17f8f4e3a8958306ea08c2332~mv2.png" alt="Vector" />
    <img className="w-[9px] h-[9px] absolute top-[51px] left-2.5" src="https://static.wixstatic.com/media/12d367_4f26ccd17f8f4e3a8958306ea08c2332~mv2.png" alt="Vector" />
    <img className="w-[9px] h-[9px] absolute top-[51px] left-[30px]" src="https://static.wixstatic.com/media/12d367_4f26ccd17f8f4e3a8958306ea08c2332~mv2.png" alt="Vector" />
    <img className="w-[9px] h-[9px] absolute top-[51px] left-[41px]" src="https://static.wixstatic.com/media/12d367_4f26ccd17f8f4e3a8958306ea08c2332~mv2.png" alt="Vector" />
    <img className="w-[9px] h-[9px] absolute top-[61px] left-0" src="https://static.wixstatic.com/media/12d367_4f26ccd17f8f4e3a8958306ea08c2332~mv2.png" alt="Vector" />
    <img className="w-[9px] h-[9px] absolute top-[61px] left-2.5" src="https://static.wixstatic.com/media/12d367_4f26ccd17f8f4e3a8958306ea08c2332~mv2.png" alt="Vector" />
    <img className="w-[9px] h-[9px] absolute top-[61px] left-[41px]" src="https://static.wixstatic.com/media/12d367_4f26ccd17f8f4e3a8958306ea08c2332~mv2.png" alt="Vector" />
    <img className="w-[9px] h-[9px] absolute top-[61px] left-[51px]" src="https://static.wixstatic.com/media/12d367_4f26ccd17f8f4e3a8958306ea08c2332~mv2.png" alt="Vector" />
    <img className="w-2 h-3.5 absolute top-16 left-[101px]" src="https://static.wixstatic.com/media/12d367_4f26ccd17f8f4e3a8958306ea08c2332~mv2.png" alt="Vector" />
    <img className="w-0.5 h-3.5 absolute top-16 left-[167px]" src="https://static.wixstatic.com/media/12d367_4f26ccd17f8f4e3a8958306ea08c2332~mv2.png" alt="Vector" />
    <img className="w-0.5 h-3.5 absolute top-[63px] left-[200px]" src="https://static.wixstatic.com/media/12d367_4f26ccd17f8f4e3a8958306ea08c2332~mv2.png" alt="Vector" />
    <img className="w-1.5 h-[13px] absolute top-[65px] left-[250px]" src="https://static.wixstatic.com/media/12d367_4f26ccd17f8f4e3a8958306ea08c2332~mv2.png" alt="Vector" />
    <img className="w-[9px] h-3.5 absolute top-16 left-[276px]" src="https://static.wixstatic.com/media/12d367_4f26ccd17f8f4e3a8958306ea08c2332~mv2.png" alt="Vector" />
    <img className="w-[9px] h-[9px] absolute top-[71px] left-0" src="https://static.wixstatic.com/media/12d367_4f26ccd17f8f4e3a8958306ea08c2332~mv2.png" alt="Vector" />
    <img className="w-[9px] h-[9px] absolute top-[71px] left-2.5" src="https://static.wixstatic.com/media/12d367_4f26ccd17f8f4e3a8958306ea08c2332~mv2.png" alt="Vector" />
    <img className="w-[9px] h-[9px] absolute top-[71px] left-[41px]" src="https://static.wixstatic.com/media/12d367_4f26ccd17f8f4e3a8958306ea08c2332~mv2.png" alt="Vector" />
    <img className="w-[9px] h-[9px] absolute top-[71px] left-[51px]" src="https://static.wixstatic.com/media/12d367_4f26ccd17f8f4e3a8958306ea08c2332~mv2.png" alt="Vector" />
    <img className="w-3.5 h-2.5 absolute top-[67px] left-[86px]" src="https://static.wixstatic.com/media/12d367_4f26ccd17f8f4e3a8958306ea08c2332~mv2.png" alt="Vector" />
    <img className="w-[9px] h-[11px] absolute top-[67px] left-[111px]" src="https://static.wixstatic.com/media/12d367_4f26ccd17f8f4e3a8958306ea08c2332~mv2.png" alt="Vector" />
    <img className="w-[5px] h-2.5 absolute top-[67px] left-[121px]" src="https://static.wixstatic.com/media/12d367_4f26ccd17f8f4e3a8958306ea08c2332~mv2.png" alt="Vector" />
    <img className="w-[9px] h-[11px] absolute top-[67px] left-[127px]" src="https://static.wixstatic.com/media/12d367_4f26ccd17f8f4e3a8958306ea08c2332~mv2.png" alt="Vector" />
    <img className="w-[5px] h-2.5 absolute top-[67px] left-[142px]" src="https://static.wixstatic.com/media/12d367_4f26ccd17f8f4e3a8958306ea08c2332~mv2.png" alt="Vector" />
    <img className="w-[9px] h-[11px] absolute top-[67px] left-[147px]" src="https://static.wixstatic.com/media/12d367_4f26ccd17f8f4e3a8958306ea08c2332~mv2.png" alt="Vector" />
    <img className="w-2 h-[11px] absolute top-[67px] left-[157px]" src="https://static.wixstatic.com/media/12d367_4f26ccd17f8f4e3a8958306ea08c2332~mv2.png" alt="Vector" />
    <img className="w-[5px] h-2.5 absolute top-[67px] left-[175px]" src="https://static.wixstatic.com/media/12d367_4f26ccd17f8f4e3a8958306ea08c2332~mv2.png" alt="Vector" />
    <img className="w-[9px] h-[11px] absolute top-[67px] left-[181px]" src="https://static.wixstatic.com/media/12d367_4f26ccd17f8f4e3a8958306ea08c2332~mv2.png" alt="Vector" />
    <img className="w-[9px] h-2.5 absolute top-[67px] left-[190px]" src="https://static.wixstatic.com/media/12d367_4f26ccd17f8f4e3a8958306ea08c2332~mv2.png" alt="Vector" />
    <img className="w-[9px] h-[11px] absolute top-[67px] left-[204px]" src="https://static.wixstatic.com/media/12d367_4f26ccd17f8f4e3a8958306ea08c2332~mv2.png" alt="Vector" />
    <img className="w-3.5 h-2.5 absolute top-[67px] left-[213px]" src="https://static.wixstatic.com/media/12d367_4f26ccd17f8f4e3a8958306ea08c2332~mv2.png" alt="Vector" />
    <img className="w-2 h-[11px] absolute top-[67px] left-[228px]" src="https://static.wixstatic.com/media/12d367_4f26ccd17f8f4e3a8958306ea08c2332~mv2.png" alt="Vector" />
    <img className="w-2 h-[11px] absolute top-[67px] left-[241px]" src="https://static.wixstatic.com/media/12d367_4f26ccd17f8f4e3a8958306ea08c2332~mv2.png" alt="Vector" />
    <img className="w-2 h-[11px] absolute top-[67px] left-[256px]" src="https://static.wixstatic.com/media/12d367_4f26ccd17f8f4e3a8958306ea08c2332~mv2.png" alt="Vector" />
    <img className="w-2 h-2.5 absolute top-[67px] left-[266px]" src="https://static.wixstatic.com/media/12d367_4f26ccd17f8f4e3a8958306ea08c2332~mv2.png" alt="Vector" />
  </div>
);

const SocialIcons = () => (
  <div className="flex gap-[30px]">
    <a href="#" className="w-8 h-8 flex items-center justify-center hover:opacity-80 transition-opacity">
      <Facebook className="w-8 h-8 text-figma-primary" />
    </a>
    <a href="#" className="w-8 h-8 flex items-center justify-center hover:opacity-80 transition-opacity">
      <Instagram className="w-8 h-8 text-figma-primary" />
    </a>
    <a href="#" className="w-8 h-8 flex items-center justify-center hover:opacity-80 transition-opacity">
      <Linkedin className="w-8 h-8 text-figma-primary" />
    </a>
  </div>
);

const ComparisonCard = () => {
  const navigate = useNavigate();
  return (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6, ease: "easeOut" }}
    className="w-full aspect-[635/863] max-lg:aspect-auto max-lg:h-[500px] bg-figma-primary rounded-[30px] p-5"
  >
    <div className="w-full h-full border-[3px] border-[#bbbbbb] border-dotted rounded-[30px] flex flex-col items-center justify-center p-6 text-center">
      <div className="w-16 h-16 bg-figma-accent rounded-[40px] flex items-center justify-center mb-[20px]">
        <Plus className="w-[26px] h-[26px] text-figma-text-3" />
      </div>
      <p className="text-figma-22 font-normal font-heading leading-figma-27 text-figma-text-3 max-w-[376px] mb-[30px]">
        Add product to see product comparison
      </p>
      <button onClick={() => navigate('/ProductsProductLisitng')} className="py-[15px] px-[30px] bg-[linear-gradient(230.27deg,_rgba(20,198,134,1.00)_0%,_rgba(34,211,238,1.00)_100%)] rounded-[32px] hover:opacity-90 transition-opacity">
        <span className="text-figma-20 font-normal font-heading leading-figma-24 text-figma-primary">Browse Products</span>
      </button>
    </div>
  </motion.div>
  );
};

export default function ComparisonPage0Products() {
  const navigate = useNavigate();
  const { comparisonIds, comparisonCount, removeFromCompare, clearComparison } = useComparison();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (comparisonIds.length === 2) {
      navigate('/ComparisonPage2Products');
      return;
    }
    if (comparisonIds.length === 0) {
      setProducts([]);
      setLoading(false);
      return;
    }
    const fetchProducts = async () => {
      try {
        const fetched = await Promise.all(comparisonIds.map(id => base44.entities.Product.get(id)));
        setProducts(fetched);
      } catch (e) {
        console.error("Failed to load comparison products:", e);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [comparisonIds, navigate]);

  return (
    <div className="min-h-screen bg-figma-accent flex flex-col font-heading overflow-x-clip">
      <SiteHeader />

      {/* Main Content */}
      <main className="flex-1 w-full max-w-[1440px] mx-auto px-[clamp(16px,5.2vw,75px)] max-md:px-6 pt-[clamp(16px,4.2vw,60px)] pb-[clamp(30px,8.3vw,120px)] flex flex-col">
        <button onClick={() => navigate(-1)} className="inline-flex items-center gap-2.5 pt-[15px] pr-[30px] pb-[15px] pl-[20px] rounded-[32px] shadow-[inset_0_0_0_1px_#9f9c9c] w-fit hover:bg-black/5 transition-colors">
          <ArrowLeft className="w-3 h-3 text-figma-text-4" />
          <span className="text-figma-18 font-normal leading-figma-22 text-figma-text-4">Back</span>
        </button>

        <div className="mt-[30px] flex flex-col md:flex-row justify-between items-start md:items-center gap-5">
          <h1 className="text-[clamp(35px,4.44vw,64px)] font-normal leading-none text-figma-secondary">
            Product Comparison
          </h1>
          {comparisonIds.length > 0 && (
            <button onClick={clearComparison} className="flex justify-center items-center py-[15px] px-[30px] rounded-[32px] shadow-[inset_0_0_0_1px_#cc2020] h-[54px] hover:bg-red-50 transition-colors">
              <span className="text-figma-18 font-normal leading-figma-22 text-figma-surface-2">Clear All</span>
            </button>
          )}
        </div>

        <div className="mt-[clamp(16px,3.5vw,50px)] grid grid-cols-2 max-lg:grid-cols-1 gap-[20px]">
          {products.map((product) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="w-full aspect-[635/863] max-lg:aspect-auto max-lg:h-[500px] bg-figma-primary rounded-[30px] p-5"
            >
              <div className="w-full h-full flex flex-col">
                <img className="rounded-[20px] w-full aspect-[595/360] object-cover mb-4" src={product.image_url} alt={product.name} />
                <p className="text-figma-20 font-normal leading-figma-24 text-figma-text-1">{product.brand}</p>
                <p className="text-[clamp(18px,2vw,28px)] font-normal leading-[1.2] text-figma-secondary mt-1 mb-3">{product.name}</p>
                <p className="text-figma-20 font-normal leading-figma-24 text-figma-text-1 mt-auto mb-4">
                  Sentiment: <span className="text-[#14c686]">{product.sentiment_score}/10</span>
                </p>
                <button onClick={() => removeFromCompare(product.id)} className="w-full py-[15px] rounded-[32px] shadow-[inset_0_0_0_1px_#cc2020] text-figma-20 font-normal leading-figma-24 text-figma-surface-2 hover:bg-red-50 transition-colors">
                  Remove
                </button>
              </div>
            </motion.div>
          ))}
          {Array.from({ length: 2 - products.length }).map((_, i) => (
            <ComparisonCard key={`empty-${i}`} />
          ))}
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}