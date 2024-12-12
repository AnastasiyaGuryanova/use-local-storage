import { useState } from 'react';

type LocalStorageSetValue = string;
type LocalStorageReturnValue = LocalStorageSetValue | null;

type UseLocalStorage = (key: string) => [
	value: LocalStorageReturnValue,
	{
		setItem: (value: LocalStorageSetValue) => void;
		removeItem: () => void;
	}
];

export const useLocalStorage: UseLocalStorage = (key: string) => {
	const [value, setValue] = useState<LocalStorageReturnValue>(() => {
		try {
			const storedValue = localStorage.getItem(key);
			return storedValue !== null ? storedValue : null;
		} catch (error) {
			console.error(`Ошибка при чтении из LocalStorage: ${error}`);
			return null;
		}
	});

	const setItem = (newValue: LocalStorageSetValue) => {
		try {
			localStorage.setItem(key, newValue);
			setValue(newValue);
		} catch (error) {
			console.error(`Ошибка при записи в LocalStorage: ${error}`);
		}
	};

	const removeItem = () => {
		try {
			localStorage.removeItem(key);
			setValue(null);
		} catch (error) {
			console.error(`Ошибка при удалении из LocalStorage: ${error}`);
		}
	};

	return [value, { setItem, removeItem }];
};
