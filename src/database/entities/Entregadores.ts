import { Entity, PrimaryColumn, Column, PrimaryGeneratedColumn } from 'typeorm'

@Entity('Entregadores')
export class Entregadores {
  @PrimaryGeneratedColumn({
    type: 'bigint',
  })
  codigo_entregador!: number

  @Column({
    type: 'varchar',
    length: 40,
  })
  unidade_negocio!: string

  @Column({
    type: 'varchar',
    length: 40,
  })
  email!: string

  @Column({
    type: 'varchar',
    length: 40,
  })
  senha!: string
}
