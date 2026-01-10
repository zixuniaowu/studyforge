/**
 * SM-2 (SuperMemo 2) Algorithm Implementation
 *
 * Quality ratings:
 * 0 - Complete blackout, no recall
 * 1 - Incorrect, but upon seeing correct answer, remembered
 * 2 - Incorrect, but correct answer seemed easy to recall
 * 3 - Correct response, but required significant effort
 * 4 - Correct response, after some hesitation
 * 5 - Perfect response, instant recall
 *
 * Simplified ratings for UI:
 * - Again (0-1): Failed to recall
 * - Hard (2-3): Recalled with difficulty
 * - Good (4): Recalled correctly
 * - Easy (5): Perfect recall
 */

export interface SM2Review {
  easeFactor: number;   // EF (Ease Factor), starts at 2.5
  interval: number;     // Days until next review
  repetitions: number;  // Number of consecutive correct responses
}

export interface SM2Result extends SM2Review {
  nextReview: Date;     // Next review date
}

/**
 * Calculate the next review parameters using SM-2 algorithm
 *
 * @param quality - Rating from 0-5
 * @param currentReview - Current review state
 * @returns Updated review state with next review date
 */
export function calculateSM2(
  quality: number,
  currentReview: SM2Review
): SM2Result {
  // Ensure quality is within bounds
  quality = Math.max(0, Math.min(5, Math.round(quality)));

  let { easeFactor, interval, repetitions } = currentReview;

  // If quality < 3, restart repetitions (failed recall)
  if (quality < 3) {
    repetitions = 0;
    interval = 1; // Review again tomorrow
  } else {
    // Calculate new interval based on repetition count
    if (repetitions === 0) {
      interval = 1;
    } else if (repetitions === 1) {
      interval = 6;
    } else {
      interval = Math.round(interval * easeFactor);
    }
    repetitions += 1;
  }

  // Update ease factor
  // EF' = EF + (0.1 - (5 - q) * (0.08 + (5 - q) * 0.02))
  easeFactor = easeFactor + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02));

  // Ensure EF doesn't go below 1.3
  easeFactor = Math.max(1.3, easeFactor);

  // Calculate next review date
  const nextReview = new Date();
  nextReview.setDate(nextReview.getDate() + interval);

  return {
    easeFactor: Math.round(easeFactor * 100) / 100, // Round to 2 decimal places
    interval,
    repetitions,
    nextReview
  };
}

/**
 * Get initial review parameters for a new card
 */
export function getInitialReview(): SM2Review {
  return {
    easeFactor: 2.5,
    interval: 0,
    repetitions: 0
  };
}

/**
 * Convert simplified rating to SM-2 quality
 */
export type SimpleRating = 'again' | 'hard' | 'good' | 'easy';

export function ratingToQuality(rating: SimpleRating): number {
  switch (rating) {
    case 'again': return 1;
    case 'hard': return 3;
    case 'good': return 4;
    case 'easy': return 5;
  }
}

/**
 * Get estimated intervals for each rating option
 * Useful for showing preview in UI
 */
export function getEstimatedIntervals(currentReview: SM2Review): Record<SimpleRating, number> {
  const ratings: SimpleRating[] = ['again', 'hard', 'good', 'easy'];
  const result: Record<SimpleRating, number> = {} as Record<SimpleRating, number>;

  for (const rating of ratings) {
    const quality = ratingToQuality(rating);
    const { interval } = calculateSM2(quality, currentReview);
    result[rating] = interval;
  }

  return result;
}

/**
 * Format interval as human-readable string
 */
export function formatInterval(days: number, language: 'ja' | 'zh' = 'zh'): string {
  if (days === 0 || days === 1) {
    return language === 'ja' ? '1日' : '1天';
  } else if (days < 7) {
    return language === 'ja' ? `${days}日` : `${days}天`;
  } else if (days < 30) {
    const weeks = Math.round(days / 7);
    return language === 'ja' ? `${weeks}週間` : `${weeks}周`;
  } else if (days < 365) {
    const months = Math.round(days / 30);
    return language === 'ja' ? `${months}ヶ月` : `${months}个月`;
  } else {
    const years = Math.round(days / 365 * 10) / 10;
    return language === 'ja' ? `${years}年` : `${years}年`;
  }
}
