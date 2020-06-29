import React from 'react';
import {Paper} from '@material-ui/core';
import {makeStyles} from "@material-ui/core/styles";
import moment from 'moment';

import {area, line, curveBasis} from 'd3';
import {kelvinToC} from "../util";

const useStyles = makeStyles({
    hourlyGraph: {
        background: '#d8f0f3',
        'margin-bottom': '25px'
    },
    graphTransform: {
        transformOrigin: 'center',
        // transform: 'scaleY(-1)',
    },
    textTransform: {
        // transform: 'translate(0, calc(100% + 1px))'
    }
})

export default function HourlyGraph({hours}) {
    const classes = useStyles();
    const tempArea = area()
        .x((_, i) => (i * 3) - 1)
        .y1(h =>  h / 3)
        .y0(_ => 0)
        .curve(curveBasis);

    const tempLine = line()
        .x((hour, i) => i * 3)
        .curve(curveBasis);

    // const precipLine = line()
    //     .x(hour => {
    //
    //     })

    let tempGraph = '';
    if (hours) {
        const hourlyTemps = hours.map(h => kelvinToC(h.temp));
        console.debug(hourlyTemps)
        // hourlyTemps.unshift({temp: 0})
        // hourlyTemps.push({temp: 0})
        const maxTemp = Math.max(...hourlyTemps);

        const hourLabels = hours.map((hour, i) => {
            const time = moment.unix(hour.dt).format('HH:mm');
            const y = i % 2 == 0 ? 14 : 15;
            return (
                <text
                    // className={classes.textTransform}
                    fontSize='1.5px'
                    x={i * 3}
                    y={y}
                    key={hour.dt}
                >
                    {time}
                </text>
            )
        })
        const tempLabels = hourlyTemps.map((temp, i) => {
            return (
                <text
                    key={i}
                    fontSize='2px'
                    x={i * 3 - (i * .25)}
                    y={`${parseInt(temp, 10) / 3 + 2}`}
                    >
                    {temp}
                </text>
            )
        })

        const testTemps = ['0', '1', '2', '10', '20', '30'];

        tempGraph = (<svg
            preserveAspectRatio='xMinYMin slice'
            // viewBox={`0 0 24 ${maxTemp}`}
            viewBox={`0 0 36 15`}
        >
            <defs>
                <linearGradient id='tempGradient' gradientTransform='rotate(90)'>
                    <stop offset="0%" stopColor="#fa0"/>
                    <stop offset="15%" stopColor="#fa0"/>
                    <stop offset="100%" stopColor="#fc0"/>
                </linearGradient>
            </defs>
            <path
                className={classes.graphTransform}
                fill='url(#tempGradient)'
                stroke='none'
                d={tempArea(hourlyTemps)}
                // d={tempArea(testTemps)}
            />
            {tempLabels}
            {hourLabels}
            {/*<path*/}
            {/*    fill='none'*/}
            {/*    stroke='black'*/}
            {/*    style={{strokeWidth: '.1px'}}*/}
            {/*    d={tempLine(hourlyTemps)}*/}
            {/*/>*/}
        </svg>)
    }

    return (
        <Paper className={classes.hourlyGraph}>
            {tempGraph}
        </Paper>
    )
}