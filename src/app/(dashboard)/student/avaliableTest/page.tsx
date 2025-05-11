"use client"
import { useState, useEffect } from "react";
 
import { 
  Search, 
  Filter, 
  Calendar, 
  Clock, 
  ArrowRight, 
  FileText,
  Tag,
  AlertCircle
} from "lucide-react";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Badge } from "@/app/components/ui/badge";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/app/components/ui/card";
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
import { mockTests } from "@/app/lib/mockData";
import { toast } from "@/app/components/ui/use-toast";

const AvailableTests = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState("all");
  
  // Get all unique categories
  const categories = ["all", ...new Set(mockTests.map(test => test.category))];
  
  // Filter tests by status (only active tests)
  let filteredTests = mockTests.filter(test => test.isActive);
  
  // Filter by date
  if (dateFilter === "upcoming") {
    filteredTests = filteredTests.filter(test => new Date(test.startDate) > new Date());
  } else if (dateFilter === "current") {
    const now = new Date();
    filteredTests = filteredTests.filter(
      test => new Date(test.startDate) <= now && new Date(test.endDate) >= now
    );
  }
  
  // Filter by category
  if (categoryFilter !== "all") {
    filteredTests = filteredTests.filter(test => test.category === categoryFilter);
  }
  
  // Search filter
  if (searchQuery) {
    filteredTests = filteredTests.filter(
      test => 
        test.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        test.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }

  // const handleViewDetails = (testId) => {
  //   toast({
  //     title: "Test details opened",
  //     description: "You are viewing the details for this test.",
  //   });
  // };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Available Tests</h1>
        <p className="text-muted-foreground">
          Browse and enroll in upcoming tests to improve your skills.
        </p>
      </div>
      
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div className="flex flex-wrap gap-2">
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search tests..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map(category => (
                <SelectItem key={category} value={category}>
                  {category === "all" ? "All Categories" : category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={dateFilter} onValueChange={setDateFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by date" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Dates</SelectItem>
              <SelectItem value="upcoming">Upcoming Tests</SelectItem>
              <SelectItem value="current">Currently Active</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <Tabs defaultValue="grid" className="w-full">
        <div className="flex justify-between items-center">
          <TabsList className="mb-4">
            <TabsTrigger value="grid">
              <div className="flex items-center">
                Grid View
              </div>
            </TabsTrigger>
            <TabsTrigger value="list">
              <div className="flex items-center">
                List View
              </div>
            </TabsTrigger>
          </TabsList>
          
          <div className="text-sm text-muted-foreground">
            {filteredTests.length} tests found
          </div>
        </div>
        
        <TabsContent value="grid" className="w-full">
          {filteredTests.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTests.map((test) => (
                <Card key={test.id} className="overflow-hidden hover:shadow-md transition-shadow">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <CardTitle className="line-clamp-1">{test.title}</CardTitle>
                    </div>
                    <CardDescription>
  <span className="flex flex-wrap items-center gap-2 mt-1 text-xs">
    <Badge variant="outline" className="bg-primary/10 text-primary border-primary/30">
      {test.category}
    </Badge>
    <span className="flex items-center">
      <Clock className="h-3 w-3 mr-1 text-muted-foreground" />
      <span>{test.duration} min</span>
    </span>
    <span className="flex items-center">
      <Calendar className="h-3 w-3 mr-1 text-muted-foreground" />
      <span>{new Date(test.startDate).toLocaleDateString()}</span>
    </span>
  </span>
</CardDescription>

                  </CardHeader>
                  <CardContent>
                    <p className="text-sm line-clamp-3">{test.description}</p>
                    
                    <div className="mt-4 space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Questions:</span>
                        <span className="font-medium">{test.totalQuestions}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Passing Score:</span>
                        <span className="font-medium">{test.passingPercentage}%</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Registration Fee:</span>
                        <span className="font-medium">Rs. {test.price}</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline" asChild>
                      <a href={`/test/${test.id}`} 
                      // onClick={() => handleViewDetails(test.id)}
                      >
                        <FileText className="mr-2 h-4 w-4" />
                        Details
                      </a>
                    </Button>
                    <Button asChild>
                      <a href={`/testDetail/${test.id}`}>
                        Enroll Now
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </a>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 border rounded-md">
              <FileText className="mx-auto h-12 w-12 text-muted-foreground" />
              <h3 className="mt-4 text-lg font-medium">No tests found</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                No available tests match your search criteria.
              </p>
              <Button className="mt-4" onClick={() => {
                setSearchQuery("");
                setCategoryFilter("all");
                setDateFilter("all");
              }}>
                Clear Filters
              </Button>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="list" className="w-full">
          {filteredTests.length > 0 ? (
            <div className="space-y-4">
              {filteredTests.map((test) => (
                <Card key={test.id} className="overflow-hidden hover:shadow-md transition-shadow">
                  <div className="flex flex-col md:flex-row">
                    <div className="flex-1 p-4">
                      <div className="flex flex-col h-full">
                        <div>
                          <h3 className="text-lg font-semibold">{test.title}</h3>
                          <div className="flex items-center gap-2 mt-1 text-xs">
                            <Badge variant="outline" className="bg-primary/10 text-primary border-primary/30">
                              {test.category}
                            </Badge>
                            <div className="flex items-center">
                              <Clock className="h-3 w-3 mr-1 text-muted-foreground" />
                              <span>{test.duration} min</span>
                            </div>
                            <div className="flex items-center">
                              <Calendar className="h-3 w-3 mr-1 text-muted-foreground" />
                              <span>{new Date(test.startDate).toLocaleDateString()}</span>
                            </div>
                          </div>
                        </div>
                        <p className="text-sm mt-2 line-clamp-2">{test.description}</p>
                      </div>
                    </div>
                    <div className="flex flex-row md:flex-col justify-between items-center p-4 border-t md:border-t-0 md:border-l bg-muted/30">
                      <div className="text-center">
                        <div className="text-sm text-muted-foreground">Fee</div>
                        <div className="font-semibold">Rs. {test.price}</div>
                      </div>
                      <div className="flex gap-2 mt-4">
                        <Button variant="outline" size="sm" asChild>
                          <a href={`/test/${test.id}`}>
                            <FileText className="mr-2 h-4 w-4" />
                            Details
                          </a>
                        </Button>
                        <Button size="sm" asChild>
                          <a href={`/testDetail/${test.id}`}>
                            Enroll
                          </a>
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 border rounded-md">
              <FileText className="mx-auto h-12 w-12 text-muted-foreground" />
              <h3 className="mt-4 text-lg font-medium">No tests found</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                No available tests match your search criteria.
              </p>
              <Button className="mt-4" onClick={() => {
                setSearchQuery("");
                setCategoryFilter("all");
                setDateFilter("all");
              }}>
                Clear Filters
              </Button>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AvailableTests;
