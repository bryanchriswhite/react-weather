import React from 'react';
import moment from 'moment';

import {
    Paper,
    Typography,
    TableContainer,
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell
} from "@material-ui/core";
import {Navigation} from "@material-ui/icons";

import {kelvinToC, mpsToKPH} from "../util";

export default function HourlyTable({hours}) {
    if (!hours || hours.length == 0) {
        return '';
    }

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
                        Temp.
                    </Typography>
                </TableCell>
                <TableCell>
                    <Typography>
                        Precip.
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
        return (
            <TableRow key={hour.dt}>
                <TableCell>
                    {moment.unix(hour.dt).format('HH:mm')}
                </TableCell>
                <TableCell>
                    {kelvinToC(hour.temp)}
                </TableCell>
                <TableCell>
                    --
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