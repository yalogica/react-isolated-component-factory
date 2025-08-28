import { createContext, useContext } from 'react';
import { createPanoramaStore } from '@/store/create-panorama-store';
import { createPanoramaApi } from '@/api/create-panorama-api';

export type PanoramaInstance = {
    store: ReturnType<typeof createPanoramaStore>;
    api: ReturnType<typeof createPanoramaApi>;
};

export const PanoramaContext = createContext<PanoramaInstance | null>(null);

export const usePanoramaInstance = () => {
    const ctx = useContext(PanoramaContext);
    if (!ctx) throw new Error('usePanoramaInstance must be used inside PanoramaProvider');
    return ctx;
};