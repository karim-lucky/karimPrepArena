
"use client";
import React, { use, useState } from 'react';
import { getPendingApprovals } from '@/app/lib/mockData';
import { toast } from "@/app/components/ui/use-toast";
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
import { useEffect } from 'react';

const AdminApprovals = () => {
  const [items, setItems] = useState(getPendingApprovals());

  useEffect(() => { 
    // Fetch pending approvals from the server or API
    // setItems(fetchedItems);
    console.log("Fetching pending approvals...", items);
  }, []);

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
              {items.map((item) => (
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
                    {new Date(item.enrollment.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <Badge variant={item.enrollment.paymentStatus === 'completed' ? 'success' : 'outline'}>
                      {item.enrollment.paymentStatus.charAt(0).toUpperCase() + item.enrollment.paymentStatus.slice(1)}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button 
                        size="sm" 
                        onClick={() => handleApprove(item.enrollment.id)}
                        disabled={item.enrollment.status === 'approved'}
                      >
                        Approve
                      </Button>
                      <Button 
                        size="sm"
                        variant="destructive"
                        onClick={() => handleReject(item.enrollment.id)}
                        disabled={item.enrollment.status === 'rejected'}
                      >
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
