import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"

export function NavigationButtons() {
  return (
    <div className="flex justify-between items-center mt-10">
      <Button variant="outline" className="gap-2">
        <ChevronLeft className="size-4" />
        <span>Previous Question</span>
      </Button>
      <Button variant="outline" className="gap-2">
        <span>Next Question</span>
        <ChevronRight className="size-4" />
      </Button>
    </div>
  )
}
