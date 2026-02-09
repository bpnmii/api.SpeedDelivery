import { Entity, Column, PrimaryColumn } from 'typeorm'

@Entity('ItensPedido')
export class ItensPedido {
  @Column({
    type: 'bigint',
  })
  codigo_entrega!: number

  @PrimaryColumn({
    type: 'bigint',
  })
  codigo!: number

  @Column({ type: 'string', length: 40 })
  descricao_produto!: string

  @Column({ type: 'string', length: 40 })
  embalagem!: string

  @Column({
    type: 'bigint',
  })
  quantidade!: number
}
