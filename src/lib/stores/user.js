// src/lib/stores/user.js
import { writable } from 'svelte/store';
import { browser } from '$app/environment';

// Create user store
export const user = writable(null);

// Helper functions
export function getCurrentUser() {
	if (!browser) return null;
	
	try {
		const userData = localStorage.getItem('user');
		return userData ? JSON.parse(userData) : null;
	} catch {
		return null;
	}
}

export function setUser(userData) {
	if (browser) {
		localStorage.setItem('user', JSON.stringify(userData));
		user.set(userData);
	}
}

export function logout() {
	if (browser) {
		localStorage.removeItem('user');
		user.set(null);
	}
}

export function getUserId() {
	const currentUser = getCurrentUser();
	return currentUser ? currentUser.id : null;
}

// Initialize store with localStorage data
if (browser) {
	const storedUser = getCurrentUser();
	if (storedUser) {
		user.set(storedUser);
	}
}