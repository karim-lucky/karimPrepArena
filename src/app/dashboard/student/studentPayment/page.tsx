
"use client";
import { useState } from "react";
import { 
  Search, 
  Calendar, 
  DollarSign, 
  CreditCard, 
  CheckCircle, 
  XCircle, 
  Receipt, 
  Download,
  Clock,
  Filter
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { mockTests, getAllEnrollments } from "@/app/lib/mockData";
import { useAuth } from "@/app/lib/auth-context";

const StudentPayments = () => {
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  
  // Get enrollments for current user
  const userEnrollments = user 
    ? getAllEnrollments().filter(item => item.user.id === user.id)
    : [];
  
  // Filter by payment status
  const completedPayments = userEnrollments.filter(
    item => item.enrollment.paymentStatus === 'completed'
  );
  
  const pendingPayments = userEnrollments.filter(
    item => item.enrollment.paymentStatus === 'pending'
  );
  
  const failedPayments = userEnrollments.filter(
    item => item.enrollment.paymentStatus === 'failed'
  );
  
  // Search filter
  const filteredPayments = userEnrollments.filter(
    item => item.test.title.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  // Calculate total spent
  const totalSpent = completedPayments.reduce(
    (sum, item) => sum + item.test.price, 0
  );
  
  // Calculate pending amount
  const pendingAmount = pendingPayments.reduce(
    (sum, item) => sum + item.test.price, 0
  );
  
  // Sort by date (most recent first)
  filteredPayments.sort((a, b) => 
    new Date(b.enrollment.createdAt).getTime() - new Date(a.enrollment.createdAt).getTime()
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Payments</h1>
        <p className="text-muted-foreground">
          View and manage your payments for test enrollments.
        </p>
      </div>
      
      {/* Stats overview */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Spent</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Rs. {totalSpent}</div>
            <div className="text-xs text-muted-foreground pt-1">
              For {completedPayments.length} tests
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Amount</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Rs. {pendingAmount}</div>
            <div className="text-xs text-muted-foreground pt-1">
              For {pendingPayments.length} pending tests
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Cost</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              Rs. {userEnrollments.length 
                ? Math.round((totalSpent + pendingAmount) / userEnrollments.length) 
                : 0}
            </div>
            <div className="text-xs text-muted-foreground pt-1">
              Per test enrollment
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div className="flex gap-2">
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search payments..."
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
      
      <Card>
        <CardHeader>
          <CardTitle>Payment History</CardTitle>
          <CardDescription>
            Your past and pending payments for test enrollments.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all">
            <TabsList className="mb-4">
              <TabsTrigger value="all">
                All
                <Badge className="ml-2 bg-primary">{userEnrollments.length}</Badge>
              </TabsTrigger>
              <TabsTrigger value="completed">
                Completed
                <Badge className="ml-2 bg-green-500">{completedPayments.length}</Badge>
              </TabsTrigger>
              <TabsTrigger value="pending">
                Pending
                <Badge className="ml-2 bg-yellow-500">{pendingPayments.length}</Badge>
              </TabsTrigger>
              <TabsTrigger value="failed">
                Failed
                <Badge className="ml-2 bg-destructive">{failedPayments.length}</Badge>
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="all">
              {renderPayments(filteredPayments)}
            </TabsContent>
            
            <TabsContent value="completed">
              {renderPayments(completedPayments)}
            </TabsContent>
            
            <TabsContent value="pending">
              {renderPayments(pendingPayments)}
            </TabsContent>
            
            <TabsContent value="failed">
              {renderPayments(failedPayments)}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

const renderPayments = (payments: any[]) => {
  if (payments.length === 0) {
    return (
      <div className="text-center py-12 border rounded-md">
        <CreditCard className="mx-auto h-12 w-12 text-muted-foreground" />
        <h3 className="mt-4 text-lg font-medium">No payments found</h3>
        <p className="mt-2 text-sm text-muted-foreground">
          You don't have any payments in this category.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Transaction ID</TableHead>
            <TableHead>Test</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {payments.map(({ enrollment, test }) => (
            <TableRow key={enrollment.id}>
              <TableCell className="font-medium">TRX-{enrollment.id.slice(0, 6)}</TableCell>
              <TableCell>{test.title}</TableCell>
              <TableCell>Rs. {test.price}</TableCell>
              <TableCell>{new Date(enrollment.createdAt).toLocaleDateString()}</TableCell>
              <TableCell>
                {enrollment.paymentStatus === 'completed' ? (
                  <Badge className="bg-green-500 hover:bg-green-600">
                    <CheckCircle className="mr-1 h-3 w-3" />
                    Completed
                  </Badge>
                ) : enrollment.paymentStatus === 'pending' ? (
                  <Badge variant="outline" className="bg-yellow-500/10 text-yellow-600 border-yellow-500/30">
                    <Clock className="mr-1 h-3 w-3" />
                    Pending
                  </Badge>
                ) : (
                  <Badge variant="destructive">
                    <XCircle className="mr-1 h-3 w-3" />
                    Failed
                  </Badge>
                )}
              </TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  {enrollment.paymentStatus === 'completed' && (
                    <Button variant="outline" size="sm">
                      <Receipt className="mr-2 h-4 w-4" />
                      Receipt
                    </Button>
                  )}
                  {enrollment.paymentStatus === 'pending' && (
                    <Button size="sm">
                      <CreditCard className="mr-2 h-4 w-4" />
                      Pay Now
                    </Button>
                  )}
                  {enrollment.paymentStatus === 'failed' && (
                    <Button size="sm">
                      <CreditCard className="mr-2 h-4 w-4" />
                      Retry
                    </Button>
                  )}
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default StudentPayments;
