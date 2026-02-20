import { create } from 'zustand';

const useStore = create((set) => ({
    theme: localStorage.getItem('theme') || 'light',
    searchQuery: '',

    toggleTheme: () => set((state) => {
        const newTheme = state.theme === 'light' ? 'dark' : 'light';
        localStorage.setItem('theme', newTheme);
        document.documentElement.classList.toggle('dark', newTheme === 'dark');
        return { theme: newTheme };
    }),

    setSearchQuery: (query) => set({ searchQuery: query }),
}));

export default useStore;
