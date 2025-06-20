

"use client";
import { useState, useEffect } from "react";
 
import { useRouter } from "next/navigation";
import { 
  Calendar, 
  Clock, 
  FileText, 
  Award, 
  CheckCircle,
  AlertCircle,
  CreditCard
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { mockTests, mockEnrollments } from "@/app/lib/mockData";
import { useAuth } from "@/app/lib/auth-context";
import { Test, Enrollment } from "@/app/lib/types";
import { toast } from "@/components/ui/use-toast";
import { useParams } from 'next/navigation';

const PaymentForm = ({ 
  test, 
  onPaymentComplete 
}: { 
  test: Test, 
  onPaymentComplete: () => void 
}) => {
  const [isProcessing, setIsProcessing] = useState(false);
  
  const handlePayment = async () => {
    setIsProcessing(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast({
        title: "Payment successful",
        description: `You have successfully paid Rs. ${test.price} for ${test.title}.`,
      });
      
      onPaymentComplete();
    } catch (error) {
      toast({
        title: "Payment failed",
        description: "There was an error processing your payment. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };
  
  return (
    <div className="space-y-4">
      <div className="border rounded-md p-4">
        <div className="flex justify-between items-center mb-4">
          <span className="font-medium">Test Fee</span>
          <span>Rs. {test.price}</span>
        </div>
        <div className="border-t pt-4 flex justify-between">
          <span className="font-bold">Total</span>
          <span className="font-bold">Rs. {test.price}</span>
        </div>
      </div>
      
      <div className="border rounded-md p-4 space-y-4">
        <h3 className="font-medium">Payment Method</h3>
        <div className="flex items-center space-x-3 p-3 border rounded-md bg-muted/30">
          <CreditCard className="h-5 w-5 text-primary" />
          <div>
            <p className="font-medium">Credit/Debit Card</p>
            <p className="text-sm text-muted-foreground">
              Test mode - no actual payment will be processed
            </p>
          </div>
        </div>
        
        <Button 
          onClick={handlePayment} 
          className="w-full" 
          disabled={isProcessing}
        >
          {isProcessing ? "Processing..." : `Pay Rs. ${test.price}`}
        </Button>
      </div>
      
      <p className="text-xs text-muted-foreground text-center">
        By proceeding with the payment, you agree to our terms and conditions.
      </p>
    </div>
  );
};

const TestDetail = () => {
  const params = useParams();
  const id = params.id;
  const { user } = useAuth();
  const router = useRouter();
  
  const [test, setTest] = useState<Test | null>(null);
  const [enrollment, setEnrollment] = useState<Enrollment | null>(null);
  const [paymentDialogOpen, setPaymentDialogOpen] = useState(false);
  
  useEffect(() => {
    console.log("Test ID:", id);
    if (id) {
      const foundTest = mockTests.find(t => t.id === id);
      if (foundTest) {
        console.log("Test foundjjjjjjjjjjjjjjjjjjj:", foundTest);
        console.log(foundTest);
        setTest(foundTest);
        
        if (user) {
          const foundEnrollment = mockEnrollments.find(
            e => e.testId === id && e.userId === user.id
          );
          if (foundEnrollment) {
            setEnrollment(foundEnrollment);
          }
        }
      } else {
        router.push('/tests');
      }
    }
  }, [id, user, router.push]);
  
  const handleEnroll = () => {
    // if (!user) {
    //   router.push('/login', { state: { from: `/test/${id}` } });
    //   return;
    // }
    
    setPaymentDialogOpen(true);
  };
  
  const handlePaymentComplete = () => {
    const newEnrollment: Enrollment = {
      id: Math.random().toString(),
      userId: user?.id || '',
      testId: test?.id || '',
      status: 'pending',
      paymentStatus: 'completed',
      createdAt: new Date().toISOString(),
    };
    
    setEnrollment(newEnrollment);
    setPaymentDialogOpen(false);
    
    mockEnrollments.push(newEnrollment);
  };
  
  const handleStartTest = () => {
    router.push(`/test-session/${test?.id}`);
  };
  
  if (!test) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-64px)]">
        <div className="text-center">
          <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading test details...</p>
        </div>
      </div>
    );
  }
  
  const isEnrolled = !!enrollment;
  const isPending = isEnrolled && enrollment.status === 'pending';
  const isApproved = isEnrolled && enrollment.status === 'approved';
  const canStartTest = isApproved && new Date(test.startDate) <= new Date();
  
  return (
    <div className="container py-8 space-y-6">
      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex-1 space-y-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">{test.title}</h1>
            <p className="text-muted-foreground mt-2">{test.description}</p>
          </div>
          
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Test Date</CardTitle>
              </CardHeader>
              <CardContent className="pb-2">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-primary" />
                  <span>{new Date(test.startDate).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center gap-2 mt-1">
                  <Clock className="h-4 w-4 text-primary" />
                  <span>{new Date(test.startDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Duration</CardTitle>
              </CardHeader>
              <CardContent className="pb-2">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-primary" />
                  <span>{test.duration} minutes</span>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Test Format</CardTitle>
              </CardHeader>
              <CardContent className="pb-2">
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4 text-primary" />
                  <span>{test.totalQuestions} multiple-choice questions</span>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Passing Criteria</CardTitle>
              </CardHeader>
              <CardContent className="pb-2">
                <div className="flex items-center gap-2">
                  <Award className="h-4 w-4 text-primary" />
                  <span>{test.passingPercentage}% and above</span>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Test Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-medium mb-1">Test Format</h3>
                <p className="text-muted-foreground">
                  This test consists of {test.totalQuestions} multiple-choice questions.
                  Each question has 4 options with only one correct answer.
                </p>
              </div>
              
              <div>
                <h3 className="font-medium mb-1">Scoring</h3>
                <p className="text-muted-foreground">
                  Each question carries equal marks. The passing score for this test is {test.passingPercentage}%.
                  There is no negative marking for wrong answers.
                </p>
              </div>
              
              <div>
                <h3 className="font-medium mb-1">Rules</h3>
                <ul className="list-disc pl-5 text-muted-foreground space-y-1">
                  <li>You must complete the test within the allocated time of {test.duration} minutes.</li>
                  <li>Once the test starts, the timer cannot be paused.</li>
                  <li>You can review and change your answers anytime during the test.</li>
                  <li>Results will be available immediately after completing the test.</li>
                  <li>Ensure you have a stable internet connection before starting the test.</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="md:w-[350px] space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Registration Status</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <span className="font-medium">Test Fee:</span>
                <span>Rs. {test.price}</span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="font-medium">Status:</span>
                {isEnrolled ? (
                  isPending ? (
                    <Badge variant="outline" className="bg-yellow-500/10 text-yellow-600 border-yellow-500/30 flex items-center gap-1">
                      <AlertCircle className="h-3 w-3" />
                      Pending Approval
                    </Badge>
                  ) : (
                    <Badge variant="outline" className="bg-green-500/10 text-green-600 border-green-500/30 flex items-center gap-1">
                      <CheckCircle className="h-3 w-3" />
                      Approved
                    </Badge>
                  )
                ) : (
                  <Badge variant="outline">Not Enrolled</Badge>
                )}
              </div>
              
              {isEnrolled && isPending && (
                <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-md p-3 text-sm">
                  <p className="text-yellow-600 font-medium mb-1">Approval Pending</p>
                  <p className="text-muted-foreground">
                    Your registration is pending approval by the administrator. 
                    You'll be notified once it's approved.
                  </p>
                </div>
              )}
              
              {isApproved && (
                <div className="bg-green-500/10 border border-green-500/30 rounded-md p-3 text-sm">
                  <p className="text-green-600 font-medium mb-1">Registration Approved</p>
                  <p className="text-muted-foreground">
                    Your registration has been approved. You can start the test on the scheduled date.
                  </p>
                </div>
              )}
            </CardContent>
            
            <CardFooter>
              {!isEnrolled ? (
                <Button 
                  className="w-full" 
                  size="lg" 
                  onClick={handleEnroll}
                >
                  Enroll Now
                </Button>
              ) : isPending ? (
                <Button 
                  className="w-full" 
                  size="lg" 
                  variant="outline" 
                  disabled
                >
                  Awaiting Approval
                </Button>
              ) : canStartTest ? (
                <Button 
                  className="w-full" 
                  size="lg" 
                  onClick={handleStartTest}
                >
                  Start Test
                </Button>
              ) : (
                <Button 
                  className="w-full" 
                  size="lg" 
                  disabled
                >
                  Test available on {new Date(test.startDate).toLocaleDateString()}
                </Button>
              )}
            </CardFooter>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Category</CardTitle>
            </CardHeader>
            <CardContent>
              <Badge variant="outline" className="px-3 py-1 text-base font-normal">
                {test.category}
              </Badge>
            </CardContent>
          </Card>
        </div>
      </div>
      
      <Dialog open={paymentDialogOpen} onOpenChange={setPaymentDialogOpen}>
        <DialogContent className="sm:max-w-md bg-white p-6 rounded-lg shadow-lg">
          <DialogHeader>
            <DialogTitle>Complete Payment</DialogTitle>
            <DialogDescription>
              Pay the registration fee to enroll in {test.title}.
            </DialogDescription>
          </DialogHeader>
          
          {test && (
            <PaymentForm 
              test={test} 
              onPaymentComplete={handlePaymentComplete} 
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TestDetail;
