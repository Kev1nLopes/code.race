import { Area } from "src/areas/entities/area.entity";
import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'notificacoes'})
export class Notificacoes {

    @PrimaryGeneratedColumn()
    id: Number

    @Column({type: 'text', nullable: false})
    descricao: String

    @Column({nullable: false})
    tipo: String

    @Column({default: true})
    ativo: boolean

    @CreateDateColumn({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP',
        comment: 'Data que a coluna foi criada',
      })
    data_criacao: Date

    @ManyToMany(() => Area, (area) => area.notificacoes)
    @JoinTable({
        name: 'notificacoes_area',
        joinColumn: {
            name: 'notificacao_id',
            referencedColumnName: 'id'
        },
        inverseJoinColumn: {
            name: 'area_id',
            referencedColumnName: 'id'
        }
    })
    areas?: Area[]

}
