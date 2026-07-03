export const driversExtendedData = [
  {
    id: "hamilton",
    firstName: "Lewis",
    lastName: "Hamilton",
    number: 44,
    team: "Scuderia Ferrari HP",
    teamId: "ferrari",
    teamColor: "#EF1A2D",
    country: "United Kingdom",
    championships: 7,
    subtitle: "Seven-Time Formula 1 World Champion",
    wins: 105,
    podiums: 200,
    poles: 104,
    fastestLaps: 60,
    careerPoints: 4700,
    image: "/images/drivers/lewis-hamilton.webp",
    hud: {
      reaction: 95,
      qualifying: 98,
      racePace: 97,
      wetWeather: 99,
      tyreManagement: 99,
      consistency: 96,
      overtaking: 96,
      mentalStrength: 97
    },
    equipment: {
      helmet: { brand: "Bell", weight: "1.3kg", feature: "Purple Chrome Visor", image: "/images/equipment/race-helmet.png" },
      suit: { brand: "Puma", weight: "820g", feature: "Ferrari Scarlet Nomex", image: "/images/equipment/race-suit.png" },
      wheel: { brand: "Ferrari F1", weight: "1.35kg", feature: "Ergonomic Grips", image: "/images/equipment/steering-wheel.png" },
      gloves: { brand: "Puma", weight: "105g", feature: "Advanced Grip Tech", image: "/images/equipment/race-gloves.png" },
      boots: { brand: "Puma", weight: "190g", feature: "Vegan Leather", image: "/images/equipment/race-boots.png" }
    },
    timeline: [
      { year: 2007, team: "McLaren", car: "MP4-22", position: 2, wins: 4, achievement: "Rookie of the Year" },
      { year: 2008, team: "McLaren", car: "MP4-23", position: 1, wins: 5, achievement: "First World Championship (Brazil drama)" },
      { year: 2014, team: "Mercedes", car: "W05 Hybrid", position: 1, wins: 11, achievement: "Start of the hybrid era dominance" },
      { year: 2020, team: "Mercedes", car: "W11", position: 1, wins: 11, achievement: "Matches Schumacher's 7 titles" },
      { year: 2025, team: "Ferrari", car: "SF-25", position: "-", wins: 0, achievement: "The highly anticipated move to Maranello" }
    ],
    radioTranscript: [
      { speaker: "Adami", text: "We are P1 Lewis. What a drive.", time: "LAP 52" },
      { speaker: "Lewis", text: "Thank you guys. Forza Ferrari! To all the kids out there, dream the impossible.", time: "LAP 52" }
    ],
    favoriteCircuits: ["silverstone", "hungaroring", "montreal", "monza", "spa"],
    trophies: [
      { year: 2008, name: "World Champion", color: "#FFD700" },
      { year: 2014, name: "World Champion", color: "#FFD700" },
      { year: 2015, name: "World Champion", color: "#FFD700" },
      { year: 2017, name: "World Champion", color: "#FFD700" },
      { year: 2018, name: "World Champion", color: "#FFD700" },
      { year: 2019, name: "World Champion", color: "#FFD700" },
      { year: 2020, name: "World Champion", color: "#FFD700" }
    ],
    nextRace: {
      circuit: "Silverstone", prediction: "Podium / P3", winProb: 45, weather: "Overcast", tyre: "Soft"
    }
  },
  {
    id: "verstappen",
    firstName: "Max",
    lastName: "Verstappen",
    number: 3, 
    team: "Oracle Red Bull Racing",
    teamId: "red-bull",
    teamColor: "#3671C6",
    country: "Netherlands",
    championships: 3,
    wins: 61,
    podiums: 105,
    poles: 39,
    fastestLaps: 32,
    careerPoints: 2825,
    image: "/images/drivers/max-verstappen.webp",
    hud: {
      reaction: 95,
      qualifying: 98,
      racePace: 97,
      wetWeather: 99,
      tyreManagement: 99,
      consistency: 96,
      overtaking: 96,
      mentalStrength: 97
    },
    equipment: {
      helmet: { brand: "Bell", weight: "1.3kg", feature: "Purple Chrome Visor", image: "/images/equipment/race-helmet.png" },
      suit: { brand: "Puma", weight: "820g", feature: "Lightweight Nomex", image: "/images/equipment/race-suit.png" },
      wheel: { brand: "Mercedes AMG", weight: "1.35kg", feature: "Ergonomic Grips", image: "/images/equipment/steering-wheel.png" },
      gloves: { brand: "Puma", weight: "105g", feature: "Advanced Grip Tech", image: "/images/equipment/race-gloves.png" },
      boots: { brand: "Puma", weight: "190g", feature: "Vegan Leather", image: "/images/equipment/race-boots.png" }
    },
    timeline: [
      { year: 2007, team: "McLaren", car: "MP4-22", position: 2, wins: 4, achievement: "Rookie of the Year" },
      { year: 2008, team: "McLaren", car: "MP4-23", position: 1, wins: 5, achievement: "First World Championship (Brazil drama)" },
      { year: 2014, team: "Mercedes", car: "W05 Hybrid", position: 1, wins: 11, achievement: "Start of the hybrid era dominance" },
      { year: 2020, team: "Mercedes", car: "W11", position: 1, wins: 11, achievement: "Matches Schumacher's 7 titles" },
      { year: 2025, team: "Ferrari", car: "F25", position: "-", wins: 0, achievement: "The highly anticipated move to Maranello" }
    ],
    radioTranscript: [
      { speaker: "Bono", text: "Get in there Lewis! What a drive mate. Brilliant.", time: "LAP 52" },
      { speaker: "Lewis", text: "Thanks Bono. To all the kids out there, dream the impossible.", time: "LAP 52" }
    ],
    favoriteCircuits: ["silverstone", "hungaroring", "montreal", "monza", "spa"],
    trophies: [
      { year: 2008, name: "World Champion", color: "#FFD700" },
      { year: 2014, name: "World Champion", color: "#FFD700" },
      { year: 2015, name: "World Champion", color: "#FFD700" },
      { year: 2017, name: "World Champion", color: "#FFD700" },
      { year: 2018, name: "World Champion", color: "#FFD700" },
      { year: 2019, name: "World Champion", color: "#FFD700" },
      { year: 2020, name: "World Champion", color: "#FFD700" }
    ],
    nextRace: {
      circuit: "Silverstone", prediction: "Podium / P3", winProb: 45, weather: "Overcast", tyre: "Soft"
    }
  },
  {
    id: "leclerc",
    firstName: "Charles",
    lastName: "Leclerc",
    number: 16,
    team: "Scuderia Ferrari",
    teamId: "ferrari",
    teamColor: "#EF1A2D",
    country: "Monaco",
    championships: 0,
    wins: 6,
    podiums: 34,
    poles: 24,
    fastestLaps: 9,
    careerPoints: 1200,
    image: "/images/drivers/charles-leclerc.webp",
    hud: {
      reaction: 96,
      qualifying: 99,
      racePace: 94,
      wetWeather: 92,
      tyreManagement: 90,
      consistency: 89,
      overtaking: 94,
      mentalStrength: 91
    },
    equipment: {
      helmet: { brand: "Bell", weight: "1.28kg", feature: "Custom Monaco Spec", image: "/images/equipment/race-helmet.png" },
      suit: { brand: "Puma", weight: "830g", feature: "Ferrari Scarlet Nomex", image: "/images/equipment/race-suit.png" },
      wheel: { brand: "Ferrari F1", weight: "1.42kg", feature: "Carbon Matrix Layout", image: "/images/equipment/steering-wheel.png" },
      gloves: { brand: "Puma", weight: "115g", feature: "Flame Retardant Mesh", image: "/images/equipment/race-gloves.png" },
      boots: { brand: "Puma", weight: "210g", feature: "Heel Support Plate", image: "/images/equipment/race-boots.png" }
    },
    timeline: [
      { year: 2018, team: "Sauber", car: "C37", position: 13, wins: 0, achievement: "Impressive rookie season" },
      { year: 2019, team: "Ferrari", car: "SF90", position: 4, wins: 2, achievement: "Wins in Spa and emotional victory at Monza" },
      { year: 2022, team: "Ferrari", car: "F1-75", position: 2, wins: 3, achievement: "Championship runner-up" },
      { year: 2024, team: "Ferrari", car: "SF-24", position: "-", wins: 1, achievement: "Wins his home grand prix in Monaco" }
    ],
    radioTranscript: [
      { speaker: "Xavi", text: "We won Monaco! We won it Charles!", time: "LAP 78" },
      { speaker: "Charles", text: "AAAHHH! Yes! Oh my god. I have no words. Thank you everyone, what a weekend.", time: "LAP 78" }
    ],
    favoriteCircuits: ["monza", "monaco", "spa", "baku"],
    trophies: [
      { year: 2024, name: "Monaco GP Winner", color: "#C0C0C0" }
    ],
    nextRace: {
      circuit: "Silverstone", prediction: "Top 5 / P4", winProb: 30, weather: "Clear", tyre: "Medium"
    }
  },
  {
    id: "norris",
    firstName: "Lando",
    lastName: "Norris",
    number: 4,
    team: "McLaren",
    teamId: "mclaren",
    teamColor: "#FF8000",
    country: "United Kingdom",
    championships: 0,
    wins: 1,
    podiums: 17,
    poles: 1,
    fastestLaps: 6,
    careerPoints: 750,
    image: "/images/drivers/lando-norris.webp",
    hud: {
      reaction: 95,
      qualifying: 95,
      racePace: 93,
      wetWeather: 95,
      tyreManagement: 92,
      consistency: 94,
      overtaking: 91,
      mentalStrength: 92
    },
    equipment: {
      helmet: { brand: "Bell", weight: "1.3kg", feature: "Quadrant Design", image: "/images/equipment/race-helmet.png" },
      suit: { brand: "Alpinestars", weight: "840g", feature: "Papaya Tech", image: "/images/equipment/race-suit.png" },
      wheel: { brand: "McLaren F1", weight: "1.38kg", feature: "Digital Dash V2", image: "/images/equipment/steering-wheel.png" },
      gloves: { brand: "Alpinestars", weight: "108g", feature: "Silicon Palm Print", image: "/images/equipment/race-gloves.png" },
      boots: { brand: "Alpinestars", weight: "195g", feature: "Ultralight Frame", image: "/images/equipment/race-boots.png" }
    },
    timeline: [
      { year: 2019, team: "McLaren", car: "MCL34", position: 11, wins: 0, achievement: "Consistent rookie campaign" },
      { year: 2021, team: "McLaren", car: "MCL35M", position: 6, wins: 0, achievement: "First Pole in Russia, heartbreaking loss" },
      { year: 2024, team: "McLaren", car: "MCL38", position: 2, wins: 1, achievement: "Maiden F1 Victory in Miami!" }
    ],
    radioTranscript: [
      { speaker: "Will", text: "Lando Norris, you are a Formula 1 race winner! Miami GP winner!", time: "LAP 57" },
      { speaker: "Lando", text: "WOOO! Yes! About time! Thank you guys, I love you all.", time: "LAP 57" }
    ],
    favoriteCircuits: ["red-bull-ring", "silverstone", "miami", "sochi"],
    trophies: [
      { year: 2024, name: "Miami GP Winner", color: "#C0C0C0" }
    ],
    nextRace: {
      circuit: "Silverstone", prediction: "Front Row / P2", winProb: 55, weather: "Dry", tyre: "Medium"
    }
  }
];

export const driversStandings = [
  { id: "verstappen", name: "Max Verstappen", team: "Red Bull Racing", teamColor: "#3671C6", points: 210, wins: 5, podiums: 8, fastestLaps: 3, country: "NL", trend: "neutral", gap: "+0" },
  { id: "hamilton", name: "Lewis Hamilton", team: "Ferrari", teamColor: "#EF1A2D", points: 205, wins: 4, podiums: 7, fastestLaps: 2, country: "GB", trend: "up", gap: "+5" },
  { id: "norris", name: "Lando Norris", team: "McLaren", teamColor: "#FF8000", points: 201, wins: 3, podiums: 8, fastestLaps: 2, country: "GB", trend: "up", gap: "+9" },
  { id: "leclerc", name: "Charles Leclerc", team: "Ferrari", teamColor: "#EF1A2D", points: 175, wins: 1, podiums: 5, fastestLaps: 1, country: "MC", trend: "neutral", gap: "+35" },
  { id: "piastri", name: "Oscar Piastri", team: "McLaren", teamColor: "#FF8000", points: 150, wins: 1, podiums: 4, fastestLaps: 1, country: "AU", trend: "up", gap: "+60" },
  { id: "russell", name: "George Russell", team: "Mercedes", teamColor: "#00A19B", points: 120, wins: 0, podiums: 2, fastestLaps: 0, country: "GB", trend: "neutral", gap: "+90" },
  { id: "sainz", name: "Carlos Sainz", team: "Williams", teamColor: "#00A0E9", points: 85, wins: 0, podiums: 1, fastestLaps: 0, country: "ES", trend: "down", gap: "+125" },
  { id: "alonso", name: "Fernando Alonso", team: "Aston Martin", teamColor: "#00665E", points: 60, wins: 0, podiums: 0, fastestLaps: 1, country: "ES", trend: "neutral", gap: "+150" },
  { id: "albon", name: "Alex Albon", team: "Williams", teamColor: "#00A0E9", points: 45, wins: 0, podiums: 0, fastestLaps: 0, country: "TH", trend: "up", gap: "+165" },
  { id: "antonelli", name: "Kimi Antonelli", team: "Mercedes", teamColor: "#00A19B", points: 40, wins: 0, podiums: 0, fastestLaps: 0, country: "IT", trend: "up", gap: "+170" },
  { id: "stroll", name: "Lance Stroll", team: "Aston Martin", teamColor: "#00665E", points: 28, wins: 0, podiums: 0, fastestLaps: 0, country: "CA", trend: "neutral", gap: "+182" },
  { id: "tsunoda", name: "Yuki Tsunoda", team: "Red Bull Racing", teamColor: "#3671C6", points: 25, wins: 0, podiums: 0, fastestLaps: 0, country: "JP", trend: "up", gap: "+185" },
  { id: "gasly", name: "Pierre Gasly", team: "Alpine", teamColor: "#FF87B2", points: 18, wins: 0, podiums: 0, fastestLaps: 0, country: "FR", trend: "down", gap: "+192" },
  { id: "hulkenberg", name: "Nico Hulkenberg", team: "Sauber", teamColor: "#00FF00", points: 15, wins: 0, podiums: 0, fastestLaps: 0, country: "DE", trend: "neutral", gap: "+195" },
  { id: "lawson", name: "Liam Lawson", team: "RB", teamColor: "#102FDF", points: 12, wins: 0, podiums: 0, fastestLaps: 0, country: "NZ", trend: "up", gap: "+198" },
  { id: "bearman", name: "Oliver Bearman", team: "Haas", teamColor: "#FFFFFF", points: 8, wins: 0, podiums: 0, fastestLaps: 0, country: "GB", trend: "neutral", gap: "+202" },
  { id: "doohan", name: "Jack Doohan", team: "Alpine", teamColor: "#FF87B2", points: 4, wins: 0, podiums: 0, fastestLaps: 0, country: "AU", trend: "down", gap: "+206" },
  { id: "ocon", name: "Esteban Ocon", team: "Haas", teamColor: "#FFFFFF", points: 2, wins: 0, podiums: 0, fastestLaps: 0, country: "FR", trend: "neutral", gap: "+208" },
  { id: "bortoleto", name: "Gabriel Bortoleto", team: "Sauber", teamColor: "#00FF00", points: 1, wins: 0, podiums: 0, fastestLaps: 0, country: "BR", trend: "up", gap: "+209" },
  { id: "hadjar", name: "Isack Hadjar", team: "RB", teamColor: "#102FDF", points: 0, wins: 0, podiums: 0, fastestLaps: 0, country: "FR", trend: "down", gap: "+210" },
  { id: "colapinto", name: "Franco Colapinto", team: "RB", teamColor: "#102FDF", points: 0, wins: 0, podiums: 0, fastestLaps: 0, country: "AR", trend: "down", gap: "+210" }
];
