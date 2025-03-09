'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import { Folder, Image, Target, Users } from 'lucide-react'

export function Stats() {
  const [stats, setStats] = useState([
    {
      title: 'Total Prompts',
      value: 0, // Default value for Total Prompts
      icon: Folder
    },
    {
      title: 'User ID',
      value: '2,345', // Default User ID
      icon: Image
    },
    {
      title: 'App Key',
      value: '94.5%', // Default App Key
      icon: Target
    },
    {
      title: 'Api Key',
      value: '573', // Default Api Key
      icon: Users
    }
  ])

  useEffect(() => {
    const storedPrompts = localStorage.getItem('integry-api');
    if (storedPrompts) {
      try {
        const parsedData = JSON.parse(storedPrompts);
        
        // Update the stats based on parsed data
        setStats(prevStats => prevStats.map(stat => {
          if (stat.title === 'Total Prompts') {
            return { ...stat, value: parsedData.promptscount || 0 };
          }
          if (stat.title === 'User ID') {
            return { ...stat, value: parsedData.userId || 'N/A' };
          }
          if (stat.title === 'App Key') {
            return { ...stat, value: parsedData.appKey || 'N/A' };
          }
          if (stat.title === 'Api Key') {
            return { ...stat, value: parsedData.apiKey || 'N/A' };
          }
          return stat;
        }));

      } catch (error) {
        console.error("Error parsing localStorage data", error);
        // If error occurs, set default values
        setStats(prevStats => prevStats.map(stat => {
          if (stat.title === 'Total Prompts') {
            return { ...stat, value: 0 };
          }
          return stat;
        }));
      }
    } else {
      // If no data is found, set default values
      setStats(prevStats => prevStats.map(stat => {
        if (stat.title === 'Total Prompts') {
          return { ...stat, value: 0 };
        }
        return stat;
      }));
    }
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <Card className='h-[100px]'>
            <CardContent className="flex items-center gap-4 p-4 lg:p-6">
              <stat.icon className="h-5 w-5 text-muted-foreground" />
              <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </p>
                <p className="text-xs text-muted-foreground">
                  {stat.value}
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  )
}
