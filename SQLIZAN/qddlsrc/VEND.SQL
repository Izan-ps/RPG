Create Or Replace Table VENDEDORES
(
  VENDEDOR    FOR CODVEN Decimal(2, 0) Not Null Default 0,
  NOMBRE      FOR NOMVEN Char(30)      Not Null Default ' ',
  MANAGER     FOR CODMAN Decimal(2, 0) Not Null Default 0,
  ZONA        FOR CODZON Decimal(2,0)  Not Null Default 0,
CONSTRAINT PK_VENDEDORES PRIMARY KEY (CODVEN)
)
Rcdfmt RVENDEDOR  ;
Label On Table VENDEDORES
Is 'Maestro vendedores ';