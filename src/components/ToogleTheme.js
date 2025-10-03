import { useEffect, useState } from "react";

import { BsSun , BsMoonStars } from "react-icons/bs";

export default function ThemeToggle() {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    // Verifica se já existe tema guardado
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme) {
      setTheme(storedTheme);
      document.documentElement.classList.toggle("dark", storedTheme === "dark");
    } else {
      // Se não houver, segue a preferência do sistema
      const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      setTheme(systemPrefersDark ? "dark" : "light");
      document.documentElement.classList.toggle("dark", systemPrefersDark);
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
  };

  return (
    <button onClick={toggleTheme} className="bg-yellow-200 dark:bg-slate-950 text-black dark:text-white p-2 rounded-full border border-transparent">
      {theme === "light" ? <BsSun /> : <BsMoonStars  />}
    </button>
  );
}
