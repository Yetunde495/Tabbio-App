import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Capitalizes the first letter of a given string.
 * @param str - The string to capitalize.
 * @returns The string with the first letter capitalized.
 */
export function capitalizeFirstLetter(str: string): string {
  if (!str) return str;
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function toggleIdInArray(arr: string[], id: string): string[] {
  const index = arr.indexOf(id);
  if (index !== -1) {
    // ID exists in the array, so remove it
    arr.splice(index, 1);
  } else {
    // ID does not exist in the array, so add it
    arr.push(id);
  }
  return arr;
}

export function toggleId(id: string, prevId: string): string {
  return id === prevId ? "" : id;
}

export function idExistInArray(arr: string[], id: string): boolean {
  return arr.indexOf(id) !== -1;
}

export function getAllIdsInArray(arr: any[], id: string): string[] {
  return arr.map((item: any) => item[id]);
}

export function generateUniqueId(): string {
  const timestamp: number = Date.now(); // Get the current timestamp in milliseconds
  const randomString: string = Math.random().toString(36).substr(2, 5); // Generate a random string
  return `${timestamp}-${randomString}`; // Combine the timestamp and random string to create the ID
}

export function getTimeAgo(dateInput: Date | string): string {
  const date = typeof dateInput === "string" ? new Date(dateInput) : dateInput;
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  
  if (diffDays < 1) return "Today";
  if (diffDays === 1) return "1d ago";
  if (diffDays < 7) return `${diffDays} days ago`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)} week${Math.floor(diffDays / 7) > 1 ? 's' : ''} ago`;
  if (diffDays < 365) return `${Math.floor(diffDays / 30)} month${Math.floor(diffDays / 30) > 1 ? 's' : ''} ago`;
  return `${Math.floor(diffDays / 365)} yr${Math.floor(diffDays / 365) > 1 ? 's' : ''} ago`;
}

export function paginate(totalItems: number, page: number, pageLimit: number) {
  const totalPages = Math.ceil(totalItems / pageLimit);
  const nextPage = page < totalPages ? page + 1 : null;
  const prevPage = page > 1 ? page - 1 : null;

  return {
    nextPage: nextPage || 0,
    prevPage: prevPage || 0,
    currentPage: page,
    pages: totalPages,
    total: totalItems,
  };
}