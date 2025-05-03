"use client";
import { useState } from "react";
import { 
  BarChart3, 
  Download, 
  Calendar, 
  Filter,
  ArrowUpRight,
  ArrowDownRight,
  Trophy,
  Target,
  BookOpen
} from "lucide-react";
import { Button } from "@/app/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/app/components/ui/card";
import { mockTests, mockUsers, getAllStudentPerformance } from "@/app/lib/mockData";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/components/ui/select";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const AdminReports = () => {
  const [timeRange, setTimeRange] = useState("month");
  
  // Mock data for charts
  const studentPerformance = getAllStudentPerformance();
  const totalTests = mockTests.length;
  const activeTests = mockTests.filter(test => test.isActive).length;
  const totalStudents = mockUsers.filter(user => user.role === 'student').length;
  
  // Average score calculation
  const averageScore = studentPerformance.reduce(
    (sum, item) => sum + item.progress.averageScore, 
    0
  ) / (studentPerformance.length || 1);
  
  // Success rate calculation
  const passedStudents = studentPerformance.filter(
    item => item.progress.averageScore >= 70
  ).length;
  const successRate = (passedStudents / studentPerformance.length) * 100;
  
  // Test categories
  const categories = [...new Set(mockTests.map(test => test.category))];
  const categoryData = categories.map(category => {
    const testsInCategory = mockTests.filter(test => test.category === category);
    const averageScoreInCategory = studentPerformance
      .flatMap(sp => sp.progress.averageScore)
      .reduce((sum, score) => sum + score, 0) / studentPerformance.length;
    
    return {
      name: category,
      tests: testsInCategory.length,
      averageScore: averageScoreInCategory.toFixed(1),
    };
  });
  
  // Pie chart data
  const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff8042', '#0088fe'];
  const pieData = categories.map((category, index) => {
    const count = mockTests.filter(test => test.category === category).length;
    return {
      name: category,
      value: count,
      color: COLORS[index % COLORS.length],
    };
  });

  // Performance by date
  const performanceByDate = [
    { name: 'Jan', score: 65 },
    { name: 'Feb', score: 68 },
    { name: 'Mar', score: 72 },
    { name: 'Apr', score: 75 },
    { name: 'May', score: 71 },
    { name: 'Jun', score: 80 },
    { name: 'Jul', score: 78 },
    { name: 'Aug', score: 82 },
    { name: 'Sep', score: 81 },
    { name: 'Oct', score: 85 },
    { name: 'Nov', score: 88 },
    { name: 'Dec', score: 90 },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Results & Reports</h1>
        <p className="text-muted-foreground">
          Analyze test results and generate comprehensive reports.
        </p>
      </div>
      
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div className="flex gap-2">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select time range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="week">Last Week</SelectItem>
              <SelectItem value="month">Last Month</SelectItem>
              <SelectItem value="quarter">Last Quarter</SelectItem>
              <SelectItem value="year">Last Year</SelectItem>
              <SelectItem value="all">All Time</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon">
            <Calendar className="h-4 w-4" />
          </Button>
        </div>
        <Button>
          <Download className="mr-2 h-4 w-4" />
          Export Report
        </Button>
      </div>
      
      {/* Stats overview */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Score</CardTitle>
            <div className="h-4 w-4 text-muted-foreground">📊</div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{averageScore.toFixed(1)}%</div>
            <div className="flex items-center text-xs text-success pt-1">
              <ArrowUpRight className="h-3 w-3 mr-1" />
              <span>2.5% from last month</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
            <div className="h-4 w-4 text-muted-foreground">🎯</div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{successRate.toFixed(1)}%</div>
            <div className="flex items-center text-xs text-success pt-1">
              <ArrowUpRight className="h-3 w-3 mr-1" />
              <span>3.2% from last month</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Tests Taken</CardTitle>
            <div className="h-4 w-4 text-muted-foreground">📝</div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{studentPerformance.reduce(
              (sum, item) => sum + item.progress.testsCompleted, 0
            )}</div>
            <div className="flex items-center text-xs text-success pt-1">
              <ArrowUpRight className="h-3 w-3 mr-1" />
              <span>12% from last month</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Top Score</CardTitle>
            <Trophy className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{Math.max(
              ...studentPerformance.map(item => item.progress.highestScore)
            )}%</div>
            <p className="text-xs text-muted-foreground pt-1">
              Achieved by {studentPerformance.find(
                item => item.progress.highestScore === Math.max(
                  ...studentPerformance.map(item => item.progress.highestScore)
                )
              )?.user.name}
            </p>
          </CardContent>
        </Card>
      </div>
      
      {/* Performance trend chart */}
      <Card>
        <CardHeader>
          <CardTitle>Performance Trend</CardTitle>
          <CardDescription>
            Average score trends over time
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={performanceByDate}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis domain={[0, 100]} />
                <Tooltip />
                <Legend />
                <Bar dataKey="score" fill="#8884d8" name="Average Score (%)" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
      
      {/* Test category distribution */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Test Category Distribution</CardTitle>
            <CardDescription>
              Breakdown of tests by category
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Category Performance</CardTitle>
            <CardDescription>
              Average scores by test category
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={categoryData}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis domain={[0, 100]} />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="averageScore" fill="#82ca9d" name="Average Score (%)" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Top Performing Students</CardTitle>
          <CardDescription>
            Students with the highest average scores
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[...studentPerformance]
              .sort((a, b) => b.progress.averageScore - a.progress.averageScore)
              .slice(0, 5)
              .map((item, index) => (
                <div key={item.user.id} className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                      <span className="text-xl font-semibold">{index + 1}</span>
                    </div>
                    <div>
                      <p className="font-medium">{item.user.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {item.progress.testsCompleted} tests completed
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="font-medium">{item.progress.averageScore.toFixed(1)}%</p>
                      <p className="text-sm text-muted-foreground">Average Score</p>
                    </div>
                    {index === 0 && (
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-yellow-500/20">
                        <Trophy className="h-5 w-5 text-yellow-500" />
                      </div>
                    )}
                  </div>
                </div>
              ))}
          </div>
        </CardContent>
        <CardFooter>
          <Button variant="outline" className="w-full">
            View All Students
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default AdminReports;
