**free
dcl-s edad int(10) inz(21);
dcl-s mensaje char(40) inz(*blanks);
dcl-s pausa char(1);
if (edad<18);
    mensaje='Eres menor de edad';
    else;
    mensaje='Eres mayor de edad';
    endif;
    dsply mensaje;
    dsply 'Presiona una tecla para salir' '' pausa;
    return;