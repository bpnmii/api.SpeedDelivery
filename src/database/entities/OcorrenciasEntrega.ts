import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  Column,
} from 'typeorm'
import { Entregas } from './Entregas'
import { Ocorrencias } from './Ocorrencias'

@Entity('OcorrenciasEntrega')
export class OcorrenciasEntrega {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  index!: number

  @ManyToOne(() => Entregas)
  @JoinColumn({ name: 'codigo_entrega' })
  entrega!: Entregas

  @ManyToOne(() => Ocorrencias)
  @JoinColumn({ name: 'codigo_ocorrencia' })
  ocorrencia!: Ocorrencias

  @CreateDateColumn({
    type: 'timestamp',
    name: 'created_at',
  })
  created_at!: Date
}
