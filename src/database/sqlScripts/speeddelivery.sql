-- ============================================================================
-- DATABASE: SpeedDelivery
-- ============================================================================

DROP DATABASE IF EXISTS SpeedDelivery;
CREATE DATABASE SpeedDelivery;
USE SpeedDelivery;

-- ============================================================================
-- TABELA: Entregas
-- ============================================================================
CREATE TABLE Entregas (
  codigo_operacao    BIGINT UNSIGNED   NOT NULL AUTO_INCREMENT,
  sequencia_entrega  INT               NOT NULL,
  codigo_cliente     BIGINT UNSIGNED   NOT NULL,
  nome_cliente       VARCHAR(40)       NOT NULL,
  endereco           VARCHAR(40)       NOT NULL,
  bairro             VARCHAR(40)       NOT NULL,
  cidade             VARCHAR(40)       NOT NULL,
  estado             VARCHAR(40)       NOT NULL,
  CEP                VARCHAR(9)        NOT NULL,
  status_entrega     ENUM('NAO_INICIADO', 'INICIADO', 'PAUSADO', 'CONCLUIDO') 
                     NOT NULL DEFAULT 'NAO_INICIADO',
  status_resultado   ENUM('ENTREGA_TOTAL', 'ENTREGA_PARCIAL', 'NAO_ENTREGUE') 
                     NULL,

  PRIMARY KEY (codigo_operacao),
  INDEX idx_sequencia_entrega (sequencia_entrega)
) ENGINE=InnoDB;

-- ============================================================================
-- TABELA: ItensPedido
-- ============================================================================
CREATE TABLE ItensPedido (
  codigo             BIGINT UNSIGNED   NOT NULL AUTO_INCREMENT,
  codigo_entrega     BIGINT UNSIGNED   NOT NULL,
  descricao_produto  VARCHAR(40)       NOT NULL,
  embalagem          VARCHAR(40)       NOT NULL,
  quantidade         BIGINT UNSIGNED   NOT NULL,

  PRIMARY KEY (codigo),
  CONSTRAINT fk_itens_entrega
    FOREIGN KEY (codigo_entrega) REFERENCES Entregas (codigo_operacao)
    ON DELETE CASCADE
    ON UPDATE CASCADE
) ENGINE=InnoDB;

-- ============================================================================
-- TABELA: Ocorrencias
-- ============================================================================
CREATE TABLE Ocorrencias (
  codigo_ocorrencia    BIGINT UNSIGNED   NOT NULL AUTO_INCREMENT,
  descricao_ocorrencia VARCHAR(40)       NOT NULL,

  PRIMARY KEY (codigo_ocorrencia)
) ENGINE=InnoDB;

-- ============================================================================
-- TABELA: OcorrenciasEntrega (Tabela de Relacionamento)
-- ============================================================================
CREATE TABLE OcorrenciasEntrega (
  id                 INT UNSIGNED      NOT NULL AUTO_INCREMENT,
  codigo_entrega     BIGINT UNSIGNED   NOT NULL,
  codigo_ocorrencia  BIGINT UNSIGNED   NOT NULL,
  data_registro      DATETIME          DEFAULT CURRENT_TIMESTAMP,

  PRIMARY KEY (id),
  
  CONSTRAINT fk_ocorrencia_entrega_ref
    FOREIGN KEY (codigo_entrega) REFERENCES Entregas (codigo_operacao)
    ON DELETE CASCADE ON UPDATE CASCADE,

  CONSTRAINT fk_ocorrencia_lista_ref
    FOREIGN KEY (codigo_ocorrencia) REFERENCES Ocorrencias (codigo_ocorrencia)
    ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB;