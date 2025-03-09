import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Users, BookOpen, Brain, ChartBar, DollarSign } from 'lucide-react';
import Image from "next/image";

export default function PricingStructure() {
  return (
    <div className="py-12 mx-auto bg-white px-3">
      <div className="relative mb-12">
        <h1 className="text-md font-bold text-center text-gray-800">PRICING PLANS</h1>
        <h1 className="text-4xl font-bold text-center leading-10 mt-3 mb-7 font-sans text-gray-800">
          Unlock Your Math Potential <br /> With the Right Plan
        </h1>
        <Image
          width={200}
          height={100}
          className="absolute top-[39%] right-[27.5%] z-10 hidden md:block"
          src="https://horizon-ui.com/boilerplate-shadcn/static/media/price-ribbon.6c3f5bec90fa39e1bc52.png"
          alt="Pricing Ribbon"
        />
      </div>

      <div className="grid gap-8 md:grid-cols-2 max-w-5xl mx-auto pt-7">
        {/* Monthly Plan */}
        <Card className="relative">
          <CardHeader className="space-y-2">
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="text-xs">Most Popular</Badge>
            </div>
            <h3 className="text-2xl font-bold">Monthly Plan</h3>
            <p className="text-sm text-muted-foreground">
              Access all features with a flexible monthly payment.
            </p>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold">$20</span>
                <div className="space-y-1">
                  <span className="text-sm text-muted-foreground line-through">$60</span>
                  <Badge variant="secondary" className="whitespace-nowrap ml-3">67% off</Badge>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">billed monthly</p>
              <Button className="w-full" size="lg">
                Start Monthly Plan
              </Button>
              <p className="text-xs text-center text-muted-foreground">
                Cancel anytime. No hidden fees.
              </p>
            </div>

            <div className="space-y-4 pt-4">
              <div className="flex gap-2">
                <Brain className="h-5 w-5 flex-shrink-0" />
                <div>
                  <p className="font-medium">Personalized Learning</p>
                  <p className="text-sm text-muted-foreground">
                    Tailored lessons and exercises to match your learning pace and goals.
                  </p>
                </div>
              </div>
              <div className="flex gap-2">
                <BookOpen className="h-5 w-5 flex-shrink-0" />
                <div>
                  <p className="font-medium">Interactive Tutorials</p>
                  <p className="text-sm text-muted-foreground">
                    Step-by-step guidance across various math topics.
                  </p>
                </div>
              </div>
              <div className="flex gap-2">
                <ChartBar className="h-5 w-5 flex-shrink-0" />
                <div>
                  <p className="font-medium">Progress Tracking</p>
                  <p className="text-sm text-muted-foreground">
                    Monitor your growth and achieve your goals faster.
                  </p>
                </div>
              </div>
              <div className="flex gap-2">
                <Users className="h-5 w-5 flex-shrink-0" />
                <div>
                  <p className="font-medium">AI Chatbot Support</p>
                  <p className="text-sm text-muted-foreground">
                    Get instant help with math problems anytime, anywhere.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Yearly Plan */}
        <Card className="relative bg-gray-900 text-white">
          <CardHeader className="space-y-2">
            <div className="flex items-center gap-2">
              <DollarSign className="h-5 w-5" />
              <h3 className="text-lg font-medium">Yearly Plan</h3>
            </div>
            <p className="text-sm text-gray-400">
              Save big with our discounted yearly subscription.
            </p>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold">$300</span>
                <div className="space-y-1">
                  <span className="text-sm text-gray-400 line-through">$600</span>
                  <Badge variant="secondary" className="whitespace-nowrap ml-3">50% off</Badge>
                </div>
              </div>
              <p className="text-sm text-gray-400">billed yearly</p>
              <Button variant="secondary" className="w-full" size="lg">
                Start Yearly Plan
              </Button>
              <p className="text-xs text-center text-gray-400">
                Best value for long-term learners.
              </p>
            </div>

            <div className="space-y-4 pt-4">
              <div className="flex gap-2">
                <Brain className="h-5 w-5 flex-shrink-0" />
                <div>
                  <p className="font-medium">Personalized Learning</p>
                  <p className="text-sm text-gray-400">
                    Unlock your full potential with customized lessons.
                  </p>
                </div>
              </div>
              <div className="flex gap-2">
                <BookOpen className="h-5 w-5 flex-shrink-0" />
                <div>
                  <p className="font-medium">Interactive Tutorials</p>
                  <p className="text-sm text-gray-400">
                    Comprehensive guides for every math challenge.
                  </p>
                </div>
              </div>
              <div className="flex gap-2">
                <ChartBar className="h-5 w-5 flex-shrink-0" />
                <div>
                  <p className="font-medium">Progress Tracking</p>
                  <p className="text-sm text-gray-400">
                    Stay motivated with detailed performance insights.
                  </p>
                </div>
              </div>
              <div className="flex gap-2">
                <Users className="h-5 w-5 flex-shrink-0" />
                <div>
                  <p className="font-medium">AI Chatbot Support</p>
                  <p className="text-sm text-gray-400">
                    24/7 assistance for all your math questions.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
