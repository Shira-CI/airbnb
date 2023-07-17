import React, { PureComponent } from 'react'
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

class CustomizedLabel extends PureComponent {

  render() {
    const { x, y, fill, value } = this.props
    const formattedValue = `$${value}k`
    return (
      <text
        x={x}
        y={y}
        dy={-4}
        fontSize='16'
        fill={fill}
        textAnchor="center"
        className='chart-font'
      >{formattedValue}

      </text>
    )
  }
}


export default class MyBarChart extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      data: props.orders || [],
      dateStat: []
    }
  }

  getDemo() {
    const data = [
      { date: 'Jan', price: 2.3 },
      { date: 'Feb', price: 3.4 },
      { date: 'Mar', price: 2.8 },
      { date: 'Apr', price: 4.5 },
      { date: 'May', price: 5.2 },
      { date: 'Jun', price: 2.7 }
    ]
    return data
  }

  getChartFormat() {
    const { format } = this.state
  }


  // getAvgPriceAccordingToDate() {
  //   const { orders } = this.props
  //   const dateStat = orders.reduce((acc, order) => {
  //     const orderDate = new Date(order.createdAt).toLocaleDateString('en-GB', { month: 'short', day: 'numeric' })
  //     const roundedPrice = Math.round(order.totalPrice)
  //     acc.push({ date: orderDate, price: roundedPrice })
  //     return acc

  //   }, [])
  //   console.log(dateStat)
  //   return dateStat.slice(0, 6)
  // }


  render() {
    const data = this.getDemo()
    const maxPrice = Math.max(...data.map(entry => entry.price));

    // const data = this.getAvgPriceAccordingToDate()
    return data.length && (
      <BarChart
        width={250}
        height={260}
        data={data}
        margin={{ top: 20, right: 0, left: 0, bottom: 5 }}>
        <XAxis
          dataKey="date"
          fontSize='16'
          fontFamily="sans-serif"
          tickSize
          dy='25'
        />
        <YAxis hide />
        <CartesianGrid
          vertical={false}
          stroke="#ebf3f0"
        />
        <Bar
          dataKey="price"
          barSize={100}
          fontSize='16'
          fontFamily="sans-serif"
          label={<CustomizedLabel />}
        >
          {
            data.map((entry, index) => (
              <Cell 
              key={`cell-${index}`}
              fill={entry.price === maxPrice ? '#04A2AC' : '#BCE6E5'}

              fontSize='16' />
            ))
          }
        </Bar>
      </BarChart>
    )
  }
}