export const liveDrivers = [
  { pos: 1, id: 'verstappen', name: 'M. VERSTAPPEN', team: 'RBR', gap: 'LEADER', int: '-', lap: 42, tyre: 'H', age: 18, s1: '28.4', s2: '35.1', s3: '22.8', pit: 1, status: 'TRACK', color: '#3671C6' },
  { pos: 2, id: 'norris', name: 'L. NORRIS', team: 'MCL', gap: '+2.415', int: '+2.415', lap: 42, tyre: 'H', age: 15, s1: '28.3', s2: '35.2', s3: '22.8', pit: 1, status: 'TRACK', color: '#FF8700' },
  { pos: 3, id: 'leclerc', name: 'C. LECLERC', team: 'FER', gap: '+6.102', int: '+3.687', lap: 42, tyre: 'H', age: 16, s1: '28.5', s2: '35.2', s3: '22.9', pit: 1, status: 'TRACK', color: '#E8002D' },
  { pos: 4, id: 'hamilton', name: 'L. HAMILTON', team: 'FER', gap: '+12.550', int: '+6.448', lap: 42, tyre: 'M', age: 8, s1: '28.1', s2: '34.9', s3: '22.6', pit: 2, status: 'TRACK', color: '#E8002D' },
  { pos: 5, id: 'russell', name: 'G. RUSSELL', team: 'MER', gap: '+15.221', int: '+2.671', lap: 42, tyre: 'H', age: 17, s1: '28.5', s2: '35.3', s3: '22.8', pit: 1, status: 'TRACK', color: '#27F4D2' }
];

export const raceControlMessages = [
  { time: '15:42:10', type: 'INFO', msg: 'LAP 42/57' },
  { time: '15:38:22', type: 'WARNING', msg: 'TRACK LIMITS: CAR 44 (HAM) TURN 4' },
  { time: '15:25:00', type: 'VSC', msg: 'VIRTUAL SAFETY CAR DEPLOYED' },
  { time: '15:24:15', type: 'DANGER', msg: 'YELLOW FLAG - SECTOR 2' }
];

export const teamRadios = [
  { driver: 'NORRIS', team: 'MCL', msg: "Pace is good. Keep pushing, we're catching him.", time: 'Lap 40' },
  { driver: 'VERSTAPPEN', team: 'RBR', msg: "Tires are starting to drop off a bit on the rear.", time: 'Lap 38' },
  { driver: 'HAMILTON', team: 'FER', msg: "Box for mediums. Let's undercut.", time: 'Lap 34' }
];
