

"use client";
import { useState } from "react";
import { 
  Bell, 
  Menu, 
  X, 
  ChevronDown, 
  User, 
  LogOut, 
  Settings
} from "lucide-react";
import { Button } from "../components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import { useAuth } from "../lib/auth-context";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";
import { Separator } from "../components/ui/separator";
import { 
  Sheet, 
  SheetContent, 
  SheetTrigger, 
  SheetClose 
} from "../components/ui/sheet";
import { Badge } from "../components/ui/badge";
import { getUserNotifications } from "../lib/mockData";

interface NavbarProps {
  minimal?: boolean;
}

const Navbar = ({ minimal = false }: NavbarProps) => {
  const { user, logout, isAuthenticated } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const notifications = user ? getUserNotifications(user.id) : [];
  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <a href="/" className="flex items-center space-x-2">
            <div className="relative w-8 h-8 overflow-hidden rounded-full bg-primary">
              <div className="absolute inset-0 flex items-center justify-center text-primary-foreground font-bold">TP</div>
            </div>
            <span className="font-bold text-xl hidden md:inline-block">Test Platform</span>
          </a>
        </div>

        {!minimal && (
        <div className="hidden md:flex gap-6 items-center space-x-8">
          
          <a href="/#features" className="text-gray-700 hover:text-green-600 transition-colors">Features</a>
          <a href="/#testimonials" className="text-gray-700 hover:text-green-600 transition-colors">Testimonials</a>
          <a href="/#pricing" className="text-gray-700 hover:text-green-600 transition-colors">Pricing</a>
           
          </div>
        )}

        <div className="flex  bg- white items-center gap-4">
          {isAuthenticated ? (
            <>
              {!minimal && (
                <div className="hidden bg-white md:flex items-center gap-4">
                  <DropdownMenu >
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="relative">
                        <Bell className="h-5 w-5" />
                        {unreadCount > 0 && (
                          <Badge 
                            variant="destructive" 
                            className="absolute -top-1 -right-1 w-5 h-5 p-0 flex items-center justify-center text-xs"
                          >
                            {unreadCount}
                          </Badge>
                        )}
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-80">
                      <DropdownMenuLabel>Notifications</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      {notifications.length > 0 ? (
                        <div className="max-h-[300px] overflow-auto">
                          {notifications.map((notification) => (
                            <DropdownMenuItem key={notification.id} className="cursor-pointer">
                              <div className="flex flex-col gap-1 py-1">
                                <div className="flex items-center justify-between">
                                  <span className="font-medium">{notification.title}</span>
                                  {!notification.read && (
                                    <Badge variant="secondary" className="ml-2">New</Badge>
                                  )}
                                </div>
                                <p className="text-sm text-muted-foreground">{notification.message}</p>
                                <span className="text-xs text-muted-foreground">
                                  {new Date(notification.createdAt).toLocaleDateString()}
                                </span>
                              </div>
                            </DropdownMenuItem>
                          ))}
                        </div>
                      ) : (
                        <div className="py-4 text-center text-muted-foreground">
                          No notifications
                        </div>
                      )}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              )}

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={user?.profileImage} alt={user?.name} />
                      <AvatarFallback>{user?.name?.charAt(0) || "U"}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">{user?.name}</p>
                      <p className="text-xs leading-none text-muted-foreground">
                        {user?.email}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <DropdownMenuItem>
                      <User className="mr-2 h-4 w-4" />
                      <a href="/profile">Profile</a>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Settings className="mr-2 h-4 w-4" />
                      <a href="/settings">Settings</a>
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={logout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <div className="hidden md:flex items-center gap-4">
              <a href="/login">
                <Button variant="ghost">Login</Button>
              </a>
              <a href="/register">
                <Button>Sign Up</Button>
              </a>
            </div>
          )}

          {/* Mobile menu button */}
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] bg-white sm:w-[400px]">
              <div className="px-2">
                <div className="flex items-center justify-between">
                  <a href="/" className="flex items-center" onClick={() => setMobileMenuOpen(false)}>
                    <div className="relative w-8 h-8 overflow-hidden rounded-full bg-primary">
                      <div className="absolute inset-0 flex items-center justify-center text-primary-foreground font-bold">TP</div>
                    </div>
                    <span className="ml-2 font-bold text-xl">Testing Platform</span>
                  </a>
                  <SheetClose asChild>
                    <Button variant="ghost" size="icon">
                      <X className="h-5 w-5" />
                    </Button>
                  </SheetClose>
                </div>

                <div className="mt-8 flex flex-col gap-4">
                  {isAuthenticated && (
                    <div className="flex items-center gap-4 p-4 rounded-lg border">
                      <Avatar>
                        <AvatarImage src={user?.profileImage} />
                        <AvatarFallback>{user?.name?.charAt(0) || "U"}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{user?.name}</p>
                        <p className="text-sm text-muted-foreground">{user?.email}</p>
                      </div>
                    </div>
                  )}

                  <nav className="flex flex-col gap-3">
                    <a 
                      href="/" 
                      className="p-2 hover:bg-accent rounded-md transition-colors"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Home
                    </a>
                    <a 
                      href="/tests" 
                      className="p-2 hover:bg-accent rounded-md transition-colors"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Tests
                    </a>
                    <a 
                      href="/about" 
                      className="p-2 hover:bg-accent rounded-md transition-colors"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      About
                    </a>
                    <a 
                      href="/contact" 
                      className="p-2 hover:bg-accent rounded-md transition-colors"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Contact
                    </a>
                  </nav>

                  <Separator />

                  {isAuthenticated ? (
                    <div className="flex flex-col gap-3">
                      <a 
                        href="/profile" 
                        className="p-2 hover:bg-accent rounded-md transition-colors flex items-center gap-2"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <User className="h-4 w-4" />
                        Profile
                      </a>
                      <a 
                        href="/settings" 
                        className="p-2 hover:bg-accent rounded-md transition-colors flex items-center gap-2"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <Settings className="h-4 w-4" />
                        Settings
                      </a>
                      <button 
                        onClick={() => {
                          logout();
                          setMobileMenuOpen(false);
                        }}
                        className="p-2 hover:bg-accent rounded-md transition-colors flex items-center gap-2 w-full text-left"
                      >
                        <LogOut className="h-4 w-4" />
                        Log out
                      </button>
                    </div>
                  ) : (
                    <div className="flex flex-col gap-3">
                      <a href="/login" onClick={() => setMobileMenuOpen(false)}>
                        <Button variant="outline" className="w-full">Login</Button>
                      </a>
                      <a href="/register" onClick={() => setMobileMenuOpen(false)}>
                        <Button className="w-full">Sign Up</Button>
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
