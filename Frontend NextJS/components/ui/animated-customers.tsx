'use client';
import { motion } from "framer-motion";

const companies = [
  { name: 'Microsoft', delay: 0 },
  { name: 'Meta', delay: 0.1 },
  { name: 'Cisco', delay: 0.2 },
  { name: 'BCG', delay: 0.3 },
  { name: 'GM', delay: 0.4 },
  { name: 'Toyota', delay: 0.5 }
];

export const AnimatedCustomers = () => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 1 }}
    className="text-center"
  >
    <motion.p 
      className="text-gray-600 mb-12 text-lg"
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      Scale works with Generative AI Companies, U.S. Government Agencies & 
      <span className="border-b border-gray-400 ml-2 hover:border-blue-500 transition-colors cursor-pointer">
        Enterprises
      </span>
    </motion.p>
    
    <div className="grid grid-cols-2 md:grid-cols-6 gap-12 items-center">
      {companies.map(({ name, delay }) => (
        <motion.div
          key={name}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay, duration: 0.5 }}
          whileHover={{ scale: 1.05 }}
          className="flex items-center justify-center group"
        >
          <div className="h-8 flex items-center justify-center text-gray-500 group-hover:text-gray-900 transition-colors">
            {name}
          </div>
        </motion.div>
      ))}
    </div>
  </motion.div>
);
