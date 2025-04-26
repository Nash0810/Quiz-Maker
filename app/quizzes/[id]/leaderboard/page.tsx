import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

const mockLeaderboardData = [
  {
    id: "1",
    username: "techmaster",
    score: 10,
    totalQuestions: 10,
    timeTaken: "2:15",
    completedAt: "2023-04-15T14:30:00Z",
  },
  {
    id: "2",
    username: "quizwhiz",
    score: 9,
    totalQuestions: 10,
    timeTaken: "1:45",
    completedAt: "2023-04-16T10:20:00Z",
  },
  {
    id: "3",
    username: "learner123",
    score: 9,
    totalQuestions: 10,
    timeTaken: "3:10",
    completedAt: "2023-04-14T09:15:00Z",
  },
  {
    id: "4",
    username: "studybuddy",
    score: 8,
    totalQuestions: 10,
    timeTaken: "2:30",
    completedAt: "2023-04-17T16:45:00Z",
  },
  {
    id: "5",
    username: "knowledgeseeker",
    score: 8,
    totalQuestions: 10,
    timeTaken: "2:50",
    completedAt: "2023-04-13T11:20:00Z",
  },
  {
    id: "6",
    username: "quizfan",
    score: 7,
    totalQuestions: 10,
    timeTaken: "2:05",
    completedAt: "2023-04-18T13:10:00Z",
  },
  {
    id: "7",
    username: "brainiac",
    score: 7,
    totalQuestions: 10,
    timeTaken: "1:55",
    completedAt: "2023-04-12T15:30:00Z",
  },
];

export default function LeaderboardPage({
  params,
}: {
  params: { id: string };
}) {
  // Sort by score (descending) and then by time taken (ascending)
  const sortedLeaderboard = [...mockLeaderboardData].sort((a, b) => {
    if (b.score !== a.score) {
      return b.score - a.score;
    }

    // Convert time (MM:SS) to seconds for comparison
    const aTime = a.timeTaken
      .split(":")
      .reduce((acc, time) => acc * 60 + Number.parseInt(time), 0);
    const bTime = b.timeTaken
      .split(":")
      .reduce((acc, time) => acc * 60 + Number.parseInt(time), 0);

    return aTime - bTime;
  });

  return (
    <div className="container py-8">
      <Card>
        <CardHeader>
          <CardTitle>Leaderboard</CardTitle>
          <CardDescription>
            Top performers for Web Development Basics quiz
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {sortedLeaderboard.map((entry, index) => (
              <div
                key={entry.id}
                className="flex items-center justify-between rounded-lg border p-4"
              >
                <div className="flex items-center gap-4">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted font-semibold">
                    {index + 1}
                  </div>
                  <Avatar>
                    <AvatarFallback>
                      {entry.username.slice(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{entry.username}</p>
                    <p className="text-sm text-muted-foreground">
                      Completed{" "}
                      {new Date(entry.completedAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="font-medium">
                      {entry.score}/{entry.totalQuestions}
                    </p>
                    <p className="text-sm text-muted-foreground">Score</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">{entry.timeTaken}</p>
                    <p className="text-sm text-muted-foreground">Time</p>
                  </div>
                  {index < 3 && (
                    <Badge
                      variant={
                        index === 0
                          ? "default"
                          : index === 1
                          ? "secondary"
                          : "outline"
                      }
                    >
                      {index === 0
                        ? "🥇 1st"
                        : index === 1
                        ? "🥈 2nd"
                        : "🥉 3rd"}
                    </Badge>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
