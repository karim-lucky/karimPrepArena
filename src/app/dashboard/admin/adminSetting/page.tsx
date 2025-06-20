"use client"
import { useState } from "react";
import { 
  Save, 
  RefreshCw, 
  Bell, 
  Mail, 
  Lock,
  AlarmClock,
  BarChart3,
  Calendar,
  Shield,
  CreditCard,
  CheckCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";

const AdminSettings = () => {
  const { toast } = useToast();
  const [generalSettings, setGeneralSettings] = useState({
    siteName: "Online Testing Platform",
    siteDescription: "A comprehensive platform for online tests and assessments",
    emailSender: "noreply@/apptestingplatform.com",
    defaultTimeZone: "Asia/Karachi",
    resultsAutoRelease: true,
    enableRegistration: true,
    maintenanceMode: false,
    debugMode: false,
  });
  
  const [testSettings, setTestSettings] = useState({
    defaultTestDuration: 60,
    allowTestPause: false,
    preventTabSwitching: true,
    randomizeQuestions: true,
    shuffleOptions: true,
    showResultsImmediately: true,
    defaultPassingPercentage: 70,
    allowRetakes: true,
    maxRetakeAttempts: 3,
  });
  
  const [notificationSettings, setNotificationSettings] = useState({
    emailOnRegistration: true,
    emailOnEnrollment: true,
    emailOnPayment: true,
    emailOnTestCompletion: true,
    emailOnTestReminder: true,
    adminNotifyOnRegistration: true,
    adminNotifyOnPayment: true,
    adminNotifyOnSupport: true,
  });
  
  const [paymentSettings, setPaymentSettings] = useState({
    currency: "PKR",
    defaultTestPrice: 300,
    paymentGateway: "stripe",
    testTax: 0,
    enablePromo: true,
    manualApproval: true,
  });
  
  const handleSaveSettings = () => {
    toast({
      title: "Settings saved",
      description: "Your settings have been successfully saved.",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground">
          Manage system settings and configurations.
        </p>
      </div>
      
      <Tabs defaultValue="general">
        <TabsList className="grid grid-cols-4 w-full">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="tests">Tests</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="payments">Payments</TabsTrigger>
        </TabsList>
        
        {/* General Settings Tab */}
        <TabsContent value="general">
          <Card>
            <CardHeader>
              <CardTitle>General Settings</CardTitle>
              <CardDescription>
                Configure basic system settings and preferences.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="siteName">Site Name</Label>
                  <Input 
                    id="siteName" 
                    value={generalSettings.siteName}
                    onChange={(e) => setGeneralSettings({...generalSettings, siteName: e.target.value})}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="siteDescription">Site Description</Label>
                  <Input 
                    id="siteDescription" 
                    value={generalSettings.siteDescription}
                    onChange={(e) => setGeneralSettings({...generalSettings, siteDescription: e.target.value})}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="emailSender">Email Sender</Label>
                  <Input 
                    id="emailSender" 
                    value={generalSettings.emailSender}
                    onChange={(e) => setGeneralSettings({...generalSettings, emailSender: e.target.value})}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="defaultTimeZone">Default Time Zone</Label>
                  <Select 
                    value={generalSettings.defaultTimeZone}
                    onValueChange={(value) => setGeneralSettings({...generalSettings, defaultTimeZone: value})}
                  >
                    <SelectTrigger id="defaultTimeZone">
                      <SelectValue placeholder="Select time zone" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Asia/Karachi">Pakistan (PKT)</SelectItem>
                      <SelectItem value="UTC">UTC</SelectItem>
                      <SelectItem value="America/New_York">Eastern Time (ET)</SelectItem>
                      <SelectItem value="America/Chicago">Central Time (CT)</SelectItem>
                      <SelectItem value="America/Denver">Mountain Time (MT)</SelectItem>
                      <SelectItem value="America/Los_Angeles">Pacific Time (PT)</SelectItem>
                      <SelectItem value="Europe/London">London (GMT)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-4">
                <h3 className="text-lg font-medium">System Preferences</h3>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="resultsAutoRelease">Automatic Results Release</Label>
                    <p className="text-sm text-muted-foreground">
                      Release test results automatically upon completion
                    </p>
                  </div>
                  <Switch 
                    id="resultsAutoRelease"
                    checked={generalSettings.resultsAutoRelease}
                    onCheckedChange={(checked) => setGeneralSettings({...generalSettings, resultsAutoRelease: checked})}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="enableRegistration">Public Registration</Label>
                    <p className="text-sm text-muted-foreground">
                      Allow students to register on the platform
                    </p>
                  </div>
                  <Switch 
                    id="enableRegistration"
                    checked={generalSettings.enableRegistration}
                    onCheckedChange={(checked) => setGeneralSettings({...generalSettings, enableRegistration: checked})}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="maintenanceMode">Maintenance Mode</Label>
                    <p className="text-sm text-muted-foreground">
                      Put the site in maintenance mode (only admins can access)
                    </p>
                  </div>
                  <Switch 
                    id="maintenanceMode"
                    checked={generalSettings.maintenanceMode}
                    onCheckedChange={(checked) => setGeneralSettings({...generalSettings, maintenanceMode: checked})}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="debugMode">Debug Mode</Label>
                    <p className="text-sm text-muted-foreground">
                      Enable debug mode for development and troubleshooting
                    </p>
                  </div>
                  <Switch 
                    id="debugMode"
                    checked={generalSettings.debugMode}
                    onCheckedChange={(checked) => setGeneralSettings({...generalSettings, debugMode: checked})}
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
                Save Changes
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        {/* Test Settings Tab */}
        <TabsContent value="tests">
          <Card>
            <CardHeader>
              <CardTitle>Test Settings</CardTitle>
              <CardDescription>
                Configure settings related to tests and assessments.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="defaultTestDuration">Default Test Duration (minutes)</Label>
                  <Input 
                    id="defaultTestDuration" 
                    type="number"
                    value={testSettings.defaultTestDuration}
                    onChange={(e) => setTestSettings({...testSettings, defaultTestDuration: parseInt(e.target.value)})}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="defaultPassingPercentage">Default Passing Percentage</Label>
                  <Input 
                    id="defaultPassingPercentage" 
                    type="number"
                    value={testSettings.defaultPassingPercentage}
                    onChange={(e) => setTestSettings({...testSettings, defaultPassingPercentage: parseInt(e.target.value)})}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="maxRetakeAttempts">Maximum Retake Attempts</Label>
                  <Input 
                    id="maxRetakeAttempts" 
                    type="number"
                    value={testSettings.maxRetakeAttempts}
                    onChange={(e) => setTestSettings({...testSettings, maxRetakeAttempts: parseInt(e.target.value)})}
                  />
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Test Behavior</h3>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="allowTestPause">Allow Test Pause</Label>
                    <p className="text-sm text-muted-foreground">
                      Allow students to pause tests and resume later
                    </p>
                  </div>
                  <Switch 
                    id="allowTestPause"
                    checked={testSettings.allowTestPause}
                    onCheckedChange={(checked) => setTestSettings({...testSettings, allowTestPause: checked})}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="preventTabSwitching">Prevent Tab Switching</Label>
                    <p className="text-sm text-muted-foreground">
                      Prevent students from switching tabs during tests
                    </p>
                  </div>
                  <Switch 
                    id="preventTabSwitching"
                    checked={testSettings.preventTabSwitching}
                    onCheckedChange={(checked) => setTestSettings({...testSettings, preventTabSwitching: checked})}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="randomizeQuestions">Randomize Questions</Label>
                    <p className="text-sm text-muted-foreground">
                      Randomize the order of questions for each student
                    </p>
                  </div>
                  <Switch 
                    id="randomizeQuestions"
                    checked={testSettings.randomizeQuestions}
                    onCheckedChange={(checked) => setTestSettings({...testSettings, randomizeQuestions: checked})}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="shuffleOptions">Shuffle Answer Options</Label>
                    <p className="text-sm text-muted-foreground">
                      Shuffle the order of answer options for each question
                    </p>
                  </div>
                  <Switch 
                    id="shuffleOptions"
                    checked={testSettings.shuffleOptions}
                    onCheckedChange={(checked) => setTestSettings({...testSettings, shuffleOptions: checked})}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="showResultsImmediately">Show Results Immediately</Label>
                    <p className="text-sm text-muted-foreground">
                      Show test results immediately after completion
                    </p>
                  </div>
                  <Switch 
                    id="showResultsImmediately"
                    checked={testSettings.showResultsImmediately}
                    onCheckedChange={(checked) => setTestSettings({...testSettings, showResultsImmediately: checked})}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="allowRetakes">Allow Test Retakes</Label>
                    <p className="text-sm text-muted-foreground">
                      Allow students to retake tests if they fail
                    </p>
                  </div>
                  <Switch 
                    id="allowRetakes"
                    checked={testSettings.allowRetakes}
                    onCheckedChange={(checked) => setTestSettings({...testSettings, allowRetakes: checked})}
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
                Save Changes
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        {/* Notification Settings Tab */}
        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Notification Settings</CardTitle>
              <CardDescription>
                Configure email and system notifications.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Student Notifications</h3>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="flex items-center">
                      <Mail className="h-4 w-4 mr-2" />
                      <Label htmlFor="emailOnRegistration">Registration Confirmation</Label>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Send email when a student registers
                    </p>
                  </div>
                  <Switch 
                    id="emailOnRegistration"
                    checked={notificationSettings.emailOnRegistration}
                    onCheckedChange={(checked) => setNotificationSettings({...notificationSettings, emailOnRegistration: checked})}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="flex items-center">
                      <CheckCircle className="h-4 w-4 mr-2" />
                      <Label htmlFor="emailOnEnrollment">Enrollment Confirmation</Label>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Send email when a student is enrolled in a test
                    </p>
                  </div>
                  <Switch 
                    id="emailOnEnrollment"
                    checked={notificationSettings.emailOnEnrollment}
                    onCheckedChange={(checked) => setNotificationSettings({...notificationSettings, emailOnEnrollment: checked})}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="flex items-center">
                      <CreditCard className="h-4 w-4 mr-2" />
                      <Label htmlFor="emailOnPayment">Payment Confirmation</Label>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Send email when a payment is processed
                    </p>
                  </div>
                  <Switch 
                    id="emailOnPayment"
                    checked={notificationSettings.emailOnPayment}
                    onCheckedChange={(checked) => setNotificationSettings({...notificationSettings, emailOnPayment: checked})}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="flex items-center">
                      <BarChart3 className="h-4 w-4 mr-2" />
                      <Label htmlFor="emailOnTestCompletion">Test Results</Label>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Send email with test results after completion
                    </p>
                  </div>
                  <Switch 
                    id="emailOnTestCompletion"
                    checked={notificationSettings.emailOnTestCompletion}
                    onCheckedChange={(checked) => setNotificationSettings({...notificationSettings, emailOnTestCompletion: checked})}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="flex items-center">
                      <AlarmClock className="h-4 w-4 mr-2" />
                      <Label htmlFor="emailOnTestReminder">Test Reminders</Label>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Send reminder emails before scheduled tests
                    </p>
                  </div>
                  <Switch 
                    id="emailOnTestReminder"
                    checked={notificationSettings.emailOnTestReminder}
                    onCheckedChange={(checked) => setNotificationSettings({...notificationSettings, emailOnTestReminder: checked})}
                  />
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Admin Notifications</h3>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="flex items-center">
                      <Bell className="h-4 w-4 mr-2" />
                      <Label htmlFor="adminNotifyOnRegistration">New Registrations</Label>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Notify admins when new students register
                    </p>
                  </div>
                  <Switch 
                    id="adminNotifyOnRegistration"
                    checked={notificationSettings.adminNotifyOnRegistration}
                    onCheckedChange={(checked) => setNotificationSettings({...notificationSettings, adminNotifyOnRegistration: checked})}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="flex items-center">
                      <Bell className="h-4 w-4 mr-2" />
                      <Label htmlFor="adminNotifyOnPayment">New Payments</Label>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Notify admins when payments are processed
                    </p>
                  </div>
                  <Switch 
                    id="adminNotifyOnPayment"
                    checked={notificationSettings.adminNotifyOnPayment}
                    onCheckedChange={(checked) => setNotificationSettings({...notificationSettings, adminNotifyOnPayment: checked})}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="flex items-center">
                      <Bell className="h-4 w-4 mr-2" />
                      <Label htmlFor="adminNotifyOnSupport">Support Requests</Label>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Notify admins when students submit support requests
                    </p>
                  </div>
                  <Switch 
                    id="adminNotifyOnSupport"
                    checked={notificationSettings.adminNotifyOnSupport}
                    onCheckedChange={(checked) => setNotificationSettings({...notificationSettings, adminNotifyOnSupport: checked})}
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
                Save Changes
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        {/* Payment Settings Tab */}
        <TabsContent value="payments">
          <Card>
            <CardHeader>
              <CardTitle>Payment Settings</CardTitle>
              <CardDescription>
                Configure payment methods and preferences.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="currency">Currency</Label>
                  <Select 
                    value={paymentSettings.currency}
                    onValueChange={(value) => setPaymentSettings({...paymentSettings, currency: value})}
                  >
                    <SelectTrigger id="currency">
                      <SelectValue placeholder="Select currency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="PKR">Pakistani Rupee (PKR)</SelectItem>
                      <SelectItem value="USD">US Dollar (USD)</SelectItem>
                      <SelectItem value="EUR">Euro (EUR)</SelectItem>
                      <SelectItem value="GBP">British Pound (GBP)</SelectItem>
                      <SelectItem value="INR">Indian Rupee (INR)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="defaultTestPrice">Default Test Price</Label>
                  <Input 
                    id="defaultTestPrice" 
                    type="number"
                    value={paymentSettings.defaultTestPrice}
                    onChange={(e) => setPaymentSettings({...paymentSettings, defaultTestPrice: parseInt(e.target.value)})}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="paymentGateway">Payment Gateway</Label>
                  <Select 
                    value={paymentSettings.paymentGateway}
                    onValueChange={(value) => setPaymentSettings({...paymentSettings, paymentGateway: value})}
                  >
                    <SelectTrigger id="paymentGateway">
                      <SelectValue placeholder="Select payment gateway" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="stripe">Stripe</SelectItem>
                      <SelectItem value="paypal">PayPal</SelectItem>
                      <SelectItem value="easypaisa">EasyPaisa</SelectItem>
                      <SelectItem value="jazzcash">JazzCash</SelectItem>
                      <SelectItem value="manual">Manual (Bank Transfer)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="testTax">Tax Percentage (%)</Label>
                  <Input 
                    id="testTax" 
                    type="number"
                    value={paymentSettings.testTax}
                    onChange={(e) => setPaymentSettings({...paymentSettings, testTax: parseInt(e.target.value)})}
                  />
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Payment Preferences</h3>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="flex items-center">
                      <CreditCard className="h-4 w-4 mr-2" />
                      <Label htmlFor="manualApproval">Manual Payment Approval</Label>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Require manual approval for payments
                    </p>
                  </div>
                  <Switch 
                    id="manualApproval"
                    checked={paymentSettings.manualApproval}
                    onCheckedChange={(checked) => setPaymentSettings({...paymentSettings, manualApproval: checked})}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-2" />
                      <Label htmlFor="enablePromo">Enable Promotional Codes</Label>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Allow the use of promotional codes for discounts
                    </p>
                  </div>
                  <Switch 
                    id="enablePromo"
                    checked={paymentSettings.enablePromo}
                    onCheckedChange={(checked) => setPaymentSettings({...paymentSettings, enablePromo: checked})}
                  />
                </div>
              </div>
              
              <Separator />
              
              <div className="p-4 border rounded-md bg-amber-50">
                <div className="flex items-start gap-3">
                  <Shield className="h-5 w-5 text-amber-600 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-amber-800">Payment Security</h4>
                    <p className="text-sm text-amber-700 mt-1">
                      This is a demo system with mock payment processing. In a production environment, 
                      ensure secure payment processing with SSL certificates and PCI DSS compliance.
                    </p>
                  </div>
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
                Save Changes
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminSettings;
