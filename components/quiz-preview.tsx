import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

interface Option {
  id: string
  optionText: string
  isCorrect: boolean
}

interface Question {
  id: string
  questionText: string
  options: Option[]
}

interface Quiz {
  title: string
  description: string
  timeLimit: number
  isPublic: boolean
  questions: Question[]
}

interface QuizPreviewProps {
  quiz: Quiz
}

export function QuizPreview({ quiz }: QuizPreviewProps) {
  const hasValidQuestions = quiz.questions.some(
    (q) => q.questionText.trim() && q.options.some((o) => o.optionText.trim()),
  )

  if (!quiz.title) {
    return (
      <Card>
        <CardContent className="pt-6">
          <p className="text-center text-muted-foreground">Please add a title to your quiz to see the preview</p>
        </CardContent>
      </Card>
    )
  }

  if (!hasValidQuestions) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>{quiz.title}</CardTitle>
          {quiz.description && <CardDescription>{quiz.description}</CardDescription>}
        </CardHeader>
        <CardContent>
          <p className="text-center text-muted-foreground">Add questions and options to see the preview</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>{quiz.title}</CardTitle>
          {quiz.description && <CardDescription>{quiz.description}</CardDescription>}
          {quiz.timeLimit > 0 && <p className="text-sm text-muted-foreground">Time Limit: {quiz.timeLimit} minutes</p>}
        </CardHeader>
      </Card>

      {quiz.questions.map((question, index) => {
        if (!question.questionText.trim()) return null

        const validOptions = question.options.filter((o) => o.optionText.trim())
        if (validOptions.length === 0) return null

        return (
          <Card key={question.id} className="overflow-hidden">
            <CardHeader>
              <CardTitle className="text-lg">
                Question {index + 1}: {question.questionText}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <RadioGroup>
                {validOptions.map((option) => (
                  <div key={option.id} className="flex items-center space-x-2 rounded-md border p-3 shadow-sm">
                    <RadioGroupItem value={option.id} id={`preview-${question.id}-${option.id}`} />
                    <Label htmlFor={`preview-${question.id}-${option.id}`} className="flex-1">
                      {option.optionText}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </CardContent>
          </Card>
        )
      })}

      <div className="flex justify-end">
        <Button>Submit Answers</Button>
      </div>
    </div>
  )
}
