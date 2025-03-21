import React from 'react';
import Image from 'next/image';

const SmartHomeUI = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-yellow-200 to-purple-400">
      <div className="flex space-x-8">
        {/* Left Phone UI */}
        <div className="relative bg-white bg-opacity-30 backdrop-blur-md rounded-3xl shadow-lg p-4 w-80">
          {/* Menu Icon */}
          <div className="flex justify-start mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-gray-700"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </div>

          {/* Energy Consumption Header */}
          <div className="text-xs text-gray-700 mb-2">
            Energy Consumption
            <div className="text-[8px]">00:15 pm | 16 min</div>
          </div>

          {/* Profile Image */}
          <div className="absolute top-4 right-4">
            <img
              src="https://randomuser.me/api/portraits/men/1.jpg"
              alt="Profile"
              className="rounded-full w-6 h-6"
            />
          </div>

          {/* Your Rooms */}
          <div className="font-semibold text-gray-800 mb-2">Your Rooms</div>

          {/* Room Buttons (Placeholder) */}
          <div className="grid grid-cols-1 gap-2 mb-4">
            {/* Replace icons with actual room icons */}
            <button className="bg-white bg-opacity-30 hover:bg-opacity-50 backdrop-blur-md rounded-xl shadow-md p-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-blue-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0a1 1 0 01-1-1v-4a1 1 0 00-1-1h-2a1 1 0 00-1 1v4a1 1 0 011 1m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1"
                />
              </svg>
            </button>
            <button className="bg-white bg-opacity-70 hover:bg-opacity-50 backdrop-blur-md rounded-xl shadow-md p-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-blue-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                />
              </svg>
            </button>
            <button className="bg-white bg-opacity-30 hover:bg-opacity-50 backdrop-blur-md rounded-xl shadow-md p-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-blue-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
            <button className="bg-white bg-opacity-30 hover:bg-opacity-50 backdrop-blur-md rounded-xl shadow-md p-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-blue-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 13l-4 4m0 0l-4-4m4 4V6"
                />
              </svg>
            </button>
            <button className="bg-white bg-opacity-30 hover:bg-opacity-50 backdrop-blur-md rounded-xl shadow-md p-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-blue-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 17l5 5l5-5M9 7l5-5l5 5"
                />
              </svg>
            </button>
          </div>

          {/* Energy Circle */}
          <div className="relative w-full h-32 mb-4">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-3xl font-semibold text-blue-700">40Kwh</div>
            </div>
            <svg className="w-full h-full">
              <circle
                className="text-gray-300 stroke-current stroke-2"
                strokeWidth="4"
                fill="none"
                r="50"
                cx="50%"
                cy="50%"
              />
              <circle
                className="text-blue-500 stroke-current stroke-2"
                strokeWidth="4"
                strokeLinecap="round"
                fill="none"
                r="50"
                cx="50%"
                cy="50%"
                style={{
                  strokeDasharray: 314,
                  strokeDashoffset: 157, // Adjust this to control the fill amount
                }}
              />
            </svg>
            <div className="absolute bottom-1/4 left-1/2 transform -translate-x-1/2 text-sm text-gray-600">
              Cost: 560$
            </div>
          </div>

          {/* Room Image (Placeholder) */}
          <div className="rounded-xl overflow-hidden shadow-md mb-4">
            <Image
              src="https://images.unsplash.com/photo-1616530940355-a6b3100243a9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTh8fGludGVyaW9yJTIwZGVzaWdufGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
              alt="Room"
              width={320}
              height={200}
              objectFit="cover"
            />
          </div>

          {/* Bed Room Header */}
          <div className="flex items-center justify-between text-sm text-gray-700 mb-2">
            <div>Bed Room</div>
            <div>
              24°C{' '}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 inline-block"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
            </div>
          </div>

          {/* Appliances (Placeholder) */}
          <div className="grid grid-cols-3 gap-2 mb-4">
            {/* Replace icons with actual appliance icons */}
            <button className="bg-white bg-opacity-30 hover:bg-opacity-50 backdrop-blur-md rounded-xl shadow-md p-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-blue-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v8a2 2 0 100 4h14a2 2 0 100-4v-8m5 8v2m0-2L9 13m6 5v2m0-2L15 13"
                />
              </svg>
              <div>AC</div>
            </button>
            <button className="bg-white bg-opacity-30 hover:bg-opacity-50 backdrop-blur-md rounded-xl shadow-md p-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-blue-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                />
              </svg>
              <div>Camera</div>
            </button>
            <button className="bg-white bg-opacity-30 hover:bg-opacity-50 backdrop-blur-md rounded-xl shadow-md p-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-blue-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9.75 17L9 20l-1.311 2.388A1.5 1.5 0 016.762 21l-.65-1.312a1.5 1.5 0 00-2.621-.35L2 15.75l2.388-1.311A1.5 1.5 0 016.762 14l.65 1.312a1.5 1.5 0 002.621.35L9.75 17zM23 11h-4a2 2 0 00-2 2v6a2 2 0 002 2h4v-1.5a1.5 0 00-1.5-1.5H20v-1.5a1.5 0 00-1.5-1.5H20v-1.5a1.5 0 00-1.5-1.5H20V7a2 2 0 00-2-2h-3a2 2 0 00-2 2v6a2 2 0 002 2h3a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v6a2 2 0 002 2h3a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h3a2 2 0 002-2V5"
                />
              </svg>
              <div>TV</div>
            </button>
          </div>

          {/* Users (Placeholder) */}
          <div className="flex items-center space-x-2">
            <img
              src="https://randomuser.me/api/portraits/men/2.jpg"
              alt="User"
              className="rounded-full w-6 h-6"
            />
            <img
              src="https://randomuser.me/api/portraits/women/1.jpg"
              alt="User"
              className="rounded-full w-6 h-6"
            />
            <img
              src="https://randomuser.me/api/portraits/men/3.jpg"
              alt="User"
              className="rounded-full w-6 h-6"
            />
            <img
              src="https://randomuser.me/api/portraits/women/2.jpg"
              alt="User"
              className="rounded-full w-6 h-6"
            />
            {/* Add more user images as needed */}
          </div>
        </div>

        {/* Right Phone UI */}
        <div className="relative bg-white bg-opacity-30 backdrop-blur-md rounded-3xl shadow-lg p-4 w-80">
          {/* Living Room Header */}
          <div className="flex justify-between items-center mb-4">
            <div>
              <div className="font-semibold text-gray-800">Living Room</div>
              <div className="text-xs text-gray-700">
                00:15 pm | 18 Nov, Saturday
              </div>
            </div>
            <img
              src="https://randomuser.me/api/portraits/men/4.jpg"
              alt="Profile"
              className="rounded-full w-6 h-6"
            />
          </div>

          {/* Room Image (Placeholder) */}
          <div className="rounded-xl overflow-hidden shadow-md mb-4">
            <Image
              src="https://images.unsplash.com/photo-1567016546078-12f3295e17a9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8bGl2aW5nJTIwcm9vbXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"
              alt="Living Room"
              width={320}
              height={200}
              objectFit="cover"
            />
            {/* Add Icons over image in absolute position */}
            <div className="absolute top-4 left-4 flex flex-col gap-2">
              <button className="bg-white bg-opacity-30 hover:bg-opacity-50 backdrop-blur-md rounded-xl shadow-md p-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-blue-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 3v1m0 16v1m9-9h-1M3 12h1"
                  />
                </svg>
              </button>
              <button className="bg-white bg-opacity-30 hover:bg-opacity-50 backdrop-blur-md rounded-xl shadow-md p-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-blue-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m-15.356-2A8.001 8.001 0 0019.419 15m0 0h-4"
                  />
                </svg>
              </button>
              <button className="bg-white bg-opacity-30 hover:bg-opacity-50 backdrop-blur-md rounded-xl shadow-md p-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-blue-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0m-1.414-1.414c2.49-2.491 6.516-2.491 9.006 0M12 6v6.042m4.584 4.583a2.49 2.49 0 01-2.489 2.489H12.49a2.49 2.49 0 01-2.489-2.49v-5.741m4.584 4.583a2.49 2.49 0 01-2.49-2.489H12.49a2.49 2.49 0 01-2.489-2.49v-2.741m4.584 4.583a2.49 2.49 0 01-2.49-2.489H12.49a2.49 0 01-2.489-2.49V3"
                  />
                </svg>
              </button>
            </div>
          </div>

          {/* Bed Room Header */}
          <div className="flex items-center justify-between text-sm text-gray-700 mb-2">
            <div>Bed Room</div>
            <div>
              24°C{' '}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 inline-block"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
            </div>
          </div>

          {/* Appliances (Placeholder) */}
          <div className="grid grid-cols-4 gap-2 mb-4">
            {/* Replace icons with actual appliance icons */}
            <button className="bg-white bg-opacity-30 hover:bg-opacity-50 backdrop-blur-md rounded-xl shadow-md p-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-blue-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v8a2 2 0 100 4h14a2 2 0 100-4v-8m5 8v2m0-2L9 13m6 5v2m0-2L15 13"
                />
              </svg>
              <div>AC</div>
            </button>
            <button className="bg-white bg-opacity-30 hover:bg-opacity-50 backdrop-blur-md rounded-xl shadow-md p-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-blue-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                />
              </svg>
              <div>Camera</div>
            </button>
            <button className="bg-white bg-opacity-30 hover:bg-opacity-50 backdrop-blur-md rounded-xl shadow-md p-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-blue-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9.75 17L9 20l-1.311 2.388A1.5 1.5 0 016.762 21l-.65-1.312a1.5 1.5 0 00-2.621-.35L2 15.75l2.388-1.311A1.5 1.5 0 016.762 14l.65 1.312a1.5 1.5 0 002.621.35L9.75 17zM23 11h-4a2 2 0 00-2 2v6a2 2 0 002 2h4v-1.5a1.5 0 00-1.5-1.5H20v-1.5a1.5 0 00-1.5-1.5H20v-1.5a1.5 0 00-1.5-1.5H20V7a2 2 0 00-2-2h-3a2 2 0 00-2 2v6a2 2 0 002 2h3a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v6a2 2 0 002 2h3a2 2 0 002-2V5"
                />
              </svg>
              <div>TV</div>
            </button>
            <button className="bg-white bg-opacity-30 hover:bg-opacity-50 backdrop-blur-md rounded-xl shadow-md p-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-blue-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7h4.586a1 1 0 00.707-.293l4.414-4.414a1 1 0 00.293-.707V3m-2.414 6h-4.586a1 1 0 01-.707.293l-4.414 4.414a1 1 0 01-.293.707V9"
                />
              </svg>
              <div>Water</div>
            </button>
          </div>

          {/* Light Intensity Slider */}
          <div className="mb-4">
            <div className="text-sm text-gray-700 mb-2">Light Intensity</div>
            <input
              type="range"
              min="0"
              max="40"
              defaultValue="20"
              className="w-full h-1 bg-gray-300 rounded-full appearance-none cursor-pointer accent-blue-500"
            />
            {/* Light Values */}
            <div className="flex justify-between text-xs text-gray-500">
              <span>0</span>
              <span>10</span>
              <span>15</span>
              <span>20</span>
              <span>25</span>
              <span>30</span>
              <span>35</span>
              <span>40</span>
            </div>
            {/* Switch */}
            <div className="flex justify-end">
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" value="" className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SmartHomeUI;
