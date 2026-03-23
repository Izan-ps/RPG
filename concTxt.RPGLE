**free
dcl-s nombre char(20) inz('Izan');
dcl-s apellido char(25) inz('Ponce de Leon');
dcl-s edad int(3) inz(21);
dcl-s pausa char(1);
dsply('Hola, mi nombre es '+nombre+' '+apellido+' y tengo '+char(edad)+' años.');
dsply 'Presiona una tecla para salir' '' pausa;
return;