import { ApiProperty, PartialType } from '@nestjs/swagger'
import { CreateUsuarioDto } from './create-usuario.dto'

export class UpdateUsuarioDto extends PartialType(CreateUsuarioDto) {
  @ApiProperty()
  id: number

  @ApiProperty()
  cpf: number

  @ApiProperty()
  cep: number

  @ApiProperty()
  uf: number

  @ApiProperty()
  cidade: number

  @ApiProperty()
  bairro: number
}
