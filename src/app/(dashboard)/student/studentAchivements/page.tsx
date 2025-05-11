

"use client";
import { useState } from "react";
import { 
  Search, 
  Filter, 
  Award, 
  Trophy, 
  Medal,
  Star,
  Calendar,
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/app/components/ui/card";
 
import { Progress } from "@radix-ui/react-progress";
 
import { Badge } from "@/app/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/app/components/ui/avatar";
import { Button } from "@/app/components/ui/button";
import { useAuth } from "@/app/lib/auth-context";

// Mock achievements data
const mockAchievements = [
  {
    id: "1",
    name: "Perfect Score",
    description: "Achieved 100% on a test",
    icon: Star,
    earned: true,
    date: "2023-04-15",
    color: "bg-yellow-500",
  },
  {
    id: "2",
    name: "Test Ace",
    description: "Completed 10 tests with scores above 90%",
    icon: Trophy,
    earned: true,
    date: "2023-05-10",
    color: "bg-purple-500",
  },
  {
    id: "3",
    name: "Quick Learner",
    description: "Completed a test in less than half the allotted time",
    // icon: Clock,
    earned: true,
    date: "2023-05-22",
    color: "bg-blue-500",
  },
  {
    id: "4",
    name: "Consistent Performer",
    description: "Achieved above 80% on 5 consecutive tests",
    // icon: TrendingUp,
    earned: true,
    date: "2023-06-05",
    color: "bg-green-500",
  },
  {
    id: "5",
    name: "Knowledge Master",
    description: "Passed tests in all available categories",
    // icon: BookOpen,
    earned: false,
    progress: 60,
    color: "bg-indigo-500",
  },
  {
    id: "6",
    name: "Test Champion",
    description: "Ranked #1 in a test with more than 50 participants",
    icon: Medal,
    earned: false,
    progress: 0,
    color: "bg-red-500",
  },
  {
    id: "7",
    name: "Perfect Month",
    description: "Completed all scheduled tests in a month with passing scores",
    icon: Calendar,
    earned: false,
    progress: 75,
    color: "bg-pink-500",
  },
  {
    id: "8",
    name: "Goal Achiever",
    description: "Set and achieved 3 personal score goals",
    // icon: Target,
    earned: false,
    progress: 33,
    color: "bg-orange-500",
  },
];

// Mock certificates data
const mockCertificates = [
  {
    id: "1",
    name: "MDCAT Practice Test - Advanced",
    issueDate: "2023-05-15",
    score: 92,
    category: "Medical",
  },
  {
    id: "2",
    name: "Engineering Entrance - Electronics",
    issueDate: "2023-06-10",
    score: 88,
    category: "Engineering",
  },
];

// Mock leaderboard data
const mockLeaderboard = [
  { id: "1", name: "Ahmed Khan", rank: 1, score: 95, avatar: null },
  { id: "2", name: "Sara Ali", rank: 2, score: 93, avatar: null },
  { id: "3", name: "Usman Malik", rank: 3, score: 91, avatar: null },
  { id: "4", name: "Ayesha Ahmad", rank: 4, score: 90, avatar: null },
  { id: "5", name: "Current User", rank: 5, score: 88, avatar: null },
];

const StudentAchievements = () => {
  const { user } = useAuth();
  
  const earnedAchievements = mockAchievements.filter(achievement => achievement.earned);
  const pendingAchievements = mockAchievements.filter(achievement => !achievement.earned);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">My Achievements</h1>
        <p className="text-muted-foreground">
          View your achievements, certificates, and performance.
        </p>
      </div>
      
      {/* Stats overview */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Achievements</CardTitle>
            <Trophy className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{earnedAchievements.length}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Out of {mockAchievements.length} total
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Certificates</CardTitle>
            {/* <Certificate className="h-4 w-4 text-muted-foreground" /> */}
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockCertificates.length}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Current Rank</CardTitle>
            <Medal className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">#5</div>
            <p className="text-xs text-muted-foreground mt-1">
              Top 10% of all students
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Best Score</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">95%</div>
            <p className="text-xs text-muted-foreground mt-1">
              In MDCAT Practice Test
            </p>
          </CardContent>
        </Card>
      </div>
      
      {/* Earned achievements */}
      <Card>
        <CardHeader>
          <CardTitle>Earned Achievements</CardTitle>
          <CardDescription>
            Achievements you've unlocked through your performance.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {earnedAchievements.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {earnedAchievements.map((achievement) => (
                <Card key={achievement.id} className="overflow-hidden border-0 shadow-md">
                  <div className={`p-4 ${achievement.color} text-white`}>
                    {/* <achievement.icon className="h-8 w-8" /> */}
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-semibold">{achievement.name}</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      {achievement.description}
                    </p>
                    <div className="mt-3 flex items-center text-xs text-muted-foreground">
                      <Calendar className="h-3 w-3 mr-1" />
                      {/* <span>Earned on {new Date(achievement.date).toLocaleDateString()}</span> */}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <Trophy className="mx-auto h-12 w-12 text-muted-foreground" />
              <h3 className="mt-4 text-lg font-medium">No achievements yet</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Complete tests and improve your scores to earn achievements.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
      
      {/* Pending achievements */}
      <Card>
        <CardHeader>
          <CardTitle>Achievements in Progress</CardTitle>
          <CardDescription>
            Achievements you're working toward.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {pendingAchievements.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {pendingAchievements.map((achievement) => (
                <Card key={achievement.id} className="overflow-hidden border shadow">
                  <div className="flex p-4">
                    <div className={`flex h-12 w-12 items-center justify-center rounded-full ${achievement.color} text-white`}>
                      {/* <achievement.icon className="h-6 w-6" /> */}
                    </div>
                    <div className="ml-4 flex-1">
                      <h3 className="font-semibold">{achievement.name}</h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        {achievement.description}
                      </p>
                      <div className="mt-2">
                        <div className="flex items-center justify-between text-xs">
                          <span>Progress</span>
                          <span>{achievement.progress}%</span>
                        </div>
                        <Progress value={achievement.progress} className="h-2 mt-1" />
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <Award className="mx-auto h-12 w-12 text-muted-foreground" />
              <h3 className="mt-4 text-lg font-medium">All achievements earned!</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Congratulations! You've earned all available achievements.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
      
      {/* Certificates */}
      <Card>
        <CardHeader>
          <CardTitle>My Certificates</CardTitle>
          <CardDescription>
            Certificates earned from completed tests.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {mockCertificates.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {mockCertificates.map((certificate) => (
                <Card key={certificate.id} className="overflow-hidden border shadow">
                  <div className="bg-primary/10 p-6 flex flex-col items-center justify-center text-center">
                    {/* <Certificate className="h-12 w-12 text-primary mb-3" /> */}
                    <h3 className="font-bold text-lg">{certificate.name}</h3>
                    <Badge className="mt-2">
                      {certificate.category}
                    </Badge>
                    <div className="mt-3 text-sm text-muted-foreground">
                      Issued on {new Date(certificate.issueDate).toLocaleDateString()}
                    </div>
                    <div className="mt-1 font-medium">
                      Score: {certificate.score}%
                    </div>
                    <Button className="mt-4">
                      View Certificate
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              {/* <Certificate className="mx-auto h-12 w-12 text-muted-foreground" /> */}
              <h3 className="mt-4 text-lg font-medium">No certificates yet</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Complete tests with passing scores to earn certificates.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
      
      {/* Leaderboard */}
      <Card>
        <CardHeader>
          <CardTitle>Monthly Leaderboard</CardTitle>
          <CardDescription>
            Top performers this month.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockLeaderboard.map((entry, index) => (
              <div 
                key={entry.id} 
                className={`flex items-center justify-between p-3 rounded-lg ${
                  entry.name === "Current User" ? "bg-primary/10 border border-primary/20" : ""
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className={`flex h-8 w-8 items-center justify-center rounded-full font-semibold ${
                    index === 0 ? "bg-yellow-500 text-white" :
                    index === 1 ? "bg-gray-400 text-white" :
                    index === 2 ? "bg-amber-700 text-white" :
                    "bg-gray-100"
                  }`}>
                    {entry.rank}
                  </div>
                  <div className="flex items-center gap-3">
                    <Avatar>
                      {/* <AvatarImage src={entry.avatar} /> */}
                      <AvatarFallback>{entry.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{entry.name}</p>
                      {entry.name === "Current User" && (
                        <p className="text-xs text-muted-foreground">You</p>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge 
                    className={
                      index === 0 ? "bg-yellow-500" :
                      index === 1 ? "bg-gray-400" :
                      index === 2 ? "bg-amber-700" :
                      "bg-gray-200 text-gray-700"
                    }
                  >
                    {entry.score}%
                  </Badge>
                  {index === 0 && <Trophy className="h-5 w-5 text-yellow-500" />}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StudentAchievements;
