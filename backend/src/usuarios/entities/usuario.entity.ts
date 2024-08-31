import { Area } from 'src/areas/entities/area.entity'
import { Log } from 'src/logs/entities/log.entity'
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

  @Column({ type: 'enum', enum: UserRole, default: UserRole.USER })
  role: UserRole

  @OneToMany(() => Area, (area) => area.createdBy)
  areas: Area[]
}
