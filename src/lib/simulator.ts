import type { SimulatorResult } from './types';

/**
 * Generates 28 random daily multipliers with a mix of wins and losses,
 * then normalizes them so their sum equals exactly `target`.
 * Each call produces a unique curve shape.
 */
function randomDailyPattern(target: number): number[] {
	const days = 28;
	const raw: number[] = [];

	for (let i = 0; i < days; i++) {
		// ~20% chance of a losing day (negative multiplier)
		const isLoss = Math.random() < 0.2;
		if (isLoss) {
			raw.push(-(Math.random() * 0.8 + 0.1)); // -0.1 to -0.9
		} else {
			raw.push(Math.random() * 1.6 + 0.2); // 0.2 to 1.8
		}
	}

	// Normalize: shift all values so the cumulative sum hits the target exactly.
	// We do this by computing what the raw cumulative total would be,
	// then distributing the difference evenly across all days.
	const rawSum = raw.reduce((a, b) => a + b, 0);
	const scale = target / rawSum;

	return raw.map((v) => v * scale);
}

/**
 * Calculates projected earnings from bet size alone.
 * Linear scaling: $10 → $50/mo, $100 → $500/mo.
 * Daily values are randomized on every call for a unique chart each time.
 */
export function calculateProjection(betSize: number): SimulatorResult {
	const monthlyTarget = betSize * 5;

	const pattern = randomDailyPattern(monthlyTarget);

	const dailyData: number[] = [];
	const weeklyEarnings: number[] = [];
	let cumulative = 0;

	for (let day = 0; day < 28; day++) {
		cumulative += pattern[day];
		dailyData.push(Math.round(cumulative * 100) / 100);

		if ((day + 1) % 7 === 0) {
			weeklyEarnings.push(Math.round(cumulative * 100) / 100);
		}
	}

	const monthlyProjection = Math.round(cumulative * 100) / 100;
	const yearlyProjection = Math.round(monthlyProjection * 12 * 0.85 * 100) / 100;
	const dailyAverage = Math.round((monthlyProjection / 28) * 100) / 100;
	const peakExpectancy = Math.round(Math.max(...dailyData) * 1.06 * 100) / 100;

	return {
		weeklyEarnings,
		dailyData,
		monthlyProjection,
		yearlyProjection,
		dailyAverage,
		peakExpectancy
	};
}
