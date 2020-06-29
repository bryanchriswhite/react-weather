import React from 'react';
import {
    Drawer,
    List,
    ListItem,
    ListItemText,
    Slider,
} from '@material-ui/core';

export default function SettingsDrawer({open, onClose, settings, setSettings}) {
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

