import i18n from "../i18n";

export const formatDate = (dateWeather) => {
    const date = new Date(dateWeather);
    return date.toLocaleDateString(i18n.language, {
        day: "2-digit",
        month: "short",
        weekday: "short",
    });
};
export const formatDateWeekName = (dateWeather) => {
    const date = new Date(dateWeather);
    return date.toLocaleDateString(i18n.language, {
        weekday: "short",
    });
};