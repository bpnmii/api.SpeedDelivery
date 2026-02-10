import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  JoinColumn,
  ManyToOne,
} from 'typeorm'
import { Entregas } from './Entregas'

@Entity('ItensPedido')
export class ItensPedido {
  @Column({ type: 'bigint' })
  codigo_entrega!: number

  @ManyToOne(() => Entregas, (entrega) => entrega.codigo_operacao)
  @JoinColumn({ name: 'codigo_entrega' })
  entrega!: Entregas

  @PrimaryGeneratedColumn({
    type: 'bigint',
  })
  codigo!: number

  @Column({ type: 'varchar', length: 40 })
  descricao_produto!: string

  @Column({ type: 'varchar', length: 40 })
  embalagem!: string

  @Column({
    type: 'bigint',
  })
  quantidade!: number
}
