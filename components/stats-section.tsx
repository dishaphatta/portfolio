"use client"

import { Card, CardContent } from "@/components/ui/card"
import { motion } from "framer-motion"
import { useIntersectionObserver } from "@/hooks/use-intersection-observer"
import AnimatedCounter from "@/components/animated-counter"
import { Code, Clock } from "lucide-react"

export default function StatsSection() {
  const [isVisible, ref] = useIntersectionObserver()

  const stats = [
    {
      value: 1.5,
      label: "Years Experience",
      icon: Clock,
      suffix: "+",
    },
    {
      value: 10,
      label: "Projects Completed",
      icon: Code,
      suffix: "+",
    },
  ]

  return (
    <div ref={ref} className="py-16 bg-muted/30">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 max-w-2xl mx-auto">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="border-none shadow-sm hover:shadow-md transition-shadow duration-300">
                <CardContent className="p-6 text-center">
                  <div className="flex justify-center mb-4">
                    <div className="p-3 rounded-full bg-primary/10 text-primary">
                      <stat.icon className="h-6 w-6" />
                    </div>
                  </div>
                  <div className="text-3xl font-bold mb-1 flex justify-center">
                    <AnimatedCounter
                      from={0}
                      to={stat.value}
                      decimals={stat.value % 1 !== 0 ? 1 : 0}
                      formatter={(value) =>
                        `${value.toFixed(stat.value % 1 !== 0 ? 1 : 0)}${stat.suffix}`
                      }
                    />
                  </div>
                  <p className="text-muted-foreground">{stat.label}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
