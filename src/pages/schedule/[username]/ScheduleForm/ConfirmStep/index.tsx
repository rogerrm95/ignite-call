import { Button, Text, TextArea, TextInput } from '@ignite-ui/react'
import { ConfirmForm, FormActions, FormHeader } from './styles'
import { CalendarBlank, Clock } from 'phosphor-react'

export function ConfirmStep() {
  function handleConfirmScheduling() {}

  return (
    <ConfirmForm as="form" onSubmit={handleConfirmScheduling}>
      <FormHeader>
        <Text>
          <CalendarBlank />
          26 de Abril de 2023
        </Text>

        <Text>
          <Clock />
          18:00
        </Text>
      </FormHeader>

      <label>
        <Text size={'sm'}>Nome completo</Text>
        <TextInput placeholder="Seu nome" />
      </label>

      <label>
        <Text size={'sm'}>Endereço de E-mail</Text>
        <TextInput type="email" placeholder="johndoe@test.com" />
      </label>

      <label>
        <Text size={'sm'}>Observações</Text>
        <TextArea />
      </label>

      <FormActions>
        <Button type="button" variant={'tertiary'}>
          Cancelar
        </Button>
        <Button type="submit">Confirmar</Button>
      </FormActions>
    </ConfirmForm>
  )
}
