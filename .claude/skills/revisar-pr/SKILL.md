---
name: revisar-pr
description: Revisa una pull request de este repositorio cuando se pide revisar, validar o dar el visto bueno a una PR, por número o la de la rama actual. Contrasta la PR con los criterios de aceptación de su issue, CLAUDE.md, commitlint y la CI, y devuelve un informe con veredicto sin publicar nada en GitHub. No la uses para explicar código, revisar cambios que aún no tienen PR ni resolver issues.
argument-hint: '[numero-pr]'
context: fork
background: false
allowed-tools:
  - Read
  - Grep
  - Glob
  - Bash(git diff *)
  - Bash(git log *)
  - Bash(npx commitlint *)
  - mcp__github__pull_request_read
  - mcp__github__issue_read
  - mcp__github__list_pull_requests
  - mcp__github__get_file_contents
  - mcp__github__actions_list
  - mcp__github__get_job_logs
---

Revisa una pull request de `borjafmv/proyecto_curso` y devuelve un informe.

PR que se revisa: «$ARGUMENTS». Si está vacío, revisa la PR abierta de la rama actual.

## Límites

- Solo lees e informas. No comentes en la PR, no la apruebes, no pidas cambios, no la mergees, no edites archivos ni hagas push. Si hay que publicar algo en GitHub, lo decide el usuario en la conversación principal.
- Usa solo las herramientas de `allowed-tools`. Si para comprobar algo necesitas otra, no la uses: anótalo en «Pendientes de verificar».
- Revisa la PR, no tu copia local. Lee los archivos del último commit de la PR con `mcp__github__get_file_contents` (con el `sha` de ese commit). Usa `Read`, `Grep`, `Glob`, `git diff` y `git log` sobre la copia local solo si `git log -1 --format=%H` coincide con ese commit.

## Procedimiento

1. **Lee la PR, su issue y la CI.**
   - Sin número, toma la rama actual de `git log -1 --format=%D` (lo que sigue a `HEAD ->`) y busca su PR con `mcp__github__list_pull_requests` (`head: borjafmv:<rama>`, `state: open`). Si no hay ninguna o hay varias, para y dilo.
   - Con `mcp__github__pull_request_read`, usa `get` (título, descripción, ramas base y de origen, último commit), `get_commits`, `get_files` y `get_diff`.
   - Busca «Closes #n» en la descripción y lee esa issue con `mcp__github__issue_read` (`get` y `get_comments`).
   - Lee el estado de la CI del último commit con `get_check_runs` y `get_status`. Si algún check falla, localiza su ejecución con `mcp__github__actions_list` y lee solo los trabajos fallidos con `mcp__github__get_job_logs` (`failed_only: true`, `return_content: true`). Quédate con las líneas del error.
2. **Lee CLAUDE.md** tal como está en la rama base de la PR y aplica las reglas que afecten a los archivos cambiados.
3. **Comprueba los criterios de aceptación.** Para cada criterio de la issue, indica si se cumple, no se cumple o no se puede verificar, con evidencia: `archivo:línea` en el último commit de la PR, salida de la CI o SHA del commit. Sin evidencia, el criterio queda como «No se puede verificar», nunca como «Se cumple».
4. **Comprueba el proceso** según la sección «Flujo con Git (git flow)» de CLAUDE.md:
   - La PR va contra `dev`.
   - La rama de origen sigue el formato de nombre que fija CLAUDE.md.
   - La descripción incluye «Closes #n».
   - Cada mensaje de commit pasa commitlint. Pasa el mensaje completo (título, cuerpo y pie) por la entrada estándar: `echo '<mensaje>' | npx commitlint --extends @commitlint/config-conventional`, con cada comilla simple escrita como `'\''`. Usa `--extends` porque el repositorio aún no tiene configuración de commitlint; seguirá funcionando cuando la tenga.
   - La CI del último commit está en verde. Si no se ha ejecutado ningún check, el estado es «Sin checks», no «En verde».

   Si la PR es una publicación (`dev` → `main`) o un hotfix, aplica lo que CLAUDE.md indica para esos casos.

5. **Señala los cambios fuera del alcance** de la issue: archivos o líneas del diff que ningún criterio de aceptación explica.
6. **Separa errores de riesgos.** Un error demostrado tiene evidencia que lo muestra. Una sospecha que no has podido comprobar es un riesgo sin demostrar. No inventes hallazgos: si no hay defectos, dilo.
7. **Devuelve el informe** con la plantilla y las reglas de veredicto de `${CLAUDE_SKILL_DIR}/formato-informe.md`.
