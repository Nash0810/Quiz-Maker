import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"

export default function Home() {

  const featuredQuizzes = [
    {
      id: "1",
      title: "Web Development Basics",
      description: "Test your knowledge of HTML, CSS, and JavaScript fundamentals.",
      questionCount: 10,
      createdBy: "TechTeacher",
      attempts: 1245,
    },
    {
      id: "2",
      title: "Science Quiz: The Solar System",
      description: "Explore the wonders of our solar system with this engaging quiz.",
      questionCount: 15,
      createdBy: "AstroFan",
      attempts: 876,
    },
    {
      id: "3",
      title: "History: Ancient Civilizations",
      description: "Journey through the ancient world and test your historical knowledge.",
      questionCount: 12,
      createdBy: "HistoryBuff",
      attempts: 654,
    },
  ]

  return (
    <div className="container py-8">
      <section className="py-12 md:py-24 lg:py-32 xl:py-48">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                Create, Share, and Take Quizzes
              </h1>
              <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                The ultimate platform for creating interactive quizzes, testing knowledge, and tracking progress.
              </p>
            </div>
            <div className="space-x-4">
              <Link href="/quizzes">
                <Button size="lg">Browse Quizzes</Button>
              </Link>
              <Link href="/create">
                <Button variant="outline" size="lg">
                  Create Quiz
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-8 md:py-12">
        <div className="container px-4 md:px-6">
          <h2 className="mb-6 text-2xl font-bold tracking-tight">Featured Quizzes</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featuredQuizzes.map((quiz) => (
              <Card key={quiz.id} className="overflow-hidden">
                <CardHeader>
                  <CardTitle>{quiz.title}</CardTitle>
                  <CardDescription>By {quiz.createdBy}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{quiz.description}</p>
                  <div className="mt-4 flex items-center text-sm text-muted-foreground">
                    <span className="mr-4">{quiz.questionCount} questions</span>
                    <span>{quiz.attempts} attempts</span>
                  </div>
                </CardContent>
                <CardFooter>
                  <Link href={`/quizzes/${quiz.id}`} className="w-full">
                    <Button className="w-full">Take Quiz</Button>
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-muted py-8 md:py-12">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-3">
            <div className="rounded-lg border bg-card p-6 shadow-sm">
              <h3 className="mb-2 text-xl font-bold">Create</h3>
              <p className="text-muted-foreground">
                Design engaging quizzes with multiple-choice questions, customize settings, and share with your
                audience.
              </p>
            </div>
            <div className="rounded-lg border bg-card p-6 shadow-sm">
              <h3 className="mb-2 text-xl font-bold">Take</h3>
              <p className="text-muted-foreground">
                Attempt quizzes, get instant feedback, and see how you rank against other participants.
              </p>
            </div>
            <div className="rounded-lg border bg-card p-6 shadow-sm">
              <h3 className="mb-2 text-xl font-bold">Analyze</h3>
              <p className="text-muted-foreground">
                Track performance, view detailed analytics, and gain insights into quiz effectiveness.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
