import { useState, useEffect } from "react";

export default function useDayNight() {
  const [isDay, setIsDay] = useState(true);

  useEffect(() => {
    const hour = new Date().getHours();
    setIsDay(hour >= 6 && hour < 18);
  }, []);

  return isDay ? "day" : "night";
}