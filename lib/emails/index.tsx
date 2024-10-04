import { Button, Html, Body, Text, Tailwind } from '@react-email/components'
import * as React from 'react'

export default function Email() {
  return (
    <Html>
      <Tailwind>
        <Body className='font-sans'>
          <Text className='text-2xl font-bold'>Hi there!</Text>
          <Button href='https://example.com'>Click me!</Button>
        </Body>
      </Tailwind>
    </Html>
  )
}
