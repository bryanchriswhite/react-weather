export function kelvinToC(kelvin) {
    const temp = (Math.round(kelvin - 273.15) * 100) / 100
    if (isNaN(temp)) {
        return '--'
    }
    return `${temp}`;
}

export function mpsToKPH(mps) {
    return Math.round(mps * 3.6 * 100) / 100;
}
