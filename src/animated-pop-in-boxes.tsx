import { Box, HStack, VStack, type BoxProps } from '@chakra-ui/react'
import { AnimatePresence, motion } from 'framer-motion'
import { useState, type ReactNode } from 'react'

const MotionBox = motion(Box)

export function AnimatedPopInBoxes({ children, ...rest }: { children: ReactNode[] } & BoxProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)

  const selected = selectedIndex !== null ? children[selectedIndex] : null
  const others =
    selectedIndex !== null
      ? children.map((c, i) => ({ child: c, index: i })).filter(({ index }) => index !== selectedIndex)
      : children.map((c, i) => ({ child: c, index: i }))

  return (
    <VStack spacing={6} align="center" {...rest}>
      <AnimatePresence mode="wait">
        {selectedIndex !== null && (
          <MotionBox
            key={`selected-${selectedIndex}`}
            as={motion.div}
            layoutId={`item-${selectedIndex}`}
            initial={{ y: 100, scale: 0.75, opacity: 0 }}
            animate={{ y: 0, scale: 1, opacity: 1 }}
            exit={{ y: -100, scale: 0.75, opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            {selected}
          </MotionBox>
        )}
      </AnimatePresence>

      <MotionBox
        as={motion.div}
        variants={{
          hidden: {},
          visible: {
            transition: {
              staggerChildren: 0.5,
            },
          },
        }}
        initial="hidden"
        animate="visible"
      >
        <HStack wrap="wrap" justify="center" spacing={selectedIndex !== null ? 0 : 4}>
          {others.map(({ child, index }) => (
            <MotionBox
              key={index}
              layoutId={`item-${index}`}
              cursor="pointer"
              onClick={() => setSelectedIndex(index)}
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { opacity: 0, scale: 1 },
                visible: {
                  opacity: 1,
                  scale: selectedIndex !== null ? 0.65 : 1,
                  transition: { duration: 0.05 },
                },
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
  return (
    <AnimatePresence>
      <Box
        as={motion.div}
        initial={{ y: 200, scale: 0.8 }}
        animate={{
          y: 0,
          scale: 1,
          transition: {
            y: { duration: 0.5, ease: 'easeOut' },
            scale: { duration: 0.5, ease: 'easeOut' },
          },
        }}
        exit={{
          y: 200,
          scale: 0.8,
          transition: {
            y: { duration: 0.1, ease: 'easeOut' },
            scale: { duration: 0.1, ease: 'easeOut' },
          },
        }}
        {...rest}
      >
        {children}
      </Box>
    </AnimatePresence>
  )
}