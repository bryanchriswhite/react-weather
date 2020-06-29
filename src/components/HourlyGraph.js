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
    hourLabel: {
        fontSize: '2px'
    },
    tempLabel: {
        fontSize: '1.5px'
    },
    svg: {
        fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
        '& path': {
            transition: 'd 500ms',
            transform: 'scaleY(-1) translate(0, 4px)',
            transformOrigin: 'center',
        },
    }
})

export default function HourlyGraph({hours}) {
    const classes = useStyles();
    const tempArea = area()
        .x((_, i) => (i * 3) - 1)
        .y1(h =>  h / 3)
        .y0(_ => 0)
        .curve(curveBasis);

    let tempGraph = '';
    if (hours) {
        const hourlyTemps = hours.map(h => kelvinToC(h.temp));
        const hourLabels = hours.map((hour, i) => {
            if (i % 2 === 0) {
                return null;
            }
            const time = moment.unix(hour.dt).format('HH:mm');
            return (
                <text
                    className={classes.hourLabel}
                    x={i * 3 - 2.5}
                    y={14}
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
                    className={classes.tempLabel}
                    x={i * 3 - 1.75}
                    y={`${12 - (temp / 3 + 2)}`}
                    >
                    {temp}
                </text>
            )
        })

        tempGraph = (<svg
            className={classes.svg}
            preserveAspectRatio='xMinYMin slice'
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
                fill='url(#tempGradient)'
                stroke='none'
                d={tempArea(hourlyTemps)}
            />
            {tempLabels}
            <line x1={0} x2={36} y1={11} y2={11} stroke='black' strokeWidth='.1px'/>
            {hourLabels}
        </svg>)
    }

    return (
        <Paper className={classes.hourlyGraph}>
            {tempGraph}
        </Paper>
    )
}