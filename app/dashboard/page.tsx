"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
} from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const mockCreatedQuizzes = [
  {
    id: "1",
    title: "Web Development Basics",
    description:
      "Test your knowledge of HTML, CSS, and JavaScript fundamentals.",
    attempts: 1245,
    avgScore: 72,
  },
  {
    id: "2",
    title: "JavaScript Advanced Concepts",
    description: "Deep dive into closures, prototypes, and async programming.",
    attempts: 876,
    avgScore: 68,
  },
  {
    id: "3",
    title: "React Fundamentals",
    description: "Learn the basics of React, components, and hooks.",
    attempts: 654,
    avgScore: 75,
  },
];

const mockAttemptedQuizzes = [
  {
    id: "4",
    title: "Python Basics",
    description: "Introduction to Python programming language.",
    score: 8,
    totalQuestions: 10,
    completedAt: "2023-04-15",
  },
  {
    id: "5",
    title: "Data Structures",
    description: "Common data structures and their implementations.",
    score: 7,
    totalQuestions: 10,
    completedAt: "2023-04-10",
  },
];

const analyticsData = [
  { name: "Mon", attempts: 12, avgScore: 75 },
  { name: "Tue", attempts: 19, avgScore: 68 },
  { name: "Wed", attempts: 15, avgScore: 72 },
  { name: "Thu", attempts: 27, avgScore: 79 },
  { name: "Fri", attempts: 32, avgScore: 71 },
  { name: "Sat", attempts: 24, avgScore: 65 },
  { name: "Sun", attempts: 18, avgScore: 70 },
];

export default function DashboardPage() {
  return (
    <div className="container py-8">
      <h1 className="mb-6 text-3xl font-bold">Dashboard</h1>

      <Tabs defaultValue="created">
        <TabsList className="mb-4">
          <TabsTrigger value="created">Created Quizzes</TabsTrigger>
          <TabsTrigger value="attempted">Attempted Quizzes</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="created">
          <div className="mb-4 flex justify-between">
            <h2 className="text-xl font-bold">Quizzes You've Created</h2>
            <Link href="/create">
              <Button>Create New Quiz</Button>
            </Link>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {mockCreatedQuizzes.map((quiz) => (
              <Card key={quiz.id}>
                <CardHeader>
                  <CardTitle>{quiz.title}</CardTitle>
                  <CardDescription>{quiz.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">
                        Attempts:
                      </span>
                      <span className="font-medium">{quiz.attempts}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">
                        Avg. Score:
                      </span>
                      <span className="font-medium">{quiz.avgScore}%</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" asChild>
                    <Link href={`/quizzes/${quiz.id}/edit`}>Edit</Link>
                  </Button>
                  <Button variant="outline" asChild>
                    <Link href={`/quizzes/${quiz.id}/analytics`}>
                      Analytics
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="attempted">
          <h2 className="mb-4 text-xl font-bold">Quizzes You've Attempted</h2>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {mockAttemptedQuizzes.map((quiz) => (
              <Card key={quiz.id}>
                <CardHeader>
                  <CardTitle>{quiz.title}</CardTitle>
                  <CardDescription>{quiz.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">
                        Score:
                      </span>
                      <span className="font-medium">
                        {quiz.score} / {quiz.totalQuestions} (
                        {Math.round((quiz.score / quiz.totalQuestions) * 100)}%)
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">
                        Completed:
                      </span>
                      <span className="font-medium">{quiz.completedAt}</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full" asChild>
                    <Link href={`/quizzes/${quiz.id}`}>Take Again</Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="analytics">
          <Card>
            <CardHeader>
              <CardTitle>Quiz Performance Analytics</CardTitle>
              <CardDescription>
                Weekly overview of quiz attempts and scores
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  attempts: {
                    label: "Attempts",
                    color: "hsl(var(--chart-1))",
                  },
                  avgScore: {
                    label: "Average Score",
                    color: "hsl(var(--chart-2))",
                  },
                }}
                className="h-[300px]"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={analyticsData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Legend />
                    <Bar dataKey="attempts" fill="var(--color-attempts)" />
                    <Bar dataKey="avgScore" fill="var(--color-avgScore)" />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
