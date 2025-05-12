import CareersSection from "@/components/landing-comp/careers-section";
import FundingCategories from "@/components/landing-comp/funding-categories";
import FundingPromo from "@/components/landing-comp/funding-promo";
import HeroSection from "@/components/landing-comp/hero-section";
import HiwotFundCTA from "@/components/landing-comp/hiwot-fund-cta";
import Newsletter from "@/components/landing-comp/newsletter";
import ProcessSteps from "@/components/landing-comp/process-steps";

export default function Home() {
  return (
    <div className="">
      <HeroSection />
      <FundingCategories />
      <ProcessSteps />
      <HiwotFundCTA />
      <CareersSection />
      <FundingPromo />
      {/* <Newsletter /> */}
    </div>
  );
}
