import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty } from "class-validator"

export class CreateMarkerDto {


    @ApiProperty()
    @IsNotEmpty({message: 'Informe uma descrição para o marcado'})    
    descricao: String

    @ApiProperty()
    @IsNotEmpty({message: 'Informe a latitude'})
    latitude: String
    
    @ApiProperty()
    @IsNotEmpty({message: 'Informe a longitude'})
    longitude: String
}
