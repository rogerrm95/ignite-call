import Image from 'next/image'

import { Container, Hero, Preview } from './styles'
import { Heading } from '@ignite-ui/react'

export default function Home() {
  return (
    <Container>
      <Hero>
        <Heading>Olá</Heading>
      </Hero>

      <Preview>
        <Image
          src=""
          priority
          height={500}
          quality={100}
          alt="Imagem da aplicação de Agenda online"
        />
      </Preview>
    </Container>
  )
}
