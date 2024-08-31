import { Image } from 'tamagui'

export type UserAvatarProps = {
  name: string
  size?: number
}

const diceBearAvatar = (seed: string) =>
  `https://api.dicebear.com/9.x/dylan/png?seed=${seed}`

export function UserAvatar(props: UserAvatarProps) {
  return (
    <Image
      width={props.size ?? 64}
      height={props.size ?? 64}
      borderRadius={props.size ? props.size / 2 : 32}
      src={diceBearAvatar(props.name.replaceAll(' ', '++'))}
      alt={`Avatar de ${props.name}`}
    />
  )
}
