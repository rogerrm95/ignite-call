import { useForm } from 'react-hook-form'
import z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import { Button, Text, TextInput } from '@ignite-ui/react'
import { ArrowRight } from 'phosphor-react'

import { ErrorAnnotation, Form } from './styles'
import { useRouter } from 'next/router'

const claimUsernameFormSchema = z.object({
  username: z
    .string()
    .min(3, { message: 'Informe um usuário válido' })
    .regex(/^([a-z\\-]+)$/i, {
      message: 'Usuário por ter apenas letras e hifens',
    })
    .transform((username) => username.toLocaleLowerCase()),
})

type ClaimUsernameFormData = z.infer<typeof claimUsernameFormSchema>

export function ClaimUsernameForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ClaimUsernameFormData>({
    resolver: zodResolver(claimUsernameFormSchema),
  })

  const router = useRouter()

  async function handleClaimUsername(data: ClaimUsernameFormData) {
    const { username } = data

    await router.push(`/register?username=${username}`)
  }

  return (
    <>
      <Form as="form" onSubmit={handleSubmit(handleClaimUsername)}>
        <TextInput
          size="sm"
          prefix="ignite.com/"
          placeholder="seu-usuario"
          {...register('username')}
        />

        <Button type="submit" size="sm" disabled={isSubmitting}>
          Reservar
          <ArrowRight weight="bold" />
        </Button>
      </Form>

      <ErrorAnnotation>
        <Text size="sm">
          {errors.username
            ? errors.username.message
            : 'Digite o nome do usuário'}
        </Text>
      </ErrorAnnotation>
    </>
  )
}
