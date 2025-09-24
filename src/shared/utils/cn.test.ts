// Interview Question #43: What should you test in React components?
// This demonstrates testing utility functions - the foundation of component testing

import { describe, expect, test } from "bun:test"

import { cn } from "./utils"

describe("cn utility function", () => {
  test("should merge class names correctly", () => {
    // Test basic class merging
    expect(cn("class1", "class2")).toBe("class1 class2")
  })

  test("should handle conditional classes", () => {
    // Test conditional class application
    expect(cn("base", true && "conditional", false && "hidden")).toBe("base conditional")
  })

  test("should handle Tailwind CSS conflicts", () => {
    // Interview Question #38: Tailwind CSS utility-first approach
    // Test that tailwind-merge resolves conflicting utilities correctly
    expect(cn("p-4", "p-2")).toBe("p-2") // Later padding should win
    expect(cn("text-red-500", "text-blue-500")).toBe("text-blue-500")
  })

  test("should handle undefined and null values", () => {
    // Test edge cases that occur in real components
    expect(cn("base", undefined, null, "other")).toBe("base other")
  })

  test("should handle arrays of classes", () => {
    // Test array input (used with conditional rendering)
    expect(cn(["class1", "class2"], "class3")).toBe("class1 class2 class3")
  })
})
