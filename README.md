# React Isolated Component Factory

## Overview

React Isolated Component Factory is a demonstration of creating self-contained React components with isolated state management and external API access. This prototype showcases a pattern for building components that maintain their own Zustand stores while exposing controlled APIs for external interaction.

## Key Features

- **Isolated State Management**: Each component instance maintains its own Zustand store
- **External API Access**: Components expose controlled APIs for external manipulation
- **Factory Pattern**: Uses a factory approach for creating component instances
- **Context Integration**: Leverages React Context for API propagation
- **TypeScript Support**: Fully typed for better development experience

## Installation

```bash
git clone <repository-url>
cd react-isolated-component-factory
npm install
npm run dev
```

## Usage

```typescript
// Creating component instances
document.querySelectorAll('.panorama').forEach(panoramaEl => {
    if (panoramaEl instanceof HTMLElement) {
        const instance = createPanoramaInstance();
        
        instance.api.setBackground(getRandomColor());

        const cleanup = instance.mount(panoramaEl);
        instances.set(panoramaEl, cleanup);
    }
});

// External manipulation
setTimeout(() => {
    instances.forEach(instance => {
        instance.api.setBackground(getRandomColor());
    });
}, 5000);
```

## Architecture

The solution implements a factory pattern that:
1. Creates isolated Zustand stores for each component instance
2. Generates external APIs for controlled manipulation
3. Uses React Context to provide API access to components
4. Maintains complete isolation between component instances

This pattern is particularly useful for applications requiring:
- Multiple instances of the same component
- External control of component behavior
- Isolated state management per instance
- Clean separation of concerns

## License

[MIT](LICENSE)