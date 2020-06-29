import React, {useState, useReducer} from 'react';
import {Fab, Grid, Drawer, List, ListItem, ListItemText, Slider, makeStyles} from "@material-ui/core";
import {DirectionsWalk, Home, Settings} from "@material-ui/icons";

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
                <ListItem>
                    <ListItemText>
                        {maxWind}
                    </ListItemText>
                    <ListItemText>
                        {minRain}
                    </ListItemText>
                </ListItem>
            </List>
        </Drawer>
    )
}

export default function FabOverlay({settings, setSettings}) {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const openDrawer = () => setDrawerOpen(true);
    const closeDrawer = () => setDrawerOpen(false);

    const classes = useStyles();
    return (<>
        <SettingsDrawer
            open={drawerOpen}
            onClose={closeDrawer}
            settings={settings}
            setSettings={setSettings}
        />
        <Grid container className={classes.fixedGrid} spacing={3}>
            <Grid item xs={12}>
                <Fab onClick={openDrawer} style={{pointerEvents: 'initial'}}>
                    <Settings/>
                </Fab>
            </Grid>
            <Grid item xs={12}>
                <Fab style={{pointerEvents: 'initial'}}>
                    <Home/>
                    <DirectionsWalk/>
                </Fab>
            </Grid>
        </Grid>
    </>)
}