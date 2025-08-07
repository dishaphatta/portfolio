"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { useIntersectionObserver } from "@/hooks/use-intersection-observer"
import { cn } from "@/lib/utils"

interface Skill {
  name: string
  level: number // 1-5
  category: string
  description: string
}

interface InteractiveSkillChartProps {
  skills: Skill[]
  categories: string[]
}

export default function InteractiveSkillChart({ skills, categories }: InteractiveSkillChartProps) {
  const [activeCategory, setActiveCategory] = useState<string>(categories[0])
  const [hoveredSkill, setHoveredSkill] = useState<Skill | null>(null)
  const [isVisible, ref] = useIntersectionObserver()

  const filteredSkills = skills.filter((skill) => skill.category === activeCategory)

  return (
    <div ref={ref} className="w-full">
      <motion.div
        initial={{ opacity: 0 }}
        animate={isVisible ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-8"
      >
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={cn(
                "px-4 py-2 rounded-full transition-all duration-300",
                activeCategory === category
                  ? "bg-primary text-primary-foreground shadow-md"
                  : "bg-muted hover:bg-muted/80",
              )}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="relative">
          {hoveredSkill && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-16 bg-popover shadow-lg rounded-lg p-4 z-10 w-64"
            >
              <h4 className="font-medium text-lg">{hoveredSkill.name}</h4>
              <p className="text-sm text-muted-foreground">{hoveredSkill.description}</p>
            </motion.div>
          )}

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredSkills.map((skill, index) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isVisible ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                onMouseEnter={() => setHoveredSkill(skill)}
                onMouseLeave={() => setHoveredSkill(null)}
                className="relative"
              >
                <div className="bg-card border rounded-lg p-4 h-full hover:shadow-md transition-all duration-300 hover:border-primary/30 group">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-medium group-hover:text-primary transition-colors">{skill.name}</h3>
                    <span className="text-sm text-muted-foreground">{skill.category}</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={isVisible ? { width: `${(skill.level / 5) * 100}%` } : { width: 0 }}
                      transition={{ duration: 1, delay: index * 0.1 }}
                      className="h-full bg-primary"
                    />
                  </div>
                  <div className="flex justify-between mt-1">
                    <span className="text-xs text-muted-foreground">Beginner</span>
                    <span className="text-xs text-muted-foreground">Expert</span>
                  </div>
                  <div className="absolute -top-1 -right-1">
                    <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center text-xs text-primary-foreground font-medium">
                      {skill.level}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  )
}
