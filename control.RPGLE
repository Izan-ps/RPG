**free
dcl-s edad int(10) inz(21);
dcl-s entrada char(1) inz('S');
dcl-s vip char(1) inz('N');
dcl-s resultado char(50);
dcl-s pausa char(1);

select;
when (entrada ='S' and edad >=18);
if(vip='S');
resultado = 'Bienvenido VIP';
else;
resultado = 'Bienvenido';
endif;
when (entrada = 'S' and edad<18);
resultado = 'No puedes entrar, eres menor de edad';
when (entrada = 'N');
resultado = 'No puedes entrar, o tienes entrada');
endsl;
dsply resultado;
dsply 'Pulsa una tecla para continuar' '' pausa;
return;