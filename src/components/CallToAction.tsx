"use client"
// import { useNavigate } from "react-router-dom";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { ArrowRight } from "lucide-react";

const CallToAction = () => {
  // const navigate = useNavigate();
  let router=useRouter();
  return (
    <section className="py-16 md:py-24 bg-amber-500 relative overflow-hidden">
      {/* Background Graphics */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
        <div className="absolute top-1/4 left-0 w-40 h-40 bg-white opacity-5 rounded-full"></div>
        <div className="absolute bottom-1/3 right-1/4 w-64 h-64 bg-white opacity-5 rounded-full"></div>
        <div className="absolute top-1/2 right-0 w-40 h-40 bg-white opacity-5 rounded-full"></div>
      </div>
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Transform Your Test Preparation?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Join thousands of successful students who have improved their scores and achieved their academic goals with TestPrep Arena.
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Button 
              className="bg-white text-primary hover:bg-gray-100 text-lg py-6 px-8"
              onClick={() => router.push("/register")}
            >
              Register Now <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button 
              variant="outline" 
              className="border-white text-white hover:bg-white/10 text-lg py-6 px-8"
              onClick={() => router.push("/about")}
            >
              Learn More
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
