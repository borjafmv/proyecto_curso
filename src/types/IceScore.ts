export interface IceScore {
  impact: number;
  confidence: number;
  effort: number;
}

export type IceField = keyof IceScore;

// IceScoreDraft representa valores ICE que el usuario aún puede no haber indicado.
export type IceScoreDraft = Record<IceField, number | null>;

// IcePriority clasifica una puntuación ICE según su prioridad.
export type IcePriority = 'high' | 'medium' | 'low';
