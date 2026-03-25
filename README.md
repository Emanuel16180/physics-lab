# Simulador de Laboratorios de Física

MVP construido con Next.js 15, React 19, TypeScript y Tailwind CSS.

## Instrucciones para ejecutar con Docker Desktop

No necesitas tener Node ni npm instalado en tu PC, todo está empaquetado y listo para correr usando Docker.

1. Abre tu terminal en este directorio (`physics-sim`).
2. Asegúrate de tener Docker Desktop abierto y ejecutándose.
3. Ejecuta el siguiente comando para levantar la aplicación:

```bash
docker compose up --build
```

(Para dejarlo corriendo en segundo plano puedes usar `docker compose up -d --build`).

4. Abre tu navegador y accede a: [http://localhost:3000](http://localhost:3000)

## Características
- **Hot-reload habilitado**: Cualquier cambio en los archivos fuente se reflejará automáticamente en el navegador.
- **Frontend-only**: No requiere backend. Estado global manejado a través de React Context.
- **Física Reactiva**: Arrastra los componentes por la pizarra, interactúa con el cronómetro, y observa la generación de registros (tarjetas).

Para detener el servidor, si usaste `docker compose up`, simplemente presiona `Ctrl+C` en la terminal. Si usaste el modo en segundo plano (`-d`), ejecuta:
```bash
docker compose down
```
