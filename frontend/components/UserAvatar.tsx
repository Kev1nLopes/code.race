import { Image } from 'tamagui'

export type UserAvatarProps = {
  name: string
}

const diceBearAvatar = (seed: string) =>
  `https://api.dicebear.com/9.x/dylan/png?seed=${seed}`

export function UserAvatar(props: UserAvatarProps) {
  return (
    <Image
      width={64}
      height={64}
      borderRadius={32}
      src={diceBearAvatar(props.name.replaceAll(' ', '++'))}
      alt={`Avatar de ${props.name}`}
    />
  )
}
