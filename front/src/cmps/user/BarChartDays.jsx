import React, { PureComponent } from 'react'
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

class CustomizedLabel extends PureComponent {

    render() {
        const { x, y, fill, value } = this.props
        const formattedValue = `$${value}`
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


export default class MyDaysBarChart extends PureComponent {
    constructor(props) {
        super(props)

        this.state = {
            data: props.orders || [],
            dateStat: []
        }
    }

    getDemoDays() {
        const data = [
            { date: '10/6 ', price: 356 },
            { date: '11/6 ', price: 183 },
            { date: '12/6 ', price: 350 },
            { date: '13/6 ', price: 560 },
            { date: '14/6 ', price: 223 },
            { date: '15/6 ', price: 400 }
        ]
        return data
    }


    getChartFormat() {
        const { format } = this.state
    }

    render() {
        const data = this.getDemoDays()
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
                                // fill={entry.price === maxPrice ? '#96d7b4' : '#88f5bb'}
                                fill={entry.price === maxPrice ? '#04A2AC' : '#BCE6E5'}

                                fontSize='16' />
                        ))
                    }
                </Bar>
            </BarChart>
        )
    }
}