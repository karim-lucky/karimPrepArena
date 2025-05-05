"use client";
import { useState, useEffect } from "react";
import {     a } from "react-router-dom";
import { useParams } from "next/navigation";
import { 
  CheckCircle, 
  XCircle, 
  ArrowLeft, 
  Award, 
  Share2,
  Download,
  Home,
  RefreshCw
} from "lucide-react";
import { Button } from "@/app/components/ui/button";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/app/components/ui/card";
import { Progress } from "@/app/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/app/components/ui/tabs";
import { mockTests, mockQuestions } from "@/app/lib/mockData";
import { Test, Question } from "@/app/lib/types";
import { useRouter } from "next/navigation";

interface TestResultData {
  testId: string;
  score: number;
  answers: {
    questionId: string;
    selectedOptionIndex: number | null;
    isCorrect: boolean;
  }[];
  answeredCount: number;
  totalQuestions: number;
  completedAt: string;
}

const TestResult = () => {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  
  const [test, setTest] = useState<Test | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [result, setResult] = useState<TestResultData | null>(null);
  
  useEffect(() => {
    // Get test result from localStorage
    const storedResult = localStorage.getItem('testResult');
    
    if (storedResult) {
      try {
        const parsedResult = JSON.parse(storedResult) as TestResultData;
        setResult(parsedResult);
        
        // Load test and questions
        if (id) {
          const foundTest = mockTests.find(t => t.id === id);
          if (foundTest) {
            setTest(foundTest);
          }
          
          const testQuestions = mockQuestions[id!] || [];
          setQuestions(testQuestions);
        }
      } catch (error) {
        console.error('Failed to parse test result:', error);
        router.push('/');
      }
    } else {
      // No result found, redirect to home
      router.push('/');
    }
  }, [id, router.push]);
  
  if (!test || !result) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading results...</p>
        </div>
      </div>
    );
  }
  
  const isPassed = result.score >= test.passingPercentage;
  
  return (
    <div className="container py-8 space-y-8">
      <div className="max-w-5xl mx-auto">
        {/* Result header */}
        <Card className="mb-8">
          <CardHeader className="relative overflow-hidden pb-0">
            <div className={`absolute top-0 left-0 w-full h-full opacity-10 ${
              isPassed ? 'bg-success' : 'bg-destructive'
            }`}></div>
            <div className="text-center py-8 relative">
              <div className={`w-20 h-20 mx-auto rounded-full flex items-center justify-center ${
                isPassed 
                  ? 'bg-success/20 text-success' 
                  : 'bg-destructive/20 text-destructive'
              }`}>
                {isPassed ? (
                  <Award className="h-12 w-12" />
                ) : (
                  <RefreshCw className="h-10 w-10" />
                )}
              </div>
              <CardTitle className="text-3xl mt-4">
                {isPassed ? "Congratulations!" : "Test Completed"}
              </CardTitle>
              <CardDescription className="text-xl mt-2">
                {isPassed 
                  ? "You have passed the test successfully" 
                  : "Keep practicing to improve your score"}
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent className="pt-8">
            <div className="grid gap-8 md:grid-cols-2">
              <div className="flex flex-col items-center space-y-2">
                <h3 className="text-xl font-semibold">{test.title}</h3>
                <p className="text-muted-foreground">
                  Completed on {new Date(result.completedAt).toLocaleDateString()} at {new Date(result.completedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
              
              <div className="flex flex-col items-center space-y-4">
                <div className="text-5xl font-bold">{result.score}%</div>
                <Progress value={result.score} className="h-3 w-full max-w-xs" />
                <div className="flex items-center gap-2">
                  <span className="text-sm">Passing Score: {test.passingPercentage}%</span>
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    isPassed 
                      ? 'bg-success/10 text-success' 
                      : 'bg-destructive/10 text-destructive'
                  }`}>
                    {isPassed ? 'PASSED' : 'FAILED'}
                  </span>
                </div>
              </div>
            </div>
            
            <div className="grid gap-4 md:grid-cols-3 mt-8">
              <Card className="bg-muted/30">
                <CardContent className="p-4 text-center">
                  <h4 className="font-medium">Total Questions</h4>
                  <p className="text-2xl font-semibold mt-1">{result.totalQuestions}</p>
                </CardContent>
              </Card>
              
              <Card className="bg-muted/30">
                <CardContent className="p-4 text-center">
                  <h4 className="font-medium">Correct Answers</h4>
                  <p className="text-2xl font-semibold mt-1">
                    {result.answers.filter(a => a.isCorrect).length}
                  </p>
                </CardContent>
              </Card>
              
              <Card className="bg-muted/30">
                <CardContent className="p-4 text-center">
                  <h4 className="font-medium">Incorrect Answers</h4>
                  <p className="text-2xl font-semibold mt-1">
                    {result.answers.filter(a => a.selectedOptionIndex !== null && !a.isCorrect).length}
                  </p>
                </CardContent>
              </Card>
            </div>
          </CardContent>
          <CardFooter className="flex flex-wrap gap-4 justify-center">
            <Button variant="outline" className="flex items-center gap-2" asChild>
              <a href="/">
                <Home className="h-4 w-4" />
                Return to Dashboard
              </a>
            </Button>
            <Button variant="outline" className="flex items-center gap-2">
              <Download className="h-4 w-4" />
              Download Result
            </Button>
            <Button variant="outline" className="flex items-center gap-2">
              <Share2 className="h-4 w-4" />
              Share Result
            </Button>
          </CardFooter>
        </Card>
        
        {/* Detailed questions and answers */}
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="all">All Questions</TabsTrigger>
            <TabsTrigger value="correct">Correct ({result.answers.filter(a => a.isCorrect).length})</TabsTrigger>
            <TabsTrigger value="incorrect">Incorrect ({result.answers.filter(a => a.selectedOptionIndex !== null && !a.isCorrect).length})</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="space-y-4 mt-4">
            {questions.map((question, index) => {
              const answer = result.answers.find(a => a.questionId === question.id);
              const isCorrect = answer?.isCorrect;
              const isAnswered = answer?.selectedOptionIndex !== null;
              
              return (
                <Card key={question.id} className="overflow-hidden">
                  <div className={`h-1 ${
                    isAnswered
                      ? isCorrect
                        ? 'bg-success'
                        : 'bg-destructive'
                      : 'bg-muted'
                  }`}></div>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <h3 className="font-medium">Question {index + 1}</h3>
                      {isAnswered && (
                        <div className={`flex items-center gap-1 ${
                          isCorrect 
                            ? 'text-success' 
                            : 'text-destructive'
                        }`}>
                          {isCorrect ? (
                            <>
                              <CheckCircle className="h-4 w-4" />
                              <span>Correct</span>
                            </>
                          ) : (
                            <>
                              <XCircle className="h-4 w-4" />
                              <span>Incorrect</span>
                            </>
                          )}
                        </div>
                      )}
                    </div>
                    
                    <p className="mb-4">{question.text}</p>
                    
                    <div className="space-y-2">
                      {question.options.map((option, optionIndex) => {
                        const isSelected = answer?.selectedOptionIndex === optionIndex;
                        const isCorrectOption = question.correctOptionIndex === optionIndex;
                        
                        let optionClass = '';
                        
                        if (isSelected && isCorrect) {
                          optionClass = 'test-option-correct';
                        } else if (isSelected && !isCorrect) {
                          optionClass = 'test-option-incorrect';
                        } else if (isAnswered && isCorrectOption) {
                          optionClass = 'test-option-correct';
                        }
                        
                        return (
                          <div
                            key={optionIndex}
                            className={`p-3 border rounded-md flex items-center ${optionClass}`}
                          >
                            <div className="w-6 h-6 rounded-full flex items-center justify-center border mr-3">
                              {String.fromCharCode(65 + optionIndex)}
                            </div>
                            <span>{option}</span>
                            
                            {isAnswered && (
                              <div className="ml-auto">
                                {isSelected && isCorrect && (
                                  <CheckCircle className="h-5 w-5 text-success" />
                                )}
                                {isSelected && !isCorrect && (
                                  <XCircle className="h-5 w-5 text-destructive" />
                                )}
                                {!isSelected && isCorrectOption && (
                                  <CheckCircle className="h-5 w-5 text-success" />
                                )}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </TabsContent>
          
          <TabsContent value="correct" className="space-y-4 mt-4">
            {questions.map((question, index) => {
              const answer = result.answers.find(a => a.questionId === question.id);
              if (!answer?.isCorrect) return null;
              
              return (
                <Card key={question.id} className="overflow-hidden">
                  <div className="h-1 bg-success"></div>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <h3 className="font-medium">Question {index + 1}</h3>
                      <div className="flex items-center gap-1 text-success">
                        <CheckCircle className="h-4 w-4" />
                        <span>Correct</span>
                      </div>
                    </div>
                    
                    <p className="mb-4">{question.text}</p>
                    
                    <div className="space-y-2">
                      {question.options.map((option, optionIndex) => {
                        const isSelected = answer.selectedOptionIndex === optionIndex;
                        
                        return (
                          <div
                            key={optionIndex}
                            className={`p-3 border rounded-md flex items-center ${
                              isSelected ? 'test-option-correct' : ''
                            }`}
                          >
                            <div className="w-6 h-6 rounded-full flex items-center justify-center border mr-3">
                              {String.fromCharCode(65 + optionIndex)}
                            </div>
                            <span>{option}</span>
                            
                            {isSelected && (
                              <CheckCircle className="h-5 w-5 text-success ml-auto" />
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </TabsContent>
          
          <TabsContent value="incorrect" className="space-y-4 mt-4">
            {questions.map((question, index) => {
              const answer = result.answers.find(a => a.questionId === question.id);
              if (answer?.isCorrect || answer?.selectedOptionIndex === null) return null;
              
              return (
                <Card key={question.id} className="overflow-hidden">
                  <div className="h-1 bg-destructive"></div>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <h3 className="font-medium">Question {index + 1}</h3>
                      <div className="flex items-center gap-1 text-destructive">
                        <XCircle className="h-4 w-4" />
                        <span>Incorrect</span>
                      </div>
                    </div>
                    
                    <p className="mb-4">{question.text}</p>
                    
                    <div className="space-y-2">
                      {question.options.map((option, optionIndex) => {
                        const isSelected = answer.selectedOptionIndex === optionIndex;
                        const isCorrectOption = question.correctOptionIndex === optionIndex;
                        
                        let optionClass = '';
                        
                        if (isSelected) {
                          optionClass = 'test-option-incorrect';
                        } else if (isCorrectOption) {
                          optionClass = 'test-option-correct';
                        }
                        
                        return (
                          <div
                            key={optionIndex}
                            className={`p-3 border rounded-md flex items-center ${optionClass}`}
                          >
                            <div className="w-6 h-6 rounded-full flex items-center justify-center border mr-3">
                              {String.fromCharCode(65 + optionIndex)}
                            </div>
                            <span>{option}</span>
                            
                            {isSelected && (
                              <XCircle className="h-5 w-5 text-destructive ml-auto" />
                            )}
                            {!isSelected && isCorrectOption && (
                              <CheckCircle className="h-5 w-5 text-success ml-auto" />
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default TestResult;
