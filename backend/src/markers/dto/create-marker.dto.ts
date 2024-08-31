import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty } from "class-validator"

export class CreateMarkerDto {

      
    @ApiProperty()
    @IsNotEmpty({message: 'Informe um titulo para o ponto'})    
    titulo: String

    @ApiProperty()
    @IsNotEmpty({message: 'Informe uma descrição para o ponto'})    
    descricao: String

    @ApiProperty()
    @IsNotEmpty({message: 'Informe a latitude'})
    latitude: String
    
    @ApiProperty()
    @IsNotEmpty({message: 'Informe a longitude'})
    longitude: String
}
