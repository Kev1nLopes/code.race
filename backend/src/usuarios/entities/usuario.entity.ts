import { Area } from 'src/areas/entities/area.entity'
import { Log } from 'src/logs/entities/log.entity'
import { Marker } from 'src/markers/entities/marker.entity'
import { Notificacoes } from 'src/notificacoes/entities/notificacoes.entity'
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'

export enum UserRole {
  USER = 'USER',
  INSTITUTION = 'INSTITUTION',
  FISCAL = 'FISCAL',
}

@Entity('usuario')
export class Usuario {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ nullable: false })
  nome: string

  @Column({ nullable: false })
  senha: string

  @Column({ nullable: false, unique: true })
  email: string

  @Column({ nullable: false, type: 'date' })
  data_nasc: Date

  @Column({ unique: true, nullable: true, default: null })
  cpf: string

  @Column({ nullable: true, default: null })
  telefone: string

  @Column({ nullable: true })
  cep: string

  @Column({ nullable: true })
  uf: string

  @Column({ nullable: true })
  cidade: string

  @Column({ nullable: true })
  bairro: string

  @Column({ default: true, type: 'boolean' })
  ativo: boolean

  @OneToMany(() => Log, (logs) => logs.usuario)
  logs: Log[]

  @OneToMany(() => Marker, (marker) => marker.usuario)
  markers: Marker[]

  @Column({ type: 'enum', enum: UserRole, default: UserRole.USER })
  role: UserRole

  @OneToMany(() => Area, (area) => area.createdBy)
  areas: Area[]

  @OneToMany(() => Notificacoes, (notificacoes) => notificacoes.sender)
  notificacoes: Notificacoes[]
}
