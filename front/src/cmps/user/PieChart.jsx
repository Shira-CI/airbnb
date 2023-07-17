import React, { PureComponent } from 'react';
import { PieChart, Pie, Sector, Cell, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Sat', value: 356 },
  { name: 'Sun', value: 250 },
  { name: 'Mon', value: 260 },
  { name: 'Tues', value: 300 },
  { name: 'Wed', value: 303 },
  { name: 'Thur', value: 300 }
]
const COLORS = ['#86eced', '#86eced', '#86eced', '#86eced', '#04A2AC', '#86eced']

// const COLORS = ['#88f5bb', '#88f5bb', '#88f5bb', '#88f5bb', '#96d7b4', '#88f5bb']

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.6;
  const x = cx + 1 + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + 70 * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? 'start' : 'end'}
      className='chart-font'
      dominantBaseline="central">
      {data[index].name}
    </text>
  );
};

export default class MyPieChart extends PureComponent {
  static demoUrl = 'https://codesandbox.io/s/pie-chart-with-customized-label-dlhhj';

  render() {
    return (
      <ResponsiveContainer width="100%" height="100%">
        <PieChart width={500} height={500}>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius={100}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    );
  }
}
