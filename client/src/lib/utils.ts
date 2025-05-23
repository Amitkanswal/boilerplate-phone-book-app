import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { Contact } from "@shared/schema";
import { CONTACTS_STORAGE_KEY, SortOption } from "./types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getContactsFromStorage(): Contact[] {
  try {
    const storedContacts = localStorage.getItem(CONTACTS_STORAGE_KEY);
    if (storedContacts) {
      return JSON.parse(storedContacts);
    }
  } catch (error) {
    console.error("Failed to parse contacts from localStorage:", error);
  }
  return [];
}

export function saveContactsToStorage(contacts: Contact[]) {
  try {
    localStorage.setItem(CONTACTS_STORAGE_KEY, JSON.stringify(contacts));
  } catch (error) {
    console.error("Failed to save contacts to localStorage:", error);
  }
}

export function formatPhoneNumber(phoneNumber: string): string {
  const cleaned = phoneNumber.replace(/\D/g, "");
  
  if (cleaned.length < 10) return phoneNumber;
  
  const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
  if (match) {
    return `(${match[1]}) ${match[2]}-${match[3]}`;
  }
  
  return phoneNumber;
}
