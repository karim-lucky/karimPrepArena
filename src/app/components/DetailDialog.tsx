
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../components/ui/dialog";
import { Separator } from "../components/ui/separator";
import { Badge } from "../components/ui/badge";
import { Card, CardContent } from "../components/ui/card";
import { ScrollArea } from "../components/ui/scroll-area";
import { 
  Calendar, 
  FileText, 
  User, 
  Mail, 
  Clock, 
  Award, 
  DollarSign, 
  Tag, 
  CheckCircle, 
  CalendarClock 
} from "lucide-react";

export type TestDetailProps = {
  id: string;
  name: string;
  date: string;
  totalEnrollments: number;
  averageScore: number;
  duration?: string;
  passingCriteria?: string;
  totalQuestions?: number;
  categories?: string[];
  description?: string;
  createdAt?: string;
};

export type StudentDetailProps = {
  id: string;
  name: string;
  email: string;
  testsCompleted: number;
  testsPurchased: number;
  averageScore: number;
  phoneNumber?: string;
  enrolledTests?: Array<{id: string, name: string, date: string, status: string}>;
  testHistory?: Array<{id: string, name: string, date: string, score: number}>;
  address?: string;
  joinedOn?: string;
};

export type PaymentDetailProps = {
  id: string;
  studentName: string;
  amount: number;
  date: string;
  status: string;
  test: string;
  transactionId?: string;
  paymentMethod?: string;
  email?: string;
  receiptUrl?: string;
  notes?: string;
};

interface DetailDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  type: "test" | "student" | "payment";
  data: TestDetailProps | StudentDetailProps | PaymentDetailProps;
}

const DetailDialog: React.FC<DetailDialogProps> = ({ 
  open, 
  onOpenChange, 
  type, 
  data 
}) => {
  const renderTestDetail = (test: TestDetailProps) => (
    <>
      <DialogHeader>
        <DialogTitle className="text-xl font-bold flex items-center">
          <FileText className="h-5 w-5 mr-2" strokeWidth={2} />
          Test Details
        </DialogTitle>
        <DialogDescription>
          Detailed information about the selected test
        </DialogDescription>
      </DialogHeader>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold">{test.name}</h3>
            <p className="text-muted-foreground text-sm">{test.description || "No description available"}</p>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center text-sm">
              <Calendar className="h-4 w-4 mr-2 text-primary" />
              <span className="font-medium">Date:</span>
              <span className="ml-2">{test.date}</span>
            </div>
            <div className="flex items-center text-sm">
              <Clock className="h-4 w-4 mr-2 text-primary" />
              <span className="font-medium">Duration:</span>
              <span className="ml-2">{test.duration || "120 minutes"}</span>
            </div>
            <div className="flex items-center text-sm">
              <CheckCircle className="h-4 w-4 mr-2 text-primary" />
              <span className="font-medium">Passing Criteria:</span>
              <span className="ml-2">{test.passingCriteria || "60%"}</span>
            </div>
            <div className="flex items-center text-sm">
              <FileText className="h-4 w-4 mr-2 text-primary" />
              <span className="font-medium">Total Questions:</span>
              <span className="ml-2">{test.totalQuestions || "100"}</span>
            </div>
          </div>
        </div>
        
        <div className="space-y-4">
          <Card>
            <CardContent className="p-4">
              <h4 className="font-semibold mb-2">Performance Statistics</h4>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Total Enrollments</span>
                  <Badge variant="default" className="bg-primary/15 text-primary border-primary/20">
                    {test.totalEnrollments}
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Average Score</span>
                  <Badge 
                    variant={
                      test.averageScore >= 80 ? "success" : 
                      test.averageScore >= 60 ? "warning" : "danger"
                    }
                  >
                    {test.averageScore}%
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Created On</span>
                  <span className="text-sm">{test.createdAt || "January 15, 2025"}</span>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <div>
            <h4 className="font-semibold mb-2">Categories</h4>
            <div className="flex flex-wrap gap-2">
              {(test.categories || ["Biology", "Chemistry", "Physics", "General Knowledge"]).map((category, index) => (
                <Badge key={index} variant="secondary">
                  {category}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );

  const renderStudentDetail = (student: StudentDetailProps) => (
    <>
      <DialogHeader>
        <DialogTitle className="text-xl font-bold flex items-center">
          <User className="h-5 w-5 mr-2" strokeWidth={2} />
          Student Profile
        </DialogTitle>
        <DialogDescription>
          Detailed information about the selected student
        </DialogDescription>
      </DialogHeader>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
        <div className="md:col-span-1">
          <div className="bg-muted/20 rounded-lg p-4 text-center">
            <div className="w-20 h-20 rounded-full bg-primary/10 mx-auto flex items-center justify-center">
              <User className="h-10 w-10 text-primary" strokeWidth={1.5} />
            </div>
            <h3 className="text-lg font-semibold mt-2">{student.name}</h3>
            <p className="text-sm text-muted-foreground">{student.email}</p>
            <p className="text-xs text-muted-foreground mt-1">{student.phoneNumber || "No phone number"}</p>
            
            <div className="mt-3 space-y-2 text-sm">
              <div className="flex items-center justify-center">
                <Award className="h-4 w-4 mr-2 text-primary" />
                <span>Avg. Score: </span>
                <Badge 
                  className="ml-2"
                  variant={
                    student.averageScore >= 80 ? "success" : 
                    student.averageScore >= 60 ? "warning" : "danger"
                  }
                >
                  {student.averageScore}%
                </Badge>
              </div>
              <div className="flex items-center justify-center">
                <CalendarClock className="h-4 w-4 mr-2 text-primary" />
                <span>Joined: {student.joinedOn || "January 5, 2025"}</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="md:col-span-2 space-y-4">
          <Card>
            <CardContent className="p-4">
              <h4 className="font-semibold mb-2">Test Summary</h4>
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-green-50 rounded p-3 text-center">
                  <span className="block text-green-600 font-semibold text-lg">{student.testsCompleted}</span>
                  <span className="text-xs text-muted-foreground">Tests Completed</span>
                </div>
                <div className="bg-blue-50 rounded p-3 text-center">
                  <span className="block text-blue-600 font-semibold text-lg">{student.testsPurchased}</span>
                  <span className="text-xs text-muted-foreground">Tests Purchased</span>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <div>
            <h4 className="font-semibold mb-2">Enrolled Tests</h4>
            <ScrollArea className="h-40 rounded-md border">
              <div className="p-4">
                {(student.enrolledTests || [
                  {id: "t001", name: "Medical College Admission Test", date: "June 15, 2025", status: "approved"},
                  {id: "t002", name: "Engineering College Admission Test", date: "July 10, 2025", status: "pending"},
                  {id: "t003", name: "Scholastic Assessment Test", date: "May 25, 2025", status: "approved"}
                ]).map((test) => (
                  <div key={test.id} className="py-2 first:pt-0 last:pb-0">
                    <div className="flex justify-between items-center">
                      <div>
                        <span className="block font-medium text-sm">{test.name}</span>
                        <span className="text-xs text-muted-foreground">{test.date}</span>
                      </div>
                      <Badge 
                        variant={test.status === "approved" ? "success" : "warning"}
                      >
                        {test.status}
                      </Badge>
                    </div>
                    {test.id !== (student.enrolledTests || [])[student.enrolledTests?.length || 0 - 1]?.id && (
                      <Separator className="my-2" />
                    )}
                  </div>
                ))}
              </div>
            </ScrollArea>
          </div>
          
          <div>
            <h4 className="font-semibold mb-2">Test History</h4>
            <ScrollArea className="h-40 rounded-md border">
              <div className="p-4">
                {(student.testHistory || [
                  {id: "th001", name: "Sample Test 1", date: "January 10, 2025", score: 85},
                  {id: "th002", name: "Sample Test 2", date: "February 15, 2025", score: 72},
                  {id: "th003", name: "Sample Test 3", date: "March 20, 2025", score: 91}
                ]).map((test) => (
                  <div key={test.id} className="py-2 first:pt-0 last:pb-0">
                    <div className="flex justify-between items-center">
                      <div>
                        <span className="block font-medium text-sm">{test.name}</span>
                        <span className="text-xs text-muted-foreground">{test.date}</span>
                      </div>
                      <Badge 
                        variant={
                          test.score >= 80 ? "success" : 
                          test.score >= 60 ? "warning" : "danger"
                        }
                      >
                        {test.score}%
                      </Badge>
                    </div>
                    {test.id !== (student.testHistory || [])[student.testHistory?.length || 0 - 1]?.id && (
                      <Separator className="my-2" />
                    )}
                  </div>
                ))}
              </div>
            </ScrollArea>
          </div>
        </div>
      </div>
    </>
  );

  const renderPaymentDetail = (payment: PaymentDetailProps) => (
    <>
      <DialogHeader>
        <DialogTitle className="text-xl font-bold flex items-center">
          <DollarSign className="h-5 w-5 mr-2" strokeWidth={2} />
          Payment Details
        </DialogTitle>
        <DialogDescription>
          Detailed information about the selected payment
        </DialogDescription>
      </DialogHeader>
      
      <div className="space-y-4 mt-4">
        <div className="bg-muted/10 p-4 rounded-lg">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="font-medium">{payment.studentName}</h3>
              <p className="text-sm text-muted-foreground">{payment.email || "student@example.com"}</p>
            </div>
            <Badge variant="success">
              {payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}
            </Badge>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <Card>
              <CardContent className="p-4">
                <h4 className="font-semibold mb-3">Transaction Details</h4>
                <div className="space-y-2">
                  <div className="flex items-center text-sm">
                    <Tag className="h-4 w-4 mr-2 text-primary" />
                    <span className="font-medium">Transaction ID:</span>
                    <span className="ml-2">{payment.transactionId || "TXNID-" + payment.id}</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <DollarSign className="h-4 w-4 mr-2 text-primary" />
                    <span className="font-medium">Amount:</span>
                    <span className="ml-2">₨ {payment.amount}</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <Calendar className="h-4 w-4 mr-2 text-primary" />
                    <span className="font-medium">Payment Date:</span>
                    <span className="ml-2">{payment.date}</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <FileText className="h-4 w-4 mr-2 text-primary" />
                    <span className="font-medium">Payment Method:</span>
                    <span className="ml-2">{payment.paymentMethod || "Credit Card"}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="space-y-4">
            <Card>
              <CardContent className="p-4">
                <h4 className="font-semibold mb-3">Purchase Information</h4>
                <div className="space-y-2">
                  <div>
                    <span className="text-sm font-medium">Test:</span>
                    <span className="block text-sm mt-1">{payment.test}</span>
                  </div>
                  
                  {payment.notes && (
                    <div className="mt-3">
                      <span className="text-sm font-medium">Notes:</span>
                      <p className="text-sm text-muted-foreground mt-1">{payment.notes}</p>
                    </div>
                  )}
                  
                  {payment.receiptUrl && (
                    <div className="mt-3">
                      <a 
                        href={payment.receiptUrl}
                        className="text-sm text-primary hover:underline flex items-center"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <FileText className="h-4 w-4 mr-1" />
                        View Receipt
                      </a>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  );

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[700px] max-h-[85vh] overflow-y-auto">
        {type === "test" && renderTestDetail(data as TestDetailProps)}
        {type === "student" && renderStudentDetail(data as StudentDetailProps)}
        {type === "payment" && renderPaymentDetail(data as PaymentDetailProps)}
      </DialogContent>
    </Dialog>
  );
};

export default DetailDialog;
