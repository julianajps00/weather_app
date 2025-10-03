export const formatDate = (dateWeather) => {
    const date = new Date(dateWeather);
    return date.toLocaleDateString("en-US", {
        day: "2-digit",
        month: "short",
        weekday: "short",
    });
};