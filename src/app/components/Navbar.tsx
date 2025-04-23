"use client"
import { useState } from "react";
 
 import { Button } from "./ui/button";
import { Menu, X } from "lucide-react";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-white shadow-sm py-4 sticky top-0 z-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <span 
              className="text-2xl font-bold text-amber-500 cursor-pointer"
              onClick={() => router.push("/")}
            >
            KairmPrep Arena

            </span>
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="/#features" className="text-gray-700 hover:text-green-600 transition-colors">Features</a>
            <a href="/#testimonials" className="text-gray-700 hover:text-green-600 transition-colors">Testimonials</a>
            <a href="/#pricing" className="text-gray-700 hover:text-green-600 transition-colors">Pricing</a>
            <Button 




// dfdfdd


variant="outline" 
              className="border-green-500 text-primary hover:bg-green-500 hover:text-white"
              onClick={() => router.push("/login")}
            >
              Log In
              


              
            </Button>
            <Button 
              className="bg-green-500 hover:bg-green-700 text-white"
              onClick={() => router.push("/register")}
            >
              Register
            </Button>
          </div>
          
          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={toggleMenu} className="text-gray-700">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
        
        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden mt-4 pb-4">
            <div className="flex flex-col space-y-4">
              <a href="/#features" className="text-gray-700 hover:text-primary transition-colors py-2">Features</a>
              <a href="/#testimonials" className="text-gray-700 hover:text-primary transition-colors py-2">Testimonials</a>
              <a href="/#pricing" className="text-gray-700 hover:text-primary transition-colors py-2">Pricing</a>
              <Button 
                variant="outline" 
                className="border-primary text-primary hover:bg-primary hover:text-white w-full"
                onClick={() => router.push("/login")}
              >
                Log In
              </Button>
              <Button 
                className="bg-primary hover:bg-primary-hover text-white w-full"
                onClick={() => router.push("/register")}
              >
                Register
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
