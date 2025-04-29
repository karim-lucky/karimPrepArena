"use client";
import { useState, useEffect } from "react";
 
import { 
  ChevronRight, 
  Calendar, 
  ClipboardCheck, 
  Award, 
  TrendingUp, 
  Clock 
} from "lucide-react";
import { Button } from "@/app/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Progress } from "@/app/components/ui/progress";
 import { useAuth } from "@/app/lib/auth-context";
 
import { 
  getUpcomingTests, 
  getEnrolledTests, 
  getUserProgress, 
  getUserTestAttempts,
  getPendingEnrollments
} from "@/app/lib/mockData";
import { Test } from "@/app/lib/types";

const StudentDashboard = () => {
  const { user } = useAuth();
  const [upcomingTests, setUpcomingTests] = useState<Test[]>([]);
  const [enrolledTests, setEnrolledTests] = useState<Test[]>([]);
  const [pendingCount, setPendingCount] = useState(0);
  const userProgress = user ? getUserProgress(user.id) : null;
  const testAttempts = user ? getUserTestAttempts(user.id) : [];

  useEffect(() => {
    if (user) {
      setUpcomingTests(getUpcomingTests().slice(0, 3));
      setEnrolledTests(getEnrolledTests(user.id).slice(0, 3));
      setPendingCount(getPendingEnrollments(user.id).length);
    }
  }, [user]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Welcome back, {user?.name}</h1>
        <p className="text-muted-foreground">
          Track your progress, manage your test enrollments, and prepare for upcoming tests.
        </p>
      </div>

      {/* Stats overview */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tests Completed</CardTitle>
            <ClipboardCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{userProgress?.testsCompleted || 0}</div>
            <p className="text-xs text-muted-foreground">
              {userProgress?.totalTestsAttempted ? `Out of ${userProgress.totalTestsAttempted} attempts` : 'No tests attempted yet'}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Score</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{userProgress?.averageScore.toFixed(1) || 0}%</div>
            <Progress 
              value={userProgress?.averageScore || 0} 
              className="h-2 mt-2" 
            />
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Highest Score</CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{userProgress?.highestScore || 0}%</div>
            <Progress 
              value={userProgress?.highestScore || 0} 
              className="h-2 mt-2" 
            />
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Awards Earned</CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{userProgress?.awardsEarned?.length || 0}</div>
            <p className="text-xs text-muted-foreground">
              {userProgress?.awardsEarned?.length 
                ? `Latest: ${userProgress.awardsEarned[0]}` 
                : 'Complete more tests to earn awards'}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Enrolled & Upcoming Tests */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>My Enrolled Tests</CardTitle>
            <CardDescription>
              Tests you have registered for
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {enrolledTests.length > 0 ? (
              enrolledTests.map(test => (
                <div 
                  key={test.id} 
                  className="flex items-center justify-between p-3 border rounded-md hover:border-primary transition-colors"
                >
                  <div className="flex flex-col gap-1">
                    <span className="font-medium">{test.title}</span>
                    <div className="flex items-center text-xs text-muted-foreground gap-1">
                      <Calendar className="h-3 w-3" />
                      <span>
                        {new Date(test.startDate).toLocaleDateString()} at {new Date(test.startDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" asChild>
                    <a href={`/test/${test.id}`}>View</a >
                  </Button>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                You haven't enrolled in any tests yet.
              </div>
            )}
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full" asChild>
              <a  href="/enrollments">
                View All Enrollments
                <ChevronRight className="h-4 w-4 ml-1" />
              </a >
            </Button>
          </CardFooter>
        </Card>

        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Upcoming Tests</CardTitle>
            <CardDescription>
              Available tests you can register for
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {upcomingTests.length > 0 ? (
              upcomingTests.map(test => (
                <div 
                  key={test.id} 
                  className="flex items-center justify-between p-3 border rounded-md hover:border-primary transition-colors"
                >
                  <div className="flex flex-col gap-1">
                    <span className="font-medium">{test.title}</span>
                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        <span>{new Date(test.startDate).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        <span>{test.duration} minutes</span>
                      </div>
                    </div>
                  </div>
                  <Button size="sm" asChild>
                    <a  href={`/test/${test.id}`}>Enroll</a >
                  </Button>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                No upcoming tests available at the moment.
              </div>
            )}
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full" asChild>
              <a  href="/tests">
                Browse All Tests
                <ChevronRight className="h-4 w-4 ml-1" />
              </a >
            </Button>
          </CardFooter>
        </Card>
      </div>

      {/* Recent Test Results */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Test Results</CardTitle>
          <CardDescription>
            Your most recent test performances
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-8">
            {testAttempts.length > 0 ? (
              testAttempts.slice(0, 3).map(({ attempt, test }) => (
                <div key={attempt.id} className="flex flex-col gap-2">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-medium">{test.title}</h3>
                      <p className="text-sm text-muted-foreground">
                        Completed on {new Date(attempt.completedAt).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold">{attempt.score}%</span>
                      <div 
                        className={`px-2 py-1 text-xs rounded-full ${
                          attempt.score >= test.passingPercentage 
                            ? "bg-success/10 text-success" 
                            : "bg-destructive/10 text-destructive"
                        }`}
                      >
                        {attempt.score >= test.passingPercentage ? "Passed" : "Failed"}
                      </div>
                    </div>
                  </div>
                  <Progress value={attempt.score} className="h-2" />
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                You haven't taken any tests yet.
              </div>
            )}
          </div>
        </CardContent>
        <CardFooter>
          <Button variant="outline" className="w-full" asChild>
            <a  href="/history">
              View Full History
              <ChevronRight className="h-4 w-4 ml-1" />
            </a >
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

const WelcomeBanner = () => (
  <div className="relative overflow-hidden rounded-lg border bg-background p-8">
    <div className="flex flex-col items-start gap-4 md:flex-row md:items-center md:gap-8">
      <div className="grid flex-1 gap-4">
        <h1 className="font-heading text-3xl font-bold md:text-4xl">
          Welcome to the Testing Platform
        </h1>
        <p className="text-muted-foreground md:text-lg">
          Prepare for your exams with our comprehensive testing system. 
          Sign up now to access practice tests and improve your scores.
        </p>
        <div className="flex flex-col gap-2 min-[400px]:flex-row">
          <a  href="/register">
            <Button size="lg" className="px-8">Get Started</Button>
          </a >
          <a  href="/about">
            <Button size="lg" variant="outline">Learn More</Button>
          </a >
        </div>
      </div>
    </div>
  </div>
);

const Features = () => (
  <div className="grid gap-8 md:grid-cols-3">
    <Card>
      <CardHeader>
        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-2">
          <ClipboardCheck className="h-6 w-6 text-primary" />
        </div>
        <CardTitle>Practice Tests</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">
          Access a wide range of practice tests to prepare for your upcoming exams. 
          Our tests are designed by experts to match real exam patterns.
        </p>
      </CardContent>
    </Card>
    <Card>
      <CardHeader>
        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-2">
          <TrendingUp className="h-6 w-6 text-primary" />
        </div>
        <CardTitle>Track Progress</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">
          Monitor your performance with detailed analytics. See your strengths and 
          weaknesses to focus your study efforts effectively.
        </p>
      </CardContent>
    </Card>
    <Card>
      <CardHeader>
        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-2">
          <Award className="h-6 w-6 text-primary" />
        </div>
        <CardTitle>Earn Awards</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">
          Get recognized for your achievements. Earn awards for consistent performance 
          and high scores to keep yourself motivated.
        </p>
      </CardContent>
    </Card>
  </div>
);

const Index = () => {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <StudentDashboard />;
  }

  return (
    <div className="container py-8 space-y-12">
      <WelcomeBanner />
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-center">Why Choose Our Platform</h2>
        <Features />
      </div>
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-center">Get Started Today</h2>
        <div className="bg-muted p-8 rounded-lg text-center">
          <p className="mb-6 text-lg">
            Join thousands of students who have improved their test scores with our platform.
          </p>
          <a  href="/register">
            <Button size="lg" className="px-8">Sign Up Now</Button>
          </a >
        </div>
      </div>
    </div>
  );
};

export default Index;
