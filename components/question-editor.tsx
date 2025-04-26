"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

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

interface QuestionEditorProps {
  questionNumber: number
  question: Question
  onQuestionTextChange: (value: string) => void
  onOptionTextChange: (optionId: string, value: string) => void
  onCorrectAnswerChange: (optionId: string) => void
}

export function QuestionEditor({
  questionNumber,
  question,
  onQuestionTextChange,
  onOptionTextChange,
  onCorrectAnswerChange,
}: QuestionEditorProps) {
  const correctOptionId = question.options.find((o) => o.isCorrect)?.id || ""

  return (
    <Card className="mb-4">
      <CardHeader>
        <CardTitle>Question {questionNumber}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor={`question-${question.id}`}>Question Text</Label>
          <Input
            id={`question-${question.id}`}
            placeholder="Enter your question"
            value={question.questionText}
            onChange={(e) => onQuestionTextChange(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label>Options</Label>
          <RadioGroup value={correctOptionId} onValueChange={onCorrectAnswerChange}>
            {question.options.map((option) => (
              <div key={option.id} className="flex items-center space-x-2">
                <RadioGroupItem value={option.id} id={`option-${question.id}-${option.id}`} />
                <Input
                  placeholder={`Option ${option.id}`}
                  value={option.optionText}
                  onChange={(e) => onOptionTextChange(option.id, e.target.value)}
                  className="flex-1"
                />
              </div>
            ))}
          </RadioGroup>
          <p className="text-sm text-muted-foreground">Select the radio button next to the correct answer</p>
        </div>
      </CardContent>
    </Card>
  )
}
