import styled from "styled-components";
import Heading from "../Heading";
import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

const ChartBox = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  height: 400px;
  padding: 2.4rem 3.2rem;
  grid-column: 3 / span 2;

  & > *:first-child {
    margin-bottom: 1.6rem;
  }

  & .recharts-pie-label-text {
    font-weight: 600;
  }
`;

const startDataLight = [
  {
    duration: "1 night",
    value: 0,
    color: "#ef4444",
  },
  {
    duration: "2 nights",
    color: "#f97316",
    value: 0,
  },
  {
    duration: "3 nights",
    color: "#eab308",
    value: 0,
  },
  {
    duration: "4-5 nights",
    color: "#84cc16",
    value: 0,
  },
  {
    duration: "6-7 nights",
    color: "#22c55e",
    value: 0,
  },
  {
    duration: "8-14 nights",
    color: "#14b8a6",
    value: 0,
  },
  {
    duration: "15-21 nights",
    color: "#3b82f6",
    value: 0,
  },
  {
    duration: "21+ nights",
    color: "#a855f7",
    value: 0,
  },
];

const data = [
  {
    name: "Group A",
    value: 400,
    duration: "1 night",
    color: "#ef4444",
  },
  { name: "Group B", value: 300, duration: "2 nights", color: "#f97316" },
  { name: "Group C", value: 300, duration: "3 nights", color: "#eab308" },
  { name: "Group D", value: 200, duration: "4-5 nights", color: "#84cc16" },
];

function DurationChart({ confirmedStays }) {
  return (
    <ChartBox>
      <Heading as="h2">Stay duration summary</Heading>
      <ResponsiveContainer width="100%" height={240}>
        <PieChart>
          <Pie
            data={data}
            nameKey="duration"
            dataKey="value"
            innerRadius={85}
            outerRadius={110}
            cx="40%"
            cy="50%"
            paddingAngle={3}
          >
            {data.map((entry) => (
              <Cell
                fill={entry.color}
                stroke={entry.color}
                key={entry.duration}
              />
            ))}
          </Pie>
          <Tooltip />
          <Legend
            verticalAlign="middle"
            align="right"
            width="30%"
            layout="vertical"
            iconSize={15}
            iconType="circle"
          />
        </PieChart>
      </ResponsiveContainer>
    </ChartBox>
  );
}

export default DurationChart;
