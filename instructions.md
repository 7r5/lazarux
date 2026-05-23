# Copilot Instructions

Estas son las reglas básicas para colaborar en este repositorio con Copilot:

1. Mantén el frontend en español.
   - Los textos visibles para el usuario deben estar en español.
   - Los componentes, páginas y mensajería UI deben usar idioma español.

2. Mantén el codebase en inglés.
   - Nombres de archivos, variables, funciones, clases y rutas deben estar en inglés.
   - Los mensajes de log, nombres de módulos y comments técnicos pueden usar inglés según convenga.

3. Los comentarios en el código deben ir en español.
   - Cualquier código generado o modificado debe incluir comentarios explicativos en español.
   - Los comentarios deben ser claros y describir la intención o la lógica.

4. Sigue buenas prácticas básicas.
   - Escribe código limpio y legible.
   - Usa convenciones consistentes de formato y nombres.
   - Evita duplicación innecesaria.
   - Maneja errores claramente y devuelve mensajes útiles.
   - Mantén las dependencias actualizadas y compatibles.

5. El backend debe usar la base de datos para autenticación cuando se implemente auth.
   - No debes dejar autenticación dummy como solución final.
   - Registros y logins deben validarse con datos reales en la base de datos.

6. Automatiza commits de los cambios nuevos.
   - Cuando se realicen cambios nuevos relevantes, créalos y guarda un commit local.
   - No hagas push de esos commits hasta que el usuario lo autorice.
   - No preguntes al usuario si debe hacerse push.

7. No elimines servicios importantes sin motivo.
   - Mantén la configuración de Docker Compose y los servicios locales funcionales.

8. Documenta los cambios.
   - Actualiza `README.md` o archivos de instrucciones cuando agregues funcionalidades o cambies rutas relevantes.

9. Versionado automático.
   - Para la app frontend, usa `npm version patch`, `npm version minor` o `npm version major`.
   - `npm version` crea un commit y un tag Git automáticamente.
   - Si quieres solo actualizar el número sin tag, usa `npm version patch --no-git-tag-version`.
   - El backend no se versiona automáticamente desde `package.json`.

> Recuerda: el frontend va en español, el código en inglés, los comentarios en español, commits locales automáticos, y sin push hasta orden del usuario.
> También recuerda que cuando aparezca recomendado, se debe dejar un recordatorio en este archivo sobre versionado automático con `npm version`.
