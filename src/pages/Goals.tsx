import { useState } from 'react';
import { 
  Target, 
  TrendingUp, 
  Flame, 
  Scale,
  Clock,
  Plus,
  Check,
  X,
  LucideIcon
} from 'lucide-react';

const mockGoals: Goal[] = [
  {
    id: '1',
    title: 'Step Count Goal',
    description: 'Walk 10,000 steps daily',
    type: 'steps',
    icon: TrendingUp,
    current: 8432,
    target: 10000,
    unit: 'steps',
    deadline: '2024-03-20',
    progress: 84,
  },
  {
    id: '2',
    title: 'Calorie Burn Goal',
    description: 'Burn 600 kcal per day',
    type: 'calories',
    icon: Flame,
    current: 420,
    target: 600,
    unit: 'kcal',
    deadline: '2024-03-20',
    progress: 70,
  },
  {
    id: '3',
    title: 'Weight Reduction Goal',
    description: 'Reduce weight to 72 kg',
    type: 'weight',
    icon: Scale,
    current: 75.5,
    target: 72,
    unit: 'kg',
    deadline: '2024-05-01',
    progress: 45,
  },
  {
    id: '4',
    title: 'Active Minutes Goal',
    description: 'Spend 60 minutes being active daily',
    type: 'active_minutes',
    icon: Clock,
    current: 45,
    target: 60,
    unit: 'mins',
    deadline: '2024-03-20',
    progress: 75,
  },
];

type Goal = {
  icon: LucideIcon;
  id: string;
  title: string;
  description: string;
  progress: number;
  target: number;
  type: string; 
  unit: string; 
  current: number;    
  deadline: string;
};

function GoalCard({ goal }: { goal: Goal }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-50 rounded-lg">
            <goal.icon className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <h3 className="font-medium capitalize">{goal.type.replace('_', ' ')}</h3>
            <p className="text-sm text-gray-500">Due {new Date(goal.deadline).toLocaleDateString()}</p>
          </div>
        </div>
        <div className="text-right">
          <div className="text-lg font-semibold">
            {goal.current} / {goal.target}
            <span className="text-sm font-normal text-gray-500 ml-1">{goal.unit}</span>
          </div>
          <div className="text-sm text-gray-500">{goal.progress}% completed</div>
        </div>
      </div>
      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
        <div 
          className="h-full bg-blue-500 rounded-full transition-all duration-300"
          style={{ width: `${goal.progress}%` }}
        />
      </div>
    </div>
  );
}

function Goals() {
  const [showNewGoalForm, setShowNewGoalForm] = useState(false);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Goals</h1>
          <p className="text-gray-500">Track and manage your fitness goals</p>
        </div>
        <button 
          onClick={() => setShowNewGoalForm(true)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-5 h-5" />
          Add New Goal
        </button>
      </div>

      {/* Goals Grid */}
      <div className="grid grid-cols-2 gap-6">
        {mockGoals.map((goal) => (
          <GoalCard key={goal.id} goal={goal} />
        ))}
      </div>

      {/* Achievements */}
      <div className="bg-white p-6 rounded-xl shadow-sm">
        <h2 className="text-lg font-semibold mb-4">Recent Achievements</h2>
        <div className="space-y-4">
          <div className="flex items-center gap-4 p-4 bg-green-50 rounded-lg">
            <div className="p-2 bg-green-100 rounded-full">
              <Check className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <h3 className="font-medium">Daily Step Goal Achieved!</h3>
              <p className="text-sm text-gray-600">Completed 10,000 steps today</p>
            </div>
          </div>
          <div className="flex items-center gap-4 p-4 bg-blue-50 rounded-lg">
            <div className="p-2 bg-blue-100 rounded-full">
              <Target className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h3 className="font-medium">New Personal Best</h3>
              <p className="text-sm text-gray-600">Ran 5km in 25 minutes</p>
            </div>
          </div>
        </div>
      </div>

      {/* Goal Tips */}
      <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-6 rounded-xl text-white">
        <h2 className="text-lg font-semibold mb-2">Tips for Success</h2>
        <ul className="space-y-2 list-disc list-inside">
          <li>Break down larger goals into smaller, manageable tasks</li>
          <li>Track your progress daily to stay motivated</li>
          <li>Celebrate small wins along the way</li>
          <li>Adjust your goals if needed - staying flexible is key</li>
          <li>Stay accountable by sharing your goals with a friend or family member</li>
          <li>Use a rewards system to keep yourself motivated</li>
        </ul>
      </div>

      {/* New Goal Modal */}
      {showNewGoalForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-xl w-[500px]">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Create New Goal</h2>
              <button 
                onClick={() => setShowNewGoalForm(false)}
                className="p-1 hover:bg-gray-100 rounded-full"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Goal Type
                </label>
                <select className="w-full p-2 border rounded-lg">
                  <option>Steps</option>
                  <option>Calories</option>
                  <option>Weight</option>
                  <option>Active Minutes</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Target Value
                </label>
                <input 
                  type="number" 
                  className="w-full p-2 border rounded-lg"
                  placeholder="Enter target value"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Deadline
                </label>
                <input 
                  type="date" 
                  className="w-full p-2 border rounded-lg"
                />
              </div>
              <div className="flex justify-end gap-2 mt-6">
                <button
                  type="button"
                  onClick={() => setShowNewGoalForm(false)}
                  className="px-4 py-2 border rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Create Goal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Goals;
