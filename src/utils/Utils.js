export const getTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds - minutes * 60;
    return {minutes, seconds};
}

export const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds - minutes * 60;
    return `${minutes}:${seconds < 10 ? `0${Math.floor(seconds)}` : Math.floor(seconds)}`;
}

export const countBalls = sensorList => {
    const delimiter = "10";
    const sensorListString = sensorList.join("");
    const sensorListArray = sensorListString.split(delimiter);
    const count = sensorListArray.length - 1;
    return count;
}