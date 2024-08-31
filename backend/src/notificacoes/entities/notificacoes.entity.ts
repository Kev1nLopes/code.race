import { Area } from 'src/areas/entities/area.entity'
import { Usuario } from 'src/usuarios/entities/usuario.entity'
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm'

export enum TipoNotificacao {
  ERRO = 'erro',
  AVISO = 'aviso',
  SUCESSO = 'sucesso',
  INFO = 'info',
}

@Entity({ name: 'notificacoes' })
export class Notificacoes {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  titulo: string

  @Column({ type: 'text', nullable: false })
  descricao: string

  @Column({
    type: 'enum',
    enum: TipoNotificacao,
    nullable: false,
    default: TipoNotificacao.INFO,
  })
  tipo: TipoNotificacao

  @Column({ default: true })
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
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'area_id',
      referencedColumnName: 'id',
    },
  })
  areas?: Area[]

  @ManyToOne(() => Usuario, (usuario) => usuario.notificacoes)
  sender: Usuario
}
