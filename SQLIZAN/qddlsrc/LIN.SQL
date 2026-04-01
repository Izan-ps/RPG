Create Or Replace Table LINEAS
(
  FECHA       FOR FECALB Date          Not Null Default '1900-01-01',
  ALBARAN     FOR NUMALB Decimal(6, 0) Not Null Default 0,
  LINEA       FOR LINALB Decimal(2, 0) Not Null Default 0,
  ARTICULO    FOR CODART Char(3)       Not Null Default ' ',
  UNIDADES    FOR UDS    Decimal(3, 0) Not Null Default 0,
  PRECIO      FOR PREART Decimal(6, 2) Not Null Default 0,
  PRECIO_MEDIO FOR PREMED Decimal(6, 2) Not Null Default 0,
CONSTRAINT PK_LINEAS  PRIMARY KEY (FECALB, NUMALB, LINALB)
)
Rcdfmt RLINEAS ;
Label On Table LINEAS
Is 'LÍneas de ventas '
 ;     
SELECT *
FROM LINEAS;