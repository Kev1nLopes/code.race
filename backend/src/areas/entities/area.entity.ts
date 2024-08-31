import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

export type Perimetro  ={
    perimetro: Poligonos[]
}
export type Poligonos  = {
    latitude: String;
    longitude: String
}

@Entity()
export class Area {

    @PrimaryGeneratedColumn()
    id: number;


    @Column()
    tipo: String;

    @Column({
        type: 'json',
        nullable: false
    })
    poligonos: Perimetro 

    @Column({ default: false })
    aprovado: boolean

    @Column({ default: false})
    ativa: boolean


}
