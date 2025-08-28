import { createPanoramaInstance } from '@/instance/create-panorama-instance';
import { createPanoramaApi } from '@/api/create-panorama-api';

function getRandomColor() {
  return `#${Math.floor(Math.random() * 0x1000000).toString(16).padStart(6, '0')}`;
}

window.addEventListener('load', async () => {
    const instances = new Map<HTMLElement, { unmount: () => void, api: ReturnType<typeof createPanoramaApi> }>();

    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            mutation.removedNodes.forEach((node) => {
                if (node instanceof HTMLElement && node.classList?.contains('panorama')) {
                    const cleanup = instances.get(node);
                    if (cleanup) {
                        cleanup.unmount();
                        instances.delete(node);
                        console.log('Panorama unmounted:', node);
                    }
                }
            });
        });
    });

    observer.observe(document.body, {
        childList: true,
        subtree: true,
    });

    document.querySelectorAll('.panorama').forEach(panoramaEl => {
        if (panoramaEl instanceof HTMLElement) {
            const instance = createPanoramaInstance();
            
            instance.api.setBackground(getRandomColor());

            const cleanup = instance.mount(panoramaEl);
            instances.set(panoramaEl, cleanup);
        }
    });

    setTimeout(() => {
        instances.forEach(instance => {
            instance.api.setBackground(getRandomColor());
        });
    }, 5000);
});