import { Entity, Column, PrimaryColumn } from 'typeorm'

@Entity('ItensPedido')
export class ItensPedido {
  @Column({
    type: 'bigint',
    // transformer: {
    //   to: (value: string | number): number => Number(value),
    //   from: (value: string | number | null): string => {
    //     return value ? value.toString().padStart(5, '0') : ''
    //   },
    // },
  })
  codigo_entrega!: number

  @PrimaryColumn({
    type: 'bigint',
    transformer: {
      to: (value: string | number): number => Number(value),
      from: (value: string | number | null): string => {
        return value ? value.toString().padStart(5, '0') : ''
      },
    },
  })
  codigo!: number

  @Column({ type: 'string', length: 40 })
  descricao_produto!: string

  @Column({ type: 'string', length: 40 })
  embalagem!: string

  @Column({
    type: 'bigint',
    transformer: {
      to: (value: string | number): number => Number(value),
      from: (value: string | number | null): string => {
        return value ? value.toString().padStart(5, '0') : ''
      },
    },
  })
  quantidade!: number
}
