
"use client";
import { useState } from "react";
 
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
  Timer
} from "lucide-react";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Badge } from "@/app/components/ui/badge";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/app/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/app/components/ui/tabs";
import { mockTests, getAllEnrollments, mockUsers } from "@/app/lib/mockData";
import { useAuth } from "@/app/lib/auth-context";

const StudentEnrollments = () => {
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  
  // Get enrollments for current user
  const userEnrollments = user 
    ? getAllEnrollments().filter(item => item.user.id === user.id)
    : [];
  
  // Filter by status
  const pendingEnrollments = userEnrollments.filter(item => item.enrollment.status === 'pending');
  const approvedEnrollments = userEnrollments.filter(item => item.enrollment.status === 'approved');
  const rejectedEnrollments = userEnrollments.filter(item => item.enrollment.status === 'rejected');
  
  // Search filter
  const filteredEnrollments = userEnrollments.filter(
    item => item.test.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">My Enrollments</h1>
        <p className="text-muted-foreground">
          Manage your test enrollments and check their status.
        </p>
      </div>
      
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div className="flex gap-2">
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search enrollments..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      <Tabs defaultValue="all">
        <TabsList className="mb-4">
          <TabsTrigger value="all">
            All
            <Badge className="ml-2 bg-primary">{userEnrollments.length}</Badge>
          </TabsTrigger>
          <TabsTrigger value="pending">
            Pending
            <Badge className="ml-2 bg-yellow-500">{pendingEnrollments.length}</Badge>
          </TabsTrigger>
          <TabsTrigger value="approved">
            Approved
            <Badge className="ml-2 bg-green-500">{approvedEnrollments.length}</Badge>
          </TabsTrigger>
          <TabsTrigger value="rejected">
            Rejected
            <Badge className="ml-2 bg-destructive">{rejectedEnrollments.length}</Badge>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="all">
          {renderEnrollments(filteredEnrollments)}
        </TabsContent>
        
        <TabsContent value="pending">
          {renderEnrollments(pendingEnrollments)}
        </TabsContent>
        
        <TabsContent value="approved">
          {renderEnrollments(approvedEnrollments)}
        </TabsContent>
        
        <TabsContent value="rejected">
          {renderEnrollments(rejectedEnrollments)}
        </TabsContent>
      </Tabs>
    </div>
  );
};

const renderEnrollments = (enrollments: any[]) => {
  if (enrollments.length === 0) {
    return (
      <div className="text-center py-12 border rounded-md">
        <FileText className="mx-auto h-12 w-12 text-muted-foreground" />
        <h3 className="mt-4 text-lg font-medium">No enrollments found</h3>
        <p className="mt-2 text-sm text-muted-foreground">
          You don't have any enrollments in this category.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {enrollments.map(({ enrollment, test }) => (
        <Card key={enrollment.id}>
          <CardHeader className="pb-2">
            <CardTitle className="line-clamp-1">{test.title}</CardTitle>
            <CardDescription>
              <div className="flex items-center flex-wrap gap-2 mt-1 text-xs">
                <Badge 
                  className={
                    enrollment.status === 'approved' 
                      ? "bg-green-500 hover:bg-green-600" 
                      : enrollment.status === 'pending' 
                        ? "bg-yellow-500 hover:bg-yellow-600" 
                        : "bg-destructive hover:bg-destructive/90"
                  }
                >
                  {enrollment.status === 'approved' ? (
                    <>
                      <CheckCircle className="mr-1 h-3 w-3" />
                      Approved
                    </>
                  ) : enrollment.status === 'pending' ? (
                    <>
                      <AlertCircle className="mr-1 h-3 w-3" />
                      Pending Approval
                    </>
                  ) : (
                    <>
                      <XCircle className="mr-1 h-3 w-3" />
                      Rejected
                    </>
                  )}
                </Badge>
                <Badge variant="outline" className="bg-primary/10 text-primary border-primary/30">
                  {test.category}
                </Badge>
                <div className="flex items-center">
                  <Clock className="h-3 w-3 mr-1 text-muted-foreground" />
                  <span>{test.duration} min</span>
                </div>
                <div className="flex items-center">
                  <Calendar className="h-3 w-3 mr-1 text-muted-foreground" />
                  <span>{new Date(test.startDate).toLocaleDateString()}</span>
                </div>
              </div>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm line-clamp-2">{test.description}</p>
            
            <div className="mt-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span>Questions:</span>
                <span className="font-medium">{test.totalQuestions}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Passing Score:</span>
                <span className="font-medium">{test.passingPercentage}%</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Payment Status:</span>
                <Badge variant="outline" className={
                  enrollment.paymentStatus === 'completed' 
                    ? "bg-green-500/10 text-green-600 border-green-500/30" 
                    : enrollment.paymentStatus === 'pending' 
                      ? "bg-yellow-500/10 text-yellow-600 border-yellow-500/30" 
                      : "bg-destructive/10 text-destructive border-destructive/30"
                }>
                  {enrollment.paymentStatus === 'completed' ? 'Paid' : enrollment.paymentStatus}
                </Badge>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" asChild>
              <a href={`/test/${test.id}`}>
                <FileText className="mr-2 h-4 w-4" />
                Test Details
              </a>
            </Button>
            {enrollment.status === 'approved' && (
              <Button asChild>
                <a href={`/test-session/${test.id}`}>
                  <Timer className="mr-2 h-4 w-4" />
                  Take Test
                </a>
              </Button>
            )}
            {enrollment.status === 'pending' && (
              <Button variant="secondary" disabled>
                <AlertCircle className="mr-2 h-4 w-4" />
                Waiting for Approval
              </Button>
            )}
            {enrollment.status === 'rejected' && (
              <Button variant="destructive" disabled>
                <XCircle className="mr-2 h-4 w-4" />
                Rejected
              </Button>
            )}
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default StudentEnrollments;
