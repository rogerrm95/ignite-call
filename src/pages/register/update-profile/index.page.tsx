import {
  Avatar,
  Button,
  Heading,
  MultiStep,
  Text,
  TextArea,
} from '@ignite-ui/react'

import { GetServerSideProps } from 'next'
import { getServerSession } from 'next-auth'
import { useRouter } from 'next/router'
import { NextSeo } from 'next-seo'
import { useSession } from 'next-auth/react'

import { api } from '@/lib/axios'
import { buildNextAuthOption } from '@/pages/api/auth/[...nextauth].api'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import { ArrowRight } from 'phosphor-react'
import { Container, Header } from '../styles'
import { FormAnnotation, ProfileBox } from './styles'

const UpdateProfileFormSchema = z.object({
  bio: z.string(),
})

type UpdateProfileData = z.infer<typeof UpdateProfileFormSchema>

export default function UpdateProfile() {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<UpdateProfileData>({
    resolver: zodResolver(UpdateProfileFormSchema),
  })

  const session = useSession()
  const router = useRouter()

  async function handleUpdateProfile(data: UpdateProfileData) {
    await api.put('/users/profile', {
      bio: data.bio,
    })

    await router.push(`/schedule/${session.data?.user.username}`)
  }

  return (
    <>
      <NextSeo title="Atualize seu perfil | Ignite Call" noindex />

      <Container>
        <Header>
          <Heading as="strong">Bem-Vindo ao Ignite Call</Heading>
          <Text>
            Precisamos de algumas informações para criar seu perfil! Ah, você
            pode editar essas informações depois.
          </Text>

          <MultiStep size={4} currentStep={4} />
        </Header>

        <ProfileBox as="form" onSubmit={handleSubmit(handleUpdateProfile)}>
          <label>
            <Text>Foto de perfil</Text>

            <Avatar
              src={session.data?.user.avatar_url}
              alt={session.data?.user.name}
            />
          </label>

          <label>
            <Text>Sobre você</Text>
            <TextArea {...register('bio')} />
            <FormAnnotation size={'sm'}>
              Fale um pouco sobre você. Isto será exibido em sua página pessoal.
            </FormAnnotation>
          </label>

          <Button type="submit" disabled={isSubmitting}>
            Finalizar <ArrowRight />
          </Button>
        </ProfileBox>
      </Container>
    </>
  )
}

// Page Props é tudo o que é retornado de dentro de GetServerSideProps (Função) //
export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session = await getServerSession(
    req,
    res,
    buildNextAuthOption(req, res),
  )

  return {
    props: {
      session,
    },
  }
}
