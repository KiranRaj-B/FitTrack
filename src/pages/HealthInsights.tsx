import React from 'react';
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';
import {
  Moon,
  Droplets,
  Scale,
  Heart,
  TrendingUp,
  Apple,
  Activity
} from 'lucide-react';

const mockData = {
  sleepData: [
    { day: 'Mon', deep: 2.5, light: 4.5, rem: 1.5 },
    { day: 'Tue', deep: 3.0, light: 4.0, rem: 2.0 },
    { day: 'Wed', deep: 2.0, light: 5.0, rem: 1.0 },
    { day: 'Thu', deep: 2.8, light: 4.2, rem: 1.8 },
    { day: 'Fri', deep: 2.3, light: 4.7, rem: 1.7 },
    { day: 'Sat', deep: 3.2, light: 4.8, rem: 1.9 },
    { day: 'Sun', deep: 2.7, light: 4.3, rem: 1.6 },
  ],
  nutritionData: {
    calories: { consumed: 2100, burned: 2400, goal: 2000 },
    water: { current: 1.8, goal: 2.5 },
    macros: [
      { name: 'Protein', value: 25 },
      { name: 'Carbs', value: 55 },
      { name: 'Fats', value: 20 },
    ],
  },
  fitnessData: Array.from({ length: 30 }, (_, i) => ({
    date: `Day ${i + 1}`,
    vo2max: Math.floor(35 + Math.random() * 10),
    recovery: Math.floor(60 + Math.random() * 40),
  })),
};

function MetricCard({ icon: Icon, title, value, subtitle, color = 'blue' }: any) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm">
      <div className="flex items-center gap-3 mb-3">
        <div className={`p-2 bg-${color}-50 rounded-lg`}>
          <Icon className={`w-5 h-5 text-${color}-600`} />
        </div>
        <span className="text-gray-600">{title}</span>
      </div>
      <div className="text-2xl font-bold">{value}</div>
      <div className="text-sm text-gray-500">{subtitle}</div>
    </div>
  );
}

function HealthInsights() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold">Health Insights</h1>
        <p className="text-gray-500">Your health and wellness overview</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-4 gap-6">
        <MetricCard
          icon={Moon}
          title="Sleep Score"
          value="85%"
          subtitle="Above average"
          color="purple"
        />
        <MetricCard
          icon={Heart}
          title="Resting HR"
          value="62 bpm"
          subtitle="Excellent"
          color="red"
        />
        <MetricCard
          icon={Activity}
          title="Recovery"
          value="92%"
          subtitle="Well recovered"
          color="green"
        />
        <MetricCard
          icon={Scale}
          title="Weight"
          value="75.5 kg"
          subtitle="-0.5 kg this week"
          color="blue"
        />
      </div>

      {/* Sleep Analysis */}
      <div className="bg-white p-6 rounded-xl shadow-sm">
        <h2 className="text-lg font-semibold mb-6">Sleep Analysis</h2>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={mockData.sleepData} stackOffset="normal">
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Area
                type="monotone"
                dataKey="deep"
                stackId="1"
                stroke="#4C1D95"
                fill="#8B5CF6"
                name="Deep Sleep"
              />
              <Area
                type="monotone"
                dataKey="light"
                stackId="1"
                stroke="#1D4ED8"
                fill="#60A5FA"
                name="Light Sleep"
              />
              <Area
                type="monotone"
                dataKey="rem"
                stackId="1"
                stroke="#047857"
                fill="#34D399"
                name="REM Sleep"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Nutrition & Hydration */}
      <div className="grid grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold">Nutrition</h2>
            <Apple className="w-5 h-5 text-green-600" />
          </div>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Calories Consumed</span>
                <span className="font-medium">{mockData.nutritionData.calories.consumed} kcal</span>
              </div>
              <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-green-500 rounded-full"
                  style={{ width: `${(mockData.nutritionData.calories.consumed / mockData.nutritionData.calories.goal) * 100}%` }}
                />
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4">
              {mockData.nutritionData.macros.map((macro) => (
                <div key={macro.name} className="bg-gray-50 p-3 rounded-lg">
                  <div className="text-sm text-gray-600">{macro.name}</div>
                  <div className="text-lg font-semibold">{macro.value}%</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold">Hydration</h2>
            <Droplets className="w-5 h-5 text-blue-600" />
          </div>
          <div className="flex items-center justify-center h-48">
            <div className="relative w-48 h-48">
              <svg className="transform -rotate-90" viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  fill="none"
                  stroke="#E5E7EB"
                  strokeWidth="10"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  fill="none"
                  stroke="#3B82F6"
                  strokeWidth="10"
                  strokeDasharray={`${(mockData.nutritionData.water.current / mockData.nutritionData.water.goal) * 283} 283`}
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-3xl font-bold">{mockData.nutritionData.water.current}L</span>
                <span className="text-sm text-gray-500">of {mockData.nutritionData.water.goal}L</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Fitness Trends */}
      <div className="bg-white p-6 rounded-xl shadow-sm">
        <h2 className="text-lg font-semibold mb-6">Fitness Trends</h2>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={mockData.fitnessData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis yAxisId="left" />
              <YAxis yAxisId="right" orientation="right" />
              <Tooltip />
              <Legend />
              <Line
                yAxisId="left"
                type="monotone"
                dataKey="vo2max"
                stroke="#2563EB"
                name="VO2 Max"
              />
              <Line
                yAxisId="right"
                type="monotone"
                dataKey="recovery"
                stroke="#059669"
                name="Recovery Score"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

export default HealthInsights;