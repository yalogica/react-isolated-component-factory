import { useRef, useContext, useEffect } from 'react';
import { PanoramaContext } from '@/instance/panorama-context';

export const PanoramaViewer = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const controlsRef = useRef<HTMLDivElement>(null);

    const { store, api } = useContext(PanoramaContext)!;
    
    const background = store((s) => s.background);

    useEffect(() => {
        if (!containerRef.current) {
            return;
        }

        // const v = new Viewer(containerRef.current, { tourStoreUrl });
        // store.getState().viewer.set(v);
        // api.emit('viewer.ready', { viewer: v, tourId });

        return () => {
            //store.getState().viewer.reset();
        }
    }, []);

    useEffect(() => {
        store.getState().setControlsContainer(controlsRef.current);
    }, []);

    return (
        <div ref={containerRef} style={{ position: 'relative', width: '100%', height: '100%', backgroundColor: background ?? undefined }}>
            <div ref={controlsRef} style={{ position: 'absolute', width: '100%', height: '100%', top: 0, left: 0 }} />
        </div>
    )
};