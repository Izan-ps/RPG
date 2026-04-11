**FREE
DCL-F MENU WORKSTN SFILE(SFNOMB:wRrnNomb) SFILE(SFVEND:wRrnVend);

DCL-S wNum        PACKED(10:2);
DCL-S wBig        INT(20);
DCL-S wAlb        INT(20);
DCL-S wLin        INT(20);
DCL-S wRrnNomb    ZONED(4:0);
DCL-S wRrnVend    ZONED(4:0);
DCL-S wVendedor   INT(20);
DCL-S wTotalVend  INT(20);

EXEC SQL DECLARE C1 CURSOR FOR
  SELECT NOMBRE FROM TABLE(SQLIZAN.NOMBYDIR(:PARAM1));

EXEC SQL DECLARE C2 CURSOR FOR
  SELECT VENDEDOR, TOTAL_VENDIDO FROM TABLE(SQLIZAN.VENDEDORMAX());

DOW NOT *IN03;

  EXFMT RMENU;
  IF *IN03;
    LEAVE;
  ENDIF;

  SELECT;

    WHEN OPC = '1';
      EXEC SQL SELECT SQLIZAN.TOT_CLI()
               INTO :wBig
               FROM SYSIBM.SYSDUMMY1;
      RESULTADO = %CHAR(wBig);

    WHEN OPC = '2';
      *IN41 = *ON;
      WRITE CTLNOMB;
      *IN41 = *OFF;
      wRrnNomb = 0;

      EXEC SQL OPEN C1;
      EXEC SQL FETCH C1 INTO :SNOMBRE;
      DOW SQLCODE = 0;
        wRrnNomb += 1;
        WRITE SFNOMB;
        EXEC SQL FETCH C1 INTO :SNOMBRE;
      ENDDO;
      EXEC SQL CLOSE C1;

      IF wRrnNomb > 0;
        *IN40 = *ON;
        EXFMT CTLNOMB;
        *IN40 = *OFF;
      ENDIF;

    WHEN OPC = '3';
      EXEC SQL SELECT SQLIZAN.ARTPREC(:PARAM1)
               INTO :wNum
               FROM SYSIBM.SYSDUMMY1;
      RESULTADO = %CHAR(wNum);

    WHEN OPC = '4';
      wAlb = %INT(%TRIM(PARAM1));
      wLin = %INT(%TRIM(PARAM2));
      EXEC SQL SELECT SQLIZAN.FIMPLIN(:wAlb, :wLin)
               INTO :wNum
               FROM SYSIBM.SYSDUMMY1;
      RESULTADO = %CHAR(wNum);

    WHEN OPC = '5';
      wAlb = %INT(%TRIM(PARAM1));
      EXEC SQL SELECT SQLIZAN.TOTALB(:wAlb, :PARAM2)
               INTO :wNum
               FROM SYSIBM.SYSDUMMY1;
      RESULTADO = %CHAR(wNum);

    WHEN OPC = '6';
      *IN43 = *ON;
      WRITE CTLVEND;
      *IN43 = *OFF;
      wRrnVend = 0;

      EXEC SQL OPEN C2;
      EXEC SQL FETCH C2 INTO :wVendedor, :wTotalVend;
      DOW SQLCODE = 0;
        wRrnVend += 1;
        SVENDEDOR = %CHAR(wVendedor);
        STOTAL    = %CHAR(wTotalVend);
        WRITE SFVEND;
        EXEC SQL FETCH C2 INTO :wVendedor, :wTotalVend;
      ENDDO;
      EXEC SQL CLOSE C2;

      IF wRrnVend > 0;
        *IN42 = *ON;
        EXFMT CTLVEND;
        *IN42 = *OFF;
      ENDIF;

  ENDSL;

  OPC    = ' ';
  PARAM1 = *BLANKS;
  PARAM2 = *BLANKS;

ENDDO;

*INLR = *ON;
RETURN;