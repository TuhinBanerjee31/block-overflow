import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Send } from "lucide-react"
import { motion } from "framer-motion"

export function AnswerInput() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.5 }}
    >
      <Card className="overflow-hidden border-border/60">
        <CardHeader>
          <CardTitle className="text-lg">Your Answer</CardTitle>
        </CardHeader>
        <CardContent>
          <Textarea
            placeholder="Share your knowledge and experience..."
            className="resize-none"
            rows={6}
          />
        </CardContent>
        <CardFooter className="flex justify-between">
          <div className="text-sm text-muted-foreground">
            Be concise and provide relevant information
          </div>
          <Button className="gap-2">
            <Send className="size-4" />
            <span>Submit Answer</span>
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  )
}
