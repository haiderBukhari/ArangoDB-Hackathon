'use client'
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, BookOpen, Brain, Network, ChartBar, Slack } from 'lucide-react';
import Link from 'next/link';

const MathTutorPage = () => {
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
};

const tutorFeatures = [
  {
    icon: <Slack className="w-8 h-8" />,
    category: "Feature",
    title: "Slack",
  },
  {
    icon: <BookOpen className="w-8 h-8" />,
    category: "Feature",
    title: "Interactive Tutorials",
  },
  {
    icon: <Brain className="w-8 h-8" />,
    category: "Feature",
    title: "AI-Powered Problem Solving",
  },
  {
    icon: <Network className="w-8 h-8" />,
    category: "Feature",
    title: "Real-Time Collaboration Tools",
  },
  {
    icon: <ChartBar className="w-8 h-8" />,
    category: "Feature",
    title: "Progress Tracking and Analytics",
  },
  {
    icon: <ArrowRight className="w-8 h-8" />,
    category: "Feature",
    title: "Gamified Learning Experiences",
  }
];

  return (
    <div className="min-h-screen bg-white">
      <motion.div 
        className="container mx-auto px-4 py-16 cursor-pointer"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="text-center mb-16">
          <motion.h1 
            className="text-4xl font-bold mb-6"
            {...fadeIn}
          >
            Master Math with AI Assistance
          </motion.h1>
          <motion.p 
            className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto"
            {...fadeIn}
          >
            Our Math Tutor platform offers interactive lessons, real-time problem-solving, 
            and step-by-step guidance to help you excel from basic arithmetic to advanced calculus.
          </motion.p>
          <motion.div {...fadeIn}>
          <Link href="/login">
            <Button className="bg-blue-600 hover:bg-blue-700">
              Get Started <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </Link>
          </motion.div>
        </div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={{
            hidden: { opacity: 0 },
            show: {
              opacity: 1,
              transition: {
                staggerChildren: 0.2
              }
            }
          }}
          initial="hidden"
          animate="show"
        >
          {tutorFeatures.map((feature, index) => (
            <motion.div
              key={index}
              variants={{
                hidden: { opacity: 0, y: 20 },
                show: { opacity: 1, y: 0 }
              }}
            >
              <Card className="bg-[#f1f1f1] text-black hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <div className="mb-4">
                    {feature.icon}
                  </div>
                  <p className="text-blue-500 mb-2">{feature.category}</p>
                  <h3 className="text-xl font-semibold">{feature.title}</h3>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default MathTutorPage;