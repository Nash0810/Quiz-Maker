"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { useRouter } from "next/navigation";

const mockQuiz = {
  id: "1",
  title: "Web Development Basics",
  description: "Test your knowledge of HTML, CSS, and JavaScript fundamentals.",
  timeLimit: 10, // minutes
  questions: [
    {
      id: "1",
      questionText: "What does HTML stand for?",
      options: [
        { id: "1", optionText: "Hyper Text Markup Language", isCorrect: true },
        { id: "2", optionText: "High Tech Multi Language", isCorrect: false },
        {
          id: "3",
          optionText: "Hyper Transfer Markup Language",
          isCorrect: false,
        },
        { id: "4", optionText: "Home Tool Markup Language", isCorrect: false },
      ],
    },
    {
      id: "2",
      questionText:
        "Which CSS property is used to change the text color of an element?",
      options: [
        { id: "1", optionText: "font-color", isCorrect: false },
        { id: "2", optionText: "text-color", isCorrect: false },
        { id: "3", optionText: "color", isCorrect: true },
        { id: "4", optionText: "text-style", isCorrect: false },
      ],
    },
    {
      id: "3",
      questionText:
        "Which of the following is NOT a JavaScript framework or library?",
      options: [
        { id: "1", optionText: "React", isCorrect: false },
        { id: "2", optionText: "Angular", isCorrect: false },
        { id: "3", optionText: "Django", isCorrect: true },
        { id: "4", optionText: "Vue", isCorrect: false },
      ],
    },
  ],
};

export default function QuizPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<
    Record<string, string>
  >({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(mockQuiz.timeLimit * 60); // seconds

  const currentQuestion = mockQuiz.questions[currentQuestionIndex];
  const progress =
    ((currentQuestionIndex + 1) / mockQuiz.questions.length) * 100;

  const handleAnswerSelect = (questionId: string, optionId: string) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionId]: optionId,
    }));
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < mockQuiz.questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    }
  };

  const handleSubmitQuiz = () => {
    // Calculate score
    let score = 0;
    mockQuiz.questions.forEach((question) => {
      const selectedOptionId = selectedAnswers[question.id];
      if (selectedOptionId) {
        const selectedOption = question.options.find(
          (o) => o.id === selectedOptionId
        );
        if (selectedOption?.isCorrect) {
          score++;
        }
      }
    });

    console.log("Quiz submitted with score:", score);
    setQuizSubmitted(true);

    // router.push(`/quizzes/${params.id}/results?score=${score}`)
  };

  // Format time as MM:SS
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds
      .toString()
      .padStart(2, "0")}`;
  };

  if (quizSubmitted) {
    return (
      <div className="container py-8">
        <Card className="mx-auto max-w-2xl">
          <CardHeader>
            <CardTitle>Quiz Completed!</CardTitle>
            <CardDescription>Thank you for taking the quiz</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-center text-2xl font-bold">
              Your Score:{" "}
              {
                mockQuiz.questions.filter((q) => {
                  const selectedOptionId = selectedAnswers[q.id];
                  return q.options.find((o) => o.id === selectedOptionId)
                    ?.isCorrect;
                }).length
              }{" "}
              / {mockQuiz.questions.length}
            </p>
          </CardContent>
          <CardFooter className="flex justify-center">
            <Button onClick={() => router.push("/quizzes")}>
              Back to Quizzes
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  return (
    <div className="container py-8">
      <Card className="mx-auto max-w-2xl">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>{mockQuiz.title}</CardTitle>
            <div className="text-sm font-medium">
              Time: {formatTime(timeRemaining)}
            </div>
          </div>
          <CardDescription>{mockQuiz.description}</CardDescription>
          <div className="mt-2">
            <Progress value={progress} className="h-2" />
            <div className="mt-1 text-right text-sm text-muted-foreground">
              Question {currentQuestionIndex + 1} of {mockQuiz.questions.length}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <h3 className="text-lg font-medium">
              {currentQuestion.questionText}
            </h3>
            <RadioGroup
              value={selectedAnswers[currentQuestion.id] || ""}
              onValueChange={(value) =>
                handleAnswerSelect(currentQuestion.id, value)
              }
            >
              {currentQuestion.options.map((option) => (
                <div
                  key={option.id}
                  className="flex items-center space-x-2 rounded-md border p-3 shadow-sm"
                >
                  <RadioGroupItem
                    value={option.id}
                    id={`option-${option.id}`}
                  />
                  <Label htmlFor={`option-${option.id}`} className="flex-1">
                    {option.optionText}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button
            variant="outline"
            onClick={handlePreviousQuestion}
            disabled={currentQuestionIndex === 0}
          >
            Previous
          </Button>
          <div>
            {currentQuestionIndex === mockQuiz.questions.length - 1 ? (
              <Button
                onClick={handleSubmitQuiz}
                disabled={
                  Object.keys(selectedAnswers).length <
                  mockQuiz.questions.length
                }
              >
                Submit Quiz
              </Button>
            ) : (
              <Button onClick={handleNextQuestion}>Next</Button>
            )}
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
