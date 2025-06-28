"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import {
  Search,
  Filter,
  Mail,
  BadgeCheck,
  Ban,
  FileText,
  User,
  MoreHorizontal,
  UserPlus,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Pagination from "@/components/pagination";
import { useRouter } from "next/navigation";
import ActionDropdown from "@/components/students/ActionDropdown";

export interface Student {
  _id: string;
  name: string;
  email: string;
  passwordHash: string;
  phone: string;
  profileImage: string;
  educationLevel: string;
  targetExams: string[];
  preferences: {
    notification: boolean;
    darkMode: boolean;
  };
  role: "student" | string;
  emailVerified: boolean;
  createdAt: string;
  __v: number;
}

const studentsPerPage = 5;

const AdminStudents = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalStudents, setTotalStudents] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const fetchStudents = async (page: number, search: string) => {
    try {
      setLoading(true);
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/user/getAll`, {
        params: {
          page,
          limit: studentsPerPage,
          search,
        },
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });

      setStudents(response.data.data); // assuming response.data.data = students[]
      setTotalStudents(response.data.total); // assuming response.data.total = total count
    } catch (error) {
      console.error("Failed to fetch students:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents(currentPage, searchQuery);
  }, [currentPage, searchQuery]);

  const totalPages = Math.ceil(totalStudents / studentsPerPage);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Students</h1>
        <p className="text-muted-foreground">Manage all registered students and their information.</p>
      </div>

      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search students..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => {
              setCurrentPage(1); // reset to first page on new search
              setSearchQuery(e.target.value);
            }}
          />
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
          <Button onClick={() => router.push("/dashboard/student/AddStudents")} variant="outline">
            <UserPlus className="h-4 w-4 mr-2" />
            Add Student
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Students</CardTitle>
          <CardDescription>View and manage all registered students.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Student</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Registration Date</TableHead>
                  <TableHead>Tests Taken</TableHead>
                  <TableHead>Average Score</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {!loading && students.length > 0 ? (
                  students.map((student) => (
                    <TableRow key={student._id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar>
                            <AvatarImage
                              src={
                                student.profileImage ||
                                `https://ui-avatars.com/api/?name=${encodeURIComponent(student.name)}&background=0D8ABC&color=fff`
                              }
                              alt={student.name}
                              onError={(e) => {
                                (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(student.name)}&background=0D8ABC&color=fff`;
                              }}
                            />

                            <AvatarFallback>{student.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{student.name}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{student.email}</TableCell>
                      <TableCell>{new Date(student.createdAt).toLocaleDateString()}</TableCell>
                      <TableCell>—</TableCell>
                      <TableCell>
                        <Badge className="bg-yellow-500 hover:bg-yellow-600">Pending</Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <ActionDropdown />
                      </TableCell>
                    </TableRow>
                  ))
                ) : loading ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-6">
                      Loading students...
                    </TableCell>
                  </TableRow>
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-6">
                      No students found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
    </div>
  );
};

export default AdminStudents;
