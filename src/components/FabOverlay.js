import React, {useState, useReducer} from 'react';
import {DirectionsWalk, Home, Settings} from "@material-ui/icons";
import {
    Card,
    CardHeader,
    CardContent,
    Container,
    Drawer,
    Fab,
    Grid,
    List,
    ListItem,
    ListItemText,
    makeStyles,
    Modal,
    Paper,
    Slider,
} from "@material-ui/core";

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
        margin: '10px'
    }
});

function SettingsDrawer({open, onClose, settings, setSettings}) {
    const setMaxWind = (_, maxWind) => setSettings({maxWind})
    const setMinRain = (_, minRain) => setSettings({minRain})
    const {maxWind, minRain} = settings;

    return (
        <Drawer anchor='left' open={open} onClose={onClose}>
            <List dense>
                <ListItem>
                    <ListItemText>
                        Max wind speed (km/h)
                    </ListItemText>
                </ListItem>
                <ListItem>
                    <Slider
                        steps={1}
                        min={0}
                        max={50}
                        valueLabelDisplay='auto'
                        onChange={setMaxWind}
                        value={maxWind}
                    />
                </ListItem>
                <ListItem>
                    <ListItemText>
                        Min rainfall (mm)
                    </ListItemText>
                </ListItem>
                <ListItem>
                    <Slider
                        steps={1}
                        min={0}
                        max={100}
                        valueLabelDisplay='auto'
                        onChange={setMinRain}
                        value={minRain}
                    />
                </ListItem>
            </List>
        </Drawer>
    )
}

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
                <CardHeader title='Water the Plants!'/>
                <CardContent>
                    It's only going to rain {Math.round(totalRain * 100) / 100}mm in the next 48 hours.
                </CardContent>
            </Card>
        )
    }

    if (peekWind > maxWind) {
        cards.push(
            <Card className={classes.card}>
                <CardHeader title='Bring the pants in!'/>
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
            <Container maxWidth='xs' style={{outline: 'none'}}>
                {cards}
            </Container>
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