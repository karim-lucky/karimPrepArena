"use client";
import { useState, useEffect } from "react";
 
import { 
  Users, 
  FileText, 
  ClipboardCheck, 
  Wallet, 
  Clock, 
  CheckCircle, 
  AlertCircle,
  ArrowUp,
  ArrowDown,
  ChevronRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
 
 
import { Progress } from "@/components/ui/progress";
import {
  
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Table } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { 
  mockTests, 
  mockUsers, 
  getPendingApprovals, 
  getAllEnrollments, 
  getAllStudentPerformance 
} from "@/app/lib/mockData";
 

const AdminDashboard = () => {
  const [pendingApprovals, setPendingApprovals] = useState(getPendingApprovals());
  const studentCount = mockUsers.filter(user => user.role === 'student').length;
  
  const totalTests = mockTests.length;
  const activeTests = mockTests.filter(test => test.isActive).length;
  
  const totalRevenue = getAllEnrollments()
    .filter(item => item.enrollment.paymentStatus === 'completed')
    .reduce((sum, item) => sum + item.test.price, 0);
  
  const studentPerformance = getAllStudentPerformance();
  const averageScore = studentPerformance.reduce(
    (sum, item) => sum + item.progress.averageScore, 
    0
  ) / (studentPerformance.length || 1);
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
        <p className="text-muted-foreground">
          Manage tests, approve enrollments, and monitor student performance.
        </p>
      </div>

      {/* Stats overview */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Students</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{studentCount}</div>
            <div className="flex items-center text-xs text-success pt-1">
              <ArrowUp className="h-3 w-3 mr-1" />
              <span>12% from last month</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Tests</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeTests}</div>
            <p className="text-xs text-muted-foreground pt-1">
              Out of {totalTests} total tests
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Score</CardTitle>
            <ClipboardCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{averageScore.toFixed(1)}%</div>
            <Progress value={averageScore} className="h-2 mt-2" />
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <Wallet className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Rs. {totalRevenue}</div>
            <div className="flex items-center text-xs text-success pt-1">
              <ArrowUp className="h-3 w-3 mr-1" />
              <span>18% from last month</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Pending approvals */}
      <Card>
        <CardHeader>
          <CardTitle>Pending Approvals</CardTitle>
          <CardDescription>
            Student registrations awaiting your approval
          </CardDescription>
        </CardHeader>
        <CardContent>
          {pendingApprovals.length > 0 ? (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Student</TableHead>
                    <TableHead>Test</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Payment</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {pendingApprovals.map(({ enrollment, user, test }) => (
                    <TableRow key={enrollment.id}>
                      <TableCell className="font-medium">{user.name}</TableCell>
                      <TableCell>{test.title}</TableCell>
                      <TableCell>{new Date(enrollment.createdAt).toLocaleDateString()}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="bg-success/10 text-success border-success/30">
                          Paid
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button size="sm" onClick={() => {
                            // Simulate approval
                            const updatedApprovals = pendingApprovals.filter(
                              item => item.enrollment.id !== enrollment.id
                            );
                            setPendingApprovals(updatedApprovals);
                            
                            // Update status in mock data
                            const mockEnrollment = mockTests.find(t => t.id === enrollment.id);
                            if (mockEnrollment) {
                              enrollment.status = 'approved';
                            }
                            
                            // Show success message
                            alert(`Approved ${user.name} for ${test.title}`);
                          }}>
                            <CheckCircle className="h-4 w-4 mr-1" />
                            Approve
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => {
                              const updatedApprovals = pendingApprovals.filter(
                                item => item.enrollment.id !== enrollment.id
                              );
                              setPendingApprovals(updatedApprovals);
                              
                              // Update status in mock data
                              const mockEnrollment = mockTests.find(t => t.id === enrollment.id);
                              if (mockEnrollment) {
                                enrollment.status = 'rejected';
                              }
                              
                              // Show success message
                              alert(`Rejected ${user.name} for ${test.title}`);
                            }}
                          >
                            <AlertCircle className="h-4 w-4 mr-1" />
                            Reject
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              No pending approvals at the moment.
            </div>
          )}
        </CardContent>
        <CardFooter>
          <Button variant="outline" className="w-full" asChild>
            <a href="/admin/approvals">
              View All Approvals
              <ChevronRight className="h-4 w-4 ml-1" />
            </a>
          </Button>
        </CardFooter>
      </Card>

      {/* Upcoming tests */}
      <Card>
        <CardHeader>
          <CardTitle>Upcoming Tests</CardTitle>
          <CardDescription>
            Tests scheduled in the near future
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Test Name</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Time</TableHead>
                  <TableHead>Duration</TableHead>
                  <TableHead>Enrollments</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockTests.slice(0, 5).map(test => (
                  <TableRow key={test.id}>
                    <TableCell className="font-medium">{test.title}</TableCell>
                    <TableCell>{new Date(test.startDate).toLocaleDateString()}</TableCell>
                    <TableCell>{new Date(test.startDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</TableCell>
                    <TableCell>{test.duration} min</TableCell>
                    <TableCell>
                      {getAllEnrollments().filter(item => item.test.id === test.id).length}
                    </TableCell>
                    <TableCell>
                      <Button variant="outline" size="sm" asChild>
                        <a href={`/admin/tests/${test.id}`}>
                          View Details
                        </a >
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
        <CardFooter>
          <Button variant="outline" className="w-full" asChild>
            <a href="/admin/tests">
              Manage All Tests
              <ChevronRight className="h-4 w-4 ml-1" />
            </a >
          </Button>
        </CardFooter>
      </Card>

      {/* Recent student activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Student Performance</CardTitle>
          <CardDescription>
            Overview of student test performance
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Student</TableHead>
                  <TableHead>Tests Completed</TableHead>
                  <TableHead>Average Score</TableHead>
                  <TableHead>Highest Score</TableHead>
                  <TableHead>Awards</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {studentPerformance.slice(0, 5).map(({ user, progress }) => (
                  <TableRow key={user.id}>
                    <TableCell className="font-medium">{user.name}</TableCell>
                    <TableCell>{progress.testsCompleted}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <span>{progress.averageScore.toFixed(1)}%</span>
                        {progress.averageScore >= 70 ? (
                          <Badge variant="outline" className="bg-success/10 text-success border-success/30">
                            Good
                          </Badge>
                        ) : progress.averageScore >= 50 ? (
                          <Badge variant="outline" className="bg-warning/10 text-warning border-warning/30">
                            Average
                          </Badge>
                        ) : (
                          <Badge variant="outline" className="bg-destructive/10 text-destructive border-destructive/30">
                            Needs Improvement
                          </Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>{progress.highestScore}%</TableCell>
                    <TableCell>{progress.awardsEarned.length}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
        <CardFooter>
          <Button variant="outline" className="w-full" asChild>
            <a href="/admin/students">
              View All Students
              <ChevronRight className="h-4 w-4 ml-1" />
            </a >
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default AdminDashboard;
