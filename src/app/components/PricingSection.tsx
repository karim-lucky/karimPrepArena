
 "use client"
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { Check } from "lucide-react";

const PricingSection = () => {
  const router =useRouter()
  
  return (
    <section id="pricing" className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Simple, Affordable Pricing</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Invest in your future with our comprehensive test preparation platform.
          </p>
        </div>
        
        <div className="max-w-5xl mx-auto flex flex-col lg:flex-row gap-8 items-center">
          <div className="w-full lg:w-1/2 bg-gray-50 rounded-xl overflow-hidden shadow-lg transition-transform duration-300 hover:scale-105">
            <div className="bg-amber-500 p-6 text-white text-center">
              <h3 className="text-2xl font-bold">Monthly Access</h3>
              <p className="mt-2 opacity-90">Access all features for one month</p>
            </div>
            
            <div className="p-8">
              <div className="text-center mb-8">
                <p className="text-4xl font-bold">$300</p>
                <p className="text-gray-600 mt-1">One-time payment</p>
              </div>
              
              <ul className="space-y-4 mb-8">
                <li className="flex items-start">
                  <span className="bg-amber-500/10 p-1 rounded-full mr-3 mt-1">
                    <Check className="h-4 w-4 text-primary" />
                  </span>
                  <span>Full access to all practice tests</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-amber-500/10 p-1 rounded-full mr-3 mt-1">
                    <Check className="h-4 w-4 text-primary" />
                  </span>
                  <span>Detailed performance analytics</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-amber-500/10 p-1 rounded-full mr-3 mt-1">
                    <Check className="h-4 w-4 text-primary" />
                  </span>
                  <span>Weekly and monthly assessments</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-amber-500/10 p-1 rounded-full mr-3 mt-1">
                    <Check className="h-4 w-4 text-primary" />
                  </span>
                  <span>Personalized study recommendations</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-amber-500/10 p-1 rounded-full mr-3 mt-1">
                    <Check className="h-4 w-4 text-primary" />
                  </span>
                  <span>Eligibility for awards and recognition</span>
                </li>
              </ul>
              
              <Button 
                className="w-full bg-amber-500 hover:bg-amber-500-hover text-white py-6"
                onClick={() => router.push("/register")}
              >
                Get Started Now
              </Button>
            </div>
          </div>
          
          <div className="w-full lg:w-1/2 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-8">
            <h3 className="text-2xl font-bold mb-6">Frequently Asked Questions</h3>
            
            <div className="space-y-6">
              <div>
                <h4 className="font-semibold text-lg mb-2">What's included in the fee?</h4>
                <p className="text-gray-600">Your $300 fee gives you full access to all platform features for one month, including all practice tests, performance analytics, and the opportunity to participate in regular assessments.</p>
              </div>
              
              <div>
                <h4 className="font-semibold text-lg mb-2">How many tests can I take?</h4>
                <p className="text-gray-600">You can take unlimited practice tests during your subscription period, including topic-specific tests and full-length mock exams.</p>
              </div>
              
              <div>
                <h4 className="font-semibold text-lg mb-2">What types of tests are available?</h4>
                <p className="text-gray-600">We offer comprehensive tests for MDCAT and other competitive exams, covering all subjects and topics according to the latest exam patterns.</p>
              </div>
              
              <div>
                <h4 className="font-semibold text-lg mb-2">How do I track my progress?</h4>
                <p className="text-gray-600">Your personal dashboard displays your performance metrics, improvement trends, and study recommendations based on your test results.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
