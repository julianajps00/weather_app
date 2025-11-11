import { useEffect, useState } from "react";

import { BsSun, BsMoonStars } from "react-icons/bs";

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
    <button
      onClick={toggleTheme}
      className="flex items-center justify-between w-12 h-6 px-1 rounded-full bg-blue-50 dark:bg-sky-950 relative transition-colors duration-300"
    >
      <BsSun className="w-3.5 h-3.5 ml-0.5 text-[#d29200]" />
      <BsMoonStars className="w-3.5 h-3.5 mr-0.5 text-sky-950" />

      {/* Bolinha deslizante */}
      <span className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow-md transform transition-transform duration-300 flex items-center justify-center ${theme === "dark" ? "translate-x-6" : ""}`}>
        {theme === "dark" ?
          <BsMoonStars className="w-3.5 h-3.5 text-sky-950" />
          :
          <BsSun className="w-3.5 h-3.5 text-[#d29200]" />
        }
      </span>
    </button>
  );
}
