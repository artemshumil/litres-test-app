import React, {useEffect, useMemo} from 'react';
import {TData} from "../../_tools/types";
// @ts-ignore
import { ResponsiveLineCanvas } from "@nivo/line";

type TChart = {
    data: TData
}

type TChartSeries = {
    id:   string | number
    data: Array<{
        x: number | string | Date
        y: number | string | Date
    }>
}

const Chart: React.FunctionComponent<TChart> = ({data}) => {

    const chartData = useMemo<TChartSeries[]>(() => {
        return data.graphsArray.map(line => ({
            id: line.data ? line.data[0].name : line.id,
            color: 'blue',
            data: (line.data && line.data.map) ? line.data.map((elem, i) => ({x: new Date(elem.date), y: elem.value})) : []
        }))
    }, [data]);

    useEffect(() => {
        console.log(chartData);

    }, [chartData]);

    return (
        <>
            {/*{chartData[0] && <div className="chart-container">
                <ChartWrap series={chartData[0]}/>
            </div>}*/}
            {chartData.map((x, i) =>
                <div className="chart-container" key={i}>
                    <ChartWrap series={x}/>
                </div>
            )}
        </>
    )
};

const ChartWrap = ({series}: {series: TChartSeries}) => {
    return (
        <ResponsiveLineCanvas
            data={[series]}
            margin={{ top: 50, right: 160, bottom: 80, left: 60 }}
            xFormat="time:%Y-%m-%d"
            yScale={{ max: "auto", min: "auto", stacked: false, type: "linear" }}
            curve="monotoneX"
            xScale={{
                precision: 'day',
                type: 'time'
            }}
            axisBottom={{
                format: (value: Date | any) => `${value.getDate()}.${value.getMonth() + 1}.${value.getFullYear()}`,
                orient: 'bottom',
                tickSize: 5,
                tickPadding: 5,
                tickRotation: -90
            }}
            axisLeft={{
                orient: 'left',
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0
            }}
            // enableGridX={false}
            colors={{ scheme: 'spectral' }}
            lineWidth={1}
            pointSize={4}
            pointColor={{ theme: 'background' }}
            pointBorderWidth={1}
            pointBorderColor={{ from: 'serieColor' }}
            // enablePointLabel={false}
            // pointLabel="y"
            // pointLabelYOffset={-12}
            // useMesh={true}
            legends={[
                {
                    anchor: 'bottom-right',
                    direction: 'column',
                    justify: false,
                    translateX: 140,
                    translateY: 0,
                    itemsSpacing: 2,
                    itemDirection: 'left-to-right',
                    itemWidth: 80,
                    itemHeight: 12,
                    itemOpacity: 0.75,
                    symbolSize: 12,
                    symbolShape: 'circle',
                    symbolBorderColor: 'rgba(0, 0, 0, .5)',
                    effects: [
                        {
                            on: 'hover',
                            style: {
                                itemBackground: 'rgba(0, 0, 0, .03)',
                                itemOpacity: 1
                            }
                        }
                    ]
                }
            ]}
        />
    )
};

export default Chart;