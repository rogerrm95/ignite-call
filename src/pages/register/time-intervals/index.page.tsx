import { useFieldArray, useForm } from 'react-hook-form'
import {
  Button,
  Checkbox,
  Heading,
  MultiStep,
  Text,
  TextInput,
} from '@ignite-ui/react'

import { ArrowRight } from 'phosphor-react'

import { Container, Header } from '../styles'
import {
  IntervalBox,
  IntervalContainer,
  IntervalDay,
  IntervalInputs,
  IntervalItem,
} from './styles'
import { z } from 'zod'
import { getWeekDays } from '@/utils/get-week-days'

const timeIntervalsSchema = z.object({})

export default function TimeIntervals() {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
    control,
  } = useForm({
    defaultValues: {
      intervals: [
        { weekDay: 0, enable: false, startTime: '08:00', endTime: '18:00' },
        { weekDay: 1, enable: true, startTime: '08:00', endTime: '18:00' },
        { weekDay: 2, enable: true, startTime: '08:00', endTime: '18:00' },
        { weekDay: 3, enable: true, startTime: '08:00', endTime: '18:00' },
        { weekDay: 4, enable: true, startTime: '08:00', endTime: '18:00' },
        { weekDay: 5, enable: true, startTime: '08:00', endTime: '18:00' },
        { weekDay: 6, enable: false, startTime: '08:00', endTime: '18:00' },
      ],
    },
  })

  const { fields } = useFieldArray({
    name: 'intervals',
    control,
  })

  const weekDays = getWeekDays()

  async function handleSetTimeIntervals() {}

  return (
    <Container>
      <Header>
        <Heading as="strong">Quase la!</Heading>
        <Text>
          Defina o intervalo de horários que você está disponivel em cada dia da
          semana.
        </Text>

        <MultiStep size={4} currentStep={3} />
      </Header>

      <IntervalBox as={'form'} onSubmit={handleSubmit(handleSetTimeIntervals)}>
        <IntervalContainer>
          {fields.map((field, index) => {
            return (
              <IntervalItem key={field.id}>
                <IntervalDay>
                  <Checkbox />
                  <Text>{weekDays[field.weekDay]}</Text>
                </IntervalDay>

                <IntervalInputs>
                  <TextInput
                    size={'sm'}
                    type="time"
                    step={60}
                    {...register(`intervals.${index}.startTime`)}
                  />

                  <TextInput
                    size={'sm'}
                    type="time"
                    step={60}
                    {...register(`intervals.${index}.endTime`)}
                  />
                </IntervalInputs>
              </IntervalItem>
            )
          })}
        </IntervalContainer>

        <Button type="submit">
          Próximo passo
          <ArrowRight />
        </Button>
      </IntervalBox>
    </Container>
  )
}
