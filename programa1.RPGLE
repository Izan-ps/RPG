**free
dcl-s precio int(10) inz(100);
dcl-s iva packed(3:2) inz (0.21);
dcl-s total packed(10:2) inz(0);
dcl-s pausa char(1);
total=precio*iva;
dsply ('El total es:'+%char(total));
dsply 'Presione para salir' '' pausa;
return;