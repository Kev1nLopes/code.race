import { Poligonos } from "src/areas/entities/area.entity";
import { Usuario } from "src/usuarios/entities/usuario.entity";
import { Column, Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Marker {

    @PrimaryGeneratedColumn()
    id: Number
    
    @Column({type: 'text', nullable: false})
    descricao: String

    @Column({ nullable: false})
    latitude: String

    @Column({ nullable: false})
    longitude: String

    @Column({default: false})
    ativo: boolean

    @ManyToOne(() => Usuario, (usuario) => usuario.markers)
    usuario: Usuario

}
