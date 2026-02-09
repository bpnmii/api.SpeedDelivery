import { Entity, PrimaryColumn, Column, Index } from 'typeorm'

@Entity('Ocorrencias')
export class Ocorrencias {
  @PrimaryColumn({
    type: 'bigint',
    generated: 'increment',
  })
  codigo_ocorrencia!: number

  @Column({
    type: 'varchar',
    length: 40,
  })
  descricao_ocorrencia!: string
}
