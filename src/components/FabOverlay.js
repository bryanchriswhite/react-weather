import React, {useState} from 'react';
import {DirectionsWalk, Home, Settings} from "@material-ui/icons";
import {
    Card,
    CardHeader,
    CardContent,
    Container,
    Fab,
    Fade,
    Grid,
    makeStyles,
    Modal,
} from "@material-ui/core";

import SettingsDrawer from './SettingsDrawer';

const useStyles = makeStyles({
    fixedGrid: {
        position: 'fixed',
        height: '100vh',
        width: '100vw',
        pointerEvents: 'none',
        justifyContent: 'flex-end',
        alignContent: 'flex-end',
        textAlign: 'right',
        top: 0,
        left: 0
    },
    card: {
        margin: '10px',
        textAlign: 'center',
    }
});

export default function FabOverlay({hourlyWeather, settings, setSettings}) {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const openDrawer = () => setDrawerOpen(true);
    const closeDrawer = () => setDrawerOpen(false);

    const [modalOpen, setModalOpen] = useState(false);
    const openModal = () => setModalOpen(true);
    const closeModal = () => setModalOpen(false);

    const {maxWind, minRain} = settings;
    const classes = useStyles();

    let cards = [];
    let totalRain = 0;
    let peekWind = 0;
    if (hourlyWeather) {
        for (const hour of hourlyWeather.slice(0, 48)) {
            if (hour.rain && hour.rain['1h']) {
                totalRain += hour.rain['1h'];
            }
            if (hour.wind_speed > peekWind) {
                peekWind = hour.wind_speed;
            }
        }
    }

    if (totalRain < minRain) {
        cards.push(
            <Card className={classes.card}>
                <CardHeader title='Water the plants!'/>
                <CardContent>
                    It's only going to rain {Math.round(totalRain * 100) / 100}mm in the next 48 hours.
                </CardContent>
            </Card>
        )
    }

    if (peekWind > maxWind) {
        cards.push(
            <Card className={classes.card}>
                <CardHeader title='Bring the plants in!'/>
                <CardContent>
                    The wind is supposed to peek at {Math.round(peekWind * 100) / 100}km/h in the next 48 hours.
                </CardContent>
            </Card>
        )
    }

    return (<>
        <SettingsDrawer
            open={drawerOpen}
            onClose={closeDrawer}
            settings={settings}
            setSettings={setSettings}
        />
        <Modal
            className={classes.modal}
            open={modalOpen}
            onClose={closeModal}
        >
            <Fade in={modalOpen}>
                <Container maxWidth='xs' style={{outline: 'none'}}>
                    {cards}
                </Container>
            </Fade>
        </Modal>
        <Grid container className={classes.fixedGrid} spacing={3}>
            <Grid item xs={12}>
                <Fab onClick={openDrawer} style={{pointerEvents: 'initial'}}>
                    <Settings/>
                </Fab>
            </Grid>
            <Grid item xs={12}>
                <Fab onClick={openModal} style={{pointerEvents: 'initial'}}>
                    <Home/>
                    <DirectionsWalk/>
                </Fab>
            </Grid>
        </Grid>
    </>)
}