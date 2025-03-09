'use client';
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Upcomming } from "./upcommingButton";
import Link from "next/link";

export const AnimatedHeroContent = () => (
  <motion.div
    initial={{ y: 20, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    transition={{ duration: 0.8 }}
    className="text-center max-w-4xl mx-auto"
  >
    <Upcomming text={' ArangoDB-powered drug discovery bot..'}/>
    <motion.h1
      className="text-4xl md:text-6xl font-light mb-6 leading-tight text-gray-900"
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.2 }}
    >
      Accelerate Research <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> with ArangoDB</span><br />
      Drug Discovery Agent
    </motion.h1>
    <motion.p
      className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto"
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.4 }}
    >
Our Drug Discovery Agent leverages graph-based analytics and biomedical databases to answer complex research queries, uncover drug-target interactions, and optimize drug repurposing strategies in real time.

</motion.p>
    <motion.div
      className="flex justify-center gap-4"
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.6 }}
    >
      <Link href="/dashboard/chat">
        <Button size="lg" className="bg-blue-600 hover:bg-blue-700">Interact with BOT →</Button>
      </Link>
    </motion.div>
  </motion.div>
);
