import { Usuario } from "src/usuarios/entities/usuario.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Log {

    @PrimaryGeneratedColumn()
    id: Number;

    @Column()
    descricao: String


    @CreateDateColumn({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP',
        comment: 'A data que o log foi criado',
      })
    data_criacao: Date

    @ManyToOne(() => Usuario, (usuario) => usuario.logs)
    usuario: Usuario
}
