import { Entity, Column, Index, PrimaryColumn } from 'typeorm'

export enum StatusEntregaEnum {
  NAO_INICIADO = 'NAO_INICIADO',
  INICIADO = 'INICIADO',
  PAUSADO = 'PAUSADO',
  CONCLUIDO = 'CONCLUIDO',
}

export enum StatusResultadoEnum {
  ENTREGA_TOTAL = 'ENTREGA_TOTAL',
  ENTREGA_PARCIAL = 'ENTREGA_PARCIAL',
  NAO_ENTREGUE = 'NAO_ENTREGUE',
}

@Entity('Entregas')
export class Entregas {
  @Column({
    type: 'int',
    generated: 'increment',
  })
  @Index()
  sequencia_entrega!: number

  @PrimaryColumn({
    type: 'bigint',
    generated: 'increment',
    transformer: {
      to: (value: string | number): number => Number(value),
      from: (value: string | number | null): string => {
        return value ? value.toString().padStart(5, '0') : ''
      },
    },
  })
  codigo_operacao!: string

  @Column({
    type: 'bigint',
    // transformer: {
    //   to: (value: string | number): number => Number(value),
    //   from: (value: string | number | null): string => {
    //     return value ? value.toString().padStart(5, '0') : ''
    //   },
    // },
  })
  codigo_cliente!: string

  @Column({ type: 'string', length: 40 })
  nome_cliente!: string

  @Column({ type: 'string', length: 40 })
  endereco!: string

  @Column({ type: 'string', length: 40 })
  bairro!: string

  @Column({ type: 'string', length: 40 })
  cidade!: string

  @Column({ type: 'string', length: 40 })
  estado!: string

  @Column({ type: 'string', length: 9 })
  CEP!: string
}
