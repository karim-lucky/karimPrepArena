
"use client"
import { useState, useEffect, useRef } from "react";
// import { useParams  } from "react-router-dom";
import { useParams } from "next/navigation";
import { 
  ArrowLeft, 
  ArrowRight, 
  CheckSquare, 
  Clock, 
  AlertTriangle,
  Check,
  Circle
} from "lucide-react";
// import { Button } from "@/components/ui/button";
import { Button } from "@/app/components/ui/button";
import { Progress } from "@/app/components/ui/progress";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/app/components/ui/dialog";
import { Card, CardContent } from "@/app/components/ui/card";
import { useAuth } from "@/app/lib/auth-context";
import { mockTests, mockQuestions } from "@/app/lib/mockData";
import { Test, Question } from "@/app/lib/types";
import { toast } from "@/app/components/ui/use-toast";
import { useIsMobile } from "@/app/hooks/use-mobile";
import {
  Sheet,
  SheetContent,
  SheetTrigger
} from "@/app/components/ui/sheet";
import { useRouter } from "next/navigation";

interface Answer {
  questionId: string;
  selectedOptionIndex: number | null;
  isCorrect: boolean;
}

const TestSession = () => {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const router = useRouter();
  const isMobile = useIsMobile();
  
  const [test, setTest] = useState<Test | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [remainingTime, setRemainingTime] = useState(0);
  const [confirmEndDialogOpen, setConfirmEndDialogOpen] = useState(false);
  const [timeWarningShown, setTimeWarningShown] = useState(false);
  
  const intervalRef = useRef<number | null>(null);
  
  // Load test and questions
  useEffect(() => {
    console.log("dddddddddddddddddddd")
    console.log(id)
    if (id) {
      const foundTest = mockTests.find(t => t.id === id);
      if (foundTest) {
        setTest(foundTest);
        setRemainingTime(foundTest.duration * 60); // Convert minutes to seconds
        
        const testQuestions = mockQuestions[id] || [];
        setQuestions(testQuestions);
        
        // Initialize answers
        const initialAnswers = testQuestions.map(q => ({
          questionId: q.id,
          selectedOptionIndex: null,
          isCorrect: false,
        }));
        setAnswers(initialAnswers);
      } else {
        router.push('/tests');
      }
    }
  }, [id, router.push]);
  
  // Timer countdown
  useEffect(() => {
    if (remainingTime > 0 && !intervalRef.current) {
      intervalRef.current = window.setInterval(() => {
        setRemainingTime(prevTime => {
          if (prevTime <= 1) {
            // Time's up
            clearInterval(intervalRef.current!);
            handleEndTest();
            return 0;
          }
          
          // Show warning when 5 minutes remaining
          if (prevTime === 300 && !timeWarningShown) {
            toast({
              title: "5 minutes remaining",
              description: "You have 5 minutes left to complete the test.",
              variant: "destructive",
            });
            setTimeWarningShown(true);
          }
          
          return prevTime - 1;
        });
      }, 1000);
    }
    
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [remainingTime, timeWarningShown]);
  
  // Handle answer selection
  const handleSelectAnswer = (optionIndex: number) => {
    const updatedAnswers = [...answers];
    const currentQuestion = questions[currentQuestionIndex];
    
    updatedAnswers[currentQuestionIndex] = {
      questionId: currentQuestion.id,
      selectedOptionIndex: optionIndex,
      isCorrect: optionIndex === currentQuestion.correctOptionIndex,
    };
    
    setAnswers(updatedAnswers);
  };
  
  // Navigation functions
  const goToNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };
  
  const goToPreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };
  
  const handleEndTest = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    
    // Calculate score
    const answeredQuestions = answers.filter(a => a.selectedOptionIndex !== null);
    const correctAnswers = answers.filter(a => a.isCorrect);
    
    const score = Math.round((correctAnswers.length / questions.length) * 100);
    
    // Store test result in localStorage for results page
    localStorage.setItem('testResult', JSON.stringify({
      testId: id,
      score,
      answers,
      answeredCount: answeredQuestions.length,
      totalQuestions: questions.length,
      completedAt: new Date().toISOString(),
    }));
    
    // router.push to results page
    router.push(`/testResult/${id}`);
  };
  
  // Format time
  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    return `${hours > 0 ? `${hours}:` : ''}${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };
  
  // Calculate progress
  const answeredCount = answers.filter(a => a.selectedOptionIndex !== null).length;
  const progress = (answeredCount / questions.length) * 100;
  
  if (!test || questions.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading test...</p>
        </div>
      </div>
    );
  }
  
  const currentQuestion = questions[currentQuestionIndex];
  const currentAnswer = answers[currentQuestionIndex];
  
  // Question Navigation Components
  const QuestionNumbers = () => (
    <div className="flex flex-wrap gap-2">
      {questions.map((_, index) => {
        const isAnswered = answers[index].selectedOptionIndex !== null;
        const isCurrent = index === currentQuestionIndex;
        
        return (
          <Button
            key={index}
            variant={isCurrent ? "default" : isAnswered ? "secondary" : "outline"}
            className={`w-10 h-10 p-0 relative ${isCurrent ? 'ring-2 ring-primary ring-offset-2' : ''}`}
            onClick={() => setCurrentQuestionIndex(index)}
          >
            {isAnswered && (
              <Check className="absolute top-0 right-0 h-3 w-3 -mt-1 -mr-1 bg-success text-success-foreground rounded-full p-[1px]" />
            )}
            {index + 1}
          </Button>
        );
      })}
    </div>
  );
  
  const QuestionLegend = () => (
    <div className="mt-6 space-y-2">
      <div className="flex items-center gap-2 text-sm">
        <div className="w-4 h-4 bg-primary rounded-md"></div>
        <span>Current question</span>
      </div>
      <div className="flex items-center gap-2 text-sm">
        <div className="w-4 h-4 bg-secondary rounded-md"></div>
        <span>Answered</span>
      </div>
      <div className="flex items-center gap-2 text-sm">
        <div className="w-4 h-4 border rounded-md"></div>
        <span>Unanswered</span>
      </div>
    </div>
  );
  
  return (
    <div className="min-h-screen flex flex-col">
      {/* Test header with timer */}
      <div className="sticky top-0 z-30 bg-background border-b border-border">
        <div className="container py-4">
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <h1 className="text-xl font-bold">{test.title}</h1>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 bg-warning/10 text-warning px-3 py-1 rounded-full">
                  <Clock className="h-4 w-4" />
                  <span className="font-mono font-bold">{formatTime(remainingTime)}</span>
                </div>
                <Button 
                  variant="outline" 
                  className="text-destructive hover:text-destructive"
                  onClick={() => setConfirmEndDialogOpen(true)}
                >
                  End Test
                </Button>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="flex-1">
                <Progress value={progress} className="h-2" />
              </div>
              <div className="text-sm font-medium">
                {answeredCount}/{questions.length} answered
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Main test area - split into two columns on larger screens */}
      <div className="flex-1 bg-muted/50">
        <div className="container py-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Question navigation sidebar - visible on larger screens */}
            <div className="hidden lg:block lg:col-span-3">
              <div className="bg-background p-4 rounded-lg border shadow-sm">
                <h2 className="text-lg font-medium mb-4">Questions</h2>
                <QuestionNumbers />
                <QuestionLegend />
                
                <div className="mt-6">
                  <Button 
                    variant="destructive" 
                    className="w-full"
                    onClick={() => setConfirmEndDialogOpen(true)}
                  >
                    Submit Test
                  </Button>
                </div>
              </div>
            </div>
            
            {/* Question and answer area */}
            <div className="lg:col-span-9">
              <Card className="shadow-sm">
                <CardContent className="p-6">
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">
                        Question {currentQuestionIndex + 1} of {questions.length}
                      </span>
                      <span className="text-sm font-medium">
                        {currentQuestion.points} points
                      </span>
                    </div>
                    
                    <div className="p-4 border rounded-md bg-background">
                      <h2 className="text-lg font-medium mb-2">{currentQuestion.text}</h2>
                    </div>
                    
                    <div className="space-y-3">
                      {currentQuestion.options.map((option:any, index:any) => (
                        <div
                          key={index}
                          className={`p-4 border rounded-md cursor-pointer transition-colors hover:bg-accent ${
                            currentAnswer.selectedOptionIndex === index ? 'bg-secondary text-secondary-foreground' : ''
                          }`}
                          onClick={() => handleSelectAnswer(index)}
                        >
                          <div className="flex items-center gap-3">
                            <div className={`w-6 h-6 rounded-full flex items-center justify-center border ${
                              currentAnswer.selectedOptionIndex === index 
                                ? 'bg-primary border-primary text-primary-foreground' 
                                : 'border-muted-foreground'
                            }`}>
                              {String.fromCharCode(65 + index)}
                            </div>
                            <span>{option}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    <div className="flex items-center justify-between pt-4">
                      <Button
                        variant="outline"
                        onClick={goToPreviousQuestion}
                        disabled={currentQuestionIndex === 0}
                        className="flex items-center gap-2"
                      >
                        <ArrowLeft className="h-4 w-4" />
                        Previous
                      </Button>
                      
                      {currentQuestionIndex < questions.length - 1 ? (
                        <Button
                          onClick={goToNextQuestion}
                          className="flex items-center gap-2"
                        >
                          Next
                          <ArrowRight className="h-4 w-4" />
                        </Button>
                      ) : (
                        <Button
                          onClick={() => setConfirmEndDialogOpen(true)}
                          variant="destructive"
                          className="flex items-center gap-2"
                        >
                          Finish Test
                          <CheckSquare className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
      
      {/* Mobile: Question navigation Sheet */}
      {isMobile && (
        <div className="sticky bottom-0 bg-background border-t">
          <div className="container py-4">
            <div className="grid grid-cols-2 gap-4">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" className="w-full">
                    Questions ({currentQuestionIndex + 1}/{questions.length})
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-[85%] sm:w-[385px]">
                  <div className="py-6">
                    <h2 className="text-lg font-medium mb-4">Questions</h2>
                    <QuestionNumbers />
                    <QuestionLegend />
                  </div>
                </SheetContent>
              </Sheet>
              
              <Button 
                variant="destructive" 
                className="w-full"
                onClick={() => setConfirmEndDialogOpen(true)}
              >
                Submit Test
              </Button>
            </div>
            
            <div className="flex items-center justify-between mt-4">
              <Button
                variant="outline"
                onClick={goToPreviousQuestion}
                disabled={currentQuestionIndex === 0}
                size="sm"
              >
                <ArrowLeft className="h-4 w-4" />
                Prev
              </Button>
              
              <div className="text-sm font-medium">
                {currentQuestionIndex + 1} / {questions.length}
              </div>
              
              <Button
                variant="outline"
                onClick={goToNextQuestion}
                disabled={currentQuestionIndex === questions.length - 1}
                size="sm"
              >
                Next
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      )}
      
      {/* Confirm end test dialog */}
      <Dialog open={confirmEndDialogOpen} onOpenChange={setConfirmEndDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>End Test?</DialogTitle>
            <DialogDescription>
              Are you sure you want to end the test? You have answered {answeredCount} out of {questions.length} questions.
            </DialogDescription>
          </DialogHeader>
          
          {answeredCount < questions.length && (
            <div className="flex items-center gap-2 bg-warning/10 text-warning p-3 rounded-md">
              <AlertTriangle className="h-5 w-5" />
              <p className="text-sm">
                You have {questions.length - answeredCount} unanswered questions. Once you end the test, you cannot return to answer them.
              </p>
            </div>
          )}
          
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setConfirmEndDialogOpen(false)}
            >
              Continue Test
            </Button>
            <Button
              variant="destructive"
              onClick={handleEndTest}
            >
              End Test
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TestSession;
