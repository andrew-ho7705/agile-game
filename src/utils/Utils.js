export const getTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds - minutes * 60;
    return `${minutes}:${seconds.toLocaleString("en-US", { minimumIntegerDigits: 2 })}`;
}