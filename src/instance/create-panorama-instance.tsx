import React from 'react';
import ReactDOM from 'react-dom/client';
import { createPanoramaStore } from '@/store/create-panorama-store';
import { createPanoramaApi } from '@/api/create-panorama-api';
import { PanoramaContext } from '@/instance/panorama-context';
import { PanoramaViewer } from '@/components/panorama-viewer';

export const createPanoramaInstance = () => {
    let store: ReturnType<typeof createPanoramaStore>;
    let api: ReturnType<typeof createPanoramaApi>;

    store = createPanoramaStore();
    api = createPanoramaApi(store);

    return {
        get api() {
            if (!api) {
                throw new Error('Instance not initialized. Call init() first.');
            }
            return api;
        },

        get PanoramaViewer() {
            return () => (
                <PanoramaContext.Provider value={{ store, api }}>
                    <PanoramaViewer />
                </PanoramaContext.Provider>
            )
        },

        mount(container: HTMLElement) {
            const root = ReactDOM.createRoot(container);
            root.render(
                <React.StrictMode>
                    <PanoramaContext.Provider value={{ store, api }}>
                        <PanoramaViewer />
                    </PanoramaContext.Provider>
                </React.StrictMode>
            )

            return { 
                unmount: () => root.unmount(), 
                api: this.api 
            }
        }
    }
};