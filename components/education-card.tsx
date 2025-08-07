import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import AnimatedCard from "@/components/animated-card"

interface EducationCardProps {
  degree: string
  institution: string
  period: string
  description: string
  index?: number
}

export default function EducationCard({ degree, institution, period, description, index = 0 }: EducationCardProps) {
  return (
    <AnimatedCard index={index}>
      <Card className="border border-border/40 transition-all duration-300 hover:border-primary/20 hover:shadow-md">
        <CardHeader className="pb-2">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-2">
            <div>
              <h3 className="text-xl font-bold">{degree}</h3>
              <p className="text-muted-foreground">{institution}</p>
            </div>
            <Badge className="w-fit">{period}</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <p>{description}</p>
        </CardContent>
      </Card>
    </AnimatedCard>
  )
}
