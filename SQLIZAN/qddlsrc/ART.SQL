SET SCHEMA SQLIZAN;
Create Or Replace Table ARTICULOS
(
  ARTICULO    FOR CODART Char(3)      Not Null Default ' ',
  DESCRIPCION FOR NOMART Char(30)     Not Null Default ' ',
  PRECIO      FOR PREART Decimal(6,2) Not Null Default 0 ,
CONSTRAINT PK_ARTICULOS PRIMARY KEY (CODART)
)
Rcdfmt RARTICULOS  ;
Label On Table ARTICULOS
Is 'Maestro artÍculos '
 ;   