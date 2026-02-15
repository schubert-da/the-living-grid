import { writable } from "svelte/store";

export const chosenTag = new writable(null);

export const tagCounts = new writable(null);