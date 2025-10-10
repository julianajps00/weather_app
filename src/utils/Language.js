import i18n from "../i18n";

export function getCurrentLang() {
    return i18n.language.startsWith("pt") ? "pt" : "en";
}