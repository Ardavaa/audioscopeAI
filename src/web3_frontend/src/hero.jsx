import { useEffect } from "react";
import './index.css';

import Nav from './nav';

export default function Hero() {
  return (   
    <body>
      <div 
      className="w-full min-h-screen bg-[url('/assets/bg.png')] bg-cover bg-center flex flex-col items-center"
    >
      <Nav />
      <section  id="hero" className="text-center mt-38">
        <h1 className="text-7xl font-[600] max-w-5xl text-gray-900 font-aeonik tracking-wider">
          Detect Lung Diseases with <br /> AI-Powered Audio Analysis
        </h1>
        <p className="text-gray-600 mt-8 text-2xl tracking-wide max-w-4xl mx-auto text-opacity-0">
          Simply record your cough or breathing sound and let AI detect potential lung diseases in seconds.
        </p>
        <div className="flex justify-center">
          <button className="mt-6 bg-[#54B2B0] border-white/60 text-white px-6 py-3 rounded-full hover:bg-[#7ad2d0] transition flex">
            Start Diagnosis <img src="/assets/sparkles.png" alt="sparkles" className="ml-2" />
          </button>
        </div>
      </section>
    </div>
    <section id="col1"
    className="w-full min-h-screen bg-white bg-cover bg-center flex flex-col items-center px-18"
    >
      <h3 className="text-[#4EA2A1] px-5 py-3 mt-32 bg-[#F0FBFB] rounded-full border-2 border-[#4EA2A1]">
        How this works
      </h3>
      <div className="text-center">
        <h2 className="mt-12 text-5xl tracking-wide">
          From Your Breath to Your Health Insights
        </h2>
        <p className="mt-8 text-2xl text-gray-500 ">
          Using advanced sound analysis, we help you understand your lung condition with just a simple recording
        </p>
      </div>
      <div className="grid lg:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-7 mt-22 px-4">
        <div className="flex flex-col space-y-3 p-4">
          <img 
            src="/assets/icons/microphone-2.png" 
            alt="mic" 
            className="w-14 h-14 rounded-xl bg-[#F0FBFB] p-3"
          />
          <p className="text-xl text-gray-800">
            Respiratory Sound Input
          </p>
          <p className="text-gray-600 text-lg">
            Upload your respiratory sound (breathing or coughs)
          </p>
        </div>

        <div className="flex flex-col space-y-3 p-4">
          <img 
            src="/assets/icons/voice.png" 
            alt="mic" 
            className="w-14 h-14 rounded-xl bg-[#F0FBFB] p-3"
          />
          <p className="text-xl text-gray-800">
            AI-Powered Analysis
          </p>
          <p className="text-gray-600 text-lg">
            AI processes the sound patterns to detect potential lung abnormalities
          </p>
        </div>

        <div className="flex flex-col space-y-3 p-4">
          <img 
            src="/assets/icons/graph.png" 
            alt="mic" 
            className="w-14 h-14 rounded-xl bg-[#F0FBFB] p-3"
          />
          <p className="text-xl text-gray-800">
            Visualized Diagnosis
          </p>
          <p className="text-gray-600 text-lg">
            AI analyzes respiratory patterns for abnormalities
          </p>
        </div>

        <div className="flex flex-col space-y-3 p-4">
          <img 
            src="/assets/icons/clipboard-tick.png" 
            alt="mic" 
            className="w-14 h-14 rounded-xl bg-[#F0FBFB] p-3"
          />
          <p className="text-xl text-gray-800">
            Diagnosis Summary
          </p>
          <p className="text-gray-600 text-lg">
            Get an explanation of the detected disease based on AI predictions.
          </p>
        </div>
      </div>

    </section>
    <section id="col2"
    className="w-full min-h-screen bg-white bg-cover bg-center flex flex-col items-center px-18"
    >
      <h3 className="text-[#4EA2A1] px-5 py-3 mt-4 bg-[#F0FBFB] rounded-full border-2 border-[#4EA2A1]">
          Disease Categories
      </h3>
      <div className="text-center">
        <h2 className="mt-12 text-5xl tracking-wide">
          What We Analyze
        </h2>
        <p className="mt-8 text-2xl text-gray-500 ">
          Here are the possible categories of results you may receive after analysis
        </p>
      </div>
      <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6 mt-16 px-6">
  
        {/* Card 1 */}
        <div className="flex flex-col space-y-3 p-10 py-16 bg-[#F0FBFB] rounded-xl shadow-md">
          <img src="/assets/icons/Healthy Lungs Pic.png" alt="Healthy" className="w-12 h-12" />
          <p className="text-lg font-semibold text-gray-800">Healthy</p>
          <p className="text-gray-600 text-md">
            Lungs are functioning normally with no signs of respiratory issues
          </p>
        </div>

        {/* Card 2 */}
        <div className="flex flex-col space-y-3 p-10 py-16 bg-[#F0FBFB] rounded-xl shadow-md">
          <img src="/assets/icons/pneumonia 1.png" alt="Pneumonia" className="w-12 h-12" />
          <p className="text-lg font-semibold text-gray-800">Pneumonia</p>
          <p className="text-gray-600 text-md">
            A lung infection causing inflammation, cough, and breathing issues
          </p>
        </div>

        {/* Card 3 */}
        <div className="flex flex-col space-y-3 p-10 py-16 bg-[#F0FBFB] rounded-xl shadow-md">
          <img src="/assets/icons/bronchitis 1.png" alt="Bronchiolitis" className="w-12 h-12" />
          <p className="text-lg font-semibold text-gray-800">Bronchiolitis</p>
          <p className="text-gray-600 text-md">
            An infection inflaming small lung airways, mostly in young children
          </p>
        </div>

        {/* Card 4 */}
        <div className="flex flex-col space-y-3 p-10 py-16 bg-[#F0FBFB] rounded-xl shadow-md">
          <img src="/assets/icons/bronchiectasis 1.png" alt="Bronchiectasis" className="w-12 h-12" />
          <p className="text-lg font-semibold text-gray-800">Bronchiectasis</p>
          <p className="text-gray-600 text-md">
            Widened airways cause mucus buildup and recurring infections
          </p>
        </div>

        {/* Card 5 */}
        <div className="flex flex-col space-y-3 p-10 py-16 bg-[#F0FBFB] rounded-xl shadow-md">
          <img src="/assets/icons/cold 1.png" alt="URTI" className="w-12 h-12" />
          <p className="text-lg font-semibold text-gray-800">
            URTI (Upper Respiratory Tract Infection)
          </p>
          <p className="text-gray-600 text-md">
            An infection affecting the nose, throat, and airways, often caused by viruses
          </p>
        </div>

        {/* Card 6 */}
        <div className="flex flex-col space-y-3 p-10 py-16 bg-[#F0FBFB] rounded-xl shadow-md">
          <img src="/assets/icons/difficulty-breathing 1.png" alt="COPD" className="w-12 h-12" />
          <p className="text-lg font-semibold text-gray-800">
            COPD (Chronic Obstructive Pulmonary Disease)
          </p>
          <p className="text-gray-600 text-md">
            A lung disease that blocks airflow and makes breathing difficult
          </p>
        </div>

      </div>

    </section>
    <section id="banner"
    className="w-full min-h-7/12 bg-white bg-cover bg-center flex flex-col items-center px-18"
    >
     <div class="mt-44 w-[97%] h-48 rounded-xl bg-gradient-to-br from-white via-[#adebf0] to-white flex items-center justify-center text-center shadow-lg">
      <div className="my-32">
        <h2 class="text-3xl text-gray-900">Stay Ahead of Lung Disease</h2>
        <p class="text-gray-500">Try now for an early detection</p>
        <button class="mt-4 px-6 py-2 bg-[#7fc8d6] text-white rounded-full shadow-md hover:bg-[#6bb5c4] transition">
          Start Diagnosis ✨
        </button>
      </div>
    </div>

    </section>
    </body>
  );
}
