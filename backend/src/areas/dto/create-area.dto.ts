import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";
import { Perimetro, Poligonos } from "../entities/area.entity";

export class CreateAreaDto {

    @ApiProperty()
    @IsNotEmpty({message: 'Informe o tipo da area'})
    tipo: String;

    @ApiProperty()
    @IsNotEmpty({message: 'Informe o perimetro'})
    poligonos: Perimetro
}

