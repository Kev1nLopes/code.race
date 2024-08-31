import { Notificacoes } from 'src/notificacoes/entities/notificacoes.entity'
import { Usuario } from 'src/usuarios/entities/usuario.entity'
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'

export type Perimetro = {
  perimetro: Poligonos[]
}

export type Poligonos = {
  latitude: string
  longitude: string
}

export enum StatusArea {
  EM_RISCO = 'EM_RISCO',
  EM_ALERTA = 'EM_ALERTA',
  EM_PERIGO = 'EM_PERIGO',
  SEM_RISCO = 'SEM_RISCO',
  SEGURADA = 'SEGURADA',
  EM_ANALISE = 'EM_ANALISE',
}

@Entity()
export class Area {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  nome: string

  @Column()
  tipo: string

  @Column({
    type: 'json',
    nullable: false,
  })
  poligonos: Perimetro

  @Column({ type: 'enum', enum: StatusArea, default: StatusArea.EM_ANALISE })
  status: StatusArea

  @Column({ default: false })
  aprovado: boolean

  @Column({ type: 'date', nullable: true })
  analisadoEm: Date

  @Column({ default: false })
  ativa: boolean

  @ManyToMany(() => Notificacoes, (notificacoes) => notificacoes.areas)
  notificacoes: Notificacoes[]
  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date

  @ManyToOne(() => Usuario, (usuario) => usuario.areas)
  createdBy: Usuario
}
