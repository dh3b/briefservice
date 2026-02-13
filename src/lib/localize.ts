import { CategoryRow, Language, localizeCategory } from "@/types";

/**
 * Look up a category by ID and return its localized name.
 * Returns `fallback` if the category is not found.
 */
export function getCategoryName(
  categories: CategoryRow[],
  catId: string | null,
  language: Language,
  fallback = ""
): string {
  if (!catId) return fallback;
  const cat = categories.find((c) => c.id === catId);
  return cat ? localizeCategory(cat, language) : fallback;
}
