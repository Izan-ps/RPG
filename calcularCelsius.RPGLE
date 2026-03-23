*free
dcl-s grados int(10) inz(25);
dcl-s farenheit packed(10:2) inz(0);
      farenheit=(grados*9/5)+32;
dcl-s pausa char(1);
dsply ('Grados en farenheit: '+%char(farenheit));
dsply 'Presiona cualquier tecla para salir' '' pausa;
return;