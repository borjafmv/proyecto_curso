#!/usr/bin/env bash
# formatear.sh formatea con Prettier el archivo que Claude Code acaba de editar o crear.
# Hook PostToolUse (Edit|Write): recibe el JSON del hook por la entrada estándar.

# Saca tool_input.file_path del JSON con node, porque jq no está instalado en todos los equipos
FILE_PATH=$(node -e '
let input = "";
process.stdin.on("data", (chunk) => (input += chunk));
process.stdin.on("end", () => {
  process.stdout.write(JSON.parse(input).tool_input?.file_path ?? "");
});
')

if [ -z "$FILE_PATH" ]; then
  exit 0
fi

# Desde la raíz del proyecto, npx usa el Prettier de node_modules y Prettier lee .gitignore
cd "${CLAUDE_PROJECT_DIR:-.}" || exit 2

if ! PRETTIER_OUTPUT=$(npx prettier --write --ignore-unknown --no-color "$FILE_PATH" 2>&1); then
  echo "Prettier no ha podido formatear $FILE_PATH:" >&2
  echo "$PRETTIER_OUTPUT" >&2
  exit 2
fi
