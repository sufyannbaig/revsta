import React from "react";
import { Link } from "react-router-dom";
import { Facebook, Instagram, Linkedin } from "lucide-react";

const FooterLogo = () => (
  <div className="relative w-full max-w-[286px] min-h-[80px] shrink-0">
    <img className="w-[9px] h-[9px] absolute top-0 left-0" src="https://media.base44.com/images/public/6a52896674219eaa2fe9325d/3adf6d49b_3bd1fc632_37_869.svg" alt="" />
    <img className="w-[9px] h-[9px] absolute top-0 left-2.5" src="https://media.base44.com/images/public/6a52896674219eaa2fe9325d/40ab12469_c62142875_37_877.svg" alt="" />
    <img className="w-[9px] h-[9px] absolute top-0 left-5" src="https://media.base44.com/images/public/6a52896674219eaa2fe9325d/ca87ad1b4_39eb49c19_37_885.svg" alt="" />
    <img className="w-[9px] h-[9px] absolute top-0 left-[31px]" src="https://media.base44.com/images/public/6a52896674219eaa2fe9325d/362e99585_cd71833aa_37_889.svg" alt="" />
    <img className="w-[9px] h-[9px] absolute top-2.5 left-0" src="https://media.base44.com/images/public/6a52896674219eaa2fe9325d/8696b297f_c75061d47_37_870.svg" alt="" />
    <img className="w-[9px] h-[9px] absolute top-2.5 left-2.5" src="https://media.base44.com/images/public/6a52896674219eaa2fe9325d/f1016a6c0_234422a1e_37_878.svg" alt="" />
    <img className="w-[9px] h-[9px] absolute top-2.5 left-5" src="https://media.base44.com/images/public/6a52896674219eaa2fe9325d/d0f20f68d_080630dfa_37_886.svg" alt="" />
    <img className="w-[9px] h-[9px] absolute top-2.5 left-[31px]" src="https://media.base44.com/images/public/6a52896674219eaa2fe9325d/a3a3407c5_0a1777946_37_890.svg" alt="" />
    <img className="w-[9px] h-[9px] absolute top-2.5 left-[41px]" src="https://media.base44.com/images/public/6a52896674219eaa2fe9325d/04b031208_91232db10_37_894.svg" alt="" />
    <img className="w-[9px] h-[9px] absolute top-2.5 left-[51px]" src="https://media.base44.com/images/public/6a52896674219eaa2fe9325d/01b8496b5_e316ed487_37_900.svg" alt="" />
    <img className="w-[31px] h-[45px] absolute top-3 left-[86px]" src="https://media.base44.com/images/public/6a52896674219eaa2fe9325d/2aa4751c2_bc5772a09_37_863.svg" alt="" />
    <img className="w-7 h-[45px] absolute top-3 left-[120px]" src="https://media.base44.com/images/public/6a52896674219eaa2fe9325d/873545170_3febe663c_37_864.svg" alt="" />
    <img className="w-[35px] h-[45px] absolute top-3 left-[153px]" src="https://media.base44.com/images/public/6a52896674219eaa2fe9325d/5d5c365dc_0a5e600db_37_865.svg" alt="" />
    <img className="w-8 h-[46px] absolute top-3 left-[189px]" src="https://media.base44.com/images/public/6a52896674219eaa2fe9325d/5196d4a81_fd9d66a6d_37_866.svg" alt="" />
    <img className="w-8 h-[45px] absolute top-3 left-[222px]" src="https://media.base44.com/images/public/6a52896674219eaa2fe9325d/565baa2fa_45f78825d_37_867.svg" alt="" />
    <img className="w-[35px] h-[45px] absolute top-3 left-[251px]" src="https://media.base44.com/images/public/6a52896674219eaa2fe9325d/f9f6d57c7_1615554c4_37_868.svg" alt="" />
    <img className="w-[9px] h-[9px] absolute top-5 left-0" src="https://media.base44.com/images/public/6a52896674219eaa2fe9325d/eb4cfac31_0cdb2e94d_37_871.svg" alt="" />
    <img className="w-[9px] h-[9px] absolute top-5 left-2.5" src="https://media.base44.com/images/public/6a52896674219eaa2fe9325d/6696b4fe4_9a2e87568_37_879.svg" alt="" />
    <img className="w-[9px] h-[9px] absolute top-5 left-[41px]" src="https://media.base44.com/images/public/6a52896674219eaa2fe9325d/c8249060c_fc30ac263_37_895.svg" alt="" />
    <img className="w-[9px] h-[9px] absolute top-5 left-[51px]" src="https://media.base44.com/images/public/6a52896674219eaa2fe9325d/34489be1d_72ded558c_37_901.svg" alt="" />
    <img className="w-[9px] h-[9px] absolute top-[30px] left-0" src="https://media.base44.com/images/public/6a52896674219eaa2fe9325d/e5bf4ce2e_7136db27d_37_872.svg" alt="" />
    <img className="w-[9px] h-[9px] absolute top-[30px] left-2.5" src="https://media.base44.com/images/public/6a52896674219eaa2fe9325d/dafe5e966_016d27cd0_37_880.svg" alt="" />
    <img className="w-[9px] h-[9px] absolute top-[30px] left-5" src="https://media.base44.com/images/public/6a52896674219eaa2fe9325d/aafff672d_8709f0204_37_887.svg" alt="" />
    <img className="w-[9px] h-[9px] absolute top-[30px] left-[31px]" src="https://media.base44.com/images/public/6a52896674219eaa2fe9325d/a0bf18889_230ae9126_37_891.svg" alt="" />
    <img className="w-[9px] h-[9px] absolute top-[30px] left-[41px]" src="https://media.base44.com/images/public/6a52896674219eaa2fe9325d/2e1996ae4_954997217_37_896.svg" alt="" />
    <img className="w-[9px] h-[9px] absolute top-[30px] left-[51px]" src="https://media.base44.com/images/public/6a52896674219eaa2fe9325d/6ed604365_7195c4b99_37_902.svg" alt="" />
    <img className="w-[9px] h-[9px] absolute top-[41px] left-0" src="https://media.base44.com/images/public/6a52896674219eaa2fe9325d/4040fe464_3e694fd0d_37_873.svg" alt="" />
    <img className="w-[9px] h-[9px] absolute top-[41px] left-2.5" src="https://media.base44.com/images/public/6a52896674219eaa2fe9325d/e46ce534c_08843cccf_37_881.svg" alt="" />
    <img className="w-[9px] h-[9px] absolute top-[41px] left-5" src="https://media.base44.com/images/public/6a52896674219eaa2fe9325d/1e54b451a_bf8b84b49_37_888.svg" alt="" />
    <img className="w-[9px] h-[9px] absolute top-[41px] left-[31px]" src="https://media.base44.com/images/public/6a52896674219eaa2fe9325d/8c1e43a71_1197fb69f_37_892.svg" alt="" />
    <img className="w-[9px] h-[9px] absolute top-[51px] left-0" src="https://media.base44.com/images/public/6a52896674219eaa2fe9325d/bbbd46258_834976ff4_37_874.svg" alt="" />
    <img className="w-[9px] h-[9px] absolute top-[51px] left-2.5" src="https://media.base44.com/images/public/6a52896674219eaa2fe9325d/071f66a02_e2b633832_37_882.svg" alt="" />
    <img className="w-[9px] h-[9px] absolute top-[51px] left-[31px]" src="https://media.base44.com/images/public/6a52896674219eaa2fe9325d/4c263c391_1f6f2c813_37_893.svg" alt="" />
    <img className="w-[9px] h-[9px] absolute top-[51px] left-[41px]" src="https://media.base44.com/images/public/6a52896674219eaa2fe9325d/b502e720c_134e0c9d7_37_897.svg" alt="" />
    <img className="w-[9px] h-[9px] absolute top-[61px] left-0" src="https://media.base44.com/images/public/6a52896674219eaa2fe9325d/2bf845293_a6fca7fa9_37_875.svg" alt="" />
    <img className="w-[9px] h-[9px] absolute top-[61px] left-2.5" src="https://media.base44.com/images/public/6a52896674219eaa2fe9325d/803900abb_43fd43cfd_37_883.svg" alt="" />
    <img className="w-[9px] h-[9px] absolute top-[61px] left-[41px]" src="https://media.base44.com/images/public/6a52896674219eaa2fe9325d/2cb009b9e_0ea14fd21_37_898.svg" alt="" />
    <img className="w-[9px] h-[9px] absolute top-[61px] left-[51px]" src="https://media.base44.com/images/public/6a52896674219eaa2fe9325d/71cdfa4c5_91b429af7_37_903.svg" alt="" />
    <img className="w-2 h-3.5 absolute top-16 left-[101px]" src="https://media.base44.com/images/public/6a52896674219eaa2fe9325d/d0aec1eb8_7484ad441_37_906.svg" alt="" />
    <img className="w-0.5 h-3.5 absolute top-16 left-[167px]" src="https://media.base44.com/images/public/6a52896674219eaa2fe9325d/8a541a2d7_8045d0922_37_913.svg" alt="" />
    <img className="w-0.5 h-3.5 absolute top-[63px] left-[200px]" src="https://media.base44.com/images/public/6a52896674219eaa2fe9325d/6828ffc6b_cc68b20b3_37_917.svg" alt="" />
    <img className="w-1.5 h-[13px] absolute top-[65px] left-[250px]" src="https://media.base44.com/images/public/6a52896674219eaa2fe9325d/5f58f4adc_c158c7b2c_37_922.svg" alt="" />
    <img className="w-[9px] h-3.5 absolute top-16 left-[276px]" src="https://media.base44.com/images/public/6a52896674219eaa2fe9325d/3ce41f4e5_e5a50746b_37_925.svg" alt="" />
    <img className="w-[9px] h-[9px] absolute top-[71px] left-0" src="https://media.base44.com/images/public/6a52896674219eaa2fe9325d/c2b24015f_b13c2c0d0_37_876.svg" alt="" />
    <img className="w-[9px] h-[9px] absolute top-[71px] left-2.5" src="https://media.base44.com/images/public/6a52896674219eaa2fe9325d/e1e3bd1cd_4ada7b1c7_37_884.svg" alt="" />
    <img className="w-[9px] h-[9px] absolute top-[71px] left-[41px]" src="https://media.base44.com/images/public/6a52896674219eaa2fe9325d/993031e27_b0b225ecf_37_899.svg" alt="" />
    <img className="w-[9px] h-[9px] absolute top-[71px] left-[51px]" src="https://media.base44.com/images/public/6a52896674219eaa2fe9325d/a39ace7c9_fcfc1256a_37_904.svg" alt="" />
    <img className="w-3.5 h-2.5 absolute top-[67px] left-[86px]" src="https://media.base44.com/images/public/6a52896674219eaa2fe9325d/a30ebd87d_b82d23e97_37_905.svg" alt="" />
    <img className="w-[9px] h-[11px] absolute top-[67px] left-[111px]" src="https://media.base44.com/images/public/6a52896674219eaa2fe9325d/b4611b6a3_628f639d4_37_907.svg" alt="" />
    <img className="w-[5px] h-2.5 absolute top-[67px] left-[121px]" src="https://media.base44.com/images/public/6a52896674219eaa2fe9325d/a3213448a_4db61e690_37_908.svg" alt="" />
    <img className="w-[9px] h-[11px] absolute top-[67px] left-[127px]" src="https://media.base44.com/images/public/6a52896674219eaa2fe9325d/83c170e96_7de82b131_37_909.svg" alt="" />
    <img className="w-[5px] h-2.5 absolute top-[67px] left-[142px]" src="https://media.base44.com/images/public/6a52896674219eaa2fe9325d/a1fa9eb33_d0ac0597f_37_910.svg" alt="" />
    <img className="w-[9px] h-[11px] absolute top-[67px] left-[147px]" src="https://media.base44.com/images/public/6a52896674219eaa2fe9325d/120412f11_19bbfefc3_37_911.svg" alt="" />
    <img className="w-2 h-[11px] absolute top-[67px] left-[157px]" src="https://media.base44.com/images/public/6a52896674219eaa2fe9325d/150a30be5_c0bb2bcc1_37_912.svg" alt="" />
    <img className="w-[5px] h-2.5 absolute top-[67px] left-[175px]" src="https://media.base44.com/images/public/6a52896674219eaa2fe9325d/546d2ef33_2105c2e43_37_914.svg" alt="" />
    <img className="w-[9px] h-[11px] absolute top-[67px] left-[181px]" src="https://media.base44.com/images/public/6a52896674219eaa2fe9325d/59e5c453f_a56b94829_37_915.svg" alt="" />
    <img className="w-[9px] h-2.5 absolute top-[67px] left-[190px]" src="https://media.base44.com/images/public/6a52896674219eaa2fe9325d/36f611fdc_68bc4cd01_37_916.svg" alt="" />
    <img className="w-[9px] h-[11px] absolute top-[67px] left-[204px]" src="https://media.base44.com/images/public/6a52896674219eaa2fe9325d/859c45169_4d840b239_37_918.svg" alt="" />
    <img className="w-3.5 h-2.5 absolute top-[67px] left-[213px]" src="https://media.base44.com/images/public/6a52896674219eaa2fe9325d/4eace3a93_7339d7e3b_37_919.svg" alt="" />
    <img className="w-2 h-[11px] absolute top-[67px] left-[228px]" src="https://media.base44.com/images/public/6a52896674219eaa2fe9325d/4fd45a5a8_20dd35837_37_920.svg" alt="" />
    <img className="w-2 h-[11px] absolute top-[67px] left-[241px]" src="https://media.base44.com/images/public/6a52896674219eaa2fe9325d/bfd4e98eb_5929b323a_37_921.svg" alt="" />
    <img className="w-2 h-[11px] absolute top-[67px] left-[256px]" src="https://media.base44.com/images/public/6a52896674219eaa2fe9325d/2b971968e_b81496bc1_37_923.svg" alt="" />
    <img className="w-2 h-2.5 absolute top-[67px] left-[266px]" src="https://media.base44.com/images/public/6a52896674219eaa2fe9325d/6f64f550c_963890e9a_37_924.svg" alt="" />
  </div>
);

export default function SiteFooter() {
  return (
    <footer className="w-full bg-figma-secondary pt-16 pb-6 relative z-20">
      <div className="max-w-[1440px] mx-auto px-6 flex flex-col items-center">
        <FooterLogo />

        <div className="flex gap-8 mt-10 mb-10">
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

        <div className="flex flex-wrap justify-center gap-8 mb-10">
          <Link to="/About" className="text-figma-16 font-heading text-figma-text-1 hover:text-[#14c686] transition-colors">About</Link>
          <Link to="/PrivacyPolicy" className="text-figma-16 font-heading text-figma-text-1 hover:text-[#14c686] transition-colors">Privacy Policy</Link>
          <Link to="/TermsOfService" className="text-figma-16 font-heading text-figma-text-1 hover:text-[#14c686] transition-colors">Terms of Service</Link>
        </div>
      </div>

      <div className="w-full border-t border-figma-muted pt-6">
        <p className="text-figma-18 font-normal font-heading leading-figma-22 text-center text-figma-primary">
          © {new Date().getFullYear()} Revsta. Where Real Reviews Stand.
        </p>
      </div>
    </footer>
  );
}