import { create } from 'zustand';

interface UIState {
  searchOpen: boolean;

  footerExpanded: boolean;

  toggleSearch: () => void;
  setSearchOpen: (open: boolean) => void;
  toggleFooter: () => void;
  setFooterExpanded: (expanded: boolean) => void;
  resetUI: () => void;
}

export const useUIStore = create<UIState>((set) => ({
  searchOpen: false,
  footerExpanded: false,

  toggleSearch: () => set((state) => ({ searchOpen: !state.searchOpen })),

  setSearchOpen: (open) => set({ searchOpen: open }),

  toggleFooter: () => set((state) => ({ footerExpanded: !state.footerExpanded })),

  setFooterExpanded: (expanded) => set({ footerExpanded: expanded }),

  resetUI: () => set({ searchOpen: false, footerExpanded: false }),
}));
