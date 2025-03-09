// src/app/page.tsx
import { GradientRing } from "@/components/ui/gradient-ring";
import { AnimatedHeroContent } from "@/components/ui/animated-hero-content";
import Link from "next/link";
import Image from "next/image";

export default function Hero() {
  return (
    <div className="min-h-screen bg-[#F8F8F9]">
      {/* Navigation */}
      <nav className="fixed w-full z-50 bg-white/80 backdrop-blur-sm border-b border-gray-100">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-12">
              <div className="w-34 font-semibold flex text-xl text-gray-900">
                <Image src={'/arangodb.png'} height={80} width={80} className="mr-2" alt="integry logo"></Image>
              </div>
              <div className="hidden md:flex items-center space-x-8">
                <a href="#feature" className="text-sm text-gray-600 hover:text-gray-900">Features</a>
                <a href="#efficiency" className="text-sm text-gray-600 hover:text-gray-900">Efficiency</a>
                <a href="#getstarted" className="text-sm text-gray-600 hover:text-gray-900">Get Started</a>
              </div>
            </div>
            <div className="flex items-center space-x-4">
            <Link href="/dashboard/chat" className="text-sm border-blue-200 hover:bg-blue-50">Login →</Link>
            </div>
          </div>
        </div>
      </nav>
      <section className="relative min-h-screen pt-32 overflow-hidden">
        
        <GradientRing className="left-[-300px] top-[20%] pointer-events-none hidden md:block" />
        <GradientRing className="right-[-300px] bottom-[20%] pointer-events-none hidden md:block" />
        
        <div className="container mx-auto px-4 relative z-10">
          <AnimatedHeroContent />
        </div>
      </section>
      {/* <section className="py-10 relative z-10">
        <div className="container mx-auto px-4">
          <AnimatedCustomers />
        </div>
      </section> */}

    </div>
  );
}