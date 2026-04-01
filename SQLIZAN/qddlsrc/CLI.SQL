Create Or Replace Table CLIENTES
(
  CLIENTE     FOR CODCLI Decimal(3, 0) Not Null Default 0,
  NOMBRE      FOR NOMCLI Char(30)      Not Null Default ' ',
  DIRECCION   FOR DIRCLI Char(30)      Not Null Default ' ',
  PROVINCIA   FOR PROCLI Decimal(2,0)  Not Null Default 0,
CONSTRAINT PK_CLIENTES PRIMARY KEY (CODCLI)
)
Rcdfmt RCLIENTES  ;
Label On Table CLIENTES
Is 'Maestro clientes '
;     