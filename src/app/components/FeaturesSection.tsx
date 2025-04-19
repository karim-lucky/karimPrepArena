
import { 
  Clock, 
  BarChart2, 
  Award, 
  FileText, 
  UserCheck, 
  Zap,
  Settings,
  Calendar,
  Database
} from "lucide-react";

const FeaturesSection = () => {
  const features = [
    {
      icon: <Clock className="h-10 w-10 text-amber-600" />,
      title: "Timed Tests",
      description: "Practice with realistic time constraints to build exam readiness and time management skills."
    },
    {
      icon: <BarChart2 className="h-10 w-10 text-amber-600" />,
      title: "Performance Analytics",
      description: "Detailed insights into your strengths and weaknesses to focus your study efforts effectively."
    },
    {
      icon: <FileText className="h-10 w-10 text-amber-600" />,
      title: "Test Archives",
      description: "Access your past test attempts anytime to review and learn from your mistakes."
    },
    {
      icon: <UserCheck className="h-10 w-10 text-amber-600" />,
      title: "Personalized Learning",
      description: "Customized study recommendations based on your performance patterns."
    },
    {
      icon: <Award className="h-10 w-10 text-amber-600" />,
      title: "Rewards & Recognition",
      description: "Earn badges and appear on leaderboards when you excel in practice tests."
    },
    {
      icon: <Zap className="h-10 w-10 text-amber-600" />,
      title: "Instant Grading",
      description: "Get immediate feedback on your answers to accelerate your learning process."
    },
    {
      icon: <Calendar className="h-10 w-10 text-amber-600" />,
      title: "Regular Assessments",
      description: "Weekly and monthly tests to ensure consistent progress tracking and improvement."
    },
    {
      icon: <Settings className="h-10 w-10 text-amber-600" />,
      title: "Customizable Tests",
      description: "Create your own practice tests by selecting specific topics and difficulty levels."
    },
    {
      icon: <Database className="h-10 w-10 text-amber-600" />,
      title: "Extensive Question Bank",
      description: "Thousands of practice questions covering all the topics in competitive exams like MDCAT."
    }
  ];

  return (
    <section id="features" className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose TestPrep Arena?</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our platform offers everything you need to succeed in your competitive exams.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-gray-50 rounded-lg p-8 transition-all duration-300 hover:shadow-lg hover:scale-105">
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
