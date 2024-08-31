import { LoginFields, loginSchema, useSession } from '@/hooks/SessionContext'
import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useForm } from 'react-hook-form'

import { Button, Input, Label, Text, YStack } from 'tamagui'

export function LoginForm() {
  const { signIn } = useSession()
  const { control, handleSubmit, setFocus } = useForm<LoginFields>({
    resolver: zodResolver(loginSchema),
  })

  function onSubmit(data: LoginFields) {
    signIn(data)
  }

  return (
    <YStack flex={1} justifyContent='center' padding='$4'>
      <YStack backgroundColor='$gray5' padding='$4' borderRadius='$4'>
        <Controller
          control={control}
          name='email'
          render={({ field, fieldState: { error } }) => {
            return (
              <YStack>
                <Label htmlFor='email'>Email</Label>
                <Input
                  id='email'
                  onSubmitEditing={() => setFocus('senha')}
                  keyboardType='email-address'
                  returnKeyType='next'
                  onChangeText={field.onChange}
                  {...field}
                />
                <Text color={error ? '$red10' : 'white'}>
                  {error?.message ?? ''}
                </Text>
              </YStack>
            )
          }}
        />
        <Controller
          control={control}
          name='senha'
          render={({ field, fieldState: { error } }) => {
            return (
              <YStack>
                <Label htmlFor='senha'>Senha</Label>
                <Input
                  id='senha'
                  secureTextEntry
                  onSubmitEditing={handleSubmit(onSubmit)}
                  returnKeyType='done'
                  onChangeText={field.onChange}
                  {...field}
                />
                <Text color={error ? '$red10' : 'white'}>
                  {error?.message ?? ''}
                </Text>
              </YStack>
            )
          }}
        />
        <Button marginTop='$2' onPress={handleSubmit(onSubmit)}>
          Entrar
        </Button>
      </YStack>
    </YStack>
  )
}
