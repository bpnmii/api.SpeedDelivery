import { Entity, PrimaryColumn, Column } from 'typeorm'

export enum TipoOcorrenciaEnum {
  STATUS_ENTREGA = 'STATUS_ENTREGA',
  MOTIVO_OCORRENCIA = 'MOTIVO_OCORRENCIA',
  MOTIVO_PAUSA = 'MOTIVO_PAUSA',
}

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
  nome_ocorrencia!: string

  @Column({
    type: 'varchar',
    length: 40,
    nullable: true,
  })
  descricao_ocorrencia!: string

  @Column({
    type: 'enum',
    enum: TipoOcorrenciaEnum,
    default: TipoOcorrenciaEnum.MOTIVO_OCORRENCIA,
    nullable: true,
  })
  tipo_ocorrencia?: TipoOcorrenciaEnum
}
