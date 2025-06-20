"use client"
import { useState } from "react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Medical Student",
    image: "https://randomuser.me/api/portraits/women/1.jpg",
    content: "TestPrep Arena was instrumental in my MDCAT preparation. The timed tests and detailed analytics helped me identify my weak areas and improve systematically. I scored in the top 5% and got into my dream medical college!",
  },
  {
    id: 2,
    name: "Ahmed Khan",
    role: "Engineering Student",
    image: "https://randomuser.me/api/portraits/men/2.jpg",
    content: "The variety of practice tests and instant feedback mechanism on this platform made studying enjoyable. I could see my progress week by week, which kept me motivated throughout my preparation journey.",
  },
  {
    id: 3,
    name: "Fatima Zaidi",
    role: "Pre-Medical Student",
    image: "https://randomuser.me/api/portraits/women/3.jpg",
    content: "What sets TestPrep Arena apart is the realistic exam environment and the comprehensive performance reports. It was like having a personal tutor guiding me through the preparation process.",
  },
  {
    id: 4,
    name: "James Wilson",
    role: "Science Student",
    image: "https://randomuser.me/api/portraits/men/4.jpg",
    content: "The weekly tests on TestPrep Arena kept me accountable and consistent in my preparation. The leaderboard feature added a fun competitive element that pushed me to work harder.",
  },
];

const TestimonialsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  return (
    <section id="testimonials" className="py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Students Say</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Hear from students who transformed their test preparation with karimPrep Arena.
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          <div className="relative bg-white rounded-xl shadow-lg p-8 md:p-12">
            <div className="absolute top-0 left-0 transform -translate-x-1/2 -translate-y-1/2 bg-amber-500 rounded-full p-3">
              <Quote className="h-6 w-6 text-white" />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
              <div className="text-center md:text-left">
                <img
                  src={testimonials[currentIndex].image}
                  alt={testimonials[currentIndex].name}
                  className="w-24 h-24 rounded-full mx-auto md:mx-0 object-cover"
                />
                <h3 className="font-bold text-lg mt-4">{testimonials[currentIndex].name}</h3>
                <p className="text-gray-600">{testimonials[currentIndex].role}</p>
              </div>
              
              <div className="md:col-span-2">
                <p className="text-lg text-gray-700 italic mb-6">
                  "{testimonials[currentIndex].content}"
                </p>
                
                <div className="flex justify-end space-x-4">
                  <button
                    onClick={prevTestimonial}
                    className="p-2 rounded-full bg-gray-100 hover:bg-amber-500 hover:text-white transition-colors"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  <button
                    onClick={nextTestimonial}
                    className="p-2 rounded-full bg-gray-100 hover:bg-amber-500 hover:text-white transition-colors"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex justify-center mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`h-3 w-3 rounded-full mx-1 ${
                  currentIndex === index ? "bg-amber-500" : "bg-gray-300"
                }`}
                aria-label={`View testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
