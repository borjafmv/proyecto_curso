import type { IcePriority } from '../types/IceScore';

export const HIGH_ICE_THRESHOLD = 10;
export const MEDIUM_ICE_THRESHOLD = 5;

// getIcePriority clasifica una puntuación ICE en prioridad alta, media o baja según los umbrales.
export function getIcePriority(score: number): IcePriority {
  if (score >= HIGH_ICE_THRESHOLD) {
    return 'high';
  }

  if (score >= MEDIUM_ICE_THRESHOLD) {
    return 'medium';
  }

  return 'low';
}
