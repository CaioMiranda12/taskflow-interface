"use client";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { TaskStatus } from "@/types/task";
import { TASK_STATUS_LABEL } from "@/constants/task";

interface TaskStatusChartProps {
  data: { status: TaskStatus; count: number }[];
}

const STATUS_CHART_COLOR: Record<TaskStatus, string> = {
  todo: "#94a3b8",
  in_progress: "#3b82f6",
  in_review: "#eab308",
  done: "#22c55e",
};

export function TaskStatusChart({ data }: TaskStatusChartProps) {
  const chartData = data.map((item) => ({
    name: TASK_STATUS_LABEL[item.status],
    value: item.count,
    color: STATUS_CHART_COLOR[item.status],
  }));

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-6 flex flex-col gap-4">
      <span className="text-sm font-semibold text-slate-800">Tarefas por status</span>
      <ResponsiveContainer width="100%" height={220}>
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={90}
            paddingAngle={3}
            dataKey="value"
          >
            {chartData.map((entry) => (
              <Cell key={entry.name} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip
            formatter={(value, name) => [value, name]}
          />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}