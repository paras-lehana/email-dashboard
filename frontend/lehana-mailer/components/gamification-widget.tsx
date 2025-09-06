"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Trophy, Star, Zap, Target, Award, Flame } from "lucide-react"

export function GamificationWidget() {
  const achievements = [
    { id: 1, name: "Speed Demon", description: "Respond to 10 emails in under 1 hour", icon: Zap, earned: true },
    { id: 2, name: "Customer Hero", description: "Achieve 5.0★ satisfaction rating", icon: Star, earned: true },
    { id: 3, name: "Problem Solver", description: "Resolve 50 technical issues", icon: Target, earned: false },
  ]

  const dailyGoals = [
    { name: "Emails Resolved", current: 12, target: 15, progress: 80 },
    { name: "Response Time", current: 1.2, target: 2.0, progress: 100, unit: "h" },
    { name: "Satisfaction", current: 4.8, target: 4.5, progress: 100, unit: "★" },
  ]

  return (
    <Card className="bg-gradient-to-br from-purple-50 to-blue-50 border-purple-200">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center space-x-2 text-lg">
          <Trophy className="w-5 h-5 text-yellow-600" />
          <span>Your Progress</span>
          <div className="flex items-center space-x-1 ml-auto">
            <Flame className="w-4 h-4 text-orange-500" />
            <span className="text-sm font-bold text-orange-600">7 day streak!</span>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Daily Goals */}
        <div className="space-y-3">
          <h4 className="font-medium text-gray-900 flex items-center space-x-2">
            <Target className="w-4 h-4 text-blue-600" />
            <span>Daily Goals</span>
          </h4>
          {dailyGoals.map((goal, index) => (
            <div key={index} className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium text-gray-700">{goal.name}</span>
                <span className="text-gray-600">
                  {goal.current}
                  {goal.unit || ""} / {goal.target}
                  {goal.unit || ""}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <Progress value={goal.progress} className="flex-1 h-2" />
                <span className="text-xs font-medium text-gray-600">{goal.progress}%</span>
              </div>
            </div>
          ))}
        </div>

        {/* Recent Achievements */}
        <div className="space-y-3">
          <h4 className="font-medium text-gray-900 flex items-center space-x-2">
            <Award className="w-4 h-4 text-purple-600" />
            <span>Achievements</span>
          </h4>
          <div className="space-y-2">
            {achievements.map((achievement) => (
              <div
                key={achievement.id}
                className={`flex items-center space-x-3 p-3 rounded-lg border ${
                  achievement.earned ? "bg-white border-yellow-200 shadow-sm" : "bg-gray-50 border-gray-200 opacity-60"
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    achievement.earned ? "bg-yellow-100" : "bg-gray-100"
                  }`}
                >
                  <achievement.icon className={`w-4 h-4 ${achievement.earned ? "text-yellow-600" : "text-gray-400"}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className={`font-medium text-sm ${achievement.earned ? "text-gray-900" : "text-gray-500"}`}>
                    {achievement.name}
                  </p>
                  <p className={`text-xs ${achievement.earned ? "text-gray-600" : "text-gray-400"}`}>
                    {achievement.description}
                  </p>
                </div>
                {achievement.earned && <Badge className="bg-yellow-100 text-yellow-700 text-xs">Earned!</Badge>}
              </div>
            ))}
          </div>
        </div>

        {/* Team Ranking */}
        <div className="bg-white rounded-lg p-4 border border-purple-200">
          <div className="flex items-center justify-between mb-2">
            <span className="font-medium text-gray-900 text-sm">Team Ranking</span>
            <Badge className="bg-purple-100 text-purple-700">#2 of 12</Badge>
          </div>
          <div className="flex items-center space-x-2">
            <div className="flex-1 bg-purple-100 rounded-full h-2">
              <div className="bg-purple-500 h-2 rounded-full w-4/5" />
            </div>
            <span className="text-xs text-gray-600">Top 20%</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
