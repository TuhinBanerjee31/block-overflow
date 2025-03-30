import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Award, Heart, ThumbsDown, ThumbsUp } from "lucide-react"
import { motion } from "framer-motion"

export function AnswerCard({ answer, index }) {
  return (
    <motion.div
      key={answer.id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 * index }}
      className="mb-6"
    >
      <Card
        className={`overflow-hidden border-border/60 ${
          answer.isBest ? "border-2 border-green-400" : ""
        }`}
      >
        {answer.isBest && (
          <div className="bg-green-400/10 border-b border-green-400 px-4 py-2 flex items-center gap-2">
            <Award className="size-4 text-green-500" />
            <span className="text-sm font-medium text-green-700">
              Best Answer
            </span>
          </div>
        )}
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Avatar>
                <AvatarImage src={answer.authorAvatar} />
                <AvatarFallback>
                  {answer.author.substring(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div>
                <div className="font-medium">{answer.author}</div>
                <div className="text-sm text-muted-foreground flex items-center gap-1">
                  <span>{answer.date}</span>
                  {answer.isVerified && (
                    <>
                      <span>•</span>
                      <Badge variant="outline" className="text-xs py-0 h-5">
                        Verified Expert
                      </Badge>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </CardHeader>

        <CardContent>
          <div className="text-[15px] leading-relaxed space-y-4">
            {answer.content.split("\n\n").map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>
        </CardContent>

        <CardFooter className="flex justify-between py-3 border-t border-border/60">
          <div className="flex items-center gap-3">
            <div className="flex items-center border rounded-full overflow-hidden">
              <Button
                variant="ghost"
                size="sm"
                className="rounded-none rounded-l-full h-8 px-3"
              >
                <ThumbsUp className="size-4" />
              </Button>
              <Separator orientation="vertical" className="h-5" />
              <Button
                variant="ghost"
                size="sm"
                className="rounded-none rounded-r-full h-8 px-3"
              >
                <ThumbsDown className="size-4" />
              </Button>
            </div>
            <span className="text-sm font-medium">{answer.votes}</span>
            <Separator orientation="vertical" className="h-5" />
            <Button variant="ghost" size="sm" className="gap-2">
              <Heart className="size-4" />
              <span>Save</span>
            </Button>
          </div>
          <Button variant="outline" size="sm">
            Reply
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  )
}
