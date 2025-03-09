import React from 'react';
import { Card } from "@/components/ui/card";

const TimeSavingsUI = () => {
  const timeCards = [
    {
      hours: "Interactive ",
      color: "text-teal-500",
      title: "Real-time Query Responses"
    },
    {
      hours: "Analytical ",
      color: "text-blue-500",
      title: "Advanced Biomedical Data Analysis"
    },
    {
      hours: "Exploratory",
      color: "text-green-500",
      title: "In-Depth Drug Discovery Exploration"
    },
    {
      hours: "Automated",
      color: "text-purple-500",
      title: "Streamlined Research & Data Processing"
    },
    {
      hours: "UI",
      color: "text-yellow-500",
      title: "User-Friendly & Interactive Dashboard"
    },
    {
      hours: "Customized",
      color: "text-red-500",
      title: "Tailored Insights & Research Optimization"
    }
  ];

  return (
    <div id='efficiency' className="mx-auto px-4 py-16 bg-white">
      <div className="space-y-8 max-w-7xl mx-auto bg-[#F8F8F9] px-10 py-20 rounded-3xl">
        <div className="text-center space-y-4 pb-3">
          <h1 className="text-4xl md:text-5xl font-bold">
          Maximize Your AI-Powered Drug Discovery Efficiency
          </h1>
          <p className="text-gray-600 max-w-3xl mx-auto">
          Say goodbye to manual research! Our AI-driven drug discovery bot automates complex biomedical tasks, accelerating insights with intelligent automation.

</p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6 relative">
          <div className="hidden lg:block absolute w-full h-full">
            <div className="border-t-2 border-dashed border-teal-400 absolute top-[12%] left-[4%] w-[20%] transform -translate-y-1/2" style={{ borderRadius: '50%', height: '100px' }} />
            <div className="border-t-2 border-dashed border-indigo-400 absolute top-[12%] left-[40%] w-[20%] transform -translate-y-1/2" style={{ borderRadius: '50%', height: '100px' }} />
            <div className="border-t-2 border-dashed border-purple-400 absolute top-[12%] left-[73%] w-[20%] transform -translate-y-1/2" style={{ borderRadius: '50%', height: '100px' }} />
            <div className="border-b-2 border-dashed border-blue-400 absolute top-[90%] left-[23%] w-[20%] transform -translate-y-1/2" style={{ borderRadius: '50%', height: '100px' }} />
            <div className="border-b-2 border-dashed border-yellow-400 absolute top-[90%] left-[58%] w-[20%] transform -translate-y-1/2" style={{ borderRadius: '50%', height: '100px' }} />
          </div>

          {timeCards.map((card, index) => (
            <Card key={index} className="p-5 flex flex-col md:flex-row items-center text-center bg-white shadow-sm hover:shadow-md transition-shadow">
              <p className="text-sm font-semibold text-gray-600 flex flex-col">
                <span className={`${card.color} font-bold text-lg md:text-md mr-2 mb-2 md:mb-0`}>
                  {card.hours}
                </span>
                {card.title}
              </p>
            </Card>
          ))}
        </div>

        {/* Footer Text */}
        <div className="text-center pt-5">
          <p className="text-emerald-500 font-medium">
          Eliminate manual effort with our AI Drug Discovery Agent!          </p>
        </div>
      </div>
    </div>
  );
};

export default TimeSavingsUI;
