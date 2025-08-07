"use client"

import type React from "react"
import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { Loader2 } from "lucide-react"
import emailjs from "@emailjs/browser"

// Initialize EmailJS once at module level
emailjs.init("XVzfEE5aNvMgMLHx4")

export default function ContactForm() {
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    const form = e.currentTarget as HTMLFormElement & {
      elements: {
        namedItem(name: string): HTMLInputElement | HTMLTextAreaElement | null
      }
    }

    const nameInput = form.elements.namedItem("name") as HTMLInputElement
    const emailInput = form.elements.namedItem("email") as HTMLInputElement
    const subjectInput = form.elements.namedItem("subject") as HTMLInputElement
    const messageInput = form.elements.namedItem("message") as HTMLTextAreaElement

    const formData = {
      name: nameInput?.value || "",
      email: emailInput?.value || "",
      subject: subjectInput?.value || "",
      message: messageInput?.value || "",
    }

    try {
      await emailjs.send("service_6dco6kd", "template_9xsnvca", formData)

      toast({
        title: "Message sent!",
        description: "Thank you for your message. I'll get back to you soon.",
      })
      form.reset()
    } catch (err) {
      console.error("EmailJS error:", err)
      toast({
        title: "Error",
        description: "There was a problem sending your message.",
        variant: "destructive",
      })
    }

    setIsSubmitting(false)
  }

  const inputVariants = {
    focus: {
      scale: 1.01,
      boxShadow: "0 0 0 2px rgba(var(--primary), 0.2)",
      transition: { duration: 0.2 },
    },
  }

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="space-y-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
    >
      <motion.div className="space-y-2" whileTap="focus" variants={inputVariants}>
        <Input name="name" placeholder="Your Name" required />
      </motion.div>
      <motion.div className="space-y-2" whileTap="focus" variants={inputVariants}>
        <Input type="email" name="email" placeholder="Your Email" required />
      </motion.div>
      <motion.div className="space-y-2" whileTap="focus" variants={inputVariants}>
        <Input name="subject" placeholder="Subject" required />
      </motion.div>
      <motion.div className="space-y-2" whileTap="focus" variants={inputVariants}>
        <Textarea name="message" placeholder="Your Message" className="min-h-[120px]" required />
      </motion.div>
      <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} transition={{ duration: 0.2 }}>
        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Sending...
            </>
          ) : (
            "Send Message"
          )}
        </Button>
      </motion.div>
    </motion.form>
  )
}
