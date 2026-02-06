import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Index,
  OneToMany,
  JoinColumn,
} from 'typeorm'
import { Entregas } from './Entregas'
import { Ocorrencias } from './Ocorrencias'

@Entity('OcorrenciasEntrega')
export class OcorrenciasEntrega {
  @OneToMany(() => Entregas, (entrega) => entrega.codigo_operacao)
  @JoinColumn({ name: 'codigo_entrega' })
  codigo_entrega!: number

  @OneToMany(() => Ocorrencias, (ocorrencias) => ocorrencias.codigo_ocorrencia)
  @JoinColumn({ name: 'codigo_ocorrencia' })
  descricao_ocorrencia!: number
}
