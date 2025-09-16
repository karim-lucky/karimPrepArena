
"use client";
import { useState } from "react";
import { useTheme, Theme } from "@/app/lib/hooks/useTheme";
import { 
  Save, 
  Bell, 
  Eye, 
  EyeOff, 
  Mail, 
  Moon, 
  Sun, 
  RefreshCw,
  Lock,
  Globe,
  ThumbsUp,
  CheckCircle
} from "lucide-react";
 
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import { Badge } from "@/components/ui/badge";

const StudentSettings = () => {
  const { toast } = useToast();
  const [passwordValues, setPasswordValues] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  
  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    testReminders: true,
    resultNotifications: true,
    enrollmentUpdates: true,
    marketingEmails: false,
  });
  
  const { theme, setTheme } = useTheme();
  const [generalSettings, setGeneralSettings] = useState({
    language: "en",
    theme: theme,
    timeZone: "Asia/Karachi",
    showScoreInProfile: true,
    enableSoundEffects: true,
  });
  
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswordValues(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSavePassword = () => {
    if (passwordValues.newPassword !== passwordValues.confirmPassword) {
      toast({
        title: "Passwords don't match",
        description: "The new password and confirmation password must match.",
        variant: "destructive",
      });
      return;
    }
    
    if (passwordValues.newPassword.length < 8) {
      toast({
        title: "Password too short",
        description: "The password must be at least 8 characters long.",
        variant: "destructive",
      });
      return;
    }
    
    toast({
      title: "Password updated",
      description: "Your password has been successfully updated.",
    });
    
    setPasswordValues({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
  };
  
  const handleSaveSettings = () => {
    toast({
      title: "Settings saved",
      description: "Your settings have been successfully updated.",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground">
          Manage your account settings and preferences.
        </p>
      </div>
      
      <Tabs defaultValue="account">
        <TabsList className="mb-4">
          <TabsTrigger value="account">
            Account
          </TabsTrigger>
          <TabsTrigger value="notifications">
            Notifications
          </TabsTrigger>
          <TabsTrigger value="preferences">
            Preferences
          </TabsTrigger>
        </TabsList>
        
        {/* Account Tab */}
        <TabsContent value="account">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Change Password</CardTitle>
                <CardDescription>
                  Update your password to keep your account secure.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="currentPassword">Current Password</Label>
                  <div className="relative">
                    <Input 
                      id="currentPassword" 
                      name="currentPassword"
                      type="password" 
                      value={passwordValues.currentPassword}
                      onChange={handlePasswordChange}
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="newPassword">New Password</Label>
                  <div className="relative">
                    <Input 
                      id="newPassword" 
                      name="newPassword"
                      type="password" 
                      value={passwordValues.newPassword}
                      onChange={handlePasswordChange}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Password must be at least 8 characters long and include a mix of letters, numbers, and symbols.
                  </p>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm New Password</Label>
                  <div className="relative">
                    <Input 
                      id="confirmPassword" 
                      name="confirmPassword"
                      type="password" 
                      value={passwordValues.confirmPassword}
                      onChange={handlePasswordChange}
                    />
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={handleSavePassword}>
                  <Lock className="mr-2 h-4 w-4" />
                  Update Password
                </Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Connected Accounts</CardTitle>
                <CardDescription>
                  Manage accounts connected to your profile.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="bg-blue-500 text-white p-2 rounded-full">
                      <Mail className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-medium">Email</p>
                      <p className="text-sm text-muted-foreground">student@example.com</p>
                    </div>
                  </div>
                  <Badge className="bg-green-500 hover:bg-green-600 flex items-center">
                    <CheckCircle className="mr-1 h-3 w-3" />
                    Connected
                  </Badge>
                </div>
                
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="bg-gray-500 text-white p-2 rounded-full">
                      <Globe className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-medium">Google</p>
                      <p className="text-sm text-muted-foreground">Connect your Google account</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    Connect
                  </Button>
                </div>
                
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="bg-blue-700 text-white p-2 rounded-full">
                      <ThumbsUp className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-medium">Facebook</p>
                      <p className="text-sm text-muted-foreground">Connect your Facebook account</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    Connect
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Account Management</CardTitle>
                <CardDescription>
                  Manage your account data and settings.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 border rounded-md">
                  <h3 className="font-medium">Download Your Data</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Download a copy of your personal data including test results and activity.
                  </p>
                  <Button variant="outline" className="mt-3">
                    Request Data Export
                  </Button>
                </div>
                
                <div className="p-4 border rounded-md bg-destructive/10">
                  <h3 className="font-medium text-destructive">Delete Account</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Permanently delete your account and all associated data. This action cannot be undone.
                  </p>
                  <Button variant="destructive" className="mt-3">
                    Delete Account
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        {/* Notifications Tab */}
        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Email Notifications</CardTitle>
              <CardDescription>
                Manage the emails you receive from our platform.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="emailNotifications">All Email Notifications</Label>
                  <p className="text-sm text-muted-foreground">
                    Receive emails for all notifications (overrides individual settings)
                  </p>
                </div>
                <Switch 
                  id="emailNotifications"
                  checked={notificationSettings.emailNotifications}
                  onCheckedChange={(checked) => setNotificationSettings({...notificationSettings, emailNotifications: checked})}
                />
              </div>
              
              <Separator />
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="testReminders">Test Reminders</Label>
                  <p className="text-sm text-muted-foreground">
                    Receive reminders before your scheduled tests
                  </p>
                </div>
                <Switch 
                  id="testReminders"
                  checked={notificationSettings.testReminders}
                  onCheckedChange={(checked) => setNotificationSettings({...notificationSettings, testReminders: checked})}
                  disabled={!notificationSettings.emailNotifications}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="resultNotifications">Test Results</Label>
                  <p className="text-sm text-muted-foreground">
                    Receive notifications when your test results are available
                  </p>
                </div>
                <Switch 
                  id="resultNotifications"
                  checked={notificationSettings.resultNotifications}
                  onCheckedChange={(checked) => setNotificationSettings({...notificationSettings, resultNotifications: checked})}
                  disabled={!notificationSettings.emailNotifications}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="enrollmentUpdates">Enrollment Updates</Label>
                  <p className="text-sm text-muted-foreground">
                    Receive updates about your test enrollments and approvals
                  </p>
                </div>
                <Switch 
                  id="enrollmentUpdates"
                  checked={notificationSettings.enrollmentUpdates}
                  onCheckedChange={(checked) => setNotificationSettings({...notificationSettings, enrollmentUpdates: checked})}
                  disabled={!notificationSettings.emailNotifications}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="marketingEmails">Marketing Emails</Label>
                  <p className="text-sm text-muted-foreground">
                    Receive promotional emails about new tests and features
                  </p>
                </div>
                <Switch 
                  id="marketingEmails"
                  checked={notificationSettings.marketingEmails}
                  onCheckedChange={(checked) => setNotificationSettings({...notificationSettings, marketingEmails: checked})}
                  disabled={!notificationSettings.emailNotifications}
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSaveSettings}>
                <Save className="mr-2 h-4 w-4" />
                Save Notification Settings
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        {/* Preferences Tab */}
        <TabsContent value="preferences">
          <Card>
            <CardHeader>
              <CardTitle>General Preferences</CardTitle>
              <CardDescription>
                Customize your experience on the platform.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="language">Language</Label>
                  <Select 
                    value={generalSettings.language}
                    onValueChange={(value) => setGeneralSettings({...generalSettings, language: value})}
                  >
                    <SelectTrigger id="language">
                      <SelectValue placeholder="Select language" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="ur">Urdu</SelectItem>
                      <SelectItem value="pa">Punjabi</SelectItem>
                      <SelectItem value="sd">Sindhi</SelectItem>
                      <SelectItem value="ps">Pashto</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="theme">Theme</Label>
                  <Select 
                    value={generalSettings.theme}
                    onValueChange={(value) => {
                      setGeneralSettings({...generalSettings, theme: value as Theme});
                      setTheme(value as Theme);
                    }}
                  >
                    <SelectTrigger id="theme">
                      <SelectValue placeholder="Select theme" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="light">
                        <div className="flex items-center">
                          <Sun className="mr-2 h-4 w-4" />
                          <span>Light</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="dark">
                        <div className="flex items-center">
                          <Moon className="mr-2 h-4 w-4" />
                          <span>Dark</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="system">System</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="timeZone">Time Zone</Label>
                  <Select 
                    value={generalSettings.timeZone}
                    onValueChange={(value) => setGeneralSettings({...generalSettings, timeZone: value})}
                  >
                    <SelectTrigger id="timeZone">
                      <SelectValue placeholder="Select time zone" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Asia/Karachi">Pakistan (PKT)</SelectItem>
                      <SelectItem value="UTC">UTC</SelectItem>
                      <SelectItem value="America/New_York">Eastern Time (ET)</SelectItem>
                      <SelectItem value="America/Chicago">Central Time (CT)</SelectItem>
                      <SelectItem value="Europe/London">London (GMT)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Privacy Settings</h3>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="showScoreInProfile">Show Scores in Profile</Label>
                    <p className="text-sm text-muted-foreground">
                      Display your test scores on your public profile
                    </p>
                  </div>
                  <Switch 
                    id="showScoreInProfile"
                    checked={generalSettings.showScoreInProfile}
                    onCheckedChange={(checked) => setGeneralSettings({...generalSettings, showScoreInProfile: checked})}
                  />
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Accessibility Settings</h3>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="enableSoundEffects">Sound Effects</Label>
                    <p className="text-sm text-muted-foreground">
                      Enable sound effects for notifications and test interactions
                    </p>
                  </div>
                  <Switch 
                    id="enableSoundEffects"
                    checked={generalSettings.enableSoundEffects}
                    onCheckedChange={(checked) => setGeneralSettings({...generalSettings, enableSoundEffects: checked})}
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">
                <RefreshCw className="mr-2 h-4 w-4" />
                Reset to Defaults
              </Button>
              <Button onClick={handleSaveSettings}>
                <Save className="mr-2 h-4 w-4" />
                Save Preferences
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default StudentSettings;

