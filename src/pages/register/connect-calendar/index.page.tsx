import { Button, Heading, MultiStep, Text } from '@ignite-ui/react'
import { signIn, useSession } from 'next-auth/react'
import { useRouter } from 'next/router'

import { ArrowRight, Check } from 'phosphor-react'
import { Container, Header } from '../styles'
import { ConnectBox, ConnectItem, AuthTextError } from './styles'

export default function ConnectCalendar() {
  const session = useSession()
  const router = useRouter()

  const hasRouterError = !!router.query.error
  const isSignIn = session.status === 'authenticated'

  async function handleSignIn() {
    await signIn('google')
  }

  return (
    <Container>
      <Header>
        <Heading as="strong">Conecte sua agenda!</Heading>
        <Text>
          Conecte o seu calendário para verificar automaticamente as horas
          ocupadas e os novos eventos à medida em que são agendados.
        </Text>

        <MultiStep size={4} currentStep={2} />
      </Header>

      <ConnectBox>
        <ConnectItem>
          <Text>Google Calendar</Text>
          {isSignIn ? (
            <Button size={'sm'} disabled>
              Conectado
              <Check />
            </Button>
          ) : (
            <Button variant={'secondary'} size={'sm'} onClick={handleSignIn}>
              Conectar
              <ArrowRight />
            </Button>
          )}
        </ConnectItem>

        {hasRouterError && (
          <AuthTextError size={'sm'}>
            Falha ao se conectar ao Google, verifique se você habilitou as
            permissões de acesso ao Google Calendar
          </AuthTextError>
        )}

        <Button type="submit" disabled={!isSignIn}>
          Proximo passo <ArrowRight />
        </Button>
      </ConnectBox>
    </Container>
  )
}
