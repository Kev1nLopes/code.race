import { ApiProperty } from '@nestjs/swagger'
import { IsEnum, IsNotEmpty } from 'class-validator'
import { TipoNotificacao } from '../entities/notificacoes.entity'

export class CreateNotificacoeDto {
  @ApiProperty()
  @IsNotEmpty({ message: 'Informe o titulo da notificação' })
  titulo: string

  @ApiProperty()
  @IsNotEmpty({ message: 'Informe a descrição da notificaçãos' })
  descricao: string

  @ApiProperty({ example: 'erro | aviso | sucesso | info' })
  @IsNotEmpty({ message: 'Informe o tipo da notificação' })
  @IsEnum(TipoNotificacao)
  tipo: TipoNotificacao

  @ApiProperty({ description: 'Array com ids das areas a serem notificadas' })
  arrayIds: Number[]
}
