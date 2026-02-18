import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
} from 'typeorm'
import { Entregas } from './Entregas'
import { Ocorrencias } from './Ocorrencias'

@Entity('OcorrenciasEntrega')
export class OcorrenciasEntrega {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  index!: number

  // Relacionamento com a tabela Entregas
  @ManyToOne(() => Entregas)
  @JoinColumn({ name: 'codigo_entrega' })
  entrega!: Entregas

  // Relacionamento com a tabela Ocorrencias
  @ManyToOne(() => Ocorrencias)
  @JoinColumn({ name: 'codigo_ocorrencia' })
  ocorrencia!: Ocorrencias

  @CreateDateColumn({
    type: 'timestamp',
    name: 'created_at',
  })
  created_at!: Date
}
