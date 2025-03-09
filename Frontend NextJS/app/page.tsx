import { Hero } from "@/components/home";
import Analytics from "@/components/home/analytics";
import TimeSavingsUI from "@/components/home/attract";
import GetStarted from "@/components/home/getStarted";
import RadarPreview from "@/components/home/radarPreview";

export default function Home() {
  return (
    <div>
      <Hero/>
      <Analytics/>
      <TimeSavingsUI/>
      {/* <MathTutorPage/> */}
      <RadarPreview/>
      {/* <PricingStructure/> */}
      <GetStarted/>
      {/* <Footer/> */}
    </div>
  );
}
