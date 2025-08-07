import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import AnimatedCard from "@/components/animated-card"
import AnimatedImage from "@/components/animated-image"
import { FaGithub } from "react-icons/fa"
import { Button } from "@/components/ui/button"


interface ProjectCardProps {
  title: string
  description: string
  tags: string[]
  imageUrl: string
  githubLink: string // <-- new prop
  index?: number
}

export default function ProjectCard({ title, description, tags, imageUrl, githubLink, index = 0 }: ProjectCardProps) {
  return (
    <AnimatedCard index={index}>
      <Card className="overflow-hidden flex flex-col h-full border border-border/40 transition-all duration-300 hover:border-primary/20 hover:shadow-lg group">
        <div className="relative h-48 w-full overflow-hidden">
          <AnimatedImage
            src={imageUrl || "/placeholder.svg"}
            alt={title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
        </div>
        <CardContent className="flex-grow p-6">
          <h3 className="text-xl font-bold mb-2">{title}</h3>
          <p className="text-muted-foreground">{description}</p>
        </CardContent>
        <CardFooter className="flex flex-wrap gap-2 p-6 pt-0">
          {/* Tags on the left */}
          <div className="flex flex-wrap gap-2">
            {tags.map((tag, index) => (
              <Badge key={index} variant="secondary" className="transition-all duration-300 hover:bg-primary/20">
                {tag}
              </Badge>
            ))}
          </div>

          {/* GitHub Button */}
          <a
            href={githubLink}
            target="_blank"
            rel="noopener noreferrer"
            // className="mt-2"
          >
            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-2 text-sm"
            >
              <FaGithub className="h-4 w-4" />
              View Project
            </Button>
          </a>
        </CardFooter>

      </Card>
    </AnimatedCard>
  )
}
