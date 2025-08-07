import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import AnimatedCard from "@/components/animated-card"

interface ExperienceCardProps {
  title: string
  company: string
  period: string
  description: string
  achievements: string[]
  index?: number
}

export default function ExperienceCard({
  title,
  company,
  period,
  description,
  achievements,
  index = 0,
}: ExperienceCardProps) {
  return (
    <AnimatedCard index={index}>
      <Card className="overflow-hidden border border-border/40 transition-all duration-300 hover:border-primary/20 hover:shadow-md">
        <CardHeader className="pb-2">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-2">
            <div>
              <h3 className="text-xl font-bold">{title}</h3>
              <p className="text-muted-foreground">{company}</p>
            </div>
            <Badge className="w-fit">{period}</Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>{description}</p>
          <div>
            <h4 className="font-medium mb-2">Key Achievements:</h4>
            <ul className="list-disc pl-5 space-y-1">
              {achievements.map((achievement, index) => (
                <li key={index}>{achievement}</li>
              ))}
            </ul>
          </div>
        </CardContent>
      </Card>
    </AnimatedCard>
  )
}
