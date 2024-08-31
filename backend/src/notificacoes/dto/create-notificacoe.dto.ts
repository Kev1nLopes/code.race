import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty } from "class-validator"

export class CreateNotificacoeDto {

    @ApiProperty()
    @IsNotEmpty({message: 'Informe a descrição da notificaçãos'})
    descricao: String

    @ApiProperty({example: 'erro | aviso | normal'})
    @IsNotEmpty({message: 'Informe o tipo da notificação'})
    tipo: String

    @ApiProperty({description: 'Array com ids das areas a serem notificadas'})
    arrayIds: Number[]
}
