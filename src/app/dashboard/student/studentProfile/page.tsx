
"use client";
import { useState } from "react";
import { 
  User, 
  Mail, 
  Calendar, 
  Award, 
  FileText, 
  Clock, 
  Edit, 
  Save, 
  Upload,
  CheckCircle,
  Shield
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/app/lib/auth-context";

const StudentProfile = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: "03001234567",
    address: "123 Main Street, Lahore, Pakistan",
    education: "BSc Computer Science",
    institution: "Punjab University",
    bio: "I am a student preparing for medical entrance exams. I am dedicated to achieving high scores and pursuing a career in medicine.",
  });
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProfileData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSaveProfile = () => {
    setIsEditing(false);
    toast({
      title: "Profile updated",
      description: "Your profile has been successfully updated.",
    });
  };
  
  // Mock user stats
  const userStats = {
    testsCompleted: 12,
    averageScore: 85,
    highestScore: 95,
    testsPassed: 10,
    testsFailed: 2,
    enrollments: 15,
    achievements: 7,
  };
  
  // Mock recent activity
  const recentActivity = [
    {
      id: "1",
      action: "Completed a test",
      testName: "MDCAT Practice Test - Biology",
      date: "2023-06-15T10:30:00",
      score: 92,
    },
    {
      id: "2",
      action: "Enrolled in a test",
      testName: "MDCAT Practice Test - Chemistry",
      date: "2023-06-12T14:45:00",
    },
    {
      id: "3",
      action: "Earned an achievement",
      achievementName: "Test Ace",
      date: "2023-06-10T09:15:00",
    },
    {
      id: "4",
      action: "Made a payment",
      testName: "MDCAT Full Mock Test",
      date: "2023-06-08T16:20:00",
      amount: 300,
    },
    {
      id: "5",
      action: "Completed a test",
      testName: "MDCAT Practice Test - Physics",
      date: "2023-06-05T11:10:00",
      score: 78,
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">My Profile</h1>
        <p className="text-muted-foreground">
          View and manage your personal information and test performance.
        </p>
      </div>
      
      <Tabs defaultValue="profile">
        <TabsList className="mb-4">
          <TabsTrigger value="profile">
            Profile
          </TabsTrigger>
          <TabsTrigger value="stats">
            Statistics
          </TabsTrigger>
          <TabsTrigger value="activity">
            Activity
          </TabsTrigger>
        </TabsList>
        
        {/* Profile Tab */}
        <TabsContent value="profile">
          <div className="grid gap-6 md:grid-cols-2">
            <Card className="md:col-span-2">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Personal Information</CardTitle>
                  <CardDescription>
                    Manage your personal details and profile information.
                  </CardDescription>
                </div>
                <Button 
                  variant={isEditing ? "default" : "outline"}
                  onClick={() => isEditing ? handleSaveProfile() : setIsEditing(true)}
                >
                  {isEditing ? (
                    <>
                      <Save className="mr-2 h-4 w-4" />
                      Save Changes
                    </>
                  ) : (
                    <>
                      <Edit className="mr-2 h-4 w-4" />
                      Edit Profile
                    </>
                  )}
                </Button>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="flex flex-col items-center space-y-3">
                    <Avatar className="h-28 w-28">
                      <AvatarImage src={user?.profileImage} alt={user?.name} />
                      <AvatarFallback className="text-xl">{user?.name?.charAt(0) || "U"}</AvatarFallback>
                    </Avatar>
                    {isEditing && (
                      <Button variant="outline" className="w-full">
                        <Upload className="mr-2 h-4 w-4" />
                        Upload Photo
                      </Button>
                    )}
                    <div className="flex flex-col items-center text-center">
                      <h3 className="font-medium text-lg">{user?.name}</h3>
                      <p className="text-sm text-muted-foreground">{user?.email}</p>
                      <Badge className="mt-2">Student</Badge>
                    </div>
                  </div>
                  
                  <div className="flex-1 space-y-4">
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input 
                          id="name" 
                          name="name" 
                          value={profileData.name} 
                          onChange={handleInputChange} 
                          disabled={!isEditing} 
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input 
                          id="email" 
                          name="email" 
                          value={profileData.email} 
                          onChange={handleInputChange} 
                          disabled={true} 
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone</Label>
                        <Input 
                          id="phone" 
                          name="phone" 
                          value={profileData.phone} 
                          onChange={handleInputChange} 
                          disabled={!isEditing} 
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="address">Address</Label>
                        <Input 
                          id="address" 
                          name="address" 
                          value={profileData.address} 
                          onChange={handleInputChange} 
                          disabled={!isEditing} 
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="education">Education</Label>
                        <Input 
                          id="education" 
                          name="education" 
                          value={profileData.education} 
                          onChange={handleInputChange} 
                          disabled={!isEditing} 
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="institution">Institution</Label>
                        <Input 
                          id="institution" 
                          name="institution" 
                          value={profileData.institution} 
                          onChange={handleInputChange} 
                          disabled={!isEditing} 
                        />
                      </div>
                      <div className="space-y-2 md:col-span-2">
                        <Label htmlFor="bio">Bio</Label>
                        <Textarea 
                          id="bio" 
                          name="bio" 
                          value={profileData.bio} 
                          onChange={handleInputChange} 
                          disabled={!isEditing} 
                          className="min-h-[100px]"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Account Information</CardTitle>
                <CardDescription>
                  Manage your account details and preferences.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Shield className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="font-medium">Account Status</p>
                      <p className="text-sm text-muted-foreground">Your account is active</p>
                    </div>
                  </div>
                  <Badge className="bg-green-500 hover:bg-green-600">Active</Badge>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="font-medium">Email Verification</p>
                      <p className="text-sm text-muted-foreground">Your email has been verified</p>
                    </div>
                  </div>
                  <Badge className="bg-green-500 hover:bg-green-600">Verified</Badge>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="font-medium">Joined Date</p>
                      <p className="text-sm text-muted-foreground">When you created your account</p>
                    </div>
                  </div>
                  <span className="text-sm">{new Date(user?.createdAt || Date.now()).toLocaleDateString()}</span>
                </div>
                
                <Separator />
                
                <div className="pt-2">
                  <p className="font-medium">Account Actions</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-3">
                    <Button variant="outline">
                      Change Password
                    </Button>
                    <Button variant="outline" className="text-destructive hover:text-destructive">
                      Delete Account
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Upcoming Tests</CardTitle>
                <CardDescription>
                  Tests you're enrolled in that are coming up.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="bg-primary/10 p-3 rounded-lg">
                    <div className="flex justify-between items-center">
                      <h4 className="font-medium">MDCAT Full Mock Test</h4>
                      <Badge variant="outline" className="bg-primary/10 text-primary border-primary/30">
                        Tomorrow
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      A comprehensive mock test covering all MDCAT subjects
                    </p>
                    <div className="flex items-center justify-between mt-3 text-sm">
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1 text-muted-foreground" />
                        <span>June 20, 2023</span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1 text-muted-foreground" />
                        <span>180 min</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-3 rounded-lg border">
                    <div className="flex justify-between items-center">
                      <h4 className="font-medium">Physics Advanced Concepts</h4>
                      <Badge variant="outline">3 days left</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      Advanced physics concepts important for MDCAT
                    </p>
                    <div className="flex items-center justify-between mt-3 text-sm">
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1 text-muted-foreground" />
                        <span>June 23, 2023</span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1 text-muted-foreground" />
                        <span>90 min</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-3 rounded-lg border">
                    <div className="flex justify-between items-center">
                      <h4 className="font-medium">Chemistry Core Concepts</h4>
                      <Badge variant="outline">5 days left</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      Essential chemistry concepts for entrance exams
                    </p>
                    <div className="flex items-center justify-between mt-3 text-sm">
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1 text-muted-foreground" />
                        <span>June 25, 2023</span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1 text-muted-foreground" />
                        <span>120 min</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  View All Enrollments
                </Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>
        
        {/* Statistics Tab */}
        <TabsContent value="stats">
          <div className="grid gap-6 md:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Tests Completed</CardTitle>
                <FileText className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{userStats.testsCompleted}</div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Average Score</CardTitle>
                <CheckCircle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{userStats.averageScore}%</div>
                <Progress value={userStats.averageScore} className="h-2 mt-2" />
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Highest Score</CardTitle>
                <Award className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{userStats.highestScore}%</div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Pass Rate</CardTitle>
                <CheckCircle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {userStats.testsCompleted 
                    ? Math.round((userStats.testsPassed / userStats.testsCompleted) * 100) 
                    : 0}%
                </div>
              </CardContent>
            </Card>
            
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Test Performance</CardTitle>
                <CardDescription>
                  Your performance in different test categories.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium">Biology</span>
                      <span className="text-sm">92%</span>
                    </div>
                    <Progress value={92} className="h-2" />
                  </div>
                  
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium">Chemistry</span>
                      <span className="text-sm">85%</span>
                    </div>
                    <Progress value={85} className="h-2" />
                  </div>
                  
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium">Physics</span>
                      <span className="text-sm">78%</span>
                    </div>
                    <Progress value={78} className="h-2" />
                  </div>
                  
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium">English</span>
                      <span className="text-sm">90%</span>
                    </div>
                    <Progress value={90} className="h-2" />
                  </div>
                  
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium">Mathematics</span>
                      <span className="text-sm">82%</span>
                    </div>
                    <Progress value={82} className="h-2" />
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Test Completion Timeline</CardTitle>
                <CardDescription>
                  Your test completion over time.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[200px] flex items-center justify-center">
                  <p className="text-muted-foreground">
                    Timeline chart would go here (Recharts component)
                  </p>
                </div>
              </CardContent>
            </Card>
            
            <Card className="md:col-span-4">
              <CardHeader>
                <CardTitle>Recent Test Results</CardTitle>
                <CardDescription>
                  Your most recent test performances.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Test Name</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Score</TableHead>
                        <TableHead>Duration</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell className="font-medium">MDCAT Practice Test - Biology</TableCell>
                        <TableCell>June 15, 2023</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <span className="font-medium">92%</span>
                            <Badge className="bg-green-500 hover:bg-green-600">Excellent</Badge>
                          </div>
                        </TableCell>
                        <TableCell>75 min</TableCell>
                        <TableCell>
                          <Badge className="bg-green-500 hover:bg-green-600">Passed</Badge>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">MDCAT Practice Test - Physics</TableCell>
                        <TableCell>June 5, 2023</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <span className="font-medium">78%</span>
                            <Badge className="bg-primary">Good</Badge>
                          </div>
                        </TableCell>
                        <TableCell>68 min</TableCell>
                        <TableCell>
                          <Badge className="bg-green-500 hover:bg-green-600">Passed</Badge>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">MDCAT Practice Test - Chemistry</TableCell>
                        <TableCell>May 28, 2023</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <span className="font-medium">65%</span>
                            <Badge variant="outline">Average</Badge>
                          </div>
                        </TableCell>
                        <TableCell>82 min</TableCell>
                        <TableCell>
                          <Badge variant="outline">Passed</Badge>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">MDCAT Practice Test - English</TableCell>
                        <TableCell>May 20, 2023</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <span className="font-medium">90%</span>
                            <Badge className="bg-green-500 hover:bg-green-600">Excellent</Badge>
                          </div>
                        </TableCell>
                        <TableCell>45 min</TableCell>
                        <TableCell>
                          <Badge className="bg-green-500 hover:bg-green-600">Passed</Badge>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">MDCAT Practice Test - Mathematics</TableCell>
                        <TableCell>May 15, 2023</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <span className="font-medium">58%</span>
                            <Badge variant="destructive">Needs Improvement</Badge>
                          </div>
                        </TableCell>
                        <TableCell>90 min</TableCell>
                        <TableCell>
                          <Badge variant="destructive">Failed</Badge>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        {/* Activity Tab */}
        <TabsContent value="activity">
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>
                Your recent activities on the platform.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                {recentActivity.map((activity, index) => (
                  <div key={activity.id} className="relative pl-6">
                    {index < recentActivity.length - 1 && (
                      <div className="absolute left-2 top-2 h-full w-px bg-border" />
                    )}
                    <div className="absolute left-0 top-2 h-4 w-4 rounded-full bg-primary" />
                    <div className="space-y-1">
                      <div className="flex items-center justify-between">
                        <p className="font-medium">{activity.action}</p>
                        <p className="text-sm text-muted-foreground">
                          {new Date(activity.date).toLocaleString()}
                        </p>
                      </div>
                      
                      {activity.testName && (
                        <p className="text-sm">
                          Test: <span className="font-medium">{activity.testName}</span>
                        </p>
                      )}
                      
                      {activity.achievementName && (
                        <p className="text-sm">
                          Achievement: <span className="font-medium">{activity.achievementName}</span>
                        </p>
                      )}
                      
                      {activity.score !== undefined && (
                        <p className="text-sm">
                          Score: <span className="font-medium">{activity.score}%</span>
                        </p>
                      )}
                      
                      {activity.amount !== undefined && (
                        <p className="text-sm">
                          Amount: <span className="font-medium">Rs. {activity.amount}</span>
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default StudentProfile;
