import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Clock, MessageCircle, ThumbsUp } from "lucide-react";
import { motion } from "framer-motion";

export function QuestionCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="mb-8 overflow-hidden border-border/60">
        <CardHeader className="pb-4">
          <div className="flex justify-between items-start gap-4">
            <div className="flex items-center gap-3">
              <Avatar>
                <AvatarFallback>AJ</AvatarFallback>
              </Avatar>
              <div>
                <div className="text-sm text-muted-foreground">
                  Alex Johnson • 2 hours ago
                </div>
                <CardTitle className="text-2xl font-medium mt-1">
                  What's the best strategy for dollar-cost averaging in the
                  current market?
                </CardTitle>
              </div>
            </div>
            <Badge variant="outline" className="flex gap-1 items-center">
              <Clock className="size-3" />
              <span>Active</span>
            </Badge>
          </div>
        </CardHeader>

        <CardContent className="pb-4">
          <p className="text-[15px] leading-relaxed">
            I've been investing $500 monthly into index funds, but with the
            recent market volatility, I'm wondering if I should adjust my
            strategy. Should I increase my contributions during dips or stay
            consistent regardless of market conditions?
          </p>
          <p className="text-[15px] leading-relaxed mt-4">
            My current allocation is 70% in a total market index fund, 20% in an
            international fund, and 10% in bonds. I'm in my early 30s with a
            long investment horizon.
          </p>
          <div className="flex flex-wrap gap-2 mt-6">
            <Badge variant="secondary">Investing</Badge>
            <Badge variant="secondary">DCA</Badge>
            <Badge variant="secondary">Market Strategy</Badge>
          </div>
        </CardContent>

        <CardFooter className="py-3 border-t border-border/60">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" className="gap-2">
              <ThumbsUp className="size-4" />
              <span>24</span>
            </Button>
            <Button variant="ghost" size="sm" className="gap-2">
              <MessageCircle className="size-4" />
              <span>7 answers</span>
            </Button>
          </div>
        </CardFooter>
      </Card>
    </motion.div>
  );
}
