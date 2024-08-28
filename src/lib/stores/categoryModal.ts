import { writable } from 'svelte/store';

export const isModalOpen = writable(false);

export function toggleModal() {
	isModalOpen.update(value => !value);
}

