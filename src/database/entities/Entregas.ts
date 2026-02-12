import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'

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
  @PrimaryGeneratedColumn({
    type: 'bigint',
  })
  codigo_operacao!: number

  @Column({ type: 'int' })
  sequencia_entrega!: number

  @Column({
    type: 'bigint',
  })
  codigo_cliente!: number

  @Column({ type: 'varchar', length: 40 })
  nome_cliente!: string

  @Column({ type: 'varchar', length: 40 })
  endereco!: string

  @Column({ type: 'varchar', length: 40 })
  bairro!: string

  @Column({ type: 'varchar', length: 40 })
  cidade!: string

  @Column({ type: 'varchar', length: 40 })
  estado!: string

  @Column({ type: 'varchar', length: 9 })
  CEP!: string

  @Column({ type: 'varchar', length: 80 })
  Observacao!: string

  @Column({
    type: 'enum',
    enum: StatusEntregaEnum,
    default: StatusEntregaEnum.NAO_INICIADO,
    nullable: true,
  })
  status_entrega?: StatusEntregaEnum

  @Column({
    type: 'enum',
    enum: StatusResultadoEnum,
    default: StatusResultadoEnum.NAO_ENTREGUE,
    nullable: true,
  })
  status_resultado?: StatusResultadoEnum
}
