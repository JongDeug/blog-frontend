import { writable } from 'svelte/store';

interface ModalState {
	value: boolean;
	data: string | undefined;
}

export const isModalOpen = writable<ModalState>({ value: false, data: '' });

export function toggleModal(data: string | undefined = undefined) {
	isModalOpen.update((item) => ({ value: !item.value, data }));
}
