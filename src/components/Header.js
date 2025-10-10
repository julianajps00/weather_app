import { useTranslation } from "react-i18next";

import { BsFillCloudyFill } from "react-icons/bs";

import ToogleTheme from "./ToogleTheme";

export default function Header() {
    const { i18n } = useTranslation();

    return (
        <div className="w-full flex items-center justify-between gap-2 px-5 h-[36px] bg-[#d29200]">
            <div className="w-full flex gap-2 items-center">
                <BsFillCloudyFill className="h-[60%] w-auto text-sky-950" />
                <div className="text-xs font-medium text-sky-950">Weather App</div>
            </div>
            <div className="flex gap-2">
                <ToogleTheme />
                <div className="flex gap-1 text-xs text-sky-950">
                    <button className={`${i18n.language === 'en' ? `font-bold` : ``}`} onClick={() => i18n.changeLanguage("en")}>EN</button>
                    <button className={`${i18n.language === 'pt' ? `font-bold` : ``}`} onClick={() => i18n.changeLanguage("pt")}>PT</button>
                </div>
            </div>
        </div>
    )
}