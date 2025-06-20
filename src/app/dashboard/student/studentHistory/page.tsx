
"use client";
import { useState } from "react";
// import { Link } from "react-router-dom";
import { 
  Search, 
  Filter, 
  Calendar, 
  Clock, 
  ArrowRight, 
  FileText,
  AlertCircle,
  CheckCircle,
  XCircle,
  Eye,
  Award
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { mockTests, mockUsers } from "@/app/lib/mockData";
import { useAuth } from "@/app/lib/auth-context";

const mockTestAttempts = [
  {
    id: "1",
    userId: "1",
    testId: "1",
    score: 85,
    startedAt: "2023-04-10T10:00:00",
    completedAt: "2023-04-10T11:15:00",
    status: "completed",
    answers: [
      { questionId: "q1", selectedOptionIndex: 2, isCorrect: true },
      { questionId: "q2", selectedOptionIndex: 1, isCorrect: true },
      { questionId: "q3", selectedOptionIndex: 0, isCorrect: false },
      { questionId: "q4", selectedOptionIndex: 3, isCorrect: true },
    ]
  },
  {
    id: "2",
    userId: "1",
    testId: "2",
    score: 92,
    startedAt: "2023-04-15T14:00:00",
    completedAt: "2023-04-15T15:30:00",
    status: "completed",
    answers: [
      { questionId: "q1", selectedOptionIndex: 1, isCorrect: true },
      { questionId: "q2", selectedOptionIndex: 0, isCorrect: true },
      { questionId: "q3", selectedOptionIndex: 3, isCorrect: true },
      { questionId: "q4", selectedOptionIndex: 2, isCorrect: true },
      { questionId: "q5", selectedOptionIndex: 1, isCorrect: false },
    ]
  },
  {
    id: "3",
    userId: "1",
    testId: "3",
    score: 68,
    startedAt: "2023-04-20T09:00:00",
    completedAt: "2023-04-20T10:15:00",
    status: "completed",
    answers: [
      { questionId: "q1", selectedOptionIndex: 0, isCorrect: true },
      { questionId: "q2", selectedOptionIndex: 2, isCorrect: false },
      { questionId: "q3", selectedOptionIndex: 1, isCorrect: true },
      { questionId: "q4", selectedOptionIndex: 3, isCorrect: false },
      { questionId: "q5", selectedOptionIndex: 0, isCorrect: true },
    ]
  },
  {
    id: "4",
    userId: "1",
    testId: "4",
    score: 75,
    startedAt: "2023-05-05T13:00:00",
    completedAt: "2023-05-05T14:10:00",
    status: "completed",
    answers: [
      { questionId: "q1", selectedOptionIndex: 3, isCorrect: true },
      { questionId: "q2", selectedOptionIndex: 1, isCorrect: true },
      { questionId: "q3", selectedOptionIndex: 0, isCorrect: false },
      { questionId: "q4", selectedOptionIndex: 2, isCorrect: true },
    ]
  },
  {
    id: "5",
    userId: "1",
    testId: "5",
    score: 90,
    startedAt: "2023-05-12T11:00:00",
    completedAt: "2023-05-12T12:15:00",
    status: "completed",
    answers: [
      { questionId: "q1", selectedOptionIndex: 2, isCorrect: true },
      { questionId: "q2", selectedOptionIndex: 1, isCorrect: true },
      { questionId: "q3", selectedOptionIndex: 0, isCorrect: true },
      { questionId: "q4", selectedOptionIndex: 3, isCorrect: true },
      { questionId: "q5", selectedOptionIndex: 1, isCorrect: false },
    ]
  },
];

const StudentHistory = () => {
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("date");
  
  const userAttempts = user 
    ? mockTestAttempts.filter(attempt => attempt.userId === user.id)
    : [];
  
  const totalAttempts = userAttempts.length;
  const averageScore = userAttempts.reduce((sum, attempt) => sum + attempt.score, 0) / (totalAttempts || 1);
  const highestScore = Math.max(...userAttempts.map(attempt => attempt.score), 0);
  const passingRate = userAttempts.filter(attempt => {
    const test = mockTests.find(t => t.id === attempt.testId);
    return test && attempt.score >= test.passingPercentage;
  }).length / (totalAttempts || 1) * 100;
  
  let filteredAttempts = userAttempts;
  if (searchQuery) {
    filteredAttempts = filteredAttempts.filter(attempt => {
      const test = mockTests.find(t => t.id === attempt.testId);
      return test && test.title.toLowerCase().includes(searchQuery.toLowerCase());
    });
  }
  
  if (sortBy === "date") {
    filteredAttempts.sort((a, b) => new Date(b.completedAt).getTime() - new Date(a.completedAt).getTime());
  } else if (sortBy === "score-high") {
    filteredAttempts.sort((a, b) => b.score - a.score);
  } else if (sortBy === "score-low") {
    filteredAttempts.sort((a, b) => a.score - b.score);
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Test History</h1>
        <p className="text-muted-foreground">
          View your past test attempts and performance.
        </p>
      </div>
      
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Tests</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalAttempts}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Score</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{averageScore.toFixed(1)}%</div>
            <Progress value={averageScore} className="h-2 mt-2" />
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Highest Score</CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{highestScore}%</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Passing Rate</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{passingRate.toFixed(1)}%</div>
          </CardContent>
        </Card>
      </div>
      
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div className="flex gap-2">
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search tests..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="date">Latest First</SelectItem>
              <SelectItem value="score-high">Highest Score</SelectItem>
              <SelectItem value="score-low">Lowest Score</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Past Test Attempts</CardTitle>
          <CardDescription>
            View all your past test attempts and results.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {filteredAttempts.length > 0 ? (
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Test Name</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Score</TableHead>
                    <TableHead>Result</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredAttempts.map((attempt) => {
                    const test = mockTests.find(t => t.id === attempt.testId);
                    const startTime = new Date(attempt.startedAt);
                    const endTime = new Date(attempt.completedAt);
                    const durationInMinutes = Math.round((endTime.getTime() - startTime.getTime()) / (1000 * 60));
                    const passed = test && attempt.score >= test.passingPercentage;
                    
                    return (
                      <TableRow key={attempt.id}>
                        <TableCell className="font-medium">
                          {test?.title || "Unknown Test"}
                        </TableCell>
                        <TableCell>
                          {new Date(attempt.completedAt).toLocaleDateString()}
                        </TableCell>
                        <TableCell>{durationInMinutes} min</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <span className="font-medium">{attempt.score}%</span>
                            <Progress 
                              value={attempt.score} 
                              className="h-2 w-24" 
                            />
                          </div>
                        </TableCell>
                        <TableCell>
                          {passed ? (
                            <Badge className="bg-green-500 hover:bg-green-600">
                              <CheckCircle className="mr-1 h-3 w-3" />
                              Passed
                            </Badge>
                          ) : (
                            <Badge variant="destructive">
                              <XCircle className="mr-1 h-3 w-3" />
                              Failed
                            </Badge>
                          )}
                        </TableCell>
                        <TableCell className="text-right">
                          <Button variant="outline" size="sm" asChild>
                            < a href={`/test-result/${attempt.id}`}>
                              <Eye className="mr-2 h-4 w-4" />
                              View Result
                            </a>
                          </Button>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          ) : (
            <div className="text-center py-12">
              <FileText className="mx-auto h-12 w-12 text-muted-foreground" />
              <h3 className="mt-4 text-lg font-medium">No test history</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                You haven't taken any tests yet.
              </p>
              <Button className="mt-4" asChild>
                <a href="/tests">
                  Browse Available Tests
                </a>
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default StudentHistory;
