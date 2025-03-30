export function AnswersHeader() {
  return (
    <div className="flex items-center justify-between mb-6">
      <h2 className="text-xl font-semibold">7 Answers</h2>
      <div className="flex items-center gap-2">
        <span className="text-sm text-muted-foreground">Sort by:</span>
        <select className="text-sm bg-transparent border-none focus:outline-none focus:ring-0">
          <option>Most Upvoted</option>
          <option>Recent</option>
        </select>
      </div>
    </div>
  )
}
