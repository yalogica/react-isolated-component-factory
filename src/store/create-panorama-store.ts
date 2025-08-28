import { create } from 'zustand';

export interface PanoramaStoreState {
    background: string | null;
    controlsContainer: HTMLElement | null;

    setBackground: (background: string | null) => void;
    setControlsContainer: (el: HTMLElement | null) => void;
};

export const createPanoramaStore = () => create<PanoramaStoreState>()((set, get) => ({
    background: null,
    controlsContainer: null,
    
    setBackground: (background) => set({ background }),
    setControlsContainer: (el) => set({ controlsContainer: el }),
}));