"use client"
import { useState } from "react";
import { useForm } from "react-hook-form";
import { 
  FileText, 
  Plus, 
  Search, 
  Filter, 
  Edit, 
  Trash, 
  Eye 
} from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { mockTests } from "@/app/lib/mockData";
import { useRouter } from "next/navigation";
// import CreateTestModel from "@/components/admin/adminTest/CreateTestModel";

const AdminTests = () => {
  const [showForm, setShowForm] = useState(false);
  const [tests, setTests] = useState(mockTests);
  const [searchQuery, setSearchQuery] = useState("");
  
  const filteredTests = tests.filter(test => 
    test.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    test.category.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const handleDeleteTest = (id: string) => {
    if (confirm("Are you sure you want to delete this test?")) {
      setTests(tests.filter(test => test.id !== id));
    }
  };
  
  const toggleTestStatus = (id: string) => {
    setTests(tests.map(test => 
      test.id === id ? { ...test, isActive: !test.isActive } : test
    ));
  };
const router=useRouter()
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Manage Tests</h1>
        <p className="text-muted-foreground">
          Create, edit, and manage all tests in the system.
        </p>
      </div>
      
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search tests..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div>
  {/* Button to open the form */}
  <Button onClick={() =>router.push("/dashboard/admin/createTest") }>
    <Plus className="mr-2 h-4 w-4" /> Create New Test
  </Button>

  {/* Show form when button clicked */}
  
</div>

      
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>All Tests</CardTitle>
          <CardDescription>
            Manage and organize all tests available on the platform.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Duration</TableHead>
                  <TableHead>Start Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTests.length > 0 ? (
                  filteredTests.map((test) => (
                    <TableRow key={test.id}>
                      <TableCell className="font-medium">{test.title}</TableCell>
                      <TableCell>{test.category}</TableCell>
                      <TableCell>{test.duration} min</TableCell>
                      <TableCell>
                        {new Date(test.startDate).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={test.isActive ? "default" : "outline"}
                          className={test.isActive ? "bg-green-500 hover:bg-green-600" : ""}
                        >
                          {test.isActive ? "Active" : "Inactive"}
                        </Badge>
                      </TableCell>
                      <TableCell>Rs. {test.price}</TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <FileText className="h-4 w-4" />
                              <span className="sr-only">Open menu</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem asChild>
                              <Link to={`/admin/tests/${test.id}`}>
                                <Eye className="mr-2 h-4 w-4" />
                                <span>View Details</span>
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Edit className="mr-2 h-4 w-4" />
                              <span>Edit Test</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => toggleTestStatus(test.id)}>
                              {test.isActive ? (
                                <>
                                  <span className="mr-2">🔴</span>
                                  <span>Deactivate</span>
                                </>
                              ) : (
                                <>
                                  <span className="mr-2">🟢</span>
                                  <span>Activate</span>
                                </>
                              )}
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem 
                              className="text-destructive focus:text-destructive"
                              onClick={() => handleDeleteTest(test.id)}
                            >
                              <Trash className="mr-2 h-4 w-4" />
                              <span>Delete</span>
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={7} className="h-24 text-center">
                      No tests found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminTests;
