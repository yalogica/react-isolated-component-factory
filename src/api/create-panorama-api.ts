import { createPanoramaStore, PanoramaStoreState } from '@/store/create-panorama-store';

export const createPanoramaApi = (store: ReturnType<typeof createPanoramaStore>) => {
    return {
        setBackground(background: string | null) {
            store.getState().setBackground(background);
        },

        getState(): PanoramaStoreState {
            return store.getState();
        }
    }
};