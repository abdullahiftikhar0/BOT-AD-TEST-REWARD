"use client"

import * as React from "react"
import { cn } from "../../lib/utils"
import { Line } from "react-chartjs-2"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js"

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

const Chart = React.forwardRef(({ className, data, options, ...props }, ref) => {
  return (
    <div className={cn("w-full", className)} {...props}>
      <Line
        ref={ref}
        data={data}
        options={{
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: "top",
            },
            title: {
              display: true,
              text: "Chart.js Line Chart",
            },
          },
          ...options,
        }}
      />
    </div>
  )
})
Chart.displayName = "Chart"

export { Chart } 