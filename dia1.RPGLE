**free

// 1. Declaración de variables
dcl-s nombre varchar(30) inz('Izan');
dcl-s edad int(10) inz(20);
dcl-s pausa char(1);

// 2. Lógica simple
edad = edad + 1;

// 3. Salida por consola (DSPLY)
dsply ('Hola ' + nombre);
dsply ('Edad el año que viene: ' + %char(edad))'' pausa;

// 5. Finalizar programa y cerrar memoria
*inlr = *on;
return;

//prueba push 3