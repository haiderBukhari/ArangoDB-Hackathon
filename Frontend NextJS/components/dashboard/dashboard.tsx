'use client'

import { motion } from 'framer-motion'

import { Card } from '@/components/ui/card'
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

          <div className="grid gap-4 lg:gap-8 lg:grid-cols-[2fr,1fr]">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card className="p-4 lg:p-6 h-[340px] mb-4 flex flex-col justify-center items-center">
                <div className="">
                  <h1 className="text-base lg:text-2xl font-bold text-center mb-4">
                    <b>Graph-Based Drug Discovery with ArangoDB & GPU Acceleration using CuGraph</b>
                  </h1>
                  <p className="text-sm lg:text-md text-muted-foreground max-w-[650px] leading-7 px-2 my-3 text-center flex justify-center mb-5">
                    Explore how AI-driven graph analytics can transform drug discovery by mapping biomedical relationships, accelerating research, and uncovering novel therapeutic insights.
                  </p>
                </div>
                <motion.div
                  className="flex justify-center gap-4"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                >
                  <Link target='_blank' href="https://github.com/haiderBukhari/ArangoDB-Hackathon">
                    <Button size="lg" className="bg-transparent text-black" style={{ border: "1px solid #000" }}>
                      <b>Check GitHub</b>
                    </Button>
                  </Link>
                  <Link target='_blank' href="https://drugcentral.org/">
                    <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                      <b>Data Source</b>
                    </Button>
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
