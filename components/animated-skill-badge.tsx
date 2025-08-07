"use client"

import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

interface AnimatedSkillBadgeProps {
  name: string
  level: number // 1-5 scale
  index: number
}

export default function AnimatedSkillBadge({ name, level, index }: AnimatedSkillBadgeProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.3,
        delay: index * 0.05,
        ease: "easeOut",
      }}
      whileHover={{
        scale: 1.05,
        transition: { duration: 0.2 },
      }}
    >
      <Badge
        variant="outline"
        className={cn(
          "py-1.5 px-3 text-sm font-medium transition-all duration-300",
          level >= 4 && "border-primary/50 bg-primary/10",
        )}
      >
        {name} {Array(level).fill("•").join("")}
      </Badge>
    </motion.div>
  )
}
