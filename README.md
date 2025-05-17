# Animated Pop-in Boxes

A React component that creates beautiful animated pop-in boxes using Framer Motion and Chakra UI.

## Features

- Smooth animations for box transitions
- Responsive design
- Support for multiple boxes with selection
- Single box animation variant
- Built with TypeScript for type safety

## Installation

```bash
npm install
```

## Usage

```tsx
import { AnimatedPopInBoxes, AnimatedPopInSingleBox } from './src/animated-pop-in-boxes';

// For multiple boxes
<AnimatedPopInBoxes>
  <Box>Box 1</Box>
  <Box>Box 2</Box>
  <Box>Box 3</Box>
</AnimatedPopInBoxes>

// For a single box
<AnimatedPopInSingleBox>
  <Box>Single Box</Box>
</AnimatedPopInSingleBox>
```

## Dependencies

- React
- Framer Motion
- Chakra UI
- TypeScript

## License

MIT
