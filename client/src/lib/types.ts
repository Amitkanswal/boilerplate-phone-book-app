import { z } from "zod";
import { Contact } from "@shared/schema";

export const CATEGORIES = [
	{ value: "personal", label: "Personal" },
	{ value: "work", label: "Work" },
	{ value: "family", label: "Family" },
	{ value: "friend", label: "Friend" },
	{ value: "other", label: "Other" },
];

export enum SortOption {
	NAME_ASC = "name_asc",
	NAME_DESC = "name_desc",
	RECENT = "recent",
}

export type SortOptionType = {
	value: SortOption;
	label: string;
	icon: string;
};

export const SORT_OPTIONS: SortOptionType[] = [
	{ value: SortOption.NAME_ASC, label: "Name (A-Z)", icon: "ri-sort-asc" },
	{ value: SortOption.NAME_DESC, label: "Name (Z-A)", icon: "ri-sort-desc" },
	{ value: SortOption.RECENT, label: "Recently added", icon: "ri-time-line" },
];

export const CONTACTS_STORAGE_KEY = "phone-directory-contacts";
