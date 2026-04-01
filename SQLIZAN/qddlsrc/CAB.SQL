Create Or Replace Table CABECERA
(
  FECHA       FOR FECALB Date          Not Null Default '1900-01-01',
  ALBARAN     FOR NUMALB Decimal(6, 0) Not Null Default 0,
  CLIENTE     FOR CODCLI Decimal(3, 0) Not Null Default 0,
  VENDEDOR    FOR CODVEN Decimal(2, 0) Not Null Default 0,
CONSTRAINT PK_ALBARAN PRIMARY KEY (FECALB, NUMALB)
)
Rcdfmt RCABECERA  ;
Label On Table CABECERA
Is 'Cabecera de ventas '
 ;