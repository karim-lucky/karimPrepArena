"use client"
 import { useRouter } from "next/navigation";
 
import { Button } from "./ui/button";
import { ArrowRight, Award, Clock, BarChart3 } from "lucide-react";

const HeroSection = () => {
 const router = useRouter()
  
  return (
    <div className="bg-gradient-to-b from-white to-gray-50 py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
              Ace Your Exams with
               <span className="text-amber-500 ps-2">karimPrep Arena</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Prepare for competitive exams like MDCAT with our comprehensive practice tests, performance analytics, and personalized learning paths.
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <Button 
                className="bg-amber-600 hover:bg-amber-700 text-white text-lg py-6 px-8"
                onClick={() => router.push("/register")}
              >
                Get Started <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button 
                variant="outline" 
                className="border-primary text-primary hover:bg-amber-600 hover:text-white text-lg py-6 px-8"
                onClick={() => router.push("/tests")}
              >
                Browse Tests
              </Button>
            </div>
            
            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center">
                <div className="bg-amber-100 p-3 rounded-full mr-4">
                  <Clock className="h-6 w-6 text-red-500" />
                </div>
                <div>
                  <h3 className="font-semibold">Timed Tests</h3>
                  <p className="text-sm text-gray-600">Realistic exam environment</p>
                </div>
              </div>
              <div className="flex items-center">
                <div className="bg-amber-100 p-3 rounded-full mr-4">
                  <BarChart3 className="h-6 w-6 text-red-500" />
                </div>
                <div>
                  <h3 className="font-semibold">Progress Tracking</h3>
                  <p className="text-sm text-gray-600">Monitor your improvement</p>
                </div>
              </div>
              <div className="flex items-center">
                <div className="bg-amber-100 p-3 rounded-full mr-4">
                  <Award className="h-6 w-6 text-red-500" />
                </div>
                <div>
                  <h3 className="font-semibold">Top Performers</h3>
                  <p className="text-sm text-gray-600">Rewards for excellence</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="relative">
            <div className="bg-white rounded-lg shadow-xl overflow-hidden">
              <div className="bg-amber-500 p-4">
                <h3 className="text-white font-bold text-xl">MDCAT Practice Test</h3>
              </div>
              <div className="p-6">
                <div className="mb-6">
                  <p className="font-medium mb-2">Question 1 of 20</p>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div className="bg-green-600 h-2.5 rounded-full" style={{ width: '5%' }}></div>
                  </div>
                </div>
                
                <div className="mb-6">
                  <h4 className="text-lg font-medium mb-4">Which of the following best describes the function of mitochondria in a cell?</h4>
                  <div className="space-y-3">
                    <div className="flex items-center p-3 border border-gray-200 rounded-lg hover:border-primary cursor-pointer">
                      <div className="h-5 w-5 rounded-full border-2 border-gray-300 mr-3"></div>
                      <span>Protein synthesis</span>
                    </div>
                    <div className="flex items-center p-3 border border-primary bg-green-600 rounded-lg">
                      <div className="h-5 w-5 rounded-full border-2 border-primary bg-primary mr-3"></div>
                      <span className="font-medium">Energy production (ATP)</span>
                    </div>
                    <div className="flex items-center p-3 border border-gray-200 rounded-lg hover:border-primary cursor-pointer">
                      <div className="h-5 w-5 rounded-full border-2 border-gray-300 mr-3"></div>
                      <span>Cell division</span>
                    </div>
                    <div className="flex items-center p-3 border border-gray-200 rounded-lg hover:border-primary cursor-pointer">
                      <div className="h-5 w-5 rounded-full border-2 border-gray-300 mr-3"></div>
                      <span>Lipid synthesis</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-between items-center">
                  <div className="flex items-center text-gray-500">
                    <Clock className="h-5 w-5 mr-2" />
                    <span>25:30 remaining</span>
                  </div>
                  <Button className="bg-primary hover:bg-primary-hover text-white">
                    Next Question
                  </Button>
                </div>
              </div>
            </div>
            
            <div className="absolute -bottom-4 -right-4 -z-10 bg-primary/20 rounded-lg w-full h-full"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
