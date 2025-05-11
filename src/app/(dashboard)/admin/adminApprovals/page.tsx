
"use client"
import React, { useState } from 'react';
import { getPendingApprovals } from '@/app/lib/mockData';
import { toast } from "@/app/components/ui/use-toast";
import { Check, X, UserCheck, UserX } from "lucide-react";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/app/components/ui/table";
import { Button } from "@/app/components/ui/button";
import { Badge } from "@/app/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/app/components/ui/card";

const AdminApprovals = () => {
  const [items, setItems] = useState(getPendingApprovals());

  const handleApprove = (enrollmentId: string) => {
    const updatedItems = items.map(item =>
      item.enrollment.id === enrollmentId
        ? {
            ...item,
            enrollment: {
              ...item.enrollment,
              status: "approved" as "pending" | "approved" | "rejected"
            }
          }
        : item
    );
    
    setItems(updatedItems);
    
    toast({
      title: "Enrollment approved",
      description: "The student has been notified.",
    });
  };

  const handleReject = (enrollmentId: string) => {
    const updatedItems = items.map(item =>
      item.enrollment.id === enrollmentId
        ? {
            ...item,
            enrollment: {
              ...item.enrollment,
              status: "rejected" as "pending" | "approved" | "rejected"
            }
          }
        : item
    );
    
    setItems(updatedItems);
    
    toast({
      title: "Enrollment rejected",
      description: "The student has been notified.",
      variant: "destructive",
    });
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Pending Enrollment Approvals</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Total Pending</CardTitle>
            <CardDescription>Awaiting approval</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{items.length}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Payment Verified</CardTitle>
            <CardDescription>Ready for approval</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{items.filter(item => item.enrollment.paymentStatus === 'completed').length}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Today's Requests</CardTitle>
            <CardDescription>New registrations today</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{items.filter(item => {
              const today = new Date();
              const createdDate = new Date(item.enrollment.createdAt);
              return today.toDateString() === createdDate.toDateString();
            }).length}</div>
          </CardContent>
        </Card>
      </div>
      
      {items.length === 0 ? (
        <div className="bg-muted p-8 rounded-lg text-center">
          <h3 className="text-lg font-medium">No Pending Approvals</h3>
          <p className="text-muted-foreground mt-2">
            All enrollment requests have been processed.
          </p>
        </div>
      ) : (
        <div className="bg-card rounded-lg shadow overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Student</TableHead>
                <TableHead>Test</TableHead>
                <TableHead>Registration Date</TableHead>
                <TableHead>Payment Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {items.map((item:any) => (
                <TableRow key={item.enrollment.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      {item.user.profileImage && (
                        <img 
                          src={item.user.profileImage} 
                          alt={item.user.name}
                          className="w-8 h-8 rounded-full object-cover"
                        />
                      )}
                      <div>
                        <p className="font-medium">{item.user.name}</p>
                        <p className="text-sm text-muted-foreground">{item.user.email}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium">{item.test.title}</p>
                      <p className="text-sm text-muted-foreground">{item.test.category}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col">
                      <span>{new Date(item.enrollment.createdAt).toLocaleDateString()}</span>
                      <span className="text-xs text-muted-foreground">
                        {new Date(item.enrollment.createdAt).toLocaleTimeString()}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={item.enrollment.paymentStatus === 'completed' ? 'secondary' : 'outline'}>
                      {item.enrollment.paymentStatus.charAt(0).toUpperCase() + item.enrollment.paymentStatus.slice(1)}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button 
                        size="sm" 
                        onClick={() => handleApprove(item.enrollment.id)}
                        disabled={item.enrollment.status === 'approved'}
                        className="gap-1"
                      >
                        <Check className="h-4 w-4" />
                        Approve
                      </Button>
                      <Button 
                        size="sm"
                        variant="destructive"
                        onClick={() => handleReject(item.enrollment.id)}
                        disabled={item.enrollment.status === 'rejected'}
                        className="gap-1"
                      >
                        <X className="h-4 w-4" />
                        Reject
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
};

export default AdminApprovals;
