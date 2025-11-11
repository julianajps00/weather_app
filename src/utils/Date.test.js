import { describe, it, expect, vi } from "vitest";
import { formatDate, formatDateWeekName } from "./Date.js"; // ajusta o path
import i18n from "../i18n";

describe("formatDate utilities", () => {
  beforeEach(() => {
    vi.spyOn(i18n, "language", "get").mockReturnValue("en-US");
  });

  it("formats full date correctly", () => {
    const result = formatDate("2025-11-11");
    expect(result).toMatch(/Tue|Nov|11/);
  });

  it("formats weekday name correctly", () => {
    const result = formatDateWeekName("2025-11-11");
    expect(result).toMatch(/Tue/);
  });

  it("respects different language from i18n", () => {
    vi.spyOn(i18n, "language", "get").mockReturnValue("pt-PT");
    const result = formatDate("2025-11-11");
    expect(result).toMatch(/ter/); // terça-feira abreviado
  });
});
