import React from 'react';
import moment from 'moment';
import {Navigation} from "@material-ui/icons";
import {
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

export default function HourlyTable({hours}) {
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

        return (
            <TableRow key={hour.dt}>
                <TableCell>
                    {moment.unix(hour.dt).format('HH:mm')}
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
        )
    })

    return (
        <TableContainer component={Paper}>
            <Table>
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