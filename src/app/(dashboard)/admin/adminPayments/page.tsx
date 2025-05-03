"use client";
import { useState } from "react";
import { 
  Search, 
  Filter, 
  Download, 
  CreditCard, 
  Check, 
  X, 
  DollarSign, 
  AlertCircle,
  Clock,
  ChevronsUpDown
} from "lucide-react";
import { Button } from "@/app/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Input } from "@/app/components/ui/input";
import { Badge } from "@/app/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/app/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/components/ui/select";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/app/components/ui/tabs";
import { getAllEnrollments } from "@/app/lib/mockData";

const AdminPayments = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  
  const allEnrollments = getAllEnrollments();
  
  // Filter by payment status
  let filteredEnrollments = allEnrollments;
  if (statusFilter !== "all") {
    filteredEnrollments = allEnrollments.filter(
      item => item.enrollment.paymentStatus === statusFilter
    );
  }
  
  // Search filter
  if (searchQuery) {
    filteredEnrollments = filteredEnrollments.filter(
      item => 
        item.user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.test.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }
  
  // Calculate total revenue
  const totalRevenue = allEnrollments
    .filter(item => item.enrollment.paymentStatus === 'completed')
    .reduce((sum, item) => sum + item.test.price, 0);
  
  // Calculate pending payments
  const pendingPayments = allEnrollments
    .filter(item => item.enrollment.paymentStatus === 'pending')
    .reduce((sum, item) => sum + item.test.price, 0);
  
  // Payment status distribution
  const completedPayments = allEnrollments.filter(
    item => item.enrollment.paymentStatus === 'completed'
  ).length;
  
  const pendingPaymentsCount = allEnrollments.filter(
    item => item.enrollment.paymentStatus === 'pending'
  ).length;
  
  const failedPayments = allEnrollments.filter(
    item => item.enrollment.paymentStatus === 'failed'
  ).length;
  
  // Sort by date (most recent first)
  filteredEnrollments.sort((a, b) => 
    new Date(b.enrollment.createdAt).getTime() - new Date(a.enrollment.createdAt).getTime()
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Payments</h1>
        <p className="text-muted-foreground">
          Track and manage all payments and transactions.
        </p>
      </div>
      
      {/* Stats overview */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Rs. {totalRevenue}</div>
            <div className="text-xs text-muted-foreground pt-1">
              From {completedPayments} completed payments
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Payments</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Rs. {pendingPayments}</div>
            <div className="text-xs text-muted-foreground pt-1">
              From {pendingPaymentsCount} pending transactions
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Payment Success Rate</CardTitle>
            <Check className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {allEnrollments.length 
                ? ((completedPayments / allEnrollments.length) * 100).toFixed(1) 
                : 0}%
            </div>
            <div className="text-xs text-muted-foreground pt-1">
              {failedPayments} failed transactions
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
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Payments</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="failed">Failed</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
        </div>
        <Button>
          <Download className="mr-2 h-4 w-4" />
          Export Payments
        </Button>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Payment Transactions</CardTitle>
          <CardDescription>
            All payment transactions in the system.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all">
            <TabsList className="mb-4">
              <TabsTrigger value="all">
                All
                <Badge className="ml-2 bg-primary">{allEnrollments.length}</Badge>
              </TabsTrigger>
              <TabsTrigger value="completed">
                Completed
                <Badge className="ml-2 bg-green-500">{completedPayments}</Badge>
              </TabsTrigger>
              <TabsTrigger value="pending">
                Pending
                <Badge className="ml-2 bg-yellow-500">{pendingPaymentsCount}</Badge>
              </TabsTrigger>
              <TabsTrigger value="failed">
                Failed
                <Badge className="ml-2 bg-destructive">{failedPayments}</Badge>
              </TabsTrigger>
            </TabsList>
            
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Transaction ID</TableHead>
                    <TableHead>Student</TableHead>
                    <TableHead>Test</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredEnrollments.length > 0 ? (
                    filteredEnrollments.map(({ enrollment, user, test }) => (
                      <TableRow key={enrollment.id}>
                        <TableCell className="font-medium">TRX-{enrollment.id.slice(0, 6)}</TableCell>
                        <TableCell>{user.name}</TableCell>
                        <TableCell>{test.title}</TableCell>
                        <TableCell>Rs. {test.price}</TableCell>
                        <TableCell>{new Date(enrollment.createdAt).toLocaleDateString()}</TableCell>
                        <TableCell>
                          {enrollment.paymentStatus === 'completed' ? (
                            <Badge className="bg-green-500 hover:bg-green-600">
                              <Check className="mr-1 h-3 w-3" />
                              Completed
                            </Badge>
                          ) : enrollment.paymentStatus === 'pending' ? (
                            <Badge variant="outline" className="bg-yellow-500/10 text-yellow-600 border-yellow-500/30">
                              <Clock className="mr-1 h-3 w-3" />
                              Pending
                            </Badge>
                          ) : (
                            <Badge variant="destructive">
                              <X className="mr-1 h-3 w-3" />
                              Failed
                            </Badge>
                          )}
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button variant="outline" size="sm">
                              <CreditCard className="h-4 w-4 mr-1" />
                              Details
                            </Button>
                            {enrollment.paymentStatus === 'pending' && (
                              <Button size="sm" className="bg-green-500 hover:bg-green-600">
                                <Check className="h-4 w-4 mr-1" />
                                Verify
                              </Button>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={7} className="h-24 text-center">
                        No payments found.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminPayments;
