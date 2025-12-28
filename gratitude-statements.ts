export const gratitudeStatements = [
  // Morgen-Grüße
  "Guten Morgen. Heute ist ein neuer Tag voller Möglichkeiten.",
  "Du bist aufgewacht. Das allein ist schon ein Geschenk.",
  "Dieser Tag gehört dir. Mach was Schönes draus.",
  "Die Sonne geht auf – für dich genauso wie für alle anderen.",
  "Du hast alles, was du brauchst, um heute einen guten Tag zu haben.",
  "Atme tief ein. Du lebst. Das ist nicht selbstverständlich.",

  // Selbstwert
  "Du bist genug. Genau so, wie du bist.",
  "Dein Wert hängt nicht davon ab, was du heute schaffst.",
  "Du musst niemandem etwas beweisen.",
  "Du bist weiter gekommen, als du manchmal denkst.",
  "Deine Fehler machen dich menschlich, nicht weniger wertvoll.",
  "Du verdienst die guten Dinge in deinem Leben.",
  "Du bist nicht perfekt – und das ist auch gut so.",
  "Du darfst stolz auf dich sein.",

  // Dankbarkeit-Reminder
  "Du hast ein Dach über dem Kopf und Essen im Kühlschrank. Nicht jeder kann das sagen.",
  "Es gibt Menschen, die dich lieben. Vergiss das nicht.",
  "Dein Körper trägt dich durch den Tag. Er verdient Anerkennung.",
  "Du hast Zugang zu sauberem Wasser, Strom und Internet. Das ist Luxus.",
  "Irgendwo da draußen freut sich jemand, dass es dich gibt.",
  "Die kleinen Dinge sind die großen Dinge.",
  "Du hast mehr, als du manchmal siehst.",

  // Ansporn
  "Du schaffst das. Du hast schon Schlimmeres überstanden.",
  "Ein Schritt nach dem anderen. Mehr braucht es nicht.",
  "Heute ist kein verlorener Tag – du entscheidest, was du draus machst.",
  "Fortschritt schlägt Perfektion. Jeden Tag.",
  "Du musst nicht alles heute erledigen. Aber fang an.",
  "Deine Energie folgt deinem Fokus. Wähl weise.",
  "Mach dir keinen Druck. Du gibst dein Bestes, und das reicht.",
  "Auch kleine Schritte bringen dich vorwärts.",
  "Du bist stärker, als du dich gerade fühlst.",

  // Perspektive
  "In einem Jahr wirst du froh sein, dass du heute angefangen hast.",
  "Das, was dich gerade stresst, ist in fünf Jahren wahrscheinlich egal.",
  "Du hast schon so viele Probleme gelöst. Dieses hier ist nur das nächste.",
  "Nicht jeder Tag muss produktiv sein. Manche Tage sind zum Aufladen da.",
  "Dein jüngeres Ich wäre stolz auf das, was du erreicht hast.",
  "Du bist nicht deine Gedanken. Du bist der, der sie beobachtet.",

  // Ruhe & Gelassenheit
  "Alles, was du kontrollieren kannst, ist dieser Moment.",
  "Du musst nicht alles wissen. Du musst nicht alles können.",
  "Es ist okay, langsam zu machen.",
  "Nicht alles braucht eine Lösung. Manches braucht nur Zeit.",
  "Du darfst Nein sagen. Deine Energie ist begrenzt.",
  "Atme. Alles andere kommt danach.",
  "Du musst niemandem gefallen außer dir selbst.",

  // Abend-Statements
  "Du hast heute dein Bestes gegeben. Das reicht.",
  "Was auch immer heute passiert ist – morgen ist ein neuer Tag.",
  "Leg den Tag ab. Er ist vorbei.",
  "Du hast heute überlebt. Manchmal ist das genug.",
  "Schlaf gut. Morgen geht es weiter.",
  "Der Tag ist geschafft. Zeit, loszulassen.",

  // Motivations-Booster
  "Du bist auf dem richtigen Weg, auch wenn es sich nicht so anfühlt.",
  "Jeder Experte war mal Anfänger.",
  "Dein Tempo ist genau richtig.",
  "Du wächst, auch wenn du es nicht merkst.",
  "Heute ist ein guter Tag, um ein guter Tag zu sein.",
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
      (1000 * 60 * 60 * 24)
  );
  const index = dayOfYear % gratitudeStatements.length;
  return gratitudeStatements[index];
};

// Für Tageszeit-basierte Auswahl
export const getStatementByTimeOfDay = (): string => {
  const hour = new Date().getHours();
  
  // Morgen (5-11): Index 0-5
  if (hour >= 5 && hour < 12) {
    const morningStatements = gratitudeStatements.slice(0, 6);
    return morningStatements[Math.floor(Math.random() * morningStatements.length)];
  }
  
  // Abend (18-23): Index 43-48
  if (hour >= 18 || hour < 5) {
    const eveningStatements = gratitudeStatements.slice(43, 49);
    return eveningStatements[Math.floor(Math.random() * eveningStatements.length)];
  }
  
  // Tagsüber: Alles außer Morgen/Abend
  const dayStatements = gratitudeStatements.slice(6, 43);
  return dayStatements[Math.floor(Math.random() * dayStatements.length)];
};
