import React from 'react'
import { ChakraProvider, Box } from '@chakra-ui/react'
import { AnimatedPopInBoxes } from './animated-pop-in-boxes'

function App() {
  return (
    <ChakraProvider>
      <Box p={8}>
        <AnimatedPopInBoxes>
          <Box w="120px" h="120px" bg="red.300" borderRadius="md" />
          <Box w="120px" h="120px" bg="green.300" borderRadius="md" />
          <Box w="120px" h="120px" bg="blue.300" borderRadius="md" />
        </AnimatedPopInBoxes>
      </Box>
    </ChakraProvider>
  )
}

export default App
