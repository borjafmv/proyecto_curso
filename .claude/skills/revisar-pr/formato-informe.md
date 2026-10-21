# Formato del informe de `revisar-pr`

Devuelve el informe con esta plantilla y en este orden. Si una sección no tiene contenido, escribe «Ninguno» en lugar de quitarla.

## Plantilla

```markdown
# Revisión de la PR #<n>: <título>

**Veredicto:** <Aprobable | Aprobable con cambios | No aprobable>

<Una o dos frases que justifican el veredicto.>

## Criterios de aceptación de la issue #<n>

| Criterio                                | Estado                                             | Evidencia                                         |
| --------------------------------------- | -------------------------------------------------- | ------------------------------------------------- |
| <Criterio tal como aparece en la issue> | <Se cumple / No se cumple / No se puede verificar> | <archivo:línea, salida de la CI o SHA del commit> |

## Hallazgos

### 1. <Bloqueante / Importante / Menor> · <Error demostrado / Riesgo sin demostrar / Fuera de alcance>: <título breve>

- **Evidencia:** <archivo:línea, salida de la CI o de commitlint, SHA del commit>
- **Impacto:** <qué falla o puede fallar, y en qué caso>
- **Comprobación sugerida:** <cómo confirmarlo o cómo comprobar que está corregido>

## CI y commits

- **CI del último commit (`<sha>`):** <En verde / En rojo / En curso / Sin checks>. <Checks y resultado; si falla, las líneas del error.>
- **Rama base:** `<rama>`. <Correcta / Incorrecta>.
- **Rama de origen:** `<rama>`. <Sigue / No sigue el formato de CLAUDE.md>.
- **«Closes #n»:** <Presente (#n) / Ausente>.

| Commit  | Mensaje                     | commitlint                         |
| ------- | --------------------------- | ---------------------------------- |
| `<sha>` | <Primera línea del mensaje> | <Pasa / Falla: reglas incumplidas> |

## Pendientes de verificar

- <Qué no se ha podido comprobar, por qué y cómo comprobarlo.>
```

## Gravedad

- **Bloqueante:** un criterio de aceptación no se cumple, un error demostrado rompe una funcionalidad, la CI está en rojo o la PR va contra una rama base incorrecta.
- **Importante:** hay que corregirlo antes de mergear, pero no obliga a rehacer el cambio. Por ejemplo: una regla de CLAUDE.md incumplida, un commit que no pasa commitlint, que falte «Closes #n», un nombre de rama que no sigue el formato o un cambio fuera de alcance.
- **Menor:** una mejora opcional.

Un riesgo sin demostrar nunca es bloqueante. Si es serio, anótalo también en «Pendientes de verificar».

Ordena los hallazgos de más a menos grave. Con la misma gravedad, pon primero los errores demostrados. Si no hay hallazgos, escribe «Ninguno: no hay defectos».

## Veredicto

- **No aprobable:** hay al menos un hallazgo bloqueante.
- **Aprobable con cambios:** no hay bloqueantes, pero hay hallazgos importantes o algún criterio que no se puede verificar.
- **Aprobable:** todos los criterios se cumplen, la CI está en verde o sin checks, y solo quedan hallazgos menores o ninguno.

Si la PR no cierra ninguna issue, no hay criterios que comprobar: escríbelo en la tabla y regístralo como hallazgo. Si la CI está «Sin checks», añade a «Pendientes de verificar» que los tipos, ESLint y Prettier no se han verificado.
