'use client'

import { motion } from 'framer-motion'
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

const data = [
  { date: 'Jan 1', value: 75 },
  { date: 'Jan 5', value: 80 },
  { date: 'Jan 10', value: 85 },
  { date: 'Jan 15', value: 88 },
  { date: 'Jan 20', value: 90 },
  { date: 'Jan 25', value: 92 },
  { date: 'Jan 30', value: 94 }
]

export function PerformanceChart() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="w-full h-[200px] sm:h-[300px]"
    >
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
          <XAxis
            dataKey="date"
            stroke="#888888"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            interval="preserveStartEnd"
            tick={{ transform: 'translate(0, 6)' }}
          />
          <YAxis
            stroke="#888888"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => `${value}%`}
            domain={[70, 100]}
          />
          <Tooltip
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                return (
                  <div className="rounded-lg border bg-background p-2 shadow-sm">
                    <div className="grid grid-cols-2 gap-2">
                      <div className="flex flex-col">
                        <span className="text-[0.70rem] uppercase text-muted-foreground">
                          Accuracy
                        </span>
                        <span className="font-bold text-muted-foreground">
                          {payload[0].value}%
                        </span>
                      </div>
                    </div>
                  </div>
                )
              }
              return null
            }}
          />
          <Line
            type="monotone"
            dataKey="value"
            stroke="hsl(var(--primary))"
            strokeWidth={2}
            dot={false}
            activeDot={{
              r: 4,
              style: { fill: 'hsl(var(--primary))' },
            }}
          />
        </LineChart>
      </ResponsiveContainer>
    </motion.div>
  )
}