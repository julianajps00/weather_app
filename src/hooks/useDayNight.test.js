import { renderHook } from "@testing-library/react";
import { vi } from "vitest";
import useDayNight from "./useDayNight.js";

describe("useDayNight hook", () => {
  afterEach(() => {
    vi.useRealTimers();
  });

  it("returns 'day' for hours between 6 and 17", () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2025-11-11T10:00:00")); // 10h da manhã

    const { result } = renderHook(() => useDayNight());
    expect(result.current).toBe("day");
  });

  it("returns 'night' for hours between 18 e 5", () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2025-11-11T22:00:00")); // 22h

    const { result } = renderHook(() => useDayNight());
    expect(result.current).toBe("night");
  });
});
