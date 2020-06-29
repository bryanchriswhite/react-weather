function currentHour(data) {
    if (!data.list) {
        return
    }

    const hours = data.list.map(d => d.dt);
    // TODO: mod now within week
    const now = 1553709750 //Date.now()
    const i = hours.findIndex(h => now < h);
    return data.list[i];
}

export {
    currentHour
}