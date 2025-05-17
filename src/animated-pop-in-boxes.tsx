import { Box, HStack, VStack, type BoxProps } from '@chakra-ui/react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { useState, type ReactNode } from 'react'

const MotionBox = motion(Box)

// Animation configs inspired by Sonner toast library
const springTransition = {
  type: 'spring',
  stiffness: 260,
  damping: 20
}

const smoothTransition = {
  type: 'tween',
  ease: [0.16, 1, 0.3, 1], // Smooth cubic-bezier curve
  duration: 0.3
}

export function AnimatedPopInBoxes({ children, ...rest }: { children: ReactNode[] } & BoxProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)
  const prefersReducedMotion = useReducedMotion()

  const selected = selectedIndex !== null ? children[selectedIndex] : null
  const others =
    selectedIndex !== null
      ? children.map((c, i) => ({ child: c, index: i })).filter(({ index }) => index !== selectedIndex)
      : children.map((c, i) => ({ child: c, index: i }))

  return (
    <VStack spacing={selectedIndex !== null ? 8 : 6} align="center" {...rest}>
      <Box position="relative" width="100%" height={selectedIndex !== null ? "80px" : "0px"} style={{ zIndex: 2 }} display="flex" justifyContent="center">
        <AnimatePresence>
          {selectedIndex !== null && (
            <MotionBox
              key={`box-${selectedIndex}`}
              as={motion.div}
              layoutId={`box-${selectedIndex}`}
              initial={{ y: 100, scale: 0.75, opacity: 0 }}
              animate={{ y: 0, scale: 1, opacity: 1 }}
              exit={{ y: -100, scale: 0.75, opacity: 0 }}
              transition={prefersReducedMotion ? { duration: 0.25 } : springTransition}
            >
              {selected}
            </MotionBox>
          )}
        </AnimatePresence>
      </Box>

      <MotionBox
        as={motion.div}
        variants={{
          hidden: {},
          visible: {
            transition: {
              staggerChildren: prefersReducedMotion ? 0.5 : 0.05,
            },
          },
        }}
        initial="hidden"
        animate="visible"
        style={{ zIndex: 1 }}
        mt={selectedIndex !== null ? 8 : 0}
      >
        <HStack wrap="wrap" justify="center" spacing={selectedIndex !== null ? 0 : 4}>
          {others.map(({ child, index }) => (
            <MotionBox
              key={`box-${index}`}
              layoutId={`box-${index}`}
              cursor="pointer"
              onClick={() => setSelectedIndex(index)}
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { opacity: 0, scale: 1 },
                visible: {
                  opacity: 1,
                  scale: selectedIndex !== null ? 0.65 : 1,
                  transition: prefersReducedMotion 
                    ? { duration: 0.05 }
                    : smoothTransition,
                },
              }}
              whileHover={prefersReducedMotion ? undefined : { 
                scale: selectedIndex !== null ? 0.67 : 1.02,
                transition: { type: 'spring', stiffness: 400, damping: 25 }
              }}
            >
              {child}
            </MotionBox>
          ))}
        </HStack>
      </MotionBox>
    </VStack>
  )
}

export function AnimatedPopInSingleBox({ children, ...rest }: { children: ReactNode } & BoxProps) {
  const prefersReducedMotion = useReducedMotion()
  
  return (
    <AnimatePresence>
      <Box
        as={motion.div}
        initial={{ y: 200, scale: 0.8 }}
        animate={{
          y: 0,
          scale: 1,
          transition: prefersReducedMotion ? {
            y: { duration: 0.5, ease: 'easeOut' },
            scale: { duration: 0.5, ease: 'easeOut' },
          } : springTransition
        }}
        exit={{
          y: 200,
          scale: 0.8,
          transition: prefersReducedMotion ? {
            y: { duration: 0.1, ease: 'easeOut' },
            scale: { duration: 0.1, ease: 'easeOut' },
          } : smoothTransition
        }}
        {...rest}
      >
        {children}
      </Box>
    </AnimatePresence>
  )
}