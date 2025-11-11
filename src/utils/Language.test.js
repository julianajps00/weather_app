import { describe, it, expect, vi } from "vitest";
import { getCurrentLang } from "./Language.js";
import i18n from "../i18n";

describe("getCurrentLang", () => {
  it("returns 'pt' for pt-BR", () => {
    vi.spyOn(i18n, "language", "get").mockReturnValue("pt-BR");
    expect(getCurrentLang()).toBe("pt");
  });

  it("returns 'pt' for pt-PT", () => {
    vi.spyOn(i18n, "language", "get").mockReturnValue("pt-PT");
    expect(getCurrentLang()).toBe("pt");
  });

  it("returns 'en' for en-US", () => {
    vi.spyOn(i18n, "language", "get").mockReturnValue("en-US");
    expect(getCurrentLang()).toBe("en");
  });

  it("returns 'en' for any other language", () => {
    vi.spyOn(i18n, "language", "get").mockReturnValue("fr-FR");
    expect(getCurrentLang()).toBe("en");
  });
});
