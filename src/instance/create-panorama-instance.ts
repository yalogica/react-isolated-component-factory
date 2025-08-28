import React, { createElement } from 'react';
import ReactDOM from 'react-dom/client';
import { createPanoramaStore } from '@/store/create-panorama-store';
import { createPanoramaApi } from '@/api/create-panorama-api';
import { PanoramaContext } from '@/instance/panorama-context';
import { PanoramaViewer } from '@/components/panorama-viewer';

export const createPanoramaInstance = () => {
    let store: ReturnType<typeof createPanoramaStore>;
    let api: ReturnType<typeof createPanoramaApi>;

    return {
        get api() {
            if (!api) throw new Error('Instance not initialized. Call init() first.');
            return api;
        },

        get PanoramaViewer(): React.FC {
            return () => {
                if (!store) {
                    throw new Error('Store not initialized');
                }

                return createElement(
                    PanoramaContext.Provider, {
                        value: { store, api },
                        children: createElement(PanoramaViewer),
                    }
                )
            }
        },

        mount(container: HTMLElement, options?: { background?: string }) {
            store = createPanoramaStore();
            api = createPanoramaApi(store);
            
            if (options) {
                options.background && api.setBackground(options.background);
            }

            const root = ReactDOM.createRoot(container);
            
            root.render(
                createElement(
                    React.StrictMode, 
                    null,
                    createElement(this.PanoramaViewer)
                )
            )

            return {
                unmount: () => root.unmount(),
                api: this.api,
            }
        }
    }
};