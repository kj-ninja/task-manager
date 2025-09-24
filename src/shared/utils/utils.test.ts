import { describe, test, expect } from "bun:test";
import { cn } from "./utils";

describe("Utils", () => {
  describe("cn (className utility)", () => {
    test("should merge class names correctly", () => {
      const result = cn("btn", "btn-primary", "text-white");
      expect(result).toContain("btn");
      expect(result).toContain("btn-primary");
      expect(result).toContain("text-white");
    });

    test("should handle conditional classes", () => {
      const isActive = true;
      const result = cn("btn", isActive && "active", "text-white");
      expect(result).toContain("active");
    });

    test("should handle falsy values", () => {
      const result = cn("btn", false && "hidden", null, undefined, "text-white");
      expect(result).not.toContain("hidden");
      expect(result).toContain("btn");
      expect(result).toContain("text-white");
    });

    test("should resolve Tailwind conflicts", () => {
      const result = cn("p-2", "p-4");
      expect(result).toBe("p-4"); // tailwind-merge should keep the last padding
    });
  });
});