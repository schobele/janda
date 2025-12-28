export const gratitudeStatements = [
	// Morgen-Grüße
	"Guten Morgen. Heute ist ein neuer Tag voller Möglichkeiten.",
	"Dieser Tag gehört dir. Mach was Schönes draus.",
	"Die Sonne geht auf – für dich genauso wie für alle anderen.",
	"Du hast alles, was du brauchst, um heute einen guten Tag zu haben.",

	// Selbstwert
	"Du bist genug. Genau so, wie du bist.",
	"Dein Wert hängt nicht davon ab, was du heute schaffst.",
	"Du musst niemandem etwas beweisen.",
	"Du verdienst die guten Dinge in deinem Leben.",
	"Du darfst stolz auf dich sein.",

	// Dankbarkeit-Reminder
	"Es gibt Menschen, die dich lieben. Vergiss das nicht.",
	"Dein Körper trägt dich durch den Tag. Er verdient Anerkennung.",
	"Irgendwo da draußen freut sich jemand, dass es dich gibt.",
	"Die kleinen Dinge sind die großen Dinge.",

	// Ansporn
	"Ein Schritt nach dem anderen. Mehr braucht es nicht.",
	"Deine Energie folgt deinem Fokus. Wähl weise.",

	// Perspektive
	"In einem Jahr wirst du froh sein, dass du heute angefangen hast.",
	"Das, was dich gerade stresst, ist in fünf Jahren wahrscheinlich egal.",
	"Dein jüngeres Ich wäre stolz auf das, was du erreicht hast.",

	// Ruhe & Gelassenheit
	"Alles, was du kontrollieren kannst, ist dieser Moment.",
	"Atme. Alles andere kommt danach.",

	// Motivations-Booster
	"Du bist auf dem richtigen Weg, auch wenn es sich nicht so anfühlt.",
	"Jeder Experte war mal Anfänger.",
	"Dein Tempo ist genau richtig.",
	"Heute ist ein guter Tag.",

	// Abend-Statements
	"Schlaf gut. Morgen geht es weiter.",
	"Der Tag ist geschafft. Zeit, loszulassen.",
] as const;

export type GratitudeStatement = (typeof gratitudeStatements)[number];

// Für zufällige Auswahl
export const getRandomStatement = (): string => {
	const index = Math.floor(Math.random() * gratitudeStatements.length);
	return gratitudeStatements[index];
};

// Für tägliches Statement basierend auf Datum (deterministisch)
export const getDailyStatement = (date: Date = new Date()): string => {
	const dayOfYear = Math.floor(
		(date.getTime() - new Date(date.getFullYear(), 0, 0).getTime()) /
			(1000 * 60 * 60 * 24),
	);
	const index = dayOfYear % gratitudeStatements.length;
	return gratitudeStatements[index];
};

// Für Tageszeit-basierte Auswahl
export const getStatementByTimeOfDay = (): string => {
	const hour = new Date().getHours();

	// Morgen (5-11): Index 0-4
	if (hour >= 5 && hour < 11) {
		const morningStatements = gratitudeStatements.slice(0, 5);
		return morningStatements[
			Math.floor(Math.random() * morningStatements.length)
		];
	}

	// Abend (20-23): Index -2
	if (hour >= 20 || hour < 5) {
		const eveningStatements = gratitudeStatements.slice(-2);
		return eveningStatements[
			Math.floor(Math.random() * eveningStatements.length)
		];
	}

	// Tagsüber: Alles außer Morgen/Abend
	const dayStatements = gratitudeStatements.slice(6, 43);
	return dayStatements[Math.floor(Math.random() * dayStatements.length)];
};
