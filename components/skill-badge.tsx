import AnimatedSkillBadge from "@/components/animated-skill-badge"

interface SkillBadgeProps {
  name: string
  level: number // 1-5 scale
  index?: number
}

export default function SkillBadge({ name, level, index = 0 }: SkillBadgeProps) {
  return <AnimatedSkillBadge name={name} level={level} index={index} />
}
