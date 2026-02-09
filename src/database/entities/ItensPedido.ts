import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'

@Entity('ItensPedido')
export class ItensPedido {
  @Column({
    type: 'bigint',
  })
  codigo_entrega!: number

  @PrimaryGeneratedColumn({
    type: 'bigint',
  })
  codigo!: number

  @Column({ type: 'varchar', length: 40 })
  descricao_produto!: string

  @Column({ type: 'varchar', length: 40 })
  embalagem!: string

  @Column({
    type: 'bigint',
  })
  quantidade!: number
}
