import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  JoinColumn,
} from 'typeorm'
import { Entregas } from './Entregas'

@Entity('ItensPedido')
export class ItensPedido {
  @OneToMany(() => Entregas, (entrega) => entrega.codigo_operacao)
  @JoinColumn({ name: 'codigo_entrega' })
  codigo_entrega!: number

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
