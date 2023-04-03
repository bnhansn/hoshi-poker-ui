/**
 * Combines className props into one string, useful for tailwindcss components.
 *
 * @param classes A list of class name strings
 * @returns String of combined class names
 */
export function cn(...classes: (false | null | undefined | string)[]) {
  return classes.filter(Boolean).join(' ')
}
