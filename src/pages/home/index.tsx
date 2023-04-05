import Image from 'next/image'
import AppPreviewImage from '../../assets/app-preview.png'

import { Heading, Text } from '@ignite-ui/react'
import { Container, Hero, Preview } from './styles'

export default function Home() {
  return (
    <Container>
      <Hero>
        <Heading as="h1" size="4xl">
          Agendamento descomplicado
        </Heading>
        <Text size="lg">
          Conecte seu calendário e permita que as pessoas marquem agendamentos
          no seu tempo livre.
        </Text>
      </Hero>

      <Preview>
        <Image
          src={AppPreviewImage}
          height={400}
          quality={100}
          priority
          alt="Imagem da aplicação de Agenda online"
        />
      </Preview>
    </Container>
  )
}
