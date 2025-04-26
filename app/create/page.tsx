"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { QuestionEditor } from "@/components/question-editor";
import { QuizPreview } from "@/components/quiz-preview";

export default function CreateQuizPage() {
  const [quizData, setQuizData] = useState({
    title: "",
    description: "",
    timeLimit: 0,
    isPublic: true,
    questions: [
      {
        id: "1",
        questionText: "",
        options: [
          { id: "1", optionText: "", isCorrect: false },
          { id: "2", optionText: "", isCorrect: false },
          { id: "3", optionText: "", isCorrect: false },
          { id: "4", optionText: "", isCorrect: false },
        ],
      },
    ],
  });

  const handleQuizDataChange = (field: string, value: any) => {
    setQuizData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleAddQuestion = () => {
    const newQuestion = {
      id: `${quizData.questions.length + 1}`,
      questionText: "",
      options: [
        { id: "1", optionText: "", isCorrect: false },
        { id: "2", optionText: "", isCorrect: false },
        { id: "3", optionText: "", isCorrect: false },
        { id: "4", optionText: "", isCorrect: false },
      ],
    };

    setQuizData((prev) => ({
      ...prev,
      questions: [...prev.questions, newQuestion],
    }));
  };

  const handleQuestionChange = (
    questionId: string,
    field: string,
    value: any
  ) => {
    setQuizData((prev) => ({
      ...prev,
      questions: prev.questions.map((q) => {
        if (q.id === questionId) {
          return { ...q, [field]: value };
        }
        return q;
      }),
    }));
  };

  const handleOptionChange = (
    questionId: string,
    optionId: string,
    field: string,
    value: any
  ) => {
    setQuizData((prev) => ({
      ...prev,
      questions: prev.questions.map((q) => {
        if (q.id === questionId) {
          return {
            ...q,
            options: q.options.map((o) => {
              if (o.id === optionId) {
                return { ...o, [field]: value };
              }
              return o;
            }),
          };
        }
        return q;
      }),
    }));
  };

  const handleCorrectAnswerChange = (questionId: string, optionId: string) => {
    setQuizData((prev) => ({
      ...prev,
      questions: prev.questions.map((q) => {
        if (q.id === questionId) {
          return {
            ...q,
            options: q.options.map((o) => ({
              ...o,
              isCorrect: o.id === optionId,
            })),
          };
        }
        return q;
      }),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    console.log("Quiz data to submit:", quizData);
    alert("Quiz created successfully! (This is a demo)");
  };

  return (
    <div className="container py-8">
      <h1 className="mb-6 text-3xl font-bold">Create a New Quiz</h1>

      <Tabs defaultValue="edit">
        <TabsList className="mb-4">
          <TabsTrigger value="edit">Edit</TabsTrigger>
          <TabsTrigger value="preview">Preview</TabsTrigger>
        </TabsList>

        <TabsContent value="edit">
          <form onSubmit={handleSubmit}>
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Quiz Details</CardTitle>
                <CardDescription>
                  Set the basic information for your quiz
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Quiz Title</Label>
                  <Input
                    id="title"
                    placeholder="Enter quiz title"
                    value={quizData.title}
                    onChange={(e) =>
                      handleQuizDataChange("title", e.target.value)
                    }
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Enter quiz description"
                    value={quizData.description}
                    onChange={(e) =>
                      handleQuizDataChange("description", e.target.value)
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="timeLimit">
                    Time Limit (minutes, 0 for no limit)
                  </Label>
                  <Input
                    id="timeLimit"
                    type="number"
                    min="0"
                    value={quizData.timeLimit}
                    onChange={(e) =>
                      handleQuizDataChange(
                        "timeLimit",
                        Number.parseInt(e.target.value)
                      )
                    }
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <Switch
                    id="isPublic"
                    checked={quizData.isPublic}
                    onCheckedChange={(checked) =>
                      handleQuizDataChange("isPublic", checked)
                    }
                  />
                  <Label htmlFor="isPublic">Make quiz public</Label>
                </div>
              </CardContent>
            </Card>

            <div className="mb-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold">Questions</h2>
                <Button type="button" onClick={handleAddQuestion}>
                  Add Question
                </Button>
              </div>

              {quizData.questions.map((question, index) => (
                <QuestionEditor
                  key={question.id}
                  questionNumber={index + 1}
                  question={question}
                  onQuestionTextChange={(value) =>
                    handleQuestionChange(question.id, "questionText", value)
                  }
                  onOptionTextChange={(optionId, value) =>
                    handleOptionChange(
                      question.id,
                      optionId,
                      "optionText",
                      value
                    )
                  }
                  onCorrectAnswerChange={(optionId) =>
                    handleCorrectAnswerChange(question.id, optionId)
                  }
                />
              ))}
            </div>

            <div className="flex justify-end">
              <Button type="submit">Create Quiz</Button>
            </div>
          </form>
        </TabsContent>

        <TabsContent value="preview">
          <QuizPreview quiz={quizData} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
