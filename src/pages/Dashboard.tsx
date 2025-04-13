import { 
  Circle,
  Flame, 
  Clock, 
  Heart,
  Trophy,
  TrendingUp
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip,
  ResponsiveContainer 
} from 'recharts';

const mockData = {
  steps: 8432,
  calories: 420,
  activeMinutes: 45,
  heartRate: 72,
  goalProgress: 75,
  recentActivities: [
    { type: 'Running', duration: '30 mins', distance: '4.2 km', calories: 320 },
    { type: 'Cycling', duration: '45 mins', distance: '12 km', calories: 280 },
  ],
  weeklyData: [
    { day: 'Mon', steps: 7500 },
    { day: 'Tue', steps: 8200 },
    { day: 'Wed', steps: 7800 },
    { day: 'Thu', steps: 8432 },
    { day: 'Fri', steps: 0 },
    { day: 'Sat', steps: 0 },
    { day: 'Sun', steps: 0 },
  ],
};

type ProgressRingProps = {
  value: number;
  max: number;
  icon: React.ElementType;
  label: string;
  color: string;
};

function ProgressRing({ value, max, icon: Icon, label, color }: ProgressRingProps) {
  const percentage = (value / max) * 100;
  console.log(percentage);
  return (
    <div className="flex flex-col items-center">
      <div className="relative">
        <Circle className={`w-16 h-16 ${color} opacity-20`} />
        <div className="absolute inset-0 flex items-center justify-center">
          <Icon className={`w-8 h-8 ${color}`} />
        </div>
      </div>
      <div className="mt-2 text-center">
        <div className="text-2xl font-bold">{value}</div>
        <div className="text-sm text-gray-500">{label}</div>
      </div>
    </div>
  );
}

function Dashboard() {
  const greeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 18) return 'Good Afternoon';
    return 'Good Evening';
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">{greeting()}, Kiran</h1>
          <p className="text-gray-500">Here's your fitness summary for today</p>
        </div>
        <img
          src="/kiru_raj.jpg"
          alt="Profile"
          className="w-12 h-12 rounded-full"
        />
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        <ProgressRing
          value={mockData.steps}
          max={10000}
          icon={TrendingUp}
          label="Steps"
          color="text-blue-500"
        />
        <ProgressRing
          value={mockData.calories}
          max={600}
          icon={Flame}
          label="Calories"
          color="text-orange-500"
        />
        <ProgressRing
          value={mockData.activeMinutes}
          max={60}
          icon={Clock}
          label="Active Mins"
          color="text-green-500"
        />
        <ProgressRing
          value={mockData.heartRate}
          max={200}
          icon={Heart}
          label="BPM"
          color="text-red-500"
        />
      </div>

      {/* Weekly Progress */}
      <div className="bg-white p-6 rounded-xl shadow-sm">
        <h2 className="text-lg font-semibold mb-4">Weekly Progress</h2>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={mockData.weeklyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Area 
                type="monotone" 
                dataKey="steps" 
                stroke="#3B82F6" 
                fill="#93C5FD" 
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Activities */}
      <div className="bg-white p-6 rounded-xl shadow-sm">
        <h2 className="text-lg font-semibold mb-4">Recent Activities</h2>
        <div className="space-y-4">
          {mockData.recentActivities.map((activity, index) => (
            <div 
              key={index}
              className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
            >
              <div className="flex items-center gap-4">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Trophy className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-medium">{activity.type}</h3>
                  <p className="text-sm text-gray-500">
                    {activity.duration} • {activity.distance}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-medium">{activity.calories} kcal</p>
                <p className="text-sm text-gray-500">burned</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Daily Goals */}
      <div className="bg-white p-6 rounded-xl shadow-sm">
        <h2 className="text-lg font-semibold mb-4">Daily Goals</h2>
        <ul className="space-y-3">
          <li className="flex items-center justify-between">
            <span>10,000 Steps</span>
            <span className="text-sm text-gray-600">{mockData.steps}/10000</span>
          </li>
          <li className="flex items-center justify-between">
            <span>600 Calories</span>
            <span className="text-sm text-gray-600">{mockData.calories}/600</span>
          </li>
          <li className="flex items-center justify-between">
            <span>1 Hour Active</span>
            <span className="text-sm text-gray-600">{mockData.activeMinutes}/60 mins</span>
          </li>
        </ul>
      </div>

      {/* Heart Rate Zones */}
      <div className="bg-white p-6 rounded-xl shadow-sm">
        <h2 className="text-lg font-semibold mb-4">Heart Rate Zone</h2>
        <div className="w-full bg-gray-100 h-4 rounded-full overflow-hidden">
          <div 
            className="h-full bg-red-500" 
            style={{ width: `${(mockData.heartRate / 200) * 100}%` }} 
          />
        </div>
        <div className="flex justify-between text-sm text-gray-500 mt-2">
          <span>Rest</span>
          <span>Max</span>
        </div>
      </div>

      {/* Sleep Tracker */}
      <div className="bg-white p-6 rounded-xl shadow-sm">
        <h2 className="text-lg font-semibold mb-4">Sleep Tracker</h2>
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-2xl font-bold">7h 45m</h3>
            <p className="text-sm text-gray-500">Last Night</p>
          </div>
          <div className="text-right">
            <p className="text-green-600 font-medium">+15 mins</p>
            <p className="text-sm text-gray-500">vs Yesterday</p>
          </div>
        </div>
      </div>

      {/* Water Intake */}
      <div className="bg-white p-6 rounded-xl shadow-sm">
        <h2 className="text-lg font-semibold mb-4">Water Intake</h2>
        <div className="flex items-center justify-between">
          <div className="text-3xl font-bold text-blue-500">1.8L</div>
          <p className="text-sm text-gray-500">Goal: 2.5L</p>
        </div>
        <div className="w-full bg-gray-200 h-3 mt-2 rounded-full">
          <div 
            className="bg-blue-500 h-3 rounded-full" 
            style={{ width: `${(1.8 / 2.5) * 100}%` }} 
          />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;