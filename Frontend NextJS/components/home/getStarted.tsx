import { Button } from "@/components/ui/button";
import { Zap } from 'lucide-react';
import Link from "next/link";

export default function GetStarted() {
  return (
    <section id="getstarted" className="mx-auto px-4 py-16 text-center bg-white">
      <div className="space-y-8 max-w-7xl flex flex-col mx-auto bg-[#F8F8F9] px-10 py-20 rounded-3xl">

        <div className="space-y-8">
          <div className="space-y-4">
            <h2 className="text-sm font-medium uppercase tracking-wider">
              GET STARTED TODAY
            </h2>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight">
              Ready to Unlock To <span className="whitespace-nowrap">Automating Task?</span>
            </h1>
          </div>

          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Stop waiting for the perfect moment to excel in your tasks. Take control of your workflow today with the power of Integry AI and LangChain. Automate, optimize, and streamline your processes with personalized tools and intelligent automation. </p>

          <div className="flex justify-center">
            <Link href="/dashboard/chat">
              <Button size="lg" className="gap-2 text-base px-8 py-6 bg-black">
                <Zap className="w-5 h-5" />
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
