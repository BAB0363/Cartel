// --- MOTEUR AUDIO ---
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        
const playSound = (type) => {
    if (audioCtx.state === 'suspended') audioCtx.resume();
    
    const now = audioCtx.currentTime;
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    const filter = audioCtx.createBiquadFilter();

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(audioCtx.destination);

    if (type === 'click') {
        osc.type = 'square'; 
        filter.type = 'highpass';
        filter.frequency.setValueAtTime(2000, now);
        osc.frequency.setValueAtTime(800, now); 
        osc.frequency.exponentialRampToValueAtTime(100, now + 0.05);
        gain.gain.setValueAtTime(0.1, now); 
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05); 
        osc.start(now); osc.stop(now + 0.05);
    } else if (type === 'buy') {
        osc.type = 'sawtooth'; 
        filter.type = 'bandpass';
        filter.frequency.setValueAtTime(1000, now);
        osc.frequency.setValueAtTime(200, now); 
        osc.frequency.linearRampToValueAtTime(600, now + 0.1);
        gain.gain.setValueAtTime(0.2, now); 
        gain.gain.linearRampToValueAtTime(0, now + 0.15); 
        osc.start(now); osc.stop(now + 0.15);
    } else if (type === 'soul_win') {
        osc.type = 'sine'; 
        osc.frequency.setValueAtTime(400, now); 
        osc.frequency.linearRampToValueAtTime(800, now + 0.5);
        osc.frequency.linearRampToValueAtTime(1200, now + 2);
        gain.gain.setValueAtTime(0, now); 
        gain.gain.linearRampToValueAtTime(0.4, now + 0.5); 
        gain.gain.linearRampToValueAtTime(0, now + 3); 
        osc.start(now); osc.stop(now + 3);
    } else if (type === 'suspense') {
        osc.type = 'triangle'; 
        filter.type = 'lowpass'; 
        filter.frequency.setValueAtTime(200, now);
        
        const lfo = audioCtx.createOscillator(); 
        const lfoGain = audioCtx.createGain();
        lfo.frequency.value = 4; 
        lfoGain.gain.value = 50; 
        lfo.connect(lfoGain); 
        lfoGain.connect(filter.frequency);
        lfo.start(now); lfo.stop(now + 3);

        osc.frequency.setValueAtTime(60, now); 
        osc.frequency.linearRampToValueAtTime(40, now + 3); 
        gain.gain.setValueAtTime(0.4, now); 
        gain.gain.linearRampToValueAtTime(0, now + 3); 
        osc.start(now); osc.stop(now + 3);
    } else if (type === 'fusion') {
        osc.type = 'sawtooth'; 
        osc.frequency.setValueAtTime(600, now); 
        osc.frequency.linearRampToValueAtTime(800, now + 0.5);
        osc.frequency.linearRampToValueAtTime(600, now + 1.0);
        osc.frequency.linearRampToValueAtTime(800, now + 1.5);
        gain.gain.setValueAtTime(0, now); 
        gain.gain.linearRampToValueAtTime(0.3, now + 0.2); 
        gain.gain.linearRampToValueAtTime(0, now + 2.5); 
        osc.start(now); osc.stop(now + 2.5);
    } else if (type === 'separation') {
        osc.type = 'square'; 
        osc.frequency.setValueAtTime(150, now); 
        osc.frequency.exponentialRampToValueAtTime(10, now + 0.3);
        gain.gain.setValueAtTime(0.5, now); 
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.3); 
        osc.start(now); osc.stop(now + 0.3);
    } else if (type === 'cough') {
        osc.type = 'sawtooth'; 
        filter.type = 'highpass';
        filter.frequency.setValueAtTime(800, now);
        osc.frequency.setValueAtTime(100, now); 
        osc.frequency.linearRampToValueAtTime(50, now + 0.1);
        gain.gain.setValueAtTime(0.2, now); 
        gain.gain.linearRampToValueAtTime(0, now + 0.15); 
        osc.start(now); osc.stop(now + 0.15);
    } else if (type === 'win') {
        osc.type = 'square'; 
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(2000, now);
        osc.frequency.setValueAtTime(523.25, now); 
        osc.frequency.setValueAtTime(659.25, now + 0.1); 
        osc.frequency.setValueAtTime(783.99, now + 0.2); 
        osc.frequency.setValueAtTime(1046.50, now + 0.3); 
        gain.gain.setValueAtTime(0.2, now); 
        gain.gain.linearRampToValueAtTime(0, now + 0.5); 
        osc.start(now); osc.stop(now + 0.5);
    } else if (type === 'thud') {
         osc.type = 'square'; 
         filter.type = 'lowpass';
         filter.frequency.setValueAtTime(100, now);
         osc.frequency.setValueAtTime(50, now); 
         osc.frequency.exponentialRampToValueAtTime(10, now + 0.2);
         gain.gain.setValueAtTime(0.8, now); 
         gain.gain.exponentialRampToValueAtTime(0.01, now + 0.3); 
         osc.start(now); osc.stop(now + 0.3);
    } else if (type === 'horn') {
         osc.type = 'sawtooth'; 
         osc.frequency.setValueAtTime(300, now); 
         osc.frequency.linearRampToValueAtTime(280, now + 1.0);
         gain.gain.setValueAtTime(0.6, now); 
         gain.gain.linearRampToValueAtTime(0, now + 1.0); 
         osc.start(now); osc.stop(now + 1.0);
    } else if (type === 'error') {
         osc.type = 'sawtooth'; 
         osc.frequency.setValueAtTime(100, now); 
         osc.frequency.linearRampToValueAtTime(80, now + 0.15);
         gain.gain.setValueAtTime(0.5, now); 
         gain.gain.linearRampToValueAtTime(0, now + 0.2); 
         osc.start(now); osc.stop(now + 0.2);
    } else if (type === 'hack_success') {
        osc.type = 'square'; 
        osc.frequency.setValueAtTime(1200, now); 
        osc.frequency.linearRampToValueAtTime(1800, now + 0.1);
        gain.gain.setValueAtTime(0.2, now); 
        gain.gain.linearRampToValueAtTime(0, now + 0.1); 
        osc.start(now); osc.stop(now + 0.1);
    } else {
        osc.type = 'sine'; osc.frequency.setValueAtTime(440, now);
        gain.gain.setValueAtTime(0.1, now); gain.gain.exponentialRampToValueAtTime(0.01, now + 0.5); 
        osc.start(now); osc.stop(now + 0.5);
    }
};

// --- LOGIQUE MÉTIER PURE ---

const generateNumbers = (maxVal = 20) => {
    const nums = new Set();
    let safety = 0;
    while(nums.size < 4 && safety < 100) {
        nums.add(Math.floor(Math.random() * maxVal) + 1);
        safety++;
    }
    return { numbers: Array.from(nums).sort((a,b)=>a-b), bonus: Math.floor(Math.random() * 6) + 1 };
};

const generateRitualGrid = () => {
    const nums = new Set();
    while(nums.size < 9) nums.add(Math.floor(Math.random() * 20) + 1);
    const arr = Array.from(nums);
    return [
        arr.slice(0,3),
        arr.slice(3,6),
        arr.slice(6,9)
    ];
};

const checkWin = (ticketNumbers, ticketBonus, drawNumbers, drawBonus, eventType) => {
    let effectiveDrawNumbers = drawNumbers;
    if (eventType === EVENT_TYPES.DIGITAL_HERESY) { 
        effectiveDrawNumbers = drawNumbers.filter(n => n % 2 !== 0);
    }
    const matches = ticketNumbers.filter(n => effectiveDrawNumbers.includes(n)).length;
    const bonusMatch = ticketBonus === drawBonus ? 1 : 0;
    return CONFIG.ranks.find(r => r.match[0] === matches && r.match[1] === bonusMatch);
};

const checkTerritoryMatch = (ticketNumbers, ticketBonus) => {
    for (const city of Object.values(TERRITORIES)) {
        if (ticketNumbers.includes(city.target.n) && ticketBonus === city.target.b) {
            return city.id;
        }
    }
    return null;
};

const checkRitualLines = (grid, markedNumbers) => {
    let lines = 0;
    for(let row of grid) {
        if(row.every(n => markedNumbers.includes(n))) lines++;
    }
    return lines;
};

const calculateSealBonus = (sealNumbers) => {
    const rows = [[1,2,3,4,5],[6,7,8,9,10],[11,12,13,14,15],[16,17,18,19,20]];
    let linesCompleted = 0;
    let completedRowIndices = [];
    rows.forEach((row, index) => {
        if (row.every(n => sealNumbers.includes(n))) {
            linesCompleted++;
            completedRowIndices.push(index);
        }
    });
    let discountNormal = 0; let discountHell = 0;
    if (linesCompleted >= 1) discountNormal = 0.05;
    if (linesCompleted >= 2) discountHell = 0.05;
    if (linesCompleted >= 3) discountNormal = 0.10;
    if (linesCompleted >= 4) discountHell = 0.10;
    return { lines: linesCompleted, discountNormal, discountHell, completedRowIndices };
};

const getCountdownToHell = (currentDraw) => {
    let lastDigit = currentDraw % 10;
    if (lastDigit === 6) return 0;
    return lastDigit < 6 ? 6 - lastDigit : 16 - lastDigit;
};

const getCountdownToSoul = (currentDraw) => {
    const remainder = currentDraw % CONFIG.soulDrawFreq;
    if (remainder === 0) return 0; 
    return CONFIG.soulDrawFreq - remainder;
};

const generateCryptoKey = () => {
    let key = "";
    for(let i=0; i < CONFIG.cryptoKeyLength; i++) {
        key += CONFIG.cryptoChars.charAt(Math.floor(Math.random() * CONFIG.cryptoChars.length));
    }
    return key;
};

const rollForSpecialEvent = (isGrandRitualArmed) => {
    if (isGrandRitualArmed) return { type: 'NONE', duration: 0, lockedIndices: [] };
    if (Math.random() > 0.15) return { type: 'NONE', duration: 0, lockedIndices: [] };

    const totalWeight = EVENT_WEIGHTS.reduce((sum, event) => sum + event.weight, 0);
    let randomNum = Math.random() * totalWeight;

    for (const event of EVENT_WEIGHTS) {
        if (randomNum < event.weight) {
            let lockedIndices = [];
            if (event.type === 'DESCENTE_POLICE') { 
                const indices = new Set();
                while(indices.size < 4) indices.add(Math.floor(Math.random() * 9));
                lockedIndices = Array.from(indices);
            }
            return { type: event.type, duration: event.duration, lockedIndices };
        }
        randomNum -= event.weight;
    }
    return { type: 'NONE', duration: 0, lockedIndices: [] };
};

// --- LOGIQUE DE SAUVEGARDE ET COMPRESSION ---

const compressState = (state) => {
    const compressedPlayers = state.players.map(p => {
        const statsArr = [
            p.stats.bought, p.stats.won, p.stats.wonNormal, p.stats.wonHell, 
            p.stats.mysteryGains, p.stats.highestRank, p.stats.sealsValidated, 
            p.stats.cyclesPlayed, p.stats.totalSpent, p.stats.gamesWonCount, 
            p.stats.ritualLinesTotal, p.stats.boughtLastDraw, p.stats.boughtCurrentDraw,
            p.stats.gridsPlayedSinceReset,
            p.stats.winStreak || 0 
        ];
        const ticketsArr = p.tickets.map(t => [t.numbers, t.bonus, t.type, t.soulCode, t.isFree ? 1 : 0, t.cryptoChar || '?', t.isCryptoHit ? 1 : 0]);
        
        return [
            p.id, p.name, Number(p.balance.toFixed(2)), p.plagueStatus, p.immunityDuration,
            [p.ritual.grid, p.ritual.marks, p.ritual.seal], 
            statsArr, ticketsArr,
            p.controlledZones || [], 
            p.workCooldown || 0, p.omertaTokens || 0, p.cryptoProgress || "",
            p.cityStatus || {}, 
            p.territories || [],
            p.faction || 'SYNDICAT'
        ];
    });

    const compressedData = [
        state.currentDraw,
        [state.pots.normal, state.pots.hell, state.pots.mystery, state.pots.soul, state.pots.mega, state.pots.crypto].map(v => Number(v.toFixed(2))), 
        state.soulCodes.map(sc => [sc.code, sc.playerId, sc.playerName]), 
        compressedPlayers, state.globalTicketCounter, 
        [state.specialEvent.type, state.specialEvent.duration, state.specialEvent.lockedIndices], 
        state.grandRitualArmed ? 1 : 0,
        state.mostWantedPlayerId || null,
        state.cryptoKey
    ];
    return btoa(JSON.stringify(compressedData));
};

const decompressState = (str) => {
    const data = JSON.parse(atob(str));
    return {
        currentDraw: data[0],
        pots: { normal: data[1][0], hell: data[1][1], mystery: data[1][2], soul: data[1][3], mega: data[1][4], crypto: data[1][5] || 0 },
        soulCodes: data[2].map(sc => ({ code: sc[0], playerId: sc[1], playerName: sc[2] })),
        players: data[3].map(p => {
            const statsArr = p[6];
            const ritualArr = p[5];
            const linesNow = statsArr[10];
            return {
                id: p[0], name: p[1], balance: p[2], plagueStatus: p[3], immunityDuration: p[4],
                ritual: { grid: ritualArr[0], marks: ritualArr[1], seal: ritualArr[2] },
                discounts: { normal6: linesNow >= 1, hell6: linesNow >= 2, mega66: linesNow >= 3 },
                stats: {
                    bought: statsArr[0], won: statsArr[1], wonNormal: statsArr[2], wonHell: statsArr[3],
                    mysteryGains: statsArr[4], highestRank: statsArr[5], sealsValidated: statsArr[6],
                    cyclesPlayed: statsArr[7], totalSpent: statsArr[8], gamesWonCount: statsArr[9],
                    ritualLinesTotal: statsArr[10], boughtLastDraw: statsArr[11], boughtCurrentDraw: statsArr[12],
                    gridsPlayedSinceReset: statsArr[13] || 0, winStreak: statsArr[14] || 0
                },
                tickets: p[7].map(t => ({ 
                    numbers: t[0], bonus: t[1], type: t[2], soulCode: t[3], 
                    isFree: t[4] === 1, cryptoChar: t[5] || '?', isCryptoHit: t[6] === 1, ticketId: Math.random().toString() 
                })),
                controlledZones: p[8] || [],
                territories: p[13] || [], 
                workCooldown: p[9] || 0, omertaTokens: p[10] || 0, cryptoProgress: p[11] || "", 
                cityStatus: p[12] || {}, 
                faction: p[14] || 'SYNDICAT', 
                recentGain: 0
            };
        }),
        lastDrawResults: null, lastDrawDetails: null, globalTicketCounter: data[4], history: [], 
        specialEvent: { type: data[5][0], duration: data[5][1], lockedIndices: data[5][2] },
        grandRitualArmed: data[6] === 1, mostWantedPlayerId: data[7] || null, cryptoKey: data[8] || generateCryptoKey()
    };
};
