**free
// 1. Declaración de variables (pág. 11 de tus apuntes)
dcl-s nombre varchar(30) inz('Izan');
dcl-s edad int(10) inz(20);
dcl-s sueldo packed(7:2) inz(1500.75);

// 2. Lógica simple (pág. 18)
edad = edad + 1;

// 3. Salida por consola (El "System.out.println" de RPG)
dsply ('Hola ' + nombre);
dsply ('Edad el año que viene: ' + %char(edad));
dsply ('Sueldo: ' + %char(sueldo));

return