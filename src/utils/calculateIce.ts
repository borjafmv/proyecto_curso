import type { IceScore } from '../types/IceScore';

// calculateIce devuelve la puntuación ICE usando impacto, confianza y esfuerzo.
export function calculateIce({ impact, confidence, effort }: IceScore): number {
  return (impact * confidence) / effort;
}
