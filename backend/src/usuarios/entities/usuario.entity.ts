import { AfterInsert, Column, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";


@Entity('usuario', )
export class Usuario {

  @PrimaryGeneratedColumn()
  id: Number;

  @Column({nullable: false})
  nome: String;

  @Column({nullable: false})
  senha: String;

  @Column({nullable: false, unique: true})
  email: String;

  @Column({nullable: false, type: 'date'})
  data_nasc: Date;

  @Column({unique: true, nullable: true, default: null})
  cpf: String;

  @Column({nullable: true, default: null})
  telefone: String;

  @Column({ nullable: true,})
  cep: String;

  @Column({ nullable: true})
  uf: String;

  @Column({ nullable: true})
  cidade: String;

  @Column({ nullable: true})
  bairro: String;

  @Column({default: true, type: 'boolean'})
  ativo: boolean;

}
