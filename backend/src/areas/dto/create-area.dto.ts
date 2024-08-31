import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty } from 'class-validator'
import { Perimetro } from '../entities/area.entity'

export class CreateAreaDto {
  @ApiProperty()
  @IsNotEmpty({ message: 'Informe o nome da area' })
  nome: string

  @ApiProperty()
  @IsNotEmpty({ message: 'Informe o tipo da area' })
  tipo: string

  @ApiProperty()
  @IsNotEmpty({ message: 'Informe o perimetro' })
  poligonos: Perimetro
}
