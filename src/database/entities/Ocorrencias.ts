import { Entity, PrimaryColumn, Column, Index } from 'typeorm'

@Entity('Ocorrencias')
export class Ocorrencias {
  @PrimaryColumn({
    type: 'bigint',
    generated: 'increment', // Aqui o 'generated' é aceito legalmente
    transformer: {
      to: (value: string | number): number => Number(value),
      from: (value: string | number | null): string => {
        return value ? value.toString().padStart(5, '0') : ''
      },
    },
  })
  codigo_ocorrencia!: string

  @Column({
    type: 'varchar',
    length: 40,
  })
  descricao_ocorrencia!: string
}
