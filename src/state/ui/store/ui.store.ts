import { create } from 'zustand';

export interface IUIState {
  isMenuOpen: boolean;
  hasMenuBeenOpened: boolean;
}

export interface IUIActions {
  openMenu: () => void;
  closeMenu: () => void;
  toggleMenu: () => void;
}

export interface IUIStore extends IUIState, IUIActions {}

export const useUIStore = create<IUIStore>((set) => ({
  isMenuOpen: false,
  hasMenuBeenOpened: false,

  openMenu: () => {
    set({ isMenuOpen: true, hasMenuBeenOpened: true });
  },

  closeMenu: () => {
    set({ isMenuOpen: false });
  },

  toggleMenu: () => {
    set((state) => ({
      isMenuOpen: !state.isMenuOpen,
      hasMenuBeenOpened: true,
    }));
  },
}));

