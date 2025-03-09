'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

// Define the types for the stored messages
interface Message {
  sender: string;
  text: string;
  isLoading: boolean;
  details?: string; // optional property for additional details
}

interface StoredData {
  userId: string;
  apiKey: string;
  appKey: string;
  promptscount: number;
  messages: Message[];
}

export function RecentActivity() {
  // Set up a state to store the messages
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    // Fetch the data from localStorage and parse it
    const storedData: StoredData | null = JSON.parse(localStorage.getItem('integry-api') || 'null');

    // If the data exists and messages are present, update the state
    if (storedData && storedData.messages) {
      setMessages(storedData.messages);
    }
  }, []); // Empty dependency array to run the effect only once on mount

  // If there are no messages, show a fallback message
  if (messages.length === 0) {
    return (
      <Card className="h-full">
        <CardHeader className="p-4 lg:p-6">
          <CardTitle className="text-base lg:text-lg">Recent Prompts</CardTitle>
        </CardHeader>
        <CardContent className="p-4 lg:p-6 pt-0">
          <p className="text-center text-sm text-muted-foreground">No prompts yet...</p>
        </CardContent>
      </Card>
    );
  }

  const activities = messages.map((message, index) => ({
    project: `Prompt ${index + 1}`,
    description: message.text,  // The message text is the description
  }));

  return (
    <Card className="h-full">
      <CardHeader className="p-4 lg:p-6">
        <CardTitle className="text-base lg:text-lg">Recent Prompts</CardTitle>
      </CardHeader>
      <CardContent className="p-4 lg:p-6 pt-0">
        <div className="space-y-6">
          {activities.map((activity, index) => (
            <motion.div
              key={activity.project}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-start justify-between space-x-4"
            >
              <div className="space-y-1">
                <p className="text-sm font-medium">{activity.project}</p>
                <p className="text-xs lg:text-sm text-muted-foreground">
                  {activity.description} {/* Only render the 'text' field */}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
