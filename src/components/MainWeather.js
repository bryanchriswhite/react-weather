import React from 'react';
import {ArrowUpward, ArrowDownward} from '@material-ui/icons';
import {Autocomplete} from '@material-ui/lab';
import moment from 'moment';
import {
    Grid,
    makeStyles,
    Paper,
    TextField,
    Typography,
} from '@material-ui/core';

import {kelvinToC} from "../util";

const cities = require('../cities.json');
const cityMap = Object.entries(cities).map(([name, [lat, lon]]) => ({
    city: name, lat, lon
}))

const useStyles = makeStyles({
    mainWeather: {
        background: '#d8f0f3',
        'margin-bottom': '25px'
    }
})

export default function MainWeather({location, setLocation, icons, temp, high, low}) {
    const classes = useStyles();
    return (
        <Paper className={classes.mainWeather}>
            <Grid container spacing={3}>
                <Grid item xs={12} style={{'paddingTop': 0}}>
                    <Location className='location' value={location} update={setLocation}/>
                </Grid>
                <Grid item xs={12} sm={8} container alignItems='center'>
                    <Grid item xs={6} sm={5}>
                        <Typography variant='h2'>
                            {kelvinToC(temp)}&#176;c
                        </Typography>
                    </Grid>
                    <Grid item xs={6} sm={7}>
                        {icons}
                    </Grid>
                </Grid>
                <Grid item xs={12} sm={4} container>
                    <Grid item xs={6} sm={12}>
                        <Typography variant='h3'>
                            <ArrowUpward fontSize='large'/>
                            {kelvinToC(high)}&#176;c
                        </Typography>
                    </Grid>
                    <Grid item xs={6} sm={12}>
                        <Typography variant='h3'>
                            <ArrowDownward fontSize='large'/>
                            {kelvinToC(low)}&#176;c
                        </Typography>
                    </Grid>
                </Grid>
                <Grid item xs={12} container justify='space-around'>
                    <Typography variant='h4'>
                        {moment().format('ddd, MMM DD')}
                    </Typography>
                    <Typography variant='h4'>
                        {moment().format('HH:mm')}
                    </Typography>
                </Grid>
            </Grid>
        </Paper>
    );
}

function Location({value, update}) {
    return (
        <Autocomplete
            value={value}
            onChange={(_, v) => update(v)}
            options={cityMap}
            getOptionLabel={(option) => option.city}
            renderInput={(params) => <TextField {...params} label="Location" variant="filled"/>}
        />)
}