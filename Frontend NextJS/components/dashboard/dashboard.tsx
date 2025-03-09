'use client'

import { motion } from 'framer-motion'
// import { LayoutDashboard, Camera, BarChart2, User2, Settings } from 'lucide-react'

import { Card } from '@/components/ui/card'
// import { Button } from '@/components/ui/button'
// import { PerformanceChart } from './performance-chart'
import { Navigation } from './navigation'
import { Stats } from './stats'
import { RecentActivity } from './recent-activity'
import { Button } from '../ui/button'
import Link from 'next/link'

export default function Dashboard() {
  return (
    <div className="flex flex-col lg:flex-row w-full">
      <Navigation />
      <main className="flex-1 p-4 lg:p-8">
        <div className="space-y-4 lg:space-y-8">
          <div>
            <h1 className="text-xl lg:text-2xl font-semibold">Overview</h1>
          </div>

          <Stats />

          <div className="grid gap-4 lg:gap-8 lg:grid-cols-[2fr,1fr]">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card className="p-4 lg:p-6 h-[340px] mb-4 flex flex-col justify-center items-center">
                <div className="">
                  <h1 className="text-base lg:text-2xl font-bold text-center mb-4">Integrations for your SaaS and AI Agents</h1>
                  <p className="text-sm lg:text-md text-muted-foreground max-w-[450px] leading-7 px-2 my-3 text-center flex justify-center mb-5">Integry helps you design, embed, and support integrations for AI-driven products and SaaS with 300+ apps while reducing developer effort</p>
                </div>
                <motion.div
                  className="flex justify-center gap-4"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                >
                  <Link href="https://www.integry.ai/talk">
                    <Button size="lg" className="bg-transparent text-black" style={{border: "1px solid #000"}}>Book a Demo</Button>
                  </Link>
                  <Link href="https://app.integry.io/accounts/register/v3/signup/?_gl=1*r9eul3*_gcl_au*MTkyODc1NDcxNy4xNzM4MzMxMDAx*_ga*MTI1Njk0MzUxNS4xNzM4MjQ1MDM0*_ga_XYLQN4T9E2*MTczODMzNTYyNS4yLjEuMTczODMzNTY4My4wLjAuMA..">
                    <Button size="lg" className="bg-blue-600 hover:bg-blue-700">Start for Free</Button>
                  </Link>
                </motion.div>

              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="w-full"
            >
              <RecentActivity />
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  )
}
