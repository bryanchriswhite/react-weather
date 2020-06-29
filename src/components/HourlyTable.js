import React from 'react';
import moment from 'moment';
import {Navigation} from "@material-ui/icons";
import {
    makeStyles,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
} from "@material-ui/core";

import {kelvinToC, mpsToKPH} from "../util";

const useStyles = makeStyles({
    table: {
        '& td, & th': {
            textAlign: 'center'
        }
    }
})

export default function HourlyTable({hours}) {
    const classes = useStyles();
    if (!hours || hours.length == 0) {
        return '';
    }

    // TODO: add settings for units
    const head = (
        <TableHead>
            <TableRow>
                <TableCell>
                    <Typography>
                        Time
                    </Typography>
                </TableCell>
                <TableCell>
                    <Typography>
                        Temp. (&#176;c)
                    </Typography>
                </TableCell>
                <TableCell>
                    <Typography>
                        Rain (mm)
                    </Typography>
                </TableCell>
                <TableCell>
                    <Typography>
                        Wind (km/h)
                    </Typography>
                </TableCell>
            </TableRow>
        </TableHead>
    )

    // TODO: insert date row every new day...
    const hourRows = hours.map(hour => {
        const now = moment.utc();

        const daysTillHour = moment.duration(
            moment.unix(hour.dt).diff(now)
        ).days();

        let rain = '--';
        if (hour.rain && hour.rain['1h']) {
            rain = hour.rain['1h']
        }

        let newDayRow = '';
        const hourMoment = moment.unix(hour.dt);
        const time = hourMoment.format('HH:mm')
        if (time === '00:00') {
            newDayRow = (
                <TableRow key={hourMoment.format('MMDD')}>
                    <TableCell colSpan={4} style={{backgroundColor: '#f1f1f1'}}>
                        <Typography variant='h6'>
                            {hourMoment.format('ddd, MMM DD')}
                        </Typography>
                    </TableCell>
                </TableRow>
            )
        }

        return (<>
            {newDayRow}
            <TableRow key={hour.dt}>
                <TableCell>
                    {time}
                </TableCell>
                <TableCell>
                    {kelvinToC(hour.temp)}
                </TableCell>
                <TableCell>
                    {rain}
                </TableCell>
                <TableCell style={{display: 'flex'}}>
                    <Navigation style={{transform: `rotate(${hour.wind_deg}deg`}}/>
                    <Typography component='span' style={{marginLeft: '10px'}}>
                        {formatWindSpeed(hour.wind_speed)}
                    </Typography>
                </TableCell>
            </TableRow>
        </>)
    })

    return (
        <TableContainer component={Paper}>
            <Table className={classes.table}>
                {head}
                <TableBody>
                    {hourRows}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

function formatWindSpeed(speed) {
    speed = mpsToKPH(speed);
    if (speed < 1) {
        return '< 1'
    }
    return speed;
}