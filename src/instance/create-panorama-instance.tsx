import React from 'react';
import ReactDOM from 'react-dom/client';
import { createPanoramaStore } from '@/store/create-panorama-store';
import { createPanoramaApi } from '@/api/create-panorama-api';
import { PanoramaContext } from '@/instance/panorama-context';
import { PanoramaViewer } from '@/components/panorama-viewer';

export const createPanoramaInstance = () => {
    const store = createPanoramaStore();
    const api = createPanoramaApi(store);

    const renderContent = () => (
        <PanoramaContext.Provider value={{ store, api }}>
            <PanoramaViewer />
        </PanoramaContext.Provider>
    )

    const PanoramaComponent = React.memo(renderContent);

    return {
        api,
        PanoramaViewer: PanoramaComponent,

        mount(container: HTMLElement) {
            const root = ReactDOM.createRoot(container);
            root.render(
                <React.StrictMode>
                    {renderContent()}
                </React.StrictMode>
            )

            return { 
                unmount: () => root.unmount(), 
                api: this.api 
            }
        }
    }
};