// app.jsx - PARTIE 1/3 : Icônes, Initialisation et Actions Joueurs

const { useState, useEffect, useRef, useMemo } = React;

// --- ICONES THÉMATIQUES ---
const Icon = ({ path, className, size = 20 }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>{path}</svg>
);
const Icons = {
    Skull: <><circle cx="9" cy="12" r="1"/><circle cx="15" cy="12" r="1"/><path d="M8 20v2h8v-2"/><path d="M12.5 17l-.5-1-.5 1h1z"/><path d="M16 20a2 2 0 0 0 1.56-3.25 8 8 0 1 0-11.12 0A2 2 0 0 0 8 20"/></>,
    Flame: <><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-2.246-3.726-3.236-4.81A8 8 0 0 1 12 2c2.21 0 4.205.88 5.714 2.31C19.82 6.47 22 9.31 22 13a9 9 0 0 1-11.96 8.52"/><path d="M6.14 10.94A5 5 0 1 0 11 15"/></>,
    Ticket: <><rect x="2" y="4" width="20" height="16" rx="2"/><line x1="12" y1="4" x2="12" y2="20" strokeDasharray="2 2"/><circle cx="12" cy="12" r="3" opacity="0.5"/></>,
    Grid: <><path d="M3 3h18v18H3z"/><path d="M21 9H3"/><path d="M21 15H3"/><path d="M12 3v18"/><path d="M12 12h9"/><path d="M12 12v9"/></>,
    Cog: <><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></>,
    Scroll: <><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></>,
    Chart: <><path d="M12 20V10"/><path d="M18 20V4"/><path d="M6 20v-4"/><line x1="2" y1="20" x2="22" y2="20"/></>,
    User: <><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></>,
    Key: <><circle cx="7.5" cy="15.5" r="5.5"/><path d="m21 2-9.6 9.6"/><path d="m15.5 7.5 3 3L22 7l-3-3"/></>,
    Book: <><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></>,
    Moon: <><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></>,
    Lock: <><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></>,
    Shield: <><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><circle cx="12" cy="12" r="3" opacity="0.3"/></>,
    Clock: <><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></>,
    Bolt: <><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" /></>,
    Star: <><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></>,
    Eye: <><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></>,
    Biohazard: <><path d="M8.68 12.32a3 3 0 0 0 6.64 0 5 5 0 1 0-7.44-5.3 5 5 0 0 0 3.32 8.78 5 5 0 1 0-2.52-3.48ZM12 7a2 2 0 1 1 0 4 2 2 0 0 1 0-4Z"/></>,
    Syringe: <><path d="m18 2 4 4"/><path d="m17 7 3-3"/><path d="M19 9 8.7 19.3c-1 1-2.5 1-3.4 0l-.6-.6c-1-1-1-2.5 0-3.4L15 5"/><path d="m9 11 4 4"/><path d="m5 19-3 3"/></>,
    Dna: <><path d="M2 15c6.667-6 13.333 0 20-6"/><path d="M9 22c1.798-1.998 2.518-3.995 2.807-5.993"/><path d="M15 2c-1.798 1.998-2.518 3.995-2.807 5.993"/><path d="M17 12c-5.667 4-11.333-2-17 2"/><path d="M22 9c-5.667-4-11.333 2-17-2"/></>,
    BrokenHeart: <><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/><path d="M12 5l-2 7 4 3-6 5"/></>,
    Ghost: <><path d="M9 10h.01"/><path d="M15 10h.01"/><path d="M12 2a8 8 0 0 0-8 8v12l3-3 2.5 2.5L12 19l2.5 2.5L17 19l3 3V10a8 8 0 0 0-8-8z"/></>,
    Shuffle: <><path d="M2 18h1.4c1.3 0 2.5-.6 3.3-1.7l14.2-17"/><path d="M2 5h1.4c1.3 0 2.5.6 3.3 1.7l14.2 17"/><path d="M15 5h6v6"/><path d="M15 19h6v-6"/></>,
    Sun: <><circle cx="12" cy="12" r="5"/><path d="M12 1v2"/><path d="M12 21v2"/><path d="M4.22 4.22l1.42 1.42"/><path d="M18.36 18.36l1.42 1.42"/><path d="M1 12h2"/><path d="M21 12h2"/><path d="M4.22 19.78l1.42-1.42"/><path d="M18.36 5.64l1.42-1.42"/></>,
    Briefcase: <><rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></>,
    Map: <><polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"/><line x1="8" y1="2" x2="8" y2="18"/><line x1="16" y1="6" x2="16" y2="22"/></>,
    Crosshair: <><circle cx="12" cy="12" r="10"/><line x1="22" y1="12" x2="18" y2="12"/><line x1="6" y1="12" x2="2" y2="12"/><line x1="12" y1="6" x2="12" y2="2"/><line x1="12" y1="22" x2="12" y2="18"/></>,
    Chip: <><rect x="4" y="4" width="16" height="16" rx="2" /><path d="M9 2v2"/><path d="M15 2v2"/><path d="M9 20v2"/><path d="M15 20v2"/><path d="M2 9h2"/><path d="M2 15h2"/><path d="M20 9h2"/><path d="M20 15h2"/><path d="M9 9h6v6H9z"/></>
};
const SVG = ({ icon, className, size }) => <Icon path={Icons[icon]} className={className} size={size} />;

// --- COMPOSANT APPLICATION ---
function App() {
    const [gameState, setGameState] = useState({
        currentDraw: 1,
        pots: { normal: 100.00, hell: 75.00, mystery: 50.00, soul: 5.00, mega: 0, crypto: 0 }, 
        soulCodes: [],
        players: [], 
        mostWantedPlayerId: null, 
        lastDrawResults: null,
        lastDrawDetails: { 
            winners: [], ticketsPlayed: [], isHell: false, mysteryEvent: false, mysteryShare: 0, 
            plagueEvents: [], soulDrawResult: null, potsBefore: { normal: 0, hell: 0, mystery: 0, mega: 0 },
            potsAfter: { normal: 0, hell: 0, mystery: 0, mega: 0 }, grandRitualAction: null, 
            grandRitualStats: null, territoryEvents: [] 
        }, 
        globalTicketCounter: 0,
        history: [],
        specialEvent: { type: 'NONE', duration: 0, lockedIndices: [] },
        grandRitualArmed: false,
        cryptoKey: generateCryptoKey()
    });

    const [view, setView] = useState('MENU'); 
    const [selectedPlayerId, setSelectedPlayerId] = useState(null);
    const [isHellRound, setIsHellRound] = useState(false);
    const [saveString, setSaveString] = useState("");
    
    const [showGrandRitualFusion, setShowGrandRitualFusion] = useState(false); 
    const [showSeparationAnim, setShowSeparationAnim] = useState(false);
    
    const [gunfightQueue, setGunfightQueue] = useState([]);
    const [currentGunfight, setCurrentGunfight] = useState(null);
    const [gunfightStep, setGunfightStep] = useState(0); 
    
    const [fusionStep, setFusionStep] = useState(0); 
    const [tempPots, setTempPots] = useState({ normal: 0, hell: 0, mystery: 0, soul: 0, grandTotal: 0 });
    const [mutatingBonus, setMutatingBonus] = useState("?");
    const [potPulse, setPotPulse] = useState(false);
    const [headerPulse, setHeaderPulse] = useState(false);
    const [ritualShake, setRitualShake] = useState(false);
    const [potEditMode, setPotEditMode] = useState(false);
    const [editedPots, setEditedPots] = useState({ normal: 0, hell: 0, mystery: 0 });

    // --- HELPER : VÉRIFIER QUI POSSÈDE UNE VILLE (MAJORITÉ) ---
    const getCityController = (cityId, allPlayers) => {
        const city = TERRITORIES[cityId];
        if (!city || !city.zones) return null;
        
        let maxZones = 0;
        let controllerId = null;
        let isTie = false;

        allPlayers.forEach(p => {
            const ownedCount = p.controlledZones.filter(zId => city.zones.some(z => z.id === zId)).length;
            if (ownedCount > maxZones) {
                maxZones = ownedCount;
                controllerId = p.id;
                isTie = false;
            } else if (ownedCount === maxZones && maxZones > 0) {
                isTie = true;
            }
        });
        const threshold = Math.floor(city.zones.length / 2) + 1;
        if (!isTie && maxZones >= threshold) return controllerId;
        return null;
    };

    // --- EFFETS (HOOKS) ---
    useEffect(() => {
        const saved = localStorage.getItem('CARTEL_AUTO_SAVE');
        if (saved) {
            try { setGameState(decompressState(saved)); } 
            catch(e) { console.log("Sauvegarde auto corrompue"); }
        }
    }, []);

    useEffect(() => {
        if(gameState.players.length > 0) {
            const compressed = compressState(gameState);
            localStorage.setItem('CARTEL_AUTO_SAVE', compressed);
        }
    }, [gameState]);

    useEffect(() => {
        const isHell = gameState.currentDraw.toString().endsWith('6');
        setIsHellRound(isHell);
        
        let theme = "theme-normal";
        const evType = gameState.specialEvent.type;

        if (view === 'GUNFIGHT_ANIMATION') theme = "theme-blood"; 
        else if (showGrandRitualFusion || evType === EVENT_TYPES.GRAND_RITUAL) theme = "theme-grand-ritual"; 
        else if(view === 'HELL_RESET') theme = "theme-666"; 
        else if (evType === EVENT_TYPES.BLOOD_MOON) theme = "theme-blood";
        else if (evType === EVENT_TYPES.PURE_CHAOS || evType === EVENT_TYPES.DIGITAL_HERESY) theme = "theme-pure-chaos";
        else if (evType === EVENT_TYPES.MARK_OF_EVIL || evType === EVENT_TYPES.QUARANTINE) theme = "theme-mark-evil";
        else if (evType === EVENT_TYPES.NEGATIVE_IMPULSE) theme = "theme-soul-dark";
        else if (evType === EVENT_TYPES.SOUL_DEBT) theme = "theme-mystery";
        else if (evType === EVENT_TYPES.WIDOWS_GIFT) theme = "theme-plague";
        else if (evType === EVENT_TYPES.URBAN_REVOLT) theme = "theme-chaos";
        else if (evType === EVENT_TYPES.GO_FAST_INTERCEPT) theme = "theme-666";
        else if (isHell) theme = "theme-666";
        
        document.body.className = `${theme} screen-fx`;
    }, [gameState.currentDraw, view, gameState.specialEvent, showGrandRitualFusion]);

    useEffect(() => {
        let interval;
        if (view === 'DRAW_SUSPENSE') {
            interval = setInterval(() => setMutatingBonus(Math.floor(Math.random() * 6) + 1), 80);
        } else {
            setMutatingBonus("?");
        }
        return () => clearInterval(interval);
    }, [view]);

    useEffect(() => {
        if (view === 'DRAW_RESULTS' && gameState.lastDrawDetails?.soulDrawResult) {
            const timer = setTimeout(() => playSound('soul_win'), 800);
            return () => clearTimeout(timer);
        }
    }, [view, gameState.lastDrawDetails]);

    useEffect(() => {
        if (gunfightQueue.length > 0 && view !== 'GUNFIGHT_ANIMATION') {
            const nextFight = gunfightQueue[0];
            setCurrentGunfight(nextFight);
            setView('GUNFIGHT_ANIMATION');
            
            setGunfightStep(0); 
            playSound('separation'); 
            
            setTimeout(() => { setGunfightStep(1); playSound('horn'); }, 200);
            setTimeout(() => { setGunfightStep(2); playSound('suspense'); }, 800);
            setTimeout(() => { setGunfightStep(3); playSound('gunshot'); }, 1800);
            setTimeout(() => { setGunfightStep(4); playSound('thud'); }, 2500);
            setTimeout(() => {
                setGunfightQueue(prev => prev.slice(1)); 
                setView('DRAW_RESULTS'); 
            }, 4000);
        }
    }, [gunfightQueue, view]);

    // --- ACTIONS DES JOUEURS ---
    const createPlayer = (name) => {
        const factionKeys = Object.keys(FACTIONS);
        const randomKey = factionKeys[Math.floor(Math.random() * factionKeys.length)];
        const myFaction = FACTIONS[randomKey];

        let startBalance = 100;
        if (myFaction.id === 'SYNDICAT') startBalance = 150; 
        if (myFaction.id === 'ORDRE') startBalance = 50;     

        const newPlayer = {
            id: Date.now(),
            name: name || "Soldat Inconnu",
            faction: myFaction.id, 
            balance: startBalance, 
            plagueStatus: PLAGUE.STATUS.HEALTHY,
            immunityDuration: 5,
            ritual: { grid: generateRitualGrid(), marks: [], seal: [] },
            discounts: { normal6: false, hell6: false, mega66: false },
            stats: { 
                bought: 0, won: 0, wonNormal: 0, wonHell: 0, mysteryGains: 0, 
                highestRank: null, sealsValidated: 0, cyclesPlayed: 0, totalSpent: 0, 
                gamesWonCount: 0, ritualLinesTotal: 0, boughtLastDraw: 0,
                boughtCurrentDraw: 0, gridsPlayedSinceReset: 0, winStreak: 0 
            },
            tickets: [], recentGain: 0, controlledZones: [], territories: [],
            cityStatus: {}, workCooldown: 0, omertaTokens: 0, cryptoProgress: ""
        };

        setGameState(prev => {
            const newState = { ...prev };
            const players = [...prev.players, newPlayer];
            const injectionAmount = 50; 
            const isHellNow = newState.currentDraw.toString().endsWith('6');
            
            const soulPart = injectionAmount * CONFIG.soulTax;
            newState.pots.soul += soulPart;
            
            const distributableAmount = injectionAmount - soulPart;
            const dist = isHellNow ? CONFIG.distHell : CONFIG.distNormal;
            
            newState.pots.normal += distributableAmount * dist.normal;
            newState.pots.hell += distributableAmount * dist.hell;
            newState.pots.mystery += distributableAmount * dist.mystery;

            return { ...newState, players };
        });

        setSelectedPlayerId(newPlayer.id);
        playSound('click');
        alert(`Recrue enregistrée chez : ${myFaction.name}\nBonus: ${myFaction.bonus}\nMalus: ${myFaction.malus}`);
    };

    const handleWork = () => {
        if (!selectedPlayerId) return;
        setGameState(prev => {
            const newState = { ...prev };
            const player = newState.players.find(p => p.id === selectedPlayerId);
            if (!player) return prev;
            
            if (player.workCooldown > 0) {
                playSound('error');
                alert(`Tu dois te faire oublier encore ${player.workCooldown} tours.`);
                return prev;
            }

            let workBonus = 0;
            let zonesDetails = []; 

            if (player.controlledZones && player.controlledZones.length > 0) {
                player.controlledZones.forEach(myZoneId => {
                     for (const city of Object.values(TERRITORIES)) {
                         const zoneInfos = city.zones.find(z => z.id === myZoneId);
                         if (zoneInfos && zoneInfos.bonus === 'WORK') {
                             let amount = 1.0;
                             if (zoneInfos.desc.includes('+2')) amount = 2.0;
                             else if (zoneInfos.desc.includes('+3')) amount = 3.0; 
                             
                             workBonus += amount;
                             zonesDetails.push(`${zoneInfos.name} (+${amount}€)`);
                         }
                     }
                });
            }

            if (player.faction === 'CHIMISTES') { workBonus += 5.0; zonesDetails.push("Bonus Chimiste (+5€)"); }
            if (player.faction === 'BRAVAS') { workBonus -= 2.0; zonesDetails.push("Malus Bravas (-2€)"); }

            const grossReward = CONFIG.workReward + workBonus; 
            const tax = grossReward * CONFIG.cryptoTax; 
            const netReward = grossReward - tax; 

            player.balance += netReward;
            newState.pots.crypto += tax; 
            player.workCooldown = CONFIG.workCooldown; 
            
            playSound('buy'); 
            const detailText = zonesDetails.length > 0 ? `\n(Inclus: ${zonesDetails.join(', ')})` : "";
            alert(`CHARBON RÉUSSI !\nGain Net : ${netReward.toFixed(2)}€${detailText}\n(Taxe Crypto: ${tax.toFixed(2)}€)`);

            return newState;
        });
    };

    const handleOmertaExchange = () => {
        if (!selectedPlayerId) return;
        setGameState(prev => {
            const newState = { ...prev };
            const player = newState.players.find(p => p.id === selectedPlayerId);
            
            if (player.omertaTokens < CONFIG.omertaTarget) {
                playSound('error');
                alert(`Pas assez de preuves. Il faut ${CONFIG.omertaTarget} jetons.`);
                return prev;
            }

            player.omertaTokens -= CONFIG.omertaTarget;
            const maxVal = newState.specialEvent.type === EVENT_TYPES.PURE_CHAOS ? 10 : 20;
            const freeTicket = { 
                ...generateNumbers(maxVal), type: 'free', isFree: true,
                ticketId: `OMERTA-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
                soulCode: `SILENCE-${Date.now().toString(36).slice(-3)}`
            };
            
            player.tickets.push(freeTicket);
            newState.soulCodes.push({ code: freeTicket.soulCode, playerId: player.id, playerName: player.name });
            if (newState.pots.normal >= CONFIG.ticketPrice) newState.pots.normal -= CONFIG.ticketPrice;

            playSound('click'); 
            return newState;
        });
    };

    const handleZoneDeploy = (zoneId, price) => {
        if (!selectedPlayerId) return;
        if (gameState.players.length < 2) {
            playSound('error');
            alert("Guerre impossible : Il faut au moins 2 joueurs inscrits pour capturer des territoires.");
            return;
        }
        
        setGameState(prev => {
            const newState = { ...prev };
            const attacker = newState.players.find(p => p.id === selectedPlayerId);
            
            let targetCity = null;
            for (const city of Object.values(TERRITORIES)) {
                if (city.zones.some(z => z.id === zoneId)) targetCity = city;
            }

            if (targetCity && !attacker.territories.includes(targetCity.id)) {
                playSound('error');
                alert(`Accès Refusé : Vous devez d'abord gagner la ville de ${targetCity.name} (Tirage T${targetCity.target.n}+B${targetCity.target.b}) pour déployer ici.`);
                return prev;
            }

            if (attacker.balance < price) { playSound('error'); alert("Fonds insuffisants pour le déploiement."); return prev; }

            let defender = newState.players.find(p => p.controlledZones.includes(zoneId));
            if (defender && defender.id === attacker.id) { playSound('error'); alert("Tu contrôles déjà cette zone."); return prev; }

            attacker.balance -= price;
            newState.pots.normal += (price * 0.8); 
            
            let rollAttacker = Math.floor(Math.random() * 6) + 1;
            if (attacker.faction === 'BRAVAS') rollAttacker += 1;

            const rollDefender = defender ? Math.floor(Math.random() * 6) + 1 : 0;
            let defBonus = 0;
            
            if (targetCity && targetCity.zones && defender) {
                targetCity.zones.forEach(zone => {
                    if (defender.controlledZones.includes(zone.id) && zone.bonus === 'DEFENSE') {
                        defBonus += zone.desc.includes('+2') ? 2 : 1;
                    }
                });
                if (defender.faction === 'SYNDICAT') defBonus -= 1;
            }
            
            const totalDef = rollDefender + defBonus;

            if (rollAttacker > totalDef) {
                if (defender) {
                    defender.controlledZones = defender.controlledZones.filter(z => z !== zoneId);
                    playSound('gunshot');

                    if (defender.id === newState.mostWantedPlayerId) {
                        const stealAmount = Math.floor(defender.balance * 0.05);
                        if (stealAmount > 0) {
                            defender.balance -= stealAmount; attacker.balance += stealAmount;
                            alert(`CIBLE ABATTUE !\n${attacker.name} capture la zone et touche la PRIME !\n\n${attacker.name} vole ${stealAmount.toFixed(2)}€ (5%) à ${defender.name}.`);
                        } else {
                            alert(`DÉPLOIEMENT RÉUSSI !\n${attacker.name} capture la zone de la Cible Prioritaire, mais ses coffres sont vides.`);
                        }
                    } else {
                        const attackMsg = attacker.faction === 'BRAVAS' ? ` (Bonus Bravas +1)` : '';
                        const defMsg = (defender && defender.faction === 'SYNDICAT') ? ` (Malus Syndicat -1)` : '';
                        alert(`DÉPLOIEMENT RÉUSSI !\n${attacker.name} [${rollAttacker}${attackMsg}] prend la zone.\n${defender.name} [${totalDef}${defMsg}] est chassé.`);
                    }
                } else {
                    playSound('buy'); alert(`ZONE LIBRE CAPTURÉE.\n${attacker.name} prend le contrôle.`);
                }
                attacker.controlledZones.push(zoneId);
            } else {
                playSound('thud');
                const attackMsg = attacker.faction === 'BRAVAS' ? ` (Bonus Bravas +1)` : '';
                const defMsg = (defender && defender.faction === 'SYNDICAT') ? ` (Malus Syndicat -1)` : '';
                alert(`ÉCHEC DU DÉPLOIEMENT.\n${attacker.name} [${rollAttacker}${attackMsg}] repoussé par ${defender ? defender.name : "les locaux"} [${totalDef}${defMsg}].`);
            }
            return newState;
        });
    };

    const buyTicket = () => {
        if(!selectedPlayerId) return;
        setHeaderPulse(true); setTimeout(() => setHeaderPulse(false), 300);
        setPotPulse(true); setTimeout(() => setPotPulse(false), 300);

        setGameState(prev => {
            const newState = { ...prev };
            const player = newState.players.find(p => p.id === selectedPlayerId);
            const activeEvent = newState.specialEvent.type;

            if (player.workCooldown > 0) {
                playSound('error'); alert(`INTERDIT : Tu es fiché pour encore ${player.workCooldown} tours (Travail Forcé).`);
                return prev;
            }

            if (activeEvent === EVENT_TYPES.MARK_OF_EVIL) {
                const isJunkieOrUser = player.plagueStatus === PLAGUE.STATUS.INFECTED || player.plagueStatus === PLAGUE.STATUS.INCUBATING;
                if (!isJunkieOrUser) { playSound('error'); alert("CONTREBANDE : Seuls les 'clients' ont accès au marché."); return prev; }
            }

            if (activeEvent !== EVENT_TYPES.GRAND_RITUAL && player.tickets.length >= CONFIG.maxTicketsPerPlayer) {
                playSound('error'); alert(`LIMITE ATTEINTE : ${CONFIG.maxTicketsPerPlayer} tickets max par soldat.`); return prev;
            }

            if (activeEvent === EVENT_TYPES.GRAND_RITUAL) {
                if (player.tickets.some(t => t.type === 'raffle')) { playSound('error'); alert("GRAND CONSEIL : Une seule voix par parrain."); return prev; }
                let price = GRAND_RITUAL_CONFIG.price;
                player.balance -= price; player.stats.bought += 1; player.stats.boughtCurrentDraw += 1; player.stats.totalSpent += price;
                newState.pots.mega += price;
                
                const ticket = { 
                    numbers: [], bonus: '?', type: 'raffle', isFree: false,
                    ticketId: `R-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
                    soulCode: `GC-${Date.now().toString(36).toUpperCase().slice(-4)}`, cryptoChar: '?', isCryptoHit: false 
                };
                player.tickets.push(ticket); playSound('buy'); return newState;
            }

            let basePrice = isHellRound ? CONFIG.ticketPriceHell : CONFIG.ticketPrice;
            if (player.faction === 'ORDRE') basePrice -= 1.00;
            if (player.faction === 'CHIMISTES') basePrice += 1.00;
            if (activeEvent === EVENT_TYPES.BLOOD_MOON) basePrice *= 1.50; 
            
            if (activeEvent === EVENT_TYPES.QUARANTINE) { 
                if (player.plagueStatus === PLAGUE.STATUS.HEALTHY || player.plagueStatus === PLAGUE.STATUS.IMMUNE) basePrice *= 3;
            } else if (player.plagueStatus === PLAGUE.STATUS.INFECTED) {
                 basePrice *= 2; 
            }

            let finalPrice = basePrice;
            let isFreeTicket = false;

            if (activeEvent === EVENT_TYPES.WIDOWS_GIFT && player.balance < 5) {
                finalPrice = 0; isFreeTicket = true; newState.pots.normal -= CONFIG.ticketPrice; 
            }

            if (activeEvent === EVENT_TYPES.SOUL_DEBT) {
                const allBoughtCounts = newState.players.map(p => p.stats.bought).sort((a,b) => a-b);
                const medianBought = allBoughtCounts[Math.floor(allBoughtCounts.length / 2)];
                if (player.stats.bought > medianBought) finalPrice = 1.00;
            }

            if (newState.mostWantedPlayerId === player.id) {
                const hackingRatio = (player.cryptoProgress || "").length / CONFIG.cryptoKeyLength;
                finalPrice *= hackingRatio >= 0.5 ? 1.10 : 1.05; 
            }

            if (!isFreeTicket && activeEvent !== EVENT_TYPES.SOUL_DEBT) {
                const sealBonus = calculateSealBonus(player.ritual.seal);
                let discountMultiplier = 1.0;
                if (isHellRound) discountMultiplier -= sealBonus.discountHell;
                else discountMultiplier -= sealBonus.discountNormal;

                const territoryCount = player.territories ? player.territories.length : 0;
                let isGoFastTarget = false;
                if (activeEvent === EVENT_TYPES.GO_FAST_INTERCEPT) {
                    const maxT = Math.max(...newState.players.map(p => p.territories?.length || 0));
                    if (territoryCount > 0 && territoryCount === maxT) isGoFastTarget = true;
                }

                if (territoryCount > 0 && !isGoFastTarget) {
                    const depts = {};
                    player.territories.forEach(tId => {
                        const city = TERRITORIES[tId];
                        if (city) depts[city.dept] = (depts[city.dept] || 0) + 1;
                    });
                    let monopolyCount = 0;
                    Object.values(depts).forEach(count => { if (count === 3) monopolyCount++; });
                    
                    discountMultiplier -= (territoryCount * CONFIG.cityDiscount) + (monopolyCount * CONFIG.monopolyDiscount);
                }

                if (discountMultiplier < 0.1) discountMultiplier = 0.1;
                finalPrice *= discountMultiplier;

                const loyaltyCount = player.stats.bought % CONFIG.fid.individualTarget;
                if (activeEvent === EVENT_TYPES.ABSOLUTE_LOYALTY && loyaltyCount >= 13 || player.discounts.mega66) finalPrice *= 0.50; 
                else if ((isHellRound && player.discounts.hell6) || (!isHellRound && player.discounts.normal6)) finalPrice *= 0.95; 
            }

            if (!isFreeTicket && player.balance < finalPrice) {
                playSound('error'); alert("T'es à sec. Va charbonner ou attends la Solidarité."); return prev;
            }

            player.balance -= finalPrice;
            player.stats.bought += 1; player.stats.boughtCurrentDraw += 1; player.stats.gridsPlayedSinceReset += 1; player.stats.totalSpent += finalPrice;
            if (!isFreeTicket) newState.globalTicketCounter += 1;

            let cryptoAttempts = 1;
            if (player.controlledZones && player.controlledZones.length > 0) {
                 player.controlledZones.forEach(myZoneId => {
                     for (const city of Object.values(TERRITORIES)) {
                         const zoneInfos = city.zones.find(z => z.id === myZoneId);
                         if (zoneInfos && zoneInfos.bonus === 'CRYPTO') cryptoAttempts += 1; 
                     }
                });
            }

            let rolledCharsDisplay = []; 
            let isCryptoHit = false;

            for (let i = 0; i < cryptoAttempts; i++) {
                const targetKey = newState.cryptoKey;
                const currentProgress = player.cryptoProgress || "";
                const rolledChar = CONFIG.cryptoChars.charAt(Math.floor(Math.random() * CONFIG.cryptoChars.length));
                rolledCharsDisplay.push(rolledChar);

                if (currentProgress.length < targetKey.length) {
                    const nextChar = targetKey.charAt(currentProgress.length);
                    if (rolledChar === nextChar) {
                        isCryptoHit = true; player.cryptoProgress = currentProgress + rolledChar; playSound('hack_success');
                        if (player.cryptoProgress === targetKey) {
                            const jackpot = newState.pots.crypto;
                            const tax = jackpot * CONFIG.cryptoTax;
                            const netJackpot = jackpot - tax;
                            player.balance += netJackpot; newState.pots.crypto = tax; 
                            newState.cryptoKey = generateCryptoKey();
                            newState.players.forEach(p => p.cryptoProgress = ""); 
                            playSound('win'); alert(`HACK RÉUSSI ! ${player.name} débloque le CRYPTO VAULT : +${netJackpot.toFixed(2)}€ !`);
                            break; 
                        }
                    }
                }
            }

            const soulCode = `C-${Date.now().toString(36).toUpperCase().slice(-4)}-${Math.floor(Math.random()*1000)}`;
            newState.soulCodes.push({ code: soulCode, playerId: player.id, playerName: player.name });

            const maxVal = activeEvent === EVENT_TYPES.PURE_CHAOS ? 10 : 20;
            const ticket = { 
                ...generateNumbers(maxVal), 
                type: isHellRound ? 'hell' : (isFreeTicket ? 'free' : 'normal'), 
                isFree: isFreeTicket, ticketId: `T-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
                soulCode: soulCode, cryptoChar: rolledCharsDisplay.join('|'), isCryptoHit: isCryptoHit 
            };
            player.tickets.push(ticket);

            if (!isFreeTicket) {
                if (activeEvent === EVENT_TYPES.BLOOD_MOON) {
                    const soulPart = finalPrice * CONFIG.soulTax;
                    newState.pots.soul += soulPart; newState.pots.hell += (finalPrice - soulPart);
                } else {
                    const soulPart = finalPrice * CONFIG.soulTax;
                    newState.pots.soul += soulPart;
                    let distributableAmount = finalPrice - soulPart;
                    
                    if (player.plagueStatus === PLAGUE.STATUS.INFECTED) {
                        const infectedTax = finalPrice * 0.10;
                        newState.pots.mystery += infectedTax; distributableAmount -= infectedTax;
                    }

                    const dist = isHellRound ? CONFIG.distHell : CONFIG.distNormal;
                    newState.pots.normal += distributableAmount * dist.normal;
                    newState.pots.hell += distributableAmount * dist.hell;
                    newState.pots.mystery += distributableAmount * dist.mystery;
                }
            }

            if (!isFreeTicket && player.stats.bought % CONFIG.fid.individualTarget === 0) {
                const freeTicket = { 
                    ...generateNumbers(maxVal), type: 'free', isFree: true,
                    ticketId: `TF-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
                    soulCode: `FREE-${Date.now().toString(36).slice(-3)}`, cryptoChar: '?', isCryptoHit: false
                };
                newState.soulCodes.push({ code: freeTicket.soulCode, playerId: player.id, playerName: player.name });
                player.tickets.push(freeTicket);
                newState.pots.normal -= CONFIG.ticketPrice; 
                playSound('buy'); 
            } else {
                if (player.plagueStatus === PLAGUE.STATUS.INFECTED) playSound('cough');
                else playSound('buy');
            }
            
            if (newState.globalTicketCounter >= CONFIG.fid.globalTarget) {
                newState.globalTicketCounter = 0; newState.grandRitualArmed = true; playSound('horn'); 
            }

            return newState;
        });
    };

    // -> FIN DE LA PARTIE 1/3 <-
    // app.jsx - PARTIE 2/3 : Moteur de Tirage et Logique de Résolution

    const startDrawSequence = () => {
        const noTickets = gameState.players.every(p => p.tickets.length === 0);
        const isMarkOfEvilDeadlock = gameState.specialEvent.type === EVENT_TYPES.MARK_OF_EVIL && !gameState.players.some(p => p.plagueStatus === PLAGUE.STATUS.INFECTED || p.plagueStatus === PLAGUE.STATUS.INCUBATING);

        if (gameState.specialEvent.type === EVENT_TYPES.GRAND_RITUAL) {
             setView('DRAW_SUSPENSE');
             playSound('horn');
             setTimeout(() => finalizeDraw(false), 5000); 
             return;
        }

        if (gameState.pots.mystery >= CONFIG.mysteryTarget) {
            setView('DRAW_SUSPENSE');
            playSound('horn'); 
            setTimeout(() => finalizeDraw(true), 4500); 
        } else {
            setView('DRAW_SUSPENSE');
            playSound('suspense');
            setTimeout(() => finalizeDraw(false), 4500);
        }
    };

    const activateGrandRitualState = () => {
        setGameState(prev => {
            const newState = { ...prev };
            const megaTotal = newState.pots.normal + newState.pots.hell + newState.pots.mystery + newState.pots.soul;
            newState.pots = { normal: 0, hell: 0, mystery: 0, soul: 0, mega: megaTotal, crypto: prev.pots.crypto }; 
            newState.grandRitualArmed = false;
            newState.specialEvent = { type: EVENT_TYPES.GRAND_RITUAL, duration: GRAND_RITUAL_CONFIG.duration, lockedIndices: [] };
            return newState;
        });
        setShowGrandRitualFusion(false);
        setFusionStep(0);
        setView('GAME'); 
    };

    const finalizeDraw = (isMysteryEvent) => {
        setGameState(prev => {
            const newState = { ...prev };
            const potsBefore = { ...newState.pots };
            let grandRitualAction = null; 
            let plagueLog = []; 
            let territoryLog = []; 
            let newGunfights = []; 
            
            // --- SIPHON AUTOMATIQUE "LA PURE" ---
            const siphonRate = CONFIG.soulSiphonRate; 
            const siphonNormal = newState.pots.normal * siphonRate;
            const siphonHell = newState.pots.hell * siphonRate;
            const siphonMystery = newState.pots.mystery * siphonRate;
            
            newState.pots.normal -= siphonNormal;
            newState.pots.hell -= siphonHell;
            newState.pots.mystery -= siphonMystery;
            newState.pots.soul += (siphonNormal + siphonHell + siphonMystery);

            // --- ENTRETIEN VILLES (SI 666) ---
            const isHellNow = newState.currentDraw.toString().endsWith('6');
            if (isHellNow) {
                newState.players.forEach(p => {
                    if (p.territories && p.territories.length > 0) {
                        const count = p.territories.length;
                        const cost = Math.pow(count, 2) * 1.0; 
                        p.balance -= cost;
                        territoryLog.push(`IMPÔT PROGRESSIF : L'empire de ${p.name} (${count} villes) coûte une fortune : ${cost.toFixed(2)}€.`);
                        newState.pots.normal += cost; 
                    }
                });
            }

            // --- DISTRIBUTION DES RENTES (GROSSISTE) ---
            newState.players.forEach(p => {
                let ticketsToGive = 0;
                if (p.controlledZones && p.controlledZones.length > 0) {
                    p.controlledZones.forEach(myZoneId => {
                        for (const city of Object.values(TERRITORIES)) {
                            const zoneInfos = city.zones.find(z => z.id === myZoneId);
                            if (zoneInfos && zoneInfos.bonus === 'RENTE' && newState.currentDraw % 2 === 0) {
                                ticketsToGive += 1; 
                            }
                        }
                    });
                }

                if (ticketsToGive > 0) {
                    const maxVal = newState.specialEvent.type === EVENT_TYPES.PURE_CHAOS ? 10 : 20;
                    for(let i = 0; i < ticketsToGive; i++) {
                        const freeTicket = { 
                            ...generateNumbers(maxVal), type: 'free', isFree: true,
                            ticketId: `RENTE-${Date.now()}-${p.id}-${i}`,
                            soulCode: `RENTE-${Math.floor(Math.random()*999)}`, cryptoChar: '?', isCryptoHit: false 
                        };
                        p.tickets.push(freeTicket);
                        newState.soulCodes.push({ code: freeTicket.soulCode, playerId: p.id, playerName: p.name });
                    }
                }
            });

            // --- TRAHISON INTERNE (ANTI-SNOWBALL) ---
            newState.players.forEach(p => {
                const threshold = 4; 
                if (p.territories && p.territories.length > threshold) {
                    const excess = p.territories.length - threshold;
                    const riskChance = excess * 0.10;
                    
                    if (Math.random() < riskChance) {
                        const lostIndex = Math.floor(Math.random() * p.territories.length);
                        const lostCityId = p.territories[lostIndex];
                        const cityData = TERRITORIES[lostCityId];

                        p.territories.splice(lostIndex, 1);
                        if (cityData && cityData.zones) {
                            const zoneIds = cityData.zones.map(z => z.id);
                            p.controlledZones = p.controlledZones.filter(zId => !zoneIds.includes(zId));
                        }
                        if (p.cityStatus[lostCityId]) delete p.cityStatus[lostCityId];
                        territoryLog.push(`TRAHISON : L'empire de ${p.name} est trop vaste ! ${cityData.name} échappe à son contrôle.`);
                    }
                }
            });

            // --- LOGIQUE GRAND CONSEIL (Raffle) ---
            if (newState.specialEvent.type === EVENT_TYPES.GRAND_RITUAL) {
                const currentTurnIndex = GRAND_RITUAL_CONFIG.duration - newState.specialEvent.duration;
                const payoutPercent = GRAND_RITUAL_CONFIG.percentages[currentTurnIndex];
                
                let allRaffleTickets = [];
                newState.players.forEach(p => {
                    p.tickets.forEach(t => {
                        if(t.type === 'raffle') allRaffleTickets.push({ ...t, ownerId: p.id, ownerName: p.name });
                    });
                    p.tickets = []; 
                    p.stats.boughtLastDraw = p.stats.boughtCurrentDraw; 
                    p.stats.boughtCurrentDraw = 0;
                    p.recentGain = 0;
                });

                let winners = [];
                const initialMegaPot = newState.pots.mega;
                const totalPayout = initialMegaPot * payoutPercent;
                let payoutPerWinner = 0;

                if (allRaffleTickets.length > 0) {
                    for (let i = allRaffleTickets.length - 1; i > 0; i--) {
                        const j = Math.floor(Math.random() * (i + 1));
                        [allRaffleTickets[i], allRaffleTickets[j]] = [allRaffleTickets[j], allRaffleTickets[i]];
                    }
                    const picked = allRaffleTickets.slice(0, 2); 
                    payoutPerWinner = totalPayout / picked.length;
                    newState.pots.mega -= totalPayout;
                    
                    picked.forEach(ticket => {
                        const player = newState.players.find(p => p.id === ticket.ownerId);
                        if (player) {
                            const tax = payoutPerWinner * CONFIG.cryptoTax;
                            const net = payoutPerWinner - tax;
                            
                            player.balance += net; player.recentGain += net; player.stats.won += net;
                            newState.pots.crypto += tax;
                            winners.push({ name: player.name, amount: net, rank: `GRAND CONSEIL (T${currentTurnIndex+1})` });
                        }
                    });
                }

                const stats = { potTotal: initialMegaPot, percent: payoutPercent, totalDrop: totalPayout, winnerCount: winners.length, perWinner: winners.length > 0 ? payoutPerWinner : 0, winnersList: winners };
                newState.specialEvent.duration -= 1;

                if (newState.specialEvent.duration <= 0) {
                    const remainder = newState.pots.mega;
                    newState.pots.normal = remainder / 2;
                    newState.pots.hell = remainder / 2;
                    newState.pots.mega = 0;
                    newState.specialEvent = { type: 'NONE', duration: 0, lockedIndices: [] };
                    grandRitualAction = 'SEPARATION';
                    
                    newState.players.forEach(p => { p.ritual.seal = []; p.territories = []; });
                    territoryLog.push("DISSOLUTION : Tous les Territoires et Sceaux sont réinitialisés.");
                }
                
                newState.lastDrawResults = { numbers: [], bonus: '?', isRaffle: true };
                newState.lastDrawDetails = { 
                    winners: winners, ticketsPlayed: allRaffleTickets.map(t => ({ playerName: t.ownerName, numbers: [], bonus: '?', isWin: winners.some(w => w.name === t.ownerName), winAmount: 0 })), 
                    isHell: false, mysteryEvent: false, potsBefore: potsBefore, potsAfter: { ...newState.pots },
                    grandRitualAction: grandRitualAction, grandRitualStats: stats, plagueEvents: [], territoryEvents: territoryLog
                };
                
                newState.history = [{
                    id: newState.currentDraw, title: "LE GRAND CONSEIL", flavor: grandRitualAction === 'SEPARATION' ? "Les Parrains se retirent. Table rase." : `Distribution des dividendes (Tour ${currentTurnIndex+1}/4).`,
                    numbers: [], bonus: '?', isHell: false, isMystery: false, logs: winners.map(w => `${w.name}: +${w.amount.toFixed(2)}€`), winners: winners 
                }, ...newState.history].slice(0, 10);
                newState.currentDraw += 1;
                return newState;
            }

            // --- DISTRIBUTION BONUS DE ZONE (OMERTA) ---
            newState.players.forEach(p => {
                let omertaGain = 0;
                if (p.controlledZones && p.controlledZones.length > 0) {
                    p.controlledZones.forEach(myZoneId => {
                        for (const city of Object.values(TERRITORIES)) {
                            const zoneInfos = city.zones.find(z => z.id === myZoneId);
                            if (zoneInfos && zoneInfos.bonus === 'OMERTA') omertaGain++;
                        }
                    });
                }
                if (omertaGain > 0) p.omertaTokens = (p.omertaTokens || 0) + omertaGain;
            });

            // --- GESTION IMMUNITÉ & COOLDOWN ---
            newState.players.forEach(p => {
                if (p.immunityDuration > 0) {
                    p.immunityDuration -= 1;
                    if (p.immunityDuration <= 0 && p.plagueStatus === PLAGUE.STATUS.IMMUNE) {
                        p.plagueStatus = PLAGUE.STATUS.HEALTHY;
                        plagueLog.push(`RECHUTE POSSIBLE : ${p.name} est sorti de Rehab.`);
                    }
                }
                if (p.workCooldown > 0) p.workCooldown -= 1;
                if (p.plagueStatus === PLAGUE.STATUS.INCUBATING && Math.random() > 0.5) {
                    p.plagueStatus = PLAGUE.STATUS.INFECTED;
                    plagueLog.push(`ADDICTION : ${p.name} a basculé (Devient JUNKIE).`);
                }
            });

            const activeEvent = newState.specialEvent;
            const maxVal = activeEvent.type === EVENT_TYPES.PURE_CHAOS ? 10 : 20;
            let drawResults = generateNumbers(maxVal); 
            
            let grandPot = 0;
            let winningTicketId = null;

            if (isMysteryEvent) { 
                grandPot = newState.pots.mystery; 
                newState.pots.mystery = 0; 
                
                const allCurrentTickets = [];
                newState.players.forEach(p => p.tickets.forEach(t => allCurrentTickets.push({ ...t, ownerId: p.id })));

                if (allCurrentTickets.length > 0) {
                    const winningRef = allCurrentTickets[Math.floor(Math.random() * allCurrentTickets.length)];
                    winningTicketId = winningRef.ticketId;
                    drawResults = { numbers: winningRef.numbers, bonus: winningRef.bonus };
                }
            }

            const isHell = newState.currentDraw.toString().endsWith('6');
            let currentEvent = { ...newState.specialEvent };
            if (currentEvent.type !== 'NONE' && currentEvent.type !== EVENT_TYPES.GRAND_RITUAL) {
                currentEvent.duration -= 1;
                if (currentEvent.duration <= 0) currentEvent = { type: 'NONE', duration: 0, lockedIndices: [] };
            }
            let nextEvent = currentEvent;
            if (nextEvent.type === 'NONE' && !newState.grandRitualArmed) nextEvent = rollForSpecialEvent(newState.grandRitualArmed);
            newState.specialEvent = nextEvent;

            let drawWinners = [];
            let ticketsPlayed = []; 
            let logEntries = [];

            if (activeEvent.type === EVENT_TYPES.URBAN_REVOLT) {
                newState.players.forEach(p => {
                    if (p.territories && p.territories.length > 0 && Math.floor(Math.random() * 6) + 1 === 1) {
                        const removedIndex = Math.floor(Math.random() * p.territories.length);
                        const lostId = p.territories[removedIndex];
                        p.territories.splice(removedIndex, 1);
                        territoryLog.push(`RÉVOLTE : ${p.name} perd ${TERRITORIES[lostId].name} (Jet: 1).`);
                        playSound('thud'); 
                    }
                });
            }

            const maxTerritories = Math.max(...newState.players.map(p => p.territories ? p.territories.length : 0));
            const goFastTargets = newState.players.filter(p => (p.territories ? p.territories.length : 0) === maxTerritories && maxTerritories > 0).map(p => p.id);
            if (activeEvent.type === EVENT_TYPES.GO_FAST_INTERCEPT && goFastTargets.length > 0) {
                 goFastTargets.forEach(tid => {
                     const tName = newState.players.find(p => p.id === tid).name;
                     territoryLog.push(`DOUANE : ${tName} est ciblé ! Bonus de territoire gelés.`);
                 });
            }

            if (drawResults.bonus === PLAGUE.BONUS_ORIGIN) { 
                const candidates = newState.players.filter(p => p.plagueStatus === PLAGUE.STATUS.HEALTHY && p.tickets.length > 0);
                if (candidates.length > 0) {
                    const p0 = candidates[Math.floor(Math.random() * candidates.length)];
                    p0.plagueStatus = PLAGUE.STATUS.INCUBATING;
                    plagueLog.push(`NOUVEAU PRODUIT : ${p0.name} goûte à la marchandise (Bonus 3).`);
                }
            }
            if (drawResults.bonus === PLAGUE.BONUS_CURE) { 
                let cured = 0;
                newState.players.forEach(p => {
                    if (p.plagueStatus === PLAGUE.STATUS.INFECTED && p.tickets.length > 0) {
                        p.plagueStatus = PLAGUE.STATUS.IMMUNE; p.immunityDuration = PLAGUE.IMMUNITY_DURATION; cured++;
                    }
                });
                if (cured > 0) plagueLog.push(`DESINTOX : ${cured} junkies partent en cure (Bonus 6).`);
            }
            
            let currentOwners = {};
            newState.players.forEach(p => { if(p.territories) p.territories.forEach(tId => currentOwners[tId] = p); });
            let defenseRewards = {}; 

            newState.players.forEach(attacker => {
                attacker.tickets.forEach(ticket => {
                    const targetTerritoryId = checkTerritoryMatch(ticket.numbers, ticket.bonus);
                    if (targetTerritoryId && newState.players.length >= 2) {
                        const territoryName = TERRITORIES[targetTerritoryId].name;
                        const owner = currentOwners[targetTerritoryId];

                        if (!owner) {
                            attacker.territories.push(targetTerritoryId);
                            attacker.cityStatus[targetTerritoryId] = newState.currentDraw; 
                            currentOwners[targetTerritoryId] = attacker; 
                            territoryLog.push(`CONQUÊTE : ${attacker.name} prend le contrôle de ${territoryName} ! (Protégée 10 tours)`);
                            playSound('buy');
                        } else if (owner.id !== attacker.id) {
                            const acquiredTurn = owner.cityStatus[targetTerritoryId] || 0;
                            const isProtected = (newState.currentDraw - acquiredTurn) < 10;

                            if (isProtected) {
                                const turnsLeft = 10 - (newState.currentDraw - acquiredTurn);
                                territoryLog.push(`ÉCHEC : ${territoryName} est protégée par ${owner.name} pour encore ${turnsLeft} tours.`);
                                playSound('shield'); 
                            } else {
                                let rollAttacker = Math.floor(Math.random() * 6) + 1;
                                if (attacker.faction === 'BRAVAS') rollAttacker += 1; 
                                
                                let defBonus = 0;
                                const cityTargeted = TERRITORIES[targetTerritoryId];
                                if (cityTargeted && cityTargeted.zones) {
                                    cityTargeted.zones.forEach(zone => {
                                        if (owner.controlledZones.includes(zone.id) && zone.bonus === 'DEFENSE') {
                                            defBonus += zone.desc.includes('+2') ? 2 : 1;
                                        }
                                    });
                                }
                                if (owner && owner.faction === 'SYNDICAT') defBonus -= 1; 

                                const rollDefender = Math.floor(Math.random() * 6) + 1 + defBonus;

                                if (rollAttacker > rollDefender) {
                                    owner.territories = owner.territories.filter(t => t !== targetTerritoryId);
                                    const cityZonesIds = TERRITORIES[targetTerritoryId].zones.map(z => z.id);
                                    owner.controlledZones = owner.controlledZones.filter(zId => !cityZonesIds.includes(zId));

                                    attacker.territories.push(targetTerritoryId);
                                    attacker.cityStatus[targetTerritoryId] = newState.currentDraw; 
                                    currentOwners[targetTerritoryId] = attacker;

                                    territoryLog.push(`RAZZIA RÉUSSIE : ${attacker.name} [${rollAttacker}] chasse ${owner.name} [${rollDefender}] de ${territoryName} !`);
                                    playSound('gunshot');
                                    newGunfights.push({ attacker: attacker.name, defender: owner.name, territory: territoryName, rollAttacker: rollAttacker, rollDefender: rollDefender, resultText: "VICTOIRE - VILLE CAPTURÉE", winnerId: attacker.id });
                                } else {
                                    territoryLog.push(`ASSAUT REPOUSSÉ : ${owner.name} [${rollDefender}] défend ${territoryName} contre ${attacker.name} [${rollAttacker}].`);
                                    playSound('thud');
                                    newGunfights.push({ attacker: attacker.name, defender: owner.name, territory: territoryName, rollAttacker: rollAttacker, rollDefender: rollDefender, resultText: "ÉCHEC - DÉFENSE SOLIDE", winnerId: owner.id });
                                }
                            }
                        }
                    }
                });
            });
            
            if (newGunfights.length > 0) setTimeout(() => setGunfightQueue(prev => [...prev, ...newGunfights]), 10);
            
            let sourcePotNormal = newState.pots.normal;
            let sourcePotHell = newState.pots.hell;
            if (activeEvent.type === EVENT_TYPES.NEGATIVE_IMPULSE) { 
                sourcePotNormal = newState.pots.hell; sourcePotHell = newState.pots.normal;
            }

            let rankWinnersMap = { normal: {}, hell: {} };
            CONFIG.ranks.forEach(r => { rankWinnersMap.normal[r.id] = []; rankWinnersMap.hell[r.id] = []; });

            newState.players.forEach(player => {
                player.stats.boughtLastDraw = player.stats.boughtCurrentDraw;
                let playerWonThisTurn = false; 
                player.recentGain = 0;
                
                let zoneGainBonus = 0; 
                let zoneOmertaBonus = 0; 
                
                if (player.controlledZones) {
                    player.controlledZones.forEach(zId => {
                        for (const city of Object.values(TERRITORIES)) {
                            const z = city.zones.find(zone => zone.id === zId);
                            if (z) {
                                if (z.bonus === 'OMERTA') zoneOmertaBonus++;
                                if (z.bonus === 'GAIN') {
                                    const match = z.desc.match(/\+(\d+)%/);
                                    if (match) zoneGainBonus += parseInt(match[1]) / 100;
                                    else zoneGainBonus += 0.01; 
                                }
                            }
                        }
                    });
                }
                if (zoneOmertaBonus > 0) player.omertaTokens = (player.omertaTokens || 0) + zoneOmertaBonus;

                if (player.tickets.length > 0) {
                    const newMarks = [...player.ritual.marks];
                    const flatGrid = player.ritual.grid.flat();
                    const lockedIndices = activeEvent.type === 'DESCENTE_POLICE' ? activeEvent.lockedIndices : [];
                    
                    drawResults.numbers.forEach(n => {
                        const indexInGrid = flatGrid.indexOf(n);
                        if (indexInGrid !== -1 && !newMarks.includes(n)) {
                            if (activeEvent.type !== 'DESCENTE_POLICE' || !lockedIndices.includes(indexInGrid)) newMarks.push(n);
                        }
                    });
                    player.ritual.marks = newMarks;
                }
                
                const linesNow = checkRitualLines(player.ritual.grid, player.ritual.marks);
                player.stats.ritualLinesTotal = linesNow;
                player.discounts = { normal6: linesNow >= 1, hell6: linesNow >= 2, mega66: linesNow >= 3 };

                player.tickets.forEach(ticket => {
                    if (isMysteryEvent) {
                        if (winningTicketId && ticket.ticketId === winningTicketId) {
                            const winAmount = grandPot;
                            const tax = winAmount * CONFIG.cryptoTax;
                            const netWin = winAmount - tax;
                            player.balance += netWin; player.recentGain += netWin; player.stats.won += netWin; player.stats.mysteryGains += netWin;
                            newState.pots.crypto += tax;

                            drawWinners.push({ name: player.name, amount: netWin, rank: "MAÎTRE DE LA PLANQUE" });
                            logEntries.push(`${player.name}: +${netWin.toFixed(2)}€ (RAZZIA TOTALE)`);
                            ticketsPlayed.push({ playerName: player.name, numbers: ticket.numbers, bonus: ticket.bonus, isWin: true, rankLabel: "PLANQUE", winAmount: netWin });
                        } else {
                             ticketsPlayed.push({ playerName: player.name, numbers: ticket.numbers, bonus: ticket.bonus, isWin: false, rankLabel: null, winAmount: 0 });
                        }
                    } else {
                        const rank = checkWin(ticket.numbers, ticket.bonus, drawResults.numbers, drawResults.bonus, activeEvent.type);
                        if (rank) {
                            playerWonThisTurn = true; 
                            if (activeEvent.type === EVENT_TYPES.PURE_CHAOS) {
                                const sortedLandlords = [...newState.players].filter(p => p.id !== player.id && p.territories.length > 0).sort((a,b) => b.territories.length - a.territories.length);
                                if (sortedLandlords.length > 0) {
                                    const victim = sortedLandlords[0];
                                    const stolenTerritory = victim.territories.pop();
                                    player.territories.push(stolenTerritory);
                                    territoryLog.push(`ANARCHIE : ${player.name} dépouille ${victim.name} de ${TERRITORIES[stolenTerritory].name} !`);
                                    playSound('gunshot');
                                }
                            }

                            const ticketIsHell = (ticket.type === 'hell'); 
                            const category = ticketIsHell ? 'hell' : 'normal';
                            let multiplier = 1.0;
                            
                            if (player.plagueStatus === PLAGUE.STATUS.INFECTED) multiplier *= 1.25; 
                            if (calculateSealBonus(player.ritual.seal).lines >= 4) multiplier *= 1.05; 
                            if (zoneGainBonus > 0) multiplier += zoneGainBonus;

                            const isGoFastTarget = (activeEvent.type === EVENT_TYPES.GO_FAST_INTERCEPT && goFastTargets.includes(player.id));
                            if (player.territories && player.territories.length > 0 && !isGoFastTarget) {
                                let territoryBonus = 1 + (player.territories.length * (CONFIG.cityBonusGain - 1));
                                const depts = {};
                                player.territories.forEach(tId => {
                                    const city = TERRITORIES[tId];
                                    if(city) depts[city.dept] = (depts[city.dept] || 0) + 1;
                                });
                                if (Object.values(depts).some(count => count === 3)) territoryBonus += 0.25; 
                                multiplier *= territoryBonus;
                            }
                            rankWinnersMap[category][rank.id].push({ player: player, ticket: ticket, rankLabel: rank.label, rankPercent: rank.percent, multiplier: multiplier });
                        } else {
                            if (!ticket.isFree) player.omertaTokens = (player.omertaTokens || 0) + 1;
                            ticketsPlayed.push({ playerName: player.name, numbers: ticket.numbers, bonus: ticket.bonus, isWin: false, rankLabel: null, winAmount: 0 });
                        }
                    }
                });
                
                if (playerWonThisTurn) player.stats.winStreak = (player.stats.winStreak || 0) + 1;
                else player.stats.winStreak = 0;
                if(isMysteryEvent) player.tickets = [];
            });

            const playersSorted = [...newState.players].sort((a,b) => {
                 if (b.balance !== a.balance) return b.balance - a.balance;
                 return (b.stats.winStreak || 0) - (a.stats.winStreak || 0);
            });
            if (playersSorted.length > 0) {
                const newLeader = playersSorted[0];
                if (newState.mostWantedPlayerId !== newLeader.id) newState.mostWantedPlayerId = newLeader.id;
            }

            if (!isMysteryEvent) {
                Object.keys(rankWinnersMap.normal).forEach(rankId => {
                    const winners = rankWinnersMap.normal[rankId];
                    if (winners.length > 0) {
                        const rankBudget = sourcePotNormal * winners[0].rankPercent;
                        const baseShare = rankBudget / winners.length;
                        winners.forEach(w => {
                            const grossAmount = baseShare * w.multiplier;
                            const tax = grossAmount * CONFIG.cryptoTax;
                            const netAmount = grossAmount - tax;
                            
                            w.player.balance += netAmount; w.player.recentGain += netAmount; w.player.stats.won += netAmount; w.player.stats.wonNormal += netAmount; w.player.stats.gamesWonCount += 1;
                            newState.pots.crypto += tax;

                            if (activeEvent.type === EVENT_TYPES.NEGATIVE_IMPULSE) newState.pots.hell -= grossAmount;
                            else newState.pots.normal -= grossAmount;
                            logEntries.push(`${w.player.name}: +${netAmount.toFixed(2)}€ (${w.rankLabel})`);
                            drawWinners.push({ name: w.player.name, amount: netAmount, rank: w.rankLabel });
                            ticketsPlayed.push({ playerName: w.player.name, numbers: w.ticket.numbers, bonus: w.ticket.bonus, isWin: true, rankLabel: w.rankLabel, winAmount: netAmount });
                            
                            if (w.player.plagueStatus === PLAGUE.STATUS.INFECTED && activeEvent.type !== EVENT_TYPES.QUARANTINE) {
                                const victims = newState.players.filter(p => p.id !== w.player.id && p.plagueStatus === PLAGUE.STATUS.HEALTHY);
                                if (victims.length > 0) {
                                    const victim = victims[Math.floor(Math.random() * victims.length)];
                                    victim.plagueStatus = PLAGUE.STATUS.INFECTED;
                                    plagueLog.push(`INFLUENCE : ${w.player.name} fait plonger ${victim.name}.`);
                                }
                            }
                        });
                    }
                });

                Object.keys(rankWinnersMap.hell).forEach(rankId => {
                    const winners = rankWinnersMap.hell[rankId];
                    if (winners.length > 0) {
                        const rankBudget = sourcePotHell * winners[0].rankPercent;
                        const baseShare = rankBudget / winners.length;
                        winners.forEach(w => {
                            const grossAmount = baseShare * w.multiplier;
                            const tax = grossAmount * CONFIG.cryptoTax;
                            const netAmount = grossAmount - tax;

                            w.player.balance += netAmount; w.player.recentGain += netAmount; w.player.stats.won += netAmount; w.player.stats.wonHell += netAmount; w.player.stats.gamesWonCount += 1;
                            newState.pots.crypto += tax;

                            if (activeEvent.type === EVENT_TYPES.NEGATIVE_IMPULSE) newState.pots.normal -= grossAmount;
                            else newState.pots.hell -= grossAmount;
                            logEntries.push(`${w.player.name}: +${netAmount.toFixed(2)}€ (${w.rankLabel} - LE FOUR)`);
                            drawWinners.push({ name: w.player.name, amount: netAmount, rank: w.rankLabel });
                            ticketsPlayed.push({ playerName: w.player.name, numbers: w.ticket.numbers, bonus: w.ticket.bonus, isWin: true, rankLabel: w.rankLabel, winAmount: netAmount });
                            
                            if (w.player.plagueStatus === PLAGUE.STATUS.INFECTED && activeEvent.type !== EVENT_TYPES.QUARANTINE) {
                                const victims = newState.players.filter(p => p.id !== w.player.id && p.plagueStatus === PLAGUE.STATUS.HEALTHY);
                                if (victims.length > 0) {
                                    const victim = victims[Math.floor(Math.random() * victims.length)];
                                    victim.plagueStatus = PLAGUE.STATUS.INFECTED;
                                    plagueLog.push(`INFLUENCE : ${w.player.name} fait plonger ${victim.name}.`);
                                }
                            }
                        });
                    }
                });
            }
            if (!isMysteryEvent) newState.players.forEach(p => p.tickets = []);

            Object.keys(defenseRewards).forEach(playerId => {
                 const p = newState.players.find(pl => pl.id == playerId); 
                 if (p && defenseRewards[playerId]) p.tickets.push(...defenseRewards[playerId]);
            });

            let soulDrawResult = null;
            if (newState.currentDraw % CONFIG.soulDrawFreq === 0 && newState.soulCodes.length > 0 && activeEvent.type !== EVENT_TYPES.GRAND_RITUAL) {
                const activePlayerIds = new Set(newState.players.filter(p => p.stats.boughtCurrentDraw > 0).map(p => p.id));
                const eligibleSoulCodes = newState.soulCodes.filter(sc => activePlayerIds.has(sc.playerId));

                if (eligibleSoulCodes.length > 0) {
                    const winningSoulIndex = Math.floor(Math.random() * eligibleSoulCodes.length);
                    const winnerCode = eligibleSoulCodes[winningSoulIndex];
                    const grossSoulAmount = newState.pots.soul;
                    const luckyPlayer = newState.players.find(p => p.id === winnerCode.playerId);
                    
                    if (luckyPlayer) {
                        const tax = grossSoulAmount * CONFIG.cryptoTax;
                        const netSoulAmount = grossSoulAmount - tax;
                        luckyPlayer.balance += netSoulAmount; luckyPlayer.recentGain += netSoulAmount; luckyPlayer.stats.won += netSoulAmount;
                        newState.pots.crypto += tax;

                        soulDrawResult = { winnerName: luckyPlayer.name, amount: netSoulAmount, code: winnerCode.code };
                        logEntries.push(`LA PURE : ${luckyPlayer.name} récupère le stock de ${netSoulAmount.toFixed(2)}€ (Code: ${winnerCode.code})`);
                        newState.pots.soul = 0;
                    }
                    newState.soulCodes = [];
                } else {
                    logEntries.push("LA PURE : Personne sur le coup. Le stock grossit.");
                }
            }

            if (isHell || activeEvent.type === EVENT_TYPES.BLOOD_MOON) {
                const ticketCost = CONFIG.ticketPriceHell; 
                let pactLogCount = 0;
                newState.players.forEach(p => {
                    if (p.balance < ticketCost) {
                        const pactCost = 1.00; 
                        if (newState.pots.hell >= pactCost) {
                            newState.pots.hell -= pactCost;
                            const pactTicket = { 
                                ...generateNumbers(20), type: 'hell', isFree: true,
                                ticketId: `PACT-${Date.now()}-${p.id}`, soulCode: `PACT-${Math.floor(Math.random()*999)}`
                            };
                            p.tickets.push(pactTicket); pactLogCount++;
                        }
                    }
                });
                if (pactLogCount > 0) logEntries.push(`PACTE DE SANG : ${pactLogCount} soldats ruinés réarmés par Le Four.`);
            }

            newState.players.forEach(p => p.stats.boughtCurrentDraw = 0);
            newState.lastDrawResults = drawResults;
            newState.lastDrawDetails = { 
                winners: drawWinners, ticketsPlayed: ticketsPlayed, isHell: isHell, mysteryEvent: isMysteryEvent, mysteryShare: 0,
                plagueEvents: plagueLog, isChaos: activeEvent.type === EVENT_TYPES.PURE_CHAOS || activeEvent.type === EVENT_TYPES.DIGITAL_HERESY,
                potsBefore: potsBefore, potsAfter: { ...newState.pots }, soulDrawResult: soulDrawResult, grandRitualAction: grandRitualAction,
                territoryEvents: territoryLog 
            };
            
            const historyTitle = getHistoryTitle(isHell, isMysteryEvent, activeEvent.type);
            const historyFlavor = getHistoryFlavorText(isHell, isMysteryEvent, drawResults.bonus, activeEvent.type);
            newState.history = [{
                id: newState.currentDraw, title: historyTitle, flavor: historyFlavor, numbers: drawResults.numbers, bonus: drawResults.bonus,
                isHell: isHell, isMystery: isMysteryEvent, logs: logEntries, winners: drawWinners
            }, ...newState.history].slice(0, 10);
            newState.currentDraw += 1;
            return newState;
        });
        playSound('win');
        setView('DRAW_RESULTS');
    };

    const closeDrawResults = () => {
        const lastDrawWasHell = gameState.history[0]?.isHell;
        
        if (gameState.specialEvent.type === EVENT_TYPES.GRAND_RITUAL) { setView('GAME'); return; }
        if (gameState.lastDrawDetails?.grandRitualAction === 'SEPARATION') {
            setShowSeparationAnim(true); playSound('separation');
            setTimeout(() => { setShowSeparationAnim(false); setView('GAME'); }, 3000); 
            return;
        }
        if (gameState.grandRitualArmed) {
            setTempPots({ normal: gameState.pots.normal, hell: gameState.pots.hell, mystery: gameState.pots.mystery, soul: gameState.pots.soul, grandTotal: gameState.pots.normal + gameState.pots.hell + gameState.pots.mystery + gameState.pots.soul });
            setShowGrandRitualFusion(true); setFusionStep(0); playSound('horn');
            setTimeout(() => { playSound('thud'); setFusionStep(1); }, 2000); 
            setTimeout(() => { playSound('fusion'); setFusionStep(2); }, 5000); 
            setTimeout(() => { playSound('thud'); setFusionStep(3); }, 7500); 
            setTimeout(() => { activateGrandRitualState(); }, 11000); 
            return;
        }
        if (lastDrawWasHell) { playSound('error'); setView('HELL_RESET'); } 
        else if (gameState.specialEvent.type !== 'NONE' && gameState.specialEvent.duration > 0) {
             if (gameState.specialEvent.type === EVENT_TYPES.PURE_CHAOS) playSound('suspense');
             else playSound('horn');
             setView('EVENT_ALERT');
        } else { setView('GAME'); }
    };

    const confirmHellReset = () => {
        setGameState(prev => {
            const newState = { ...prev };
            const restartBonus = 75; 
            const soulPart = restartBonus * CONFIG.soulTax;
            newState.pots.soul += soulPart;
            const distributable = restartBonus - soulPart;
            const dist = CONFIG.distNormal; 
            newState.pots.normal += distributable * dist.normal;
            newState.pots.hell += distributable * dist.hell;
            newState.pots.mystery += distributable * dist.mystery;

            newState.players.forEach(player => {
                const canSeal = player.stats.gridsPlayedSinceReset >= CONFIG.sealMinGrids;
                player.stats.cyclesPlayed = (player.stats.cyclesPlayed || 0) + 1;
                if (canSeal) {
                    const newSealSet = new Set([...player.ritual.seal, ...player.ritual.marks]);
                    player.ritual.seal = Array.from(newSealSet).sort((a,b)=>a-b);
                    player.stats.sealsValidated = (player.stats.sealsValidated || 0) + 1;
                }
                player.ritual.grid = generateRitualGrid();
                player.ritual.marks = [];
                player.discounts = { normal6: false, hell6: false, mega66: false };
                player.stats.gridsPlayedSinceReset = 0; 
            });
            return newState;
        });
        if (gameState.grandRitualArmed) { closeDrawResults(); } 
        else {
            if (gameState.specialEvent.type !== 'NONE') setView('EVENT_ALERT');
            else setView('GAME');
            playSound('click');
        }
    };

    const handleDownloadSave = () => {
        try {
            const b64 = compressState(gameState);
            const blob = new Blob([b64], { type: 'text/plain' });
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            const date = new Date().toISOString().slice(0,10);
            a.download = `CARTEL_SAVE_T${gameState.currentDraw}_${date}.txt`;
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
            document.body.removeChild(a);
            playSound('buy');
        } catch (e) { alert("Erreur lors de la création du fichier."); }
    };

    const handleFileSelect = (event) => {
        const file = event.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const loadedState = decompressState(e.target.result.trim());
                setGameState(loadedState); playSound('win'); alert("Dossier chargé avec succès !");
            } catch (err) { playSound('error'); alert("Fichier invalide."); }
        };
        reader.readAsText(file);
    };

    const handlePotEdit = (e) => {
        e.preventDefault();
        setGameState(prev => ({
            ...prev,
            pots: {
                ...prev.pots, normal: parseFloat(editedPots.normal), hell: parseFloat(editedPots.hell),
                mystery: parseFloat(editedPots.mystery), crypto: parseFloat(editedPots.crypto || prev.pots.crypto || 0)
            }
        }));
        setPotEditMode(false); playSound('click');
    };

    // -> FIN DE LA PARTIE 2/3 <-
    // app.jsx - PARTIE 3/3 : Vues (Render), Interfaces et Fin du fichier

    // --- VUES ANIMÉES (RENDER) ---
    if (showSeparationAnim) {
        return (
            <div className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center overflow-hidden font-mono">
                <div className="absolute inset-0 bg-green-900/20 animate-pulse"></div>
                <h2 className="text-3xl font-black text-green-500 uppercase tracking-widest mb-10 z-20 animate-float-up">DISSOLUTION DU CONSEIL</h2>
                <div className="z-10 flex gap-4 md:gap-20 items-center">
                    <div className="w-32 h-32 md:w-48 md:h-48 rounded-full bg-blue-950 border-4 border-blue-500 flex flex-col items-center justify-center animate-split-left shadow-[0_0_50px_blue]">
                        <div className="text-blue-300 font-bold uppercase text-xs md:text-sm">Argent Propre</div>
                        <div className="text-white font-mono text-xl md:text-3xl font-bold">50%</div>
                    </div>
                    <div className="w-1 h-32 bg-green-500/50 animate-implode"></div>
                    <div className="w-32 h-32 md:w-48 md:h-48 rounded-full bg-red-950 border-4 border-red-500 flex flex-col items-center justify-center animate-split-right shadow-[0_0_50px_red]">
                        <div className="text-red-300 font-bold uppercase text-xs md:text-sm">Argent Sale</div>
                        <div className="text-white font-mono text-xl md:text-3xl font-bold">50%</div>
                    </div>
                </div>
                <div className="absolute bottom-20 text-green-600/50 text-sm uppercase tracking-widest animate-fade-out">L'argent circule...</div>
            </div>
        );
    }

    if (view === 'GUNFIGHT_ANIMATION' && currentGunfight) {
        return (
            <div className={`fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center overflow-hidden font-mono ${gunfightStep === 0 ? 'animate-extreme-chaos' : ''}`}>
                 <div className="absolute inset-0 crt-overlay z-20 pointer-events-none"></div>
                 <div className="absolute inset-0 bg-red-900/20 animate-pulse"></div>
                 {gunfightStep >= 1 && (
                     <div className="z-30 text-center space-y-8 animate-in zoom-in duration-300">
                        <h1 className="text-5xl md:text-7xl font-black text-red-600 uppercase tracking-tighter hell-text-aura animate-pulse">
                            {gunfightStep === 1 ? "ALERTE ROUGE" : "GUERRE DE GANGS"}
                        </h1>
                        
                        {gunfightStep >= 2 && (
                            <div className="flex items-center justify-center gap-8 md:gap-16 mt-10">
                                <div className={`flex flex-col items-center transition-all duration-500 ${gunfightStep >= 3 && currentGunfight.winnerId === currentGunfight.attacker ? 'scale-125' : (gunfightStep >= 3 ? 'opacity-50 grayscale' : '')}`}>
                                    <div className="w-24 h-24 rounded-full bg-slate-900 border-4 border-blue-500 flex items-center justify-center relative">
                                        <SVG icon="User" size={40} className="text-blue-400"/>
                                        {gunfightStep === 3 && currentGunfight.rollAttacker > currentGunfight.rollDefender && (
                                            <div className="absolute inset-0 flex items-center justify-center animate-gunshot text-yellow-400"><SVG icon="Crosshair" size={60}/></div>
                                        )}
                                    </div>
                                    <div className="mt-2 font-bold text-blue-400 uppercase">{currentGunfight.attacker}</div>
                                    {gunfightStep >= 3 && (
                                        <div className="text-4xl font-black text-white mt-2 drop-shadow-[0_0_10px_blue]">{currentGunfight.rollAttacker}</div>
                                    )}
                                </div>

                                <div className="text-2xl font-black text-gray-500">VS</div>

                                <div className={`flex flex-col items-center transition-all duration-500 ${gunfightStep >= 3 && currentGunfight.winnerId !== currentGunfight.attacker ? 'scale-125' : (gunfightStep >= 3 ? 'opacity-50 grayscale' : '')}`}>
                                    <div className="w-24 h-24 rounded-full bg-slate-900 border-4 border-red-500 flex items-center justify-center relative">
                                        <SVG icon="Shield" size={40} className="text-red-400"/>
                                        {gunfightStep === 3 && currentGunfight.rollDefender >= currentGunfight.rollAttacker && (
                                            <div className="absolute inset-0 flex items-center justify-center animate-gunshot text-yellow-400"><SVG icon="Crosshair" size={60}/></div>
                                        )}
                                    </div>
                                    <div className="mt-2 font-bold text-red-400 uppercase">{currentGunfight.defender}</div>
                                    {gunfightStep >= 3 && (
                                        <div className="text-4xl font-black text-white mt-2 drop-shadow-[0_0_10px_red]">{currentGunfight.rollDefender}</div>
                                    )}
                                </div>
                            </div>
                        )}

                        {gunfightStep >= 4 && (
                            <div className="mt-10 text-3xl md:text-5xl font-black text-white bg-black/80 px-8 py-4 rounded border-2 border-white animate-in slide-in-from-bottom">
                                {currentGunfight.resultText}
                            </div>
                        )}
                     </div>
                 )}
            </div>
        );
    }

    if (showGrandRitualFusion) {
        const pots = tempPots;
        return (
            <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black overflow-hidden font-mono animate-gold-shine bg-gradient-to-br from-green-950 via-black to-yellow-900">
                <div className="absolute inset-0 bg-gradient-to-r from-green-900/50 via-black to-yellow-900/50 animate-pulse"></div>
                <div className="z-10 text-center relative w-full max-w-4xl px-4">
                    {fusionStep === 0 && (
                        <div className="animate-in fade-in zoom-in duration-1000">
                            <SVG icon="Sun" size={120} className="text-white mx-auto mb-6 animate-spin-slow text-yellow-400 drop-shadow-[0_0_30px_rgba(251,191,36,1)]"/>
                            <h1 className="text-6xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-green-600 uppercase tracking-tighter drop-shadow-lg glitch-text">GRAND CONSEIL</h1>
                            <p className="text-2xl mt-4 font-bold animate-bounce text-yellow-200">MISE EN COMMUN</p>
                        </div>
                    )}
                    {fusionStep >= 1 && (
                        <div className="flex flex-col items-center gap-8 mt-10">
                            <div className="flex items-center justify-center gap-4 md:gap-8 text-2xl md:text-4xl font-black flex-wrap">
                                <div className={`transition-all duration-1000 transform ${fusionStep >= 2 ? 'translate-x-[150%] opacity-0 scale-50' : ''}`}>
                                    <div className="text-blue-400 text-sm uppercase mb-1">Mortelle</div>
                                    <div className="bg-blue-900/50 border border-blue-500 px-4 py-2 rounded">{pots.normal.toFixed(0)}€</div>
                                </div>
                                <div className={`text-white transition-opacity duration-500 ${fusionStep >= 2 ? 'opacity-0' : 'opacity-100'}`}>+</div>
                                <div className={`transition-all duration-1000 transform ${fusionStep >= 2 ? '-translate-x-[150%] opacity-0 scale-50' : ''}`}>
                                    <div className="text-red-500 text-sm uppercase mb-1">Le Four</div>
                                    <div className="bg-red-900/50 border border-red-500 px-4 py-2 rounded">{pots.hell.toFixed(0)}€</div>
                                </div>
                                <div className={`text-white transition-opacity duration-500 ${fusionStep >= 2 ? 'opacity-0' : 'opacity-100'}`}>+</div>
                                <div className={`transition-all duration-1000 transform ${fusionStep >= 2 ? '-translate-y-[150%] opacity-0 scale-50' : ''}`}>
                                    <div className="text-purple-500 text-sm uppercase mb-1">Planque</div>
                                    <div className="bg-purple-900/50 border border-purple-500 px-4 py-2 rounded">{pots.mystery.toFixed(0)}€</div>
                                </div>
                                <div className={`text-white transition-opacity duration-500 ${fusionStep >= 2 ? 'opacity-0' : 'opacity-100'}`}>+</div>
                                <div className={`transition-all duration-1000 transform ${fusionStep >= 2 ? '-translate-y-[150%] opacity-0 scale-50' : ''}`}>
                                    <div className="text-cyan-500 text-sm uppercase mb-1">Âme</div>
                                    <div className="bg-cyan-900/50 border border-cyan-500 px-4 py-2 rounded">{pots.soul.toFixed(0)}€</div>
                                </div>
                            </div>
                            {fusionStep >= 2 && (
                                <div className="animate-climb absolute top-0 left-0 w-full flex flex-col items-center justify-center pt-20">
                                    <div className="text-yellow-400 text-lg uppercase mb-2 tracking-widest font-bold">MÉGA COFFRE</div>
                                    <div className="text-7xl md:text-9xl font-black text-white drop-shadow-[0_0_30px_rgba(255,255,255,0.8)]">
                                        {pots.grandTotal.toFixed(0)}€
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        );
    }

    if (view === 'EVENT_ALERT') {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center relative overflow-hidden bg-gray-900">
                <div className="absolute inset-0 crt-overlay z-20 pointer-events-none"></div>
                <div className="z-30 space-y-6 max-w-lg animate-in fade-in zoom-in">
                    <SVG icon="Skull" size={100} className="mx-auto text-white animate-pulse" />
                    <h1 className="text-5xl font-black tracking-tighter uppercase text-white">{gameState.specialEvent.type.replace(/_/g, ' ')}</h1>
                    <p className="text-lg text-gray-400 italic font-mono border-t border-b border-gray-700 py-4 max-w-xs mx-auto">
                        "{getEventDescription(gameState.specialEvent.type)}"
                    </p>
                    <button onClick={() => setView('GAME')} className="mt-8 bg-white text-black px-8 py-3 rounded font-bold uppercase tracking-widest hover:scale-105 transition-transform">
                        Compris
                    </button>
                </div>
            </div>
        );
    }

    if (view === 'DRAW_SUSPENSE') {
        const isGrandRitual = gameState.specialEvent.type === EVENT_TYPES.GRAND_RITUAL;
        const randomCols = Array(5).fill(0).map((_, i) => (
            <div key={i} className="flex flex-col text-2xl md:text-4xl font-mono opacity-50 px-2">
                {Array(8).fill(0).map((_, j) => (
                     <span key={j} className="animate-digit-mutate text-green-500/50">
                         {Math.floor(Math.random()*10)}
                     </span>
                ))}
            </div>
        ));

        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-black relative overflow-hidden">
                 <div className="absolute inset-0 crt-overlay z-20"></div>
                 <div className="absolute inset-0 flex justify-center opacity-20 blur-sm z-0">{randomCols}</div>

                 <div className="z-30 text-center space-y-8 relative">
                     <div className="relative w-64 h-64 md:w-96 md:h-96 mx-auto flex items-center justify-center">
                        <div className={`absolute inset-0 border-4 border-dashed rounded-full animate-spin-slow ${isGrandRitual ? 'border-yellow-500' : 'border-green-600'}`}></div>
                        <div className={`absolute inset-4 border-2 rounded-full animate-reverse-spin opacity-50 ${isGrandRitual ? 'border-yellow-300' : 'border-green-500'}`}></div>
                        
                        <div className="flex flex-col items-center justify-center bg-black/80 rounded-full w-full h-full backdrop-blur-md z-10 animate-summon">
                             <div className="text-gray-500 text-xs uppercase tracking-[0.5em] mb-4">{isGrandRitual ? "DÉLIBÉRATION" : "LIVRAISON..."}</div>
                             <div className="flex justify-center gap-2 md:gap-4 text-5xl md:text-7xl font-mono font-bold z-10 overflow-hidden">
                                <span className="animate-digit-mutate text-white drop-shadow-[0_0_10px_white]">{Math.floor(Math.random()*10)}</span>
                                <span className="animate-digit-mutate text-white drop-shadow-[0_0_10px_white] delay-75">{Math.floor(Math.random()*10)}</span>
                                <span className="animate-digit-mutate text-white drop-shadow-[0_0_10px_white] delay-150">{Math.floor(Math.random()*10)}</span>
                                <span className={`animate-pulse ${isGrandRitual ? 'text-yellow-500' : 'text-green-500'}`}>{mutatingBonus}</span>
                             </div>
                             <div className="mt-4 h-1 w-24 bg-gray-800 rounded overflow-hidden">
                                 <div className="h-full bg-white animate-[width_4s_ease-in-out_forwards]" style={{width: '0%'}}></div>
                             </div>
                        </div>
                     </div>
                     {isGrandRitual && <div className="text-yellow-500 font-bold uppercase tracking-widest animate-pulse text-xl">Le Conseil Décide...</div>}
                 </div>
            </div>
        );
    }
    
    if (view === 'DRAW_RESULTS') {
        const results = gameState.lastDrawResults;
        const details = gameState.lastDrawDetails;
        const isChaos = details.isChaos;
        const soulResult = details.soulDrawResult;
        const grStats = details.grandRitualStats; 
        const activeEventType = gameState.specialEvent.type;

        const playersWhoPlayed = new Set(details.ticketsPlayed.map(t => t.playerName));
        const synthesisData = gameState.players.filter(p => p.recentGain > 0 || playersWhoPlayed.has(p.name)).sort((a,b) => b.recentGain - a.recentGain);

        return (
            <div className={`min-h-screen flex flex-col p-4 relative overflow-hidden ${isChaos ? 'bg-fuchsia-950' : (gameState.specialEvent.type === EVENT_TYPES.GRAND_RITUAL ? 'bg-cartel-green' : 'bg-slate-950')}`}>
                <div className="absolute inset-0 crt-overlay z-20 pointer-events-none"></div>
                <div className="z-10 flex flex-col items-center flex-grow space-y-6 pt-10 pb-20 overflow-y-auto">
                    
                    {gameState.specialEvent.type === EVENT_TYPES.GRAND_RITUAL && (
                        <div className="text-center animate-pulse mb-4">
                            <SVG icon="Sun" size={60} className="mx-auto text-yellow-400 mb-2"/>
                            <h2 className="text-2xl font-black text-yellow-400 uppercase tracking-widest cosmic-text-aura">GRAND CONSEIL EN COURS</h2>
                        </div>
                    )}

                    {!results.isRaffle && (
                        <div className="w-full max-w-lg bg-slate-900/90 border border-slate-700 rounded-lg p-4 animate-in slide-in-from-top-4 shadow-xl">
                            <h3 className="text-gray-400 font-bold uppercase text-xs mb-3 flex items-center justify-between border-b border-gray-700 pb-2">
                                <span className="flex items-center gap-2"><SVG icon="Chart" size={14}/> Bilan Financier du Tour</span>
                                <span className="text-[10px] bg-gray-800 px-2 rounded text-gray-500">Net (Gains - Dépenses non incluses)</span>
                            </h3>
                            <div className="grid grid-cols-2 gap-2">
                                {synthesisData.length > 0 ? synthesisData.map(p => (
                                    <div key={p.id} className={`flex justify-between items-center p-2 rounded text-xs font-mono border ${p.recentGain > 0 ? 'bg-green-900/20 border-green-800/50' : 'bg-red-900/10 border-red-900/30'}`}>
                                        <span className="font-bold text-gray-300 truncate">{p.name}</span>
                                        <span className={p.recentGain > 0 ? 'text-green-400 font-bold' : 'text-gray-600'}>
                                            {p.recentGain > 0 ? `+${p.recentGain.toFixed(2)}€` : '0.00€'}
                                        </span>
                                    </div>
                                )) : <div className="col-span-2 text-center text-[10px] italic text-gray-600">Aucun mouvement financier.</div>}
                            </div>
                        </div>
                    )}

                    {details.plagueEvents && details.plagueEvents.length > 0 && (
                        <div className="w-full max-w-lg bg-green-900/30 border border-green-500/50 rounded-lg p-3 animate-in slide-in-from-top-4">
                            <h3 className="text-green-400 font-bold uppercase text-xs mb-2 flex items-center gap-2"><SVG icon="Biohazard" size={14}/> Rapport du Labo</h3>
                            <div className="space-y-1">
                                {details.plagueEvents.map((log, i) => (
                                    <div key={i} className="text-[10px] text-green-200 font-mono border-l-2 border-green-600 pl-2">{log}</div>
                                ))}
                            </div>
                        </div>
                    )}

                    {details.territoryEvents && details.territoryEvents.length > 0 && (
                        <div className="w-full max-w-lg bg-red-900/30 border border-red-500/50 rounded-lg p-3 animate-in slide-in-from-top-4">
                            <h3 className="text-red-400 font-bold uppercase text-xs mb-2 flex items-center gap-2"><SVG icon="Map" size={14}/> Rapport de Conquête</h3>
                            <div className="space-y-1">
                                {details.territoryEvents.map((log, i) => (
                                    <div key={i} className="text-[10px] text-red-100 font-mono border-l-2 border-red-600 pl-2">{log}</div>
                                ))}
                            </div>
                        </div>
                    )}

                    {grStats && (
                        <div className="w-full max-w-lg bg-yellow-900/20 border border-yellow-500/50 rounded-lg p-4 font-mono text-xs shadow-[0_0_20px_rgba(234,179,8,0.2)]">
                            <h3 className="text-yellow-400 font-bold uppercase mb-2 border-b border-yellow-500/30 pb-1 flex justify-between items-center">
                                <span className="flex items-center gap-2"><SVG icon="Chart" size={14}/> Dividendes Versés</span>
                            </h3>
                            <div className="space-y-2">
                                <div className="flex justify-between text-gray-300">
                                    <span>Méga Coffre Initial :</span>
                                    <span className="text-white font-bold">{grStats.potTotal.toFixed(2)}€</span>
                                </div>
                                <div className="flex justify-between text-yellow-400 font-bold text-sm">
                                    <span>Montant Distribué :</span>
                                    <span>{grStats.totalDrop.toFixed(2)}€</span>
                                </div>
                            </div>
                        </div>
                    )}

                    {!results.isRaffle && (
                        <div className="space-y-4 text-center flex-shrink-0 w-full max-w-lg">
                            <div>
                                <div className="flex justify-center gap-2 md:gap-3">
                                    {results.numbers.map((n, i) => {
                                        const isDimmed = activeEventType === EVENT_TYPES.DIGITAL_HERESY && n % 2 === 0;
                                        return (
                                            <div key={i} className={`flex items-center justify-center font-black rounded-xl shadow-2xl border-2 transition-all 
                                                ${isChaos ? 'w-8 h-8 md:w-12 md:h-12 text-sm md:text-xl animate-extreme-chaos chaos-blur bg-fuchsia-900 border-white text-fuchsia-200' : 'w-12 h-12 md:w-16 md:h-16 text-xl md:text-3xl'}
                                                ${!isChaos && (details.isHell ? 'bg-red-950 border-red-600 text-red-100 hell-text-aura' : 'bg-slate-900 border-slate-600 text-slate-100')}
                                                ${isDimmed ? 'opacity-20 grayscale scale-75' : ''}`}>
                                                {n}
                                            </div>
                                        );
                                    })}
                                    <div className={`flex items-center justify-center font-black rounded-full shadow-2xl border-4 ml-2 
                                        ${isChaos ? 'w-8 h-8 md:w-12 md:h-12 text-sm md:text-xl animate-shake' : 'w-12 h-12 md:w-16 md:h-16 text-xl md:text-3xl'}
                                        ${results.bonus === 3 ? 'border-green-500 bg-green-900/50 text-green-400 animate-pulse' : (results.bonus === 6 ? 'border-blue-400 bg-blue-900/50 text-white animate-pulse' : 'border-yellow-500 bg-yellow-900/50 text-yellow-400')}`}>
                                        {results.bonus}
                                    </div>
                                </div>
                                {activeEventType === EVENT_TYPES.DIGITAL_HERESY && <div className="text-xs text-fuchsia-400 mt-2 font-mono uppercase blink">Blanchiment : Pairs Ignorés</div>}
                            </div>
                        </div>
                    )}

                    {soulResult && (
                        <div className="w-full max-w-lg animate-in fade-in zoom-in duration-1000 my-4">
                            <div className="bg-gradient-to-br from-cyan-900 to-black p-4 rounded-xl border-2 border-cyan-500 relative overflow-hidden shadow-[0_0_30px_rgba(34,211,238,0.4)]">
                                <div className="absolute inset-0 bg-cyan-400/10 animate-soul-float pointer-events-none"></div>
                                <div className="relative z-10 flex flex-col items-center text-center space-y-2">
                                    <SVG icon="Syringe" size={40} className="text-cyan-400 animate-float-up"/>
                                    <h3 className="text-xl font-black text-cyan-400 uppercase tracking-widest drop-shadow-lg">LA PURE EST SORTIE</h3>
                                    <div className="bg-black/60 px-4 py-1 rounded font-mono text-cyan-200 text-sm tracking-widest border border-cyan-800">{soulResult.code}</div>
                                    <div className="text-white text-lg font-bold mt-2">
                                        {soulResult.winnerName} rafle le stock de <span className="text-cyan-400 text-2xl ml-1">{soulResult.amount.toFixed(2)}€</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    <div className="w-full max-w-lg bg-slate-900/80 border border-slate-800 rounded-lg p-4 backdrop-blur-sm flex-grow">
                        <h4 className="text-center font-bold uppercase mb-4 text-gray-400 border-b border-gray-700 pb-2 sticky top-0 bg-slate-900/90 z-10 flex justify-between items-center">
                            <span>{results.isRaffle ? "Bilan du Conseil" : (details.mysteryEvent ? "Razzia sur la Planque" : "Détail des Deals")}</span>
                        </h4>
                        {details.ticketsPlayed.length > 0 ? (
                            <div className="space-y-2 max-h-[30vh] overflow-y-auto pr-1">
                                {details.ticketsPlayed.map((t, i) => (
                                    <div key={i} className={`flex justify-between items-center text-xs p-2 rounded border ${t.isWin ? 'bg-green-900/20 border-green-800' : 'bg-red-900/10 border-slate-800'}`}>
                                        <div className="flex flex-col">
                                            <span className="font-bold text-gray-300">{t.playerName}</span>
                                            {t.numbers.length > 0 ? (
                                                <span className="font-mono text-gray-500">
                                                    {t.numbers.join('-')} <span className="text-yellow-600">[{t.bonus}]</span>
                                                </span>
                                            ) : <span className="font-mono text-gray-500 italic">Ticket Conseil</span>}
                                        </div>
                                        <div className="text-right">
                                            {t.isWin ? (
                                                <>
                                                    <div className="text-green-400 font-mono font-bold">+{t.winAmount.toFixed(2)}€</div>
                                                    <div className="text-[9px] text-green-300/70">{t.rankLabel}</div>
                                                </>
                                            ) : (
                                                <span className="text-red-500/50 italic">Perdu</span>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center text-gray-500 italic py-4">Aucun business ce tour-ci.</div>
                        )}
                    </div>
                    <button onClick={closeDrawResults} className={`px-8 py-3 rounded text-lg font-bold uppercase tracking-widest transition-transform hover:scale-105 shadow-lg ${details.isHell ? 'bg-red-700 text-white hover:bg-red-600 hell-text-aura' : 'bg-blue-700 text-white hover:bg-blue-600'}`}>
                        {gameState.grandRitualArmed ? "RÉUNIR LE CONSEIL >" : (details.grandRitualAction === 'SEPARATION' ? "VOIR LA DISSOLUTION &gt;" : "CONTINUER")}
                    </button>
                </div>
            </div>
        );
    }

    if (view === 'TERRITORIES') {
        const activeP = gameState.players.find(p => p.id === selectedPlayerId);
        return (
            <div className="min-h-screen flex flex-col pb-24 bg-slate-950 relative">
                 <div className="absolute inset-0 crt-overlay z-20 pointer-events-none"></div>
                 <div className="bg-slate-900 border-b border-slate-800 p-4 sticky top-0 z-30 shadow-xl">
                    <h2 className="text-xl font-bold uppercase flex items-center gap-2 text-green-500">
                        <SVG icon="Map" size={24}/> Carte Stratégique
                    </h2>
                    <p className="text-[10px] text-gray-500 mt-1">Contrôlez la majorité des zones d'une ville pour obtenir son bonus global.</p>
                    {!activeP && <div className="mt-2 text-red-500 text-xs font-bold animate-pulse">SÉLECTIONNEZ UN SOLDAT DANS LE MENU PRINCIPAL</div>}
                    {activeP && (
                        <div className="flex justify-between items-center mt-2 bg-black p-2 rounded border border-gray-700">
                            <span className="text-white font-bold">{activeP.name}</span>
                            <span className="text-green-400 font-mono">{activeP.balance.toFixed(2)}€</span>
                        </div>
                    )}
                 </div>

                 <div className="p-4 space-y-6 overflow-y-auto">
                    {Object.values(TERRITORIES).map(city => {
                        const controllerId = getCityController(city.id, gameState.players);
                        const controller = gameState.players.find(p => p.id === controllerId);
                        const isContested = !controller && gameState.players.some(p => p.controlledZones.some(z => city.zones?.some(cz => cz.id === z)));
                        const isCityOwnedByMe = activeP && activeP.territories.includes(city.id);

                        let protectionBadge = null;
                        if (controller) {
                            const acquiredTurn = (controller.cityStatus && controller.cityStatus[city.id]) ? controller.cityStatus[city.id] : 0;
                            const turnsLeft = 10 - (gameState.currentDraw - acquiredTurn);
                            if (turnsLeft > 0) protectionBadge = <span className="ml-2 text-[10px] bg-green-900 text-green-400 px-2 py-0.5 rounded border border-green-600 animate-pulse">🔒 SÉCURISÉ ({turnsLeft} trs)</span>;
                            else protectionBadge = <span className="ml-2 text-[10px] bg-red-900 text-red-400 px-2 py-0.5 rounded border border-red-600 animate-pulse">⚠️ VULNÉRABLE</span>;
                        }

                        return (
                            <div key={city.id} className={`rounded-xl border-2 overflow-hidden mb-4 ${controller ? (controller.id === activeP?.id ? 'border-green-600 bg-green-900/10' : 'border-red-600 bg-red-900/10') : 'border-slate-700 bg-slate-900/50'}`}>
                                <div className="p-3 bg-black/40 flex justify-between items-center border-b border-white/10">
                                    <div>
                                        <h3 className="font-black uppercase text-lg text-gray-200 flex flex-wrap items-center gap-2">{city.name} {protectionBadge}</h3>
                                        <div className="text-[10px] uppercase tracking-widest font-bold">
                                            {controller ? <span className={controller.id === activeP?.id ? "text-green-400" : "text-red-400"}>PROPRIÉTÉ DE {controller.name}</span> : (isContested ? <span className="text-yellow-500 animate-pulse">DISPUTÉ</span> : <span className="text-gray-600">ZONE LIBRE</span>)}
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-[9px] text-gray-500">Bonus Global</div>
                                        <div className="text-xs font-bold text-white bg-slate-800 px-2 py-1 rounded">
                                            -{(Object.keys(city.zones || {}).length * CONFIG.cityDiscount * 100).toFixed(0)}% PRIX / +{(Object.keys(city.zones || {}).length * 5)}% GAIN
                                        </div>
                                    </div>
                                </div>

                                {isCityOwnedByMe ? (
                                    <div className="p-3 grid grid-cols-1 gap-2 animate-in slide-in-from-top-2">
                                        <div className="text-[10px] text-green-400 uppercase font-bold mb-1 text-center border-b border-green-800/30 pb-1">Quartiers disponibles pour déploiement</div>
                                        {city.zones && city.zones.map(zone => {
                                            const owner = gameState.players.find(p => p.controlledZones.includes(zone.id));
                                            const isOwnedBySelf = owner && activeP && owner.id === activeP.id;
                                            const cost = 10.00; 
                                            return (
                                                <div key={zone.id} className="flex items-center justify-between bg-black/60 p-2 rounded border border-gray-800">
                                                    <div className="flex flex-col">
                                                        <span className="font-bold text-sm text-gray-300 flex items-center gap-2">{zone.name} {owner && <span className={`text-[8px] px-1 rounded ${isOwnedBySelf ? 'bg-green-600 text-white' : 'bg-red-600 text-white'}`}>{owner.name.substr(0,8)}</span>}</span>
                                                        <span className="text-[10px] text-yellow-500 italic">{zone.desc}</span>
                                                    </div>
                                                    <button onClick={() => handleZoneDeploy(zone.id, cost)} disabled={isOwnedBySelf} className={`px-3 py-1.5 rounded text-[10px] font-bold uppercase transition-all ${isOwnedBySelf ? 'bg-green-900/50 text-green-500 border border-green-700 cursor-default' : (owner ? 'bg-red-900 hover:bg-red-700 text-white border border-red-500 animate-pulse' : 'bg-blue-600 hover:bg-blue-500 text-white border border-blue-400')}`}>
                                                        {isOwnedBySelf ? "OCCUPÉ" : (owner ? `ATTAQUER (${cost}€)` : `DÉPLOYER (${cost}€)`)}
                                                    </button>
                                                </div>
                                            );
                                        })}
                                    </div>
                                ) : (
                                    <div className="p-4 flex flex-col items-center justify-center text-gray-500 bg-black/20 gap-2">
                                        <SVG icon="Lock" size={24} className="opacity-30"/>
                                        <span className="text-[10px] uppercase font-bold tracking-widest text-center">Accès aux quartiers refusé</span>
                                        <span className="text-[9px] italic text-center opacity-70">Gagnez cette ville au tirage (T{city.target.n} + Bonus {city.target.b}) pour débloquer les déploiements.</span>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                 </div>
                 
                 <nav className={`fixed bottom-0 w-full h-16 border-t flex justify-around items-center bg-slate-950 z-50 border-slate-800`}>
                    {[ {id:'GAME', icon:'Ticket', label:"L'Autel"}, {id:'RITUAL', icon:'Grid', label:'Planque'}, {id:'TERRITORIES', icon:'Map', label:'Carte'}, {id:'STATS', icon:'Chart', label:'Compta'}, {id:'HISTORY', icon:'Scroll', label:'Dossier'}, {id:'SAVE', icon:'Cog', label:'Système'} ].map(item => (
                        <button key={item.id} onClick={()=>{playSound('click'); setView(item.id)}} className={`flex flex-col items-center justify-center w-full h-full ${view===item.id ? 'text-blue-500' : 'text-gray-600 hover:text-gray-400'}`}>
                            <SVG icon={item.icon} size={20} className={view===item.id ? 'scale-110 transition-transform' : ''}/>
                            <span className="text-[9px] uppercase mt-1 font-bold">{item.label}</span>
                        </button>
                    ))}
                </nav>
            </div>
        );
    }

    if (view === 'HELL_RESET') {
        return (
            <div className="min-h-screen bg-hell-dark flex flex-col items-center justify-center p-6 text-center relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-red-900/20 via-black to-black animate-pulse"></div>
                <div className="absolute inset-0 crt-overlay z-20 pointer-events-none"></div>
                <div className="z-30 space-y-6 max-w-lg">
                    <SVG icon="Flame" size={80} className="mx-auto text-red-600 animate-shake" />
                    <h1 className="text-4xl md:text-6xl font-black text-red-600 tracking-tighter drop-shadow-[0_0_10px_rgba(220,38,38,0.8)] hell-text-aura">LE FOUR EST SAISI</h1>
                    <p className="text-red-200 text-lg font-mono">Le cycle du Four est bouclé. Descente de police.</p>
                    <button onClick={confirmHellReset} className="mt-8 bg-transparent border-2 border-red-600 text-red-600 hover:bg-red-600 hover:text-black px-8 py-3 rounded font-bold uppercase tracking-[0.2em] transition-all">
                        Recommencer (+75€)
                    </button>
                </div>
            </div>
        );
    }
    
    if (view === 'MENU') {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center space-y-8 animate-in fade-in bg-slate-950 relative overflow-hidden">
                <div className="absolute inset-0 crt-overlay"></div>
                <div className="z-10 space-y-4">
                    <SVG icon="Briefcase" className="w-24 h-24 mx-auto text-green-600 animate-pulse" />
                    <h1 className="text-5xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-green-500 to-green-900 drop-shadow-lg font-display">LE BUSINESS</h1>
                    <p className="text-gray-500 font-mono text-xs uppercase tracking-widest">Cartel Auvergnat v14.3</p>
                    <div className="flex flex-col gap-3 w-64 mx-auto pt-8">
                        <button onClick={() => { playSound('click'); setView('GAME'); }} className="bg-green-900 border border-green-600 hover:bg-green-700 text-white py-3 px-6 rounded font-bold uppercase tracking-wider transition-all hover:scale-105 shadow-[0_0_15px_rgba(22,101,52,0.5)]">Lancer le Réseau</button>
                        <button onClick={() => { playSound('click'); setView('HISTORY'); }} className="text-xs text-gray-500 hover:text-white uppercase">Lire le Dossier</button>
                    </div>
                </div>
            </div>
        );
    }

    // --- VARIABLES DE L'INTERFACE PRINCIPALE ---
    const activePlayer = gameState.players.find(p => p.id === selectedPlayerId);
    const globalProgress = gameState.globalTicketCounter % CONFIG.fid.globalTarget;
    const globalProgressPercent = (globalProgress / CONFIG.fid.globalTarget) * 100;
    const eventActive = gameState.specialEvent.type !== 'NONE';
    const activeEventType = gameState.specialEvent.type;
    const isGrandRitual = activeEventType === EVENT_TYPES.GRAND_RITUAL;
    const hasRaffleTicket = activePlayer && isGrandRitual && activePlayer.tickets.some(t => t.type === 'raffle');
    
    let displayPriceBase = isHellRound ? CONFIG.ticketPriceHell : CONFIG.ticketPrice;
    if (activePlayer && activePlayer.faction === 'ORDRE') displayPriceBase -= 1.00;
    if (activePlayer && activePlayer.faction === 'CHIMISTES') displayPriceBase += 1.00;
    if (activeEventType === EVENT_TYPES.BLOOD_MOON) displayPriceBase *= 1.66;
    if (isGrandRitual) displayPriceBase = GRAND_RITUAL_CONFIG.price; 
    
    const isInfected = activePlayer && (activePlayer.plagueStatus === PLAGUE.STATUS.INFECTED);
    let priceDetails = [`Base: ${displayPriceBase.toFixed(2)}€`];
    if (activePlayer && activePlayer.faction === 'ORDRE') priceDetails.push("(Bonus Ordre)");
    if (activePlayer && activePlayer.faction === 'CHIMISTES') priceDetails.push("(Malus Chimistes)");

    if (activeEventType === EVENT_TYPES.QUARANTINE) {
        if (activePlayer && activePlayer.plagueStatus !== PLAGUE.STATUS.INFECTED) { displayPriceBase *= 3; priceDetails.push("+ GAV (x3)"); }
    } else if (isInfected && !isGrandRitual) {
        displayPriceBase *= 2; priceDetails.push("+ Taxe Junkie (x2)");
    }

    let displayPriceFinal = displayPriceBase;
    let hasDiscount = false, hasPenalty = false, specialLabel = null;

    if (activePlayer && !isGrandRitual) {
        if (gameState.mostWantedPlayerId === activePlayer.id) {
            const hackingRatio = (activePlayer.cryptoProgress || "").length / CONFIG.cryptoKeyLength;
            displayPriceFinal *= hackingRatio >= 0.5 ? 1.10 : 1.05;
            priceDetails.push(hackingRatio >= 0.5 ? "+ ALARME (x1.1)" : "+ Taxe Wanted (+5%)");
            hasPenalty = true;
        }

        if (activeEventType === EVENT_TYPES.WIDOWS_GIFT && activePlayer.balance < 5) {
            displayPriceFinal = 0; specialLabel = "SOLIDARITÉ"; priceDetails = ["Gratuit (<5€)"]; hasDiscount = true;
        } else if (activeEventType === EVENT_TYPES.SOUL_DEBT) {
            const allBoughtCounts = gameState.players.map(p => p.stats.bought).sort((a,b) => a-b);
            const medianBought = allBoughtCounts[Math.floor(allBoughtCounts.length / 2)];
            if (activePlayer.stats.bought > medianBought) { displayPriceFinal = 1.00; specialLabel = "PRIX VIP (1€)"; priceDetails = ["Client Fidèle"]; hasDiscount = true; } 
            else { specialLabel = "RECOUVREMENT"; priceDetails.push("+ Dette"); hasPenalty = true; }
        } else {
            const sealStats = calculateSealBonus(activePlayer.ritual.seal);
            let discountMultiplier = 1.0;
            if (isHellRound) discountMultiplier -= sealStats.discountHell; else discountMultiplier -= sealStats.discountNormal;

            const territoryCount = activePlayer.territories ? activePlayer.territories.length : 0;
            let isGoFastTarget = false;
            if (activeEventType === EVENT_TYPES.GO_FAST_INTERCEPT) {
                 const maxT = Math.max(...gameState.players.map(p => p.territories?.length || 0));
                 if (territoryCount > 0 && territoryCount === maxT) isGoFastTarget = true;
            }

            if (territoryCount > 0) {
                if (isGoFastTarget) { priceDetails.push("! DOUANE (Bonus Gelé) !"); } 
                else {
                    const discountPerCity = territoryCount * CONFIG.cityDiscount;
                    const depts = {};
                    activePlayer.territories.forEach(tId => { const city = TERRITORIES[tId]; if(city) depts[city.dept] = (depts[city.dept] || 0) + 1; });
                    let monopolyCount = 0; Object.values(depts).forEach(count => { if(count === 3) monopolyCount++; });
                    const discountMonopoly = monopolyCount * CONFIG.monopolyDiscount;
                    const totalTerritoryDiscount = discountPerCity + discountMonopoly;
                    discountMultiplier -= totalTerritoryDiscount;
                    priceDetails.push(`- Villes (-${(totalTerritoryDiscount*100).toFixed(0)}%)`);
                }
            }

            if (discountMultiplier < 0.1) discountMultiplier = 0.1;
            displayPriceFinal *= discountMultiplier;

            const loyaltyCount = activePlayer.stats.bought % CONFIG.fid.individualTarget;
            if (activeEventType === EVENT_TYPES.ABSOLUTE_LOYALTY && loyaltyCount >= 13 || activePlayer.discounts.mega66) { displayPriceFinal *= 0.50; priceDetails.push("- Omerta/Mega (-50%)"); } 
            else if ((isHellRound && activePlayer.discounts.hell6) || (!isHellRound && activePlayer.discounts.normal6)) { displayPriceFinal *= 0.95; priceDetails.push("- Contrat (-5%)"); }
            
            if (!hasPenalty) hasDiscount = displayPriceFinal < displayPriceBase;
            if (!hasDiscount) hasPenalty = displayPriceFinal > displayPriceBase;
        }
    }

    const getStatusIcon = (player) => {
        switch(player.plagueStatus) {
            case PLAGUE.STATUS.INFECTED: return <div className="flex items-center gap-1"><SVG icon="Syringe" size={12} className="text-green-500 animate-pulse"/><span className="text-[9px] text-green-400">JUNKIE</span></div>;
            case PLAGUE.STATUS.INCUBATING: return <div className="flex items-center gap-1"><SVG icon="Syringe" size={12} className="text-gray-500 opacity-50"/><span className="text-[9px] text-gray-500">User</span></div>;
            case PLAGUE.STATUS.IMMUNE: return <div className="flex items-center gap-1"><SVG icon="Shield" size={12} className="text-blue-400"/><span className="text-[9px] text-blue-300 font-mono">Rehab ({player.immunityDuration})</span></div>;
            default: return null;
        }
    };
    
    const hellCountdown = getCountdownToHell(gameState.currentDraw);
    const soulCountdown = getCountdownToSoul(gameState.currentDraw);

    // --- RENDU PRINCIPAL DU JEU ---
    return (
        <div className="min-h-screen flex flex-col pb-20 relative overflow-x-hidden">
            <div className="absolute inset-0 crt-overlay fixed z-50 pointer-events-none"></div>
            
            <header className={`sticky top-0 z-40 border-b shadow-2xl transition-all duration-1000 ${isGrandRitual ? 'bg-green-950 border-yellow-600' : (isHellRound ? 'bg-hell-dark border-hell-red' : (eventActive ? 'bg-gray-900 border-gray-600' : 'bg-slate-900 border-blue-900'))}`}>
                <div className="flex justify-between items-center p-3">
                    <div className="flex items-center gap-2" onClick={()=>setView('MENU')}>
                        <SVG icon={isGrandRitual ? "Sun" : (isHellRound ? "Flame" : "Briefcase")} className={`${headerPulse ? 'text-white animate-ping' : (isGrandRitual ? "text-yellow-400 animate-spin-slow" : (isHellRound ? "text-red-500 animate-pulse" : "text-gray-400"))} transition-colors duration-100`} />
                        <div className="flex flex-col">
                            <span className="font-bold leading-none text-sm">Tour #{gameState.currentDraw}</span>
                            {eventActive && <span className={`text-[9px] uppercase font-bold tracking-wider animate-pulse ${isGrandRitual ? 'text-yellow-400' : 'text-yellow-500'}`}>{isGrandRitual ? `GRAND CONSEIL (T${GRAND_RITUAL_CONFIG.duration - gameState.specialEvent.duration + 1}/4)` : activeEventType.replace(/_/g, ' ')}</span>}
                        </div>
                    </div>
                    
                    <div className="text-right flex items-center gap-4">
                        <div className="hidden md:block">
                            <div className="text-[10px] text-crypto-green uppercase flex items-center gap-1 justify-end"><SVG icon="Chip" size={10}/> Crypto Vault</div>
                            <div className="font-mono text-lg font-black text-crypto-green">{gameState.pots.crypto.toFixed(2)}€</div>
                        </div>
                        <div>
                            <div className="text-[10px] text-gray-500 uppercase">Pot {isGrandRitual ? "MÉGA" : (isHellRound ? "Le Four" : "Mortelle")}</div>
                            <div className={`font-mono text-xl font-black transition-all ${isGrandRitual ? 'text-yellow-400 cosmic-text-aura' : (isHellRound ? 'text-red-500 hell-text-aura' : 'text-blue-400')} ${potPulse ? 'animate-pot-pulse' : ''}`}>
                                {(isGrandRitual ? gameState.pots.mega : (isHellRound ? gameState.pots.hell : gameState.pots.normal)).toFixed(2)}€
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            <main className="flex-grow p-4 container mx-auto max-w-lg space-y-6">
                {view === 'GAME' && (
                    <>
                        <div className="flex items-center justify-between bg-black/40 p-3 rounded-lg border border-slate-800">
                            <div className="flex items-center gap-3 w-full">
                                <div className="relative w-12 h-12 flex items-center justify-center shrink-0">
                                    <svg className="absolute w-full h-full transform -rotate-90">
                                        <circle cx="24" cy="24" r="20" stroke="currentColor" strokeWidth="4" fill="transparent" className="text-gray-800" />
                                        <circle cx="24" cy="24" r="20" stroke="currentColor" strokeWidth="4" fill="transparent" className="text-yellow-500 transition-all duration-500" strokeDasharray="125.6" strokeDashoffset={125.6 - (125.6 * globalProgressPercent) / 100} />
                                    </svg>
                                    <SVG icon="Sun" size={16} className={`text-yellow-400 ${globalProgress > 900 || gameState.grandRitualArmed ? 'animate-spin-slow' : ''}`}/>
                                </div>
                                <div className="flex flex-col w-full">
                                    <div className="flex justify-between items-center">
                                        <span className="text-xs font-bold uppercase text-yellow-400">Pression du Conseil</span>
                                        <span className="text-[10px] text-gray-500">{globalProgress} / {CONFIG.fid.globalTarget}</span>
                                    </div>
                                    <div className="w-full bg-gray-800 h-1 mt-1 rounded">
                                        <div className={`h-full ${gameState.grandRitualArmed ? 'bg-red-500 animate-pulse' : 'bg-yellow-600'} transition-all duration-500`} style={{width: `${gameState.grandRitualArmed ? 100 : globalProgressPercent}%`}}></div>
                                    </div>
                                    <span className="text-[9px] text-gray-600 mt-1 italic">{gameState.grandRitualArmed ? "CONSEIL ARMÉ." : "À 1000 : Fusion des Comptes"}</span>
                                </div>
                            </div>
                        </div>

                        <div className="bg-slate-900/50 border border-slate-800 rounded-lg p-3">
                            <div className="flex justify-between items-center mb-2">
                                <h3 className="text-xs font-bold uppercase text-gray-400 flex items-center gap-2"><SVG icon="User" size={14}/> Soldats</h3>
                                <button onClick={()=>createPlayer(prompt("Blase du soldat ?"))} className="text-xs bg-slate-800 px-2 py-1 rounded hover:bg-slate-700">+ Recruter (+50€)</button>
                            </div>
                            <div className="grid grid-cols-2 gap-2 pb-2">
                                {gameState.players.map(p => {
                                    const loyaltyProgress = p.stats.bought % CONFIG.fid.individualTarget;
                                    return (
                                        <button key={p.id} onClick={()=>setSelectedPlayerId(p.id)} className={`p-3 rounded border flex flex-col text-left transition-all relative overflow-hidden ${selectedPlayerId === p.id ? (isHellRound ? 'bg-red-900/40 border-red-500' : 'bg-blue-900/40 border-blue-500') : 'bg-slate-900 border-slate-800 opacity-60'}`}>
                                            {p.recentGain > 0 && (
                                                <div className="absolute top-0 left-0 w-full text-center z-50 pointer-events-none animate-float-up">
                                                    <span className="text-green-400 font-black font-mono text-xl drop-shadow-md">+{p.recentGain.toFixed(0)}€</span>
                                                </div>
                                            )}
                                            <div className="flex flex-col z-10 w-full mb-2">
                                                <div className="font-bold text-sm truncate w-full">{p.name}</div>
                                                {p.faction && (
                                                    <div className="text-[9px] px-1 rounded border border-gray-600 bg-gray-800 text-gray-400 flex items-center gap-1 w-fit mt-1" title={FACTIONS[p.faction].name}>
                                                        <SVG icon={FACTIONS[p.faction].icon} size={8}/> {FACTIONS[p.faction].name}
                                                    </div>
                                                )}
                                                <div className="flex flex-wrap gap-1 mt-1">
                                                    {gameState.mostWantedPlayerId === p.id && <span className="text-[9px] bg-red-600 text-white px-1.5 rounded font-black border border-red-400 animate-pulse">WANTED</span>}
                                                    {p.stats.boughtLastDraw > 0 && <span className="text-[9px] text-gray-400 bg-gray-900 px-1.5 rounded font-mono border border-gray-700">Prev: {p.stats.boughtLastDraw}</span>}
                                                    {p.omertaTokens > 0 && <span className="text-[9px] text-gray-300 bg-gray-800 px-1.5 rounded font-mono border border-gray-600 flex items-center gap-1"><SVG icon="Ghost" size={8}/> {p.omertaTokens}</span>}
                                                    {p.cryptoProgress && p.cryptoProgress.length > 0 && <span className="text-[9px] text-crypto-green bg-green-900/20 px-1.5 rounded font-mono border border-green-800 flex items-center gap-1"><SVG icon="Chip" size={8}/> {Math.floor((p.cryptoProgress.length / 50) * 100)}%</span>}
                                                </div>
                                            </div>
                                            <div className="mb-1">{getStatusIcon(p)}</div>
                                            <div className="flex justify-between items-center z-10 w-full mb-1">
                                                <span className={`font-mono text-xs ${p.balance < 0 ? 'text-red-400' : 'text-green-400'}`}>{p.balance.toFixed(2)}€</span>
                                                <span className="text-[9px] text-gray-500">J: {p.tickets.length}/{CONFIG.maxTicketsPerPlayer}</span>
                                            </div>
                                            <div className="w-full bg-gray-800 h-1 rounded mt-1 relative">
                                                <div className="h-full bg-blue-500 transition-all" style={{width: `${(loyaltyProgress/CONFIG.fid.individualTarget)*100}%`}}></div>
                                            </div>
                                        </button>
                                    )
                                })}
                            </div>
                        </div>

                        {activePlayer ? (
                            <div className="space-y-4 animate-in slide-in-from-bottom-4">
                                <div className="flex justify-between gap-2 text-[10px] uppercase font-bold">
                                    <div className="bg-slate-900/80 p-1.5 rounded border border-slate-800 text-cyan-500 flex flex-col items-center w-full justify-center">
                                        <div className="flex items-center gap-1"><SVG icon="Syringe" size={12}/> La Pure: {soulCountdown === 0 ? "SORTIE" : `${soulCountdown} trs`}</div>
                                        <div className="text-[8px] text-cyan-300 font-mono mt-0.5">{gameState.pots.soul.toFixed(0)}€</div>
                                    </div>
                                    <div className="bg-slate-900/80 p-1.5 rounded border border-slate-800 text-red-500 flex flex-col items-center w-full justify-center">
                                        <div className="flex items-center gap-1"><SVG icon="Flame" size={12}/> Le Four: {hellCountdown === 0 ? "PRÊT" : `${hellCountdown} trs`}</div>
                                        <div className="text-[8px] text-red-300 font-mono mt-0.5">{gameState.pots.hell.toFixed(0)}€</div>
                                    </div>
                                    <div className="bg-slate-900/80 p-1.5 rounded border border-slate-800 text-purple-500 flex flex-col items-center w-full justify-center">
                                        <div className="flex items-center gap-1"><SVG icon="Eye" size={12}/> Planque</div>
                                        <div className="text-[8px] text-purple-300 font-mono mt-0.5">{gameState.pots.mystery.toFixed(0)}€ / {CONFIG.mysteryTarget}€</div>
                                    </div>
                                </div>

                                {activeEventType !== EVENT_TYPES.GRAND_RITUAL && (
                                    (() => {
                                        let wAmount = CONFIG.workReward;
                                        let wInfos = [];
                                        if (activePlayer.faction === 'CHIMISTES') { wAmount += 5; wInfos.push("+Chimistes"); }
                                        if (activePlayer.faction === 'BRAVAS') { wAmount -= 2; wInfos.push("-Bravas"); }
                                        
                                        if (activePlayer.controlledZones) {
                                             activePlayer.controlledZones.forEach(zId => {
                                                 for (const city of Object.values(TERRITORIES)) {
                                                     const z = city.zones.find(zi => zi.id === zId);
                                                     if (z && z.bonus === 'WORK') { wAmount += z.desc.includes('+2') ? 2 : 1; wInfos.push("+Zone"); }
                                                 }
                                            });
                                        }
                                        const wNet = wAmount * (1 - CONFIG.cryptoTax); 

                                        return (
                                            <button onClick={handleWork} disabled={activePlayer.workCooldown > 0} className={`w-full py-2 rounded text-xs font-bold uppercase tracking-wider flex flex-col items-center justify-center gap-0.5 border border-dashed transition-all ${activePlayer.workCooldown > 0 ? 'bg-gray-800 text-gray-500 border-gray-600 cursor-not-allowed' : 'bg-green-900/50 text-green-400 border-green-500 hover:bg-green-900 animate-pulse'}`}>
                                                <div className="flex items-center gap-2">
                                                    <SVG icon="Briefcase" size={14}/>
                                                    {activePlayer.workCooldown > 0 ? `En Planque (${activePlayer.workCooldown} tours)` : `Charbonner (+${wNet.toFixed(2)}€)`}
                                                </div>
                                                {activePlayer.workCooldown === 0 && wInfos.length > 0 && <div className="text-[9px] text-green-200 opacity-70 font-mono">({wInfos.join(' ')})</div>}
                                            </button>
                                        );
                                    })()
                                )}

                                {activePlayer.omertaTokens >= CONFIG.omertaTarget && (
                                    <button onClick={handleOmertaExchange} className="w-full py-2 bg-gray-800 border border-gray-500 text-gray-300 font-bold uppercase text-xs rounded hover:bg-gray-700 animate-pulse">
                                        <div className="flex items-center justify-center gap-2">RÉUNIR LE CONSEIL &gt;
                                            <SVG icon="Ghost" size={14}/>
                                            <span>Utiliser Preuves ({activePlayer.omertaTokens}) &gt; Ticket Gratuit</span>
                                        </div>
                                    </button>
                                )}

                                <button onClick={buyTicket} disabled={hasRaffleTicket} className={`w-full group relative overflow-visible rounded-xl border-2 p-6 transition-all active:scale-95 ${hasRaffleTicket ? 'bg-gray-800 border-gray-600 opacity-50 cursor-not-allowed' : (activeEventType === 'CONTREBANDE' && !isInfected ? 'opacity-50 cursor-not-allowed bg-gray-900 border-gray-700' : (isGrandRitual ? 'border-yellow-500 bg-green-950 animate-gold-shine' : (isHellRound ? 'border-red-600 bg-black' : 'border-blue-600 bg-slate-900')))}`}>
                                    <div className="relative z-10 flex flex-col items-center gap-1">
                                        <span className={`text-xs font-black uppercase tracking-[0.2em] ${isGrandRitual ? 'text-yellow-400' : (isHellRound ? 'text-red-500' : 'text-blue-400')}`}>{isGrandRitual ? "Billet du Conseil (Raffle)" : (isHellRound ? "Ticket Le Four" : "Ticket de Loterie")}</span>
                                        <div className="flex items-baseline gap-3">
                                            {hasRaffleTicket ? (
                                                 <span className="text-red-400 font-bold text-xl uppercase border-2 border-red-500 px-4 py-1 rounded -rotate-6">Limite Atteinte</span>
                                            ) : (
                                                <>
                                                    {(hasDiscount || hasPenalty) && <span className="text-lg text-gray-500 font-mono line-through decoration-red-500 decoration-2">{displayPriceBase.toFixed(2)}€</span>}
                                                    <span className={`text-4xl font-black font-mono ${isGrandRitual ? 'text-white drop-shadow-[0_0_5px_gold]' : (isHellRound ? 'text-white drop-shadow-[0_0_5px_red]' : 'text-white')} ${hasDiscount ? 'text-green-400' : (hasPenalty ? 'text-red-500' : '')}`}>
                                                        {displayPriceFinal.toFixed(2)}€
                                                    </span>
                                                </>
                                            )}
                                        </div>
                                        {!isGrandRitual && !hasRaffleTicket && (
                                            <div className="text-[9px] text-gray-400 mt-1 font-mono tracking-tighter">
                                                {specialLabel ? <span className="text-yellow-400 font-bold mr-2">{specialLabel}</span> : null}
                                                {priceDetails.join(' ')}
                                            </div>
                                        )}
                                        {isGrandRitual && !hasRaffleTicket && <span className="text-[10px] text-yellow-200 uppercase bg-yellow-900/50 px-2 rounded mt-1 border border-yellow-700">1 Voix Max / Parrain</span>}
                                        <div className="flex flex-wrap justify-center gap-2 mt-1">
                                            {isInfected && <span className="text-[9px] bg-green-900/40 text-green-400 px-2 py-0.5 rounded border border-green-600 animate-pulse">JUNKIE</span>}
                                        </div>
                                    </div>
                                </button>

                                {!isGrandRitual && (
                                    <div className="space-y-1">
                                        <div className="flex justify-between items-center text-[9px] uppercase text-gray-500 font-bold px-1">
                                            <span>Contrat de Fidélité</span>
                                            <span>{Math.min(20, activePlayer.stats.gridsPlayedSinceReset)}/20 Grilles</span>
                                        </div>
                                        <div className="w-full bg-gray-800 h-2 rounded overflow-hidden mb-1 border border-gray-700">
                                            <div className={`h-full transition-all duration-500 ${activePlayer.stats.gridsPlayedSinceReset >= 20 ? 'bg-purple-500 animate-pulse' : 'bg-purple-900'}`} style={{width: `${Math.min(100, (activePlayer.stats.gridsPlayedSinceReset/20)*100)}%`}}></div>
                                        </div>
                                        <div onClick={()=>setView('RITUAL')} className="bg-slate-900 border border-slate-800 p-3 rounded flex justify-between items-center cursor-pointer hover:border-gray-600 group">
                                            <div className="flex items-center gap-3">
                                                <div className="relative">
                                                    <SVG icon="Grid" className="text-purple-500 group-hover:text-purple-400 transition-colors"/>
                                                    {activePlayer.ritual.marks.length > 0 && <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>}
                                                </div>
                                                <div className="flex flex-col w-full">
                                                    <span className="text-xs font-bold uppercase text-gray-300">Planque & Crypto</span>
                                                    <span className="text-[10px] text-gray-500">
                                                        {activePlayer.ritual.marks.length} marques | Hacking: {Math.floor((activePlayer.cryptoProgress.length/50)*100)}%
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <div className="text-xs bg-slate-800 px-2 py-1 rounded text-gray-400">Ouvrir &gt;</div>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {activePlayer.tickets.length > 0 && (
                                    <div className="bg-slate-900/80 p-3 rounded border border-slate-800 space-y-2">
                                        <h4 className="text-[10px] uppercase font-bold text-gray-500">Ardoises en cours ({activePlayer.tickets.length})</h4>
                                        <div className="grid grid-cols-1 gap-2">
                                            {activePlayer.tickets.map((t, i) => (
                                                <div key={i} className={`flex justify-between items-center p-2 rounded text-xs font-mono border ${t.isFree ? 'bg-yellow-900/20 border-yellow-700 animate-pulse' : 'bg-black/40 border-transparent'}`}>
                                                    <div className="flex gap-2 items-center">
                                                        <div className="flex gap-1">
                                                            {(t.cryptoChar || '?').split('|').map((char, charIndex) => (
                                                                <div key={charIndex} className={`flex items-center justify-center w-5 h-5 rounded border text-[10px] font-bold ${t.isCryptoHit ? 'bg-green-900/50 text-green-400 border-green-500 animate-pulse shadow-[0_0_5px_green]' : 'bg-gray-800 text-gray-500 border-gray-700'}`} title="Décryptage">{char}</div>
                                                            ))}
                                                        </div>
                                                        <div className="flex gap-1 animate-corrupt-text">
                                                            {t.type === 'raffle' 
                                                                ? <span className="text-yellow-400 font-bold tracking-widest">TICKET CONSEIL</span>
                                                                : t.numbers.map(n => <span key={n} className="w-5 h-5 flex items-center justify-center bg-slate-800 rounded text-gray-300">{n}</span>)
                                                            }
                                                        </div>
                                                        <span className="text-[9px] text-cyan-700 font-mono tracking-tighter">[{t.soulCode}]</span>
                                                        {t.isFree && <span className="text-[9px] font-bold text-yellow-500 uppercase tracking-wider ml-2">★ GRATUIT</span>}
                                                    </div>
                                                    <span className={`w-5 h-5 flex items-center justify-center rounded font-bold ${t.type==='hell'?'text-red-500 border border-red-900':'text-blue-500 border border-blue-900'}`}>{t.bonus}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div className="text-center p-10 text-gray-600 italic border-2 border-dashed border-slate-800 rounded-xl">Sélectionnez un soldat pour jouer</div>
                        )}

                        <div className="pt-4 border-t border-slate-800">
                            {(() => {
                            const hasInfected = gameState.players.some(p => p.plagueStatus === PLAGUE.STATUS.INFECTED || p.plagueStatus === PLAGUE.STATUS.INCUBATING);
                            const markOfEvilDeadlock = activeEventType === EVENT_TYPES.MARK_OF_EVIL && !hasInfected;
                            const noTickets = gameState.players.every(p => p.tickets.length === 0);
                            
                            let buttonText = isHellRound ? "Lancer le Raid (Le Four)" : "Lancer le Go-Fast";
                            let buttonStyle = isHellRound ? 'bg-red-600 hover:bg-red-500 text-black shadow-[0_0_20px_red]' : 'bg-blue-600 hover:bg-blue-500 text-white shadow-[0_0_20px_blue]';
                            
                            if (isGrandRitual) {
                                buttonText = "Exécuter le Conseil"; buttonStyle = 'bg-green-600 hover:bg-green-500 text-white shadow-[0_0_20px_green]';
                            }
                            if (gameState.pots.mystery >= CONFIG.mysteryTarget && !isGrandRitual) {
                                buttonText = "RAFLER LA PLANQUE (PRÊTE)"; buttonStyle = "bg-purple-600 hover:bg-purple-500 text-white animate-pulse shadow-[0_0_20px_purple]";
                            }
                            if (markOfEvilDeadlock) {
                                buttonText = "PASSER (Pas de Junkies)"; buttonStyle = "bg-gray-600 hover:bg-gray-500 text-white animate-pulse";
                            } else if (noTickets && !isGrandRitual && gameState.pots.mystery < CONFIG.mysteryTarget) {
                                buttonText = "TIRAGE À BLANC (Passer le tour)"; buttonStyle = "bg-slate-700 border border-slate-600 text-gray-400 hover:bg-slate-600 hover:text-white transition-colors";
                            }

                            return <button onClick={startDrawSequence} className={`w-full py-4 rounded font-black uppercase tracking-widest text-lg transition-all ${buttonStyle}`}>{buttonText}</button>;
                            })()}
                        </div>
                    </>
                )}

                {view === 'RITUAL' && activePlayer && (
                    <div className="space-y-6 animate-in fade-in pb-10">
                        <div className="flex justify-between items-center">
                            <h2 className="text-xl font-bold uppercase tracking-widest text-purple-400">La Planque & Business</h2>
                            {gameState.specialEvent.type === 'DESCENTE_POLICE' && <span className="text-xs bg-gray-800 text-gray-300 px-2 py-1 rounded border border-gray-600">Secteur Bouclé</span>}
                        </div>
                        
                        <div className="bg-black border border-green-500/50 p-4 rounded mb-4 font-mono shadow-[0_0_15px_rgba(0,255,65,0.2)]">
                            <div className="flex justify-between items-start mb-2">
                                <h3 className="text-crypto-green font-bold uppercase flex items-center gap-2 text-sm"><SVG icon="Chip" size={16}/> HACKING CRYPTO-VAULT</h3>
                                <div className="text-[9px] text-crypto-green font-bold animate-pulse">PORT 10% ACTIF</div>
                            </div>
                            
                            <div className="flex justify-between items-end mb-2">
                                <div className="text-[10px] text-gray-500">Séquence décryptée ({activePlayer.cryptoProgress.length}/50)</div>
                                <div className="text-xs text-crypto-green font-bold">{Math.floor((activePlayer.cryptoProgress.length / 50) * 100)}%</div>
                            </div>

                            <div className="bg-gray-900/80 p-3 rounded break-all tracking-[0.2em] text-xs border border-green-900/50 relative overflow-hidden font-bold min-h-[60px] flex items-center flex-wrap">
                                <span className="text-crypto-green drop-shadow-[0_0_5px_rgba(0,255,65,0.8)] transition-all duration-300">{activePlayer.cryptoProgress}</span>
                                <span className="animate-hacker-text text-green-800/50">{Array(50 - activePlayer.cryptoProgress.length).fill('0').join('')}</span>
                            </div>
                            
                            <div className="flex justify-between items-center mt-2 border-t border-green-900/50 pt-2">
                                <div className="text-[9px] text-gray-500">Prochain caractère requis.</div>
                                <div className="text-[10px] text-crypto-green font-bold">POT CIBLE: <span className="text-lg">{gameState.pots.crypto.toFixed(2)}€</span></div>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <h3 className="text-xs font-bold uppercase text-gray-500 mb-1 flex justify-between">
                                <span>1. Zone de Guerre (3x3)</span><span className="text-[9px] italic opacity-50">Reset au 666</span>
                            </h3>
                            <div className="flex justify-center">
                                <div className={`grid grid-cols-3 gap-2 bg-slate-900 p-4 rounded-lg shadow-2xl border border-purple-900/50 relative overflow-hidden ${ritualShake ? 'animate-shake' : ''}`}>
                                    {activePlayer.ritual.grid.map((row, rI) => (
                                        row.map((num, cI) => {
                                            const isMarked = activePlayer.ritual.marks.includes(num);
                                            const flatIndex = rI * 3 + cI;
                                            const isLocked = gameState.specialEvent.type === 'DESCENTE_POLICE' && gameState.specialEvent.lockedIndices.includes(flatIndex);
                                            return (
                                                <div key={`${rI}-${cI}`} className={`w-16 h-16 flex items-center justify-center text-xl font-mono font-bold rounded transition-all duration-700 relative ${isLocked ? 'locked-cell text-gray-700 border-gray-800 cursor-not-allowed' : (isMarked ? 'bg-purple-600 text-white shadow-[0_0_15px_rgba(147,51,234,0.6)] scale-95 border border-purple-400' : 'bg-slate-800 text-gray-600 border border-slate-700')}`}>{isLocked ? <SVG icon="Lock" size={14} className="opacity-50"/> : num}</div>
                                            )
                                        })
                                    ))}
                                </div>
                            </div>
                            <div className="grid grid-cols-3 gap-2 mt-2">
                                <div className={`p-2 rounded border text-center flex flex-col justify-center ${activePlayer.discounts.normal6 ? 'bg-blue-900/30 border-blue-500 text-blue-200' : 'bg-slate-900 border-slate-800 text-gray-600'}`}>
                                    <div className="text-[9px] uppercase font-bold">1 Ligne</div><div className="text-xs font-black">-5% <span className="text-[9px] font-normal opacity-70 block">Base</span></div>
                                </div>
                                <div className={`p-2 rounded border text-center flex flex-col justify-center ${activePlayer.discounts.hell6 ? 'bg-red-900/30 border-red-500 text-red-200' : 'bg-slate-900 border-slate-800 text-gray-600'}`}>
                                    <div className="text-[9px] uppercase font-bold">2 Lignes</div><div className="text-xs font-black">-5% <span className="text-[9px] font-normal opacity-70 block">Le Four</span></div>
                                </div>
                                <div className={`p-2 rounded border text-center flex flex-col justify-center ${activePlayer.discounts.mega66 ? 'bg-purple-900/30 border-purple-500 text-purple-200 shadow-[0_0_10px_purple]' : 'bg-slate-900 border-slate-800 text-gray-600'}`}>
                                    <div className="text-[9px] uppercase font-bold">Pleine</div><div className="text-xs font-black">-50% <span className="text-[9px] font-normal opacity-70 block">TOTAL</span></div>
                                </div>
                            </div>

                            <h3 className="text-xs font-bold uppercase text-gray-500 mt-4 mb-2 flex items-center gap-2"><SVG icon="Map" size={14}/> Carte des 12 Villes</h3>
                            <div className="bg-black border border-gray-800 p-4 rounded grid grid-cols-3 gap-2">
                                {Object.values(TERRITORIES).map(terr => {
                                    const isOwnedBySelf = activePlayer.territories.includes(terr.id);
                                    const owner = gameState.players.find(p => p.territories.includes(terr.id));
                                    const isOwnedByEnemy = owner && owner.id !== activePlayer.id;
                                    
                                    let statusColor = "text-gray-600 border-gray-800", bgClass = "bg-slate-900", icon = <SVG icon="Map" size={16} className="text-gray-700"/>, statusText = "Libre";
                                    if (isOwnedBySelf) { statusColor = "text-green-400 border-green-600"; bgClass = "bg-green-900/20"; icon = <SVG icon="Shield" size={16} className="text-green-500"/>; statusText = "A NOUS"; } 
                                    else if (isOwnedByEnemy) { statusColor = "text-red-400 border-red-600"; bgClass = "bg-red-900/20"; icon = <SVG icon="Skull" size={16} className="text-red-500"/>; statusText = `${owner.name}`; }

                                    return (
                                        <div key={terr.id} className={`p-1.5 rounded border flex flex-col items-center text-center gap-1 ${bgClass} ${statusColor}`}>
                                            {icon}
                                            <div className="text-[8px] font-bold uppercase leading-tight">{terr.name}</div>
                                            <div className="text-[7px] font-mono opacity-80 truncate w-full">{statusText}</div>
                                            <div className="text-[7px] bg-black px-1 rounded text-gray-400 font-mono border border-gray-800 mt-1">Cible: T{terr.target.n}+B{terr.target.b}</div>
                                        </div>
                                    );
                                })}
                            </div>
                            <div className="text-[9px] text-gray-500 italic text-center mt-1 border-t border-gray-800 pt-1">
                                Chaque ville = +5% Gains & -2% Coût Tickets (+1.50€ Entretien au 666).
                                <br/><span className="text-yellow-500">Monopole Dépt (3 villes) = +25% Gains & -15% Coût !</span>
                            </div>
                        </div>

                        <div className="space-y-2 bg-slate-900/50 p-4 rounded border border-slate-800 mt-4">
                            <h3 className="text-xs font-bold uppercase text-gray-500 border-b border-gray-800 pb-2 mb-2 flex justify-between">
                                <span>2. Registre des Contrats (4x5)</span><span className="text-[9px] italic opacity-50">Permanent</span>
                            </h3>
                            <div className="flex justify-center">
                                <div className="grid grid-cols-5 gap-1.5 p-2 bg-black rounded border border-gray-800">
                                    {[ [1,2,3,4,5], [6,7,8,9,10], [11,12,13,14,15], [16,17,18,19,20] ].map((row, rowIndex) => {
                                        const sealStats = calculateSealBonus(activePlayer.ritual.seal);
                                        const isRowComplete = sealStats.completedRowIndices.includes(rowIndex);
                                        return row.map(n => {
                                            const isSealed = activePlayer.ritual.seal.includes(n);
                                            const isMarked = activePlayer.ritual.marks.includes(n);
                                            return (
                                                <div key={n} className={`w-10 h-10 flex items-center justify-center text-sm font-bold rounded border transition-all seal-cell relative overflow-hidden ${isSealed ? (isRowComplete ? 'bg-yellow-600/40 text-yellow-300 border-yellow-500 animate-pulse' : 'bg-yellow-900/20 text-yellow-600 border-yellow-800') : (isMarked ? 'bg-purple-900/30 text-purple-500 border-purple-800' : 'bg-slate-950 text-gray-800 border-gray-900')}`}>
                                                    {n}
                                                </div>
                                            );
                                        });
                                    })}
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-2 mt-2">
                                {(() => {
                                    const sealStats = calculateSealBonus(activePlayer.ritual.seal);
                                    const lines = sealStats.lines;
                                    return (
                                        <>
                                            <div className={`p-2 rounded border text-center flex flex-col justify-center ${lines >= 1 ? 'bg-blue-900/30 border-blue-500 text-blue-200' : 'bg-slate-900 border-slate-800 text-gray-600'}`}><div className="text-[9px] uppercase font-bold">Ligne 1 (1-5)</div><div className="text-xs font-black">-5% <span className="text-[9px] font-normal opacity-70 block">Base</span></div></div>
                                            <div className={`p-2 rounded border text-center flex flex-col justify-center ${lines >= 2 ? 'bg-red-900/30 border-red-500 text-red-200' : 'bg-slate-900 border-slate-800 text-gray-600'}`}><div className="text-[9px] uppercase font-bold">Ligne 2 (1-10)</div><div className="text-xs font-black">-5% <span className="text-[9px] font-normal opacity-70 block">Le Four</span></div></div>
                                            <div className={`p-2 rounded border text-center flex flex-col justify-center ${lines >= 3 ? 'bg-blue-900/30 border-blue-500 text-blue-200' : 'bg-slate-900 border-slate-800 text-gray-600'}`}><div className="text-[9px] uppercase font-bold">Ligne 3 (1-15)</div><div className="text-xs font-black">-10% <span className="text-[9px] font-normal opacity-70 block">Base</span></div></div>
                                            <div className={`p-2 rounded border text-center flex flex-col justify-center ${lines >= 4 ? 'bg-yellow-900/30 border-yellow-500 text-yellow-200 shadow-[0_0_10px_rgba(234,179,8,0.3)]' : 'bg-slate-900 border-slate-800 text-gray-600'}`}><div className="text-[9px] uppercase font-bold">Pleine (1-20)</div><div className="text-xs font-black">-10% (Four) <span className="text-[9px] font-bold text-green-400 block mt-0.5">+5% GAINS</span></div></div>
                                        </>
                                    );
                                })()}
                            </div>
                        </div>
                    </div>
                )}

                {view === 'HISTORY' && (
                     <div className="space-y-6 animate-in fade-in pb-10">
                        <h2 className="text-xl font-bold uppercase border-b border-gray-800 pb-2 flex items-center gap-2 font-display text-amber-500"><SVG icon="Scroll" size={20}/> Main Courante</h2>
                        <div className="space-y-6">
                            {gameState.history.map(entry => (
                                <div key={entry.id} className="relative pl-6 border-l border-gray-800 pb-4">
                                    <div className="flex flex-col gap-1 mb-2">
                                        <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">Affaire #{entry.id}</span>
                                        <h3 className={`text-xl font-display font-bold italic ${entry.isHell ? 'text-red-500 hell-text-aura' : 'text-blue-400'} ${entry.isMystery ? 'text-purple-400' : ''}`}>"{entry.title}"</h3>
                                        <p className="text-xs text-gray-400 italic font-mono opacity-70">"{entry.flavor}"</p>
                                    </div>
                                     <div className="text-[10px] text-gray-500 font-mono space-y-1">
                                        {entry.logs.slice(0, 5).map((l, i) => <div key={i}>{l}</div>)}
                                    </div>
                                </div>
                            ))}
                        </div>
                     </div>
                )}
                {view === 'STATS' && (
                    <div className="space-y-6 animate-in fade-in pb-24">
                        <h2 className="text-xl font-bold uppercase border-b border-gray-800 pb-2 flex items-center gap-2 text-blue-400"><SVG icon="Chart" size={20}/> Comptabilité</h2>
                        <div className="space-y-2">
                            <h3 className="text-xs font-bold uppercase text-gray-500 mb-1">Coffres</h3>
                            <div className="grid grid-cols-3 gap-2">
                                <div className="p-2 bg-blue-950/30 border border-blue-900/50 rounded flex flex-col items-center"><span className="text-[9px] uppercase text-blue-400">Mortelle</span><span className="font-mono font-bold text-white">{gameState.pots.normal.toFixed(0)}€</span></div>
                                <div className="p-2 bg-red-950/30 border border-red-900/50 rounded flex flex-col items-center"><span className="text-[9px] uppercase text-red-500">Le Four</span><span className="font-mono font-bold text-white">{gameState.pots.hell.toFixed(0)}€</span></div>
                                <div className="p-2 bg-purple-950/30 border border-purple-900/50 rounded flex flex-col items-center"><span className="text-[9px] uppercase text-purple-400">Planque</span><span className="font-mono font-bold text-white">{gameState.pots.mystery.toFixed(0)}€</span></div>
                                <div className="p-2 bg-cyan-950/30 border border-cyan-900/50 rounded flex flex-col items-center"><span className="text-[9px] uppercase text-cyan-400">La Pure</span><span className="font-mono font-bold text-white">{gameState.pots.soul.toFixed(0)}€</span></div>
                                <div className="p-2 bg-green-900/20 border border-green-500/50 rounded flex flex-col items-center relative overflow-hidden"><span className="text-[9px] uppercase text-crypto-green flex items-center gap-1 z-10"><SVG icon="Chip" size={8}/> Crypto</span><span className="font-mono font-bold text-white z-10">{gameState.pots.crypto.toFixed(0)}€</span><div className="absolute inset-0 bg-green-500/10 animate-pulse"></div></div>
                                <div className="p-2 bg-yellow-900/20 border border-yellow-700/50 rounded flex flex-col items-center justify-center"><span className="text-[9px] uppercase text-yellow-500">Méga</span><span className="font-mono font-bold text-yellow-200">{gameState.pots.mega.toFixed(0)}€</span></div>
                            </div>
                        </div>
                        
                        <div className="bg-black/50 border border-green-500/30 p-4 rounded mt-4">
                             <h3 className="text-xs font-bold uppercase text-crypto-green mb-2 flex items-center gap-2"><SVG icon="Chip" size={14}/> Clé de Décryptage</h3>
                             <div className="font-mono text-[10px] break-all text-gray-400 tracking-widest border border-gray-800 p-2 rounded bg-gray-950 select-text">{gameState.cryptoKey}</div>
                        </div>
                        
                        {(() => {
                            const calculatePlayerNetWorth = (player) => player.balance + (player.territories.length * 50) - player.stats.totalSpent;
                            const calculateWinRate = (player) => (!player.stats.cyclesPlayed || player.stats.cyclesPlayed === 0) ? 0 : (player.stats.gamesWonCount / player.stats.cyclesPlayed) * 100;
                            const sortedByNetWorth = [...gameState.players].sort((a, b) => calculatePlayerNetWorth(b) - calculatePlayerNetWorth(a));
                            const sortedBySeals = [...gameState.players].sort((a, b) => b.stats.sealsValidated - a.stats.sealsValidated);
                            const sortedByWinRate = [...gameState.players].sort((a, b) => calculateWinRate(b) - calculateWinRate(a));

                            const renderRanking = (players, title, valueFn, formatFn) => (
                                <div className="bg-black/50 p-3 rounded border border-gray-800">
                                    <h4 className="text-xs font-bold uppercase text-yellow-500 mb-2 border-b border-gray-700 pb-1 flex items-center gap-1"><SVG icon="Star" size={12}/> {title}</h4>
                                    <div className="space-y-1">
                                        {players.map((p, index) => (
                                            <div key={p.id} className="flex justify-between text-xs font-mono">
                                                <span className="text-gray-400 w-1/2 truncate">{index + 1}. {p.name}</span>
                                                <span className="font-bold text-white">{formatFn(valueFn(p))}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            );

                            return (
                                <div className="space-y-4">
                                    <h3 className="text-xs font-bold uppercase text-gray-500 mb-1">Classements de Pouvoir</h3>
                                    {renderRanking(sortedByNetWorth, "Patrimoine Net Estimé (Balance + Terrains - Dépenses)", calculatePlayerNetWorth, (val) => `${val.toFixed(0)}€`)}
                                    {renderRanking(sortedBySeals, "Sceaux de Fidélité (Total Contrats Or)", (p) => p.stats.sealsValidated, (val) => `${val} Sceaux`)}
                                    {renderRanking(sortedByWinRate, "Taux de Victoire (Cycles)", calculateWinRate, (val) => `${val.toFixed(1)}%`)}
                                </div>
                            );
                        })()}
                    </div>
                )}

                {view === 'SAVE' && (
                    <div className="space-y-6 animate-in fade-in bg-slate-900 p-6 rounded-lg border border-slate-800 pb-20">
                        <h2 className="text-xl font-bold flex items-center gap-2"><SVG icon="Cog" className="text-gray-400"/> Admin & Sauvegarde</h2>
                        <div className="bg-black/50 p-4 rounded border border-gray-800">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-xs uppercase font-bold text-gray-500">Caisse Noire (Admin)</h3>
                                {!potEditMode ? (
                                    <button onClick={() => { setEditedPots({ normal: gameState.pots.normal, hell: gameState.pots.hell, mystery: gameState.pots.mystery, crypto: gameState.pots.crypto }); setPotEditMode(true); }} className="text-xs bg-blue-900 px-3 py-1 rounded hover:bg-blue-800 text-blue-100">Modifier</button>
                                ) : (
                                    <div className="flex gap-2">
                                        <button onClick={() => setPotEditMode(false)} className="text-xs bg-gray-700 px-3 py-1 rounded hover:bg-gray-600">Annuler</button>
                                        <button onClick={handlePotEdit} className="text-xs bg-green-700 px-3 py-1 rounded hover:bg-green-600 font-bold">Sauvegarder</button>
                                    </div>
                                )}
                            </div>
                            {potEditMode && (
                                <div className="grid grid-cols-1 gap-3">
                                    <div className="flex flex-col gap-1"><label className="text-[10px] text-blue-400 uppercase">Pot Mortelle</label><input type="number" step="0.01" value={editedPots.normal} onChange={e => setEditedPots({...editedPots, normal: e.target.value})} className="bg-slate-800 border border-slate-700 rounded p-2 text-white font-mono" /></div>
                                    <div className="flex flex-col gap-1"><label className="text-[10px] text-red-400 uppercase">Le Four</label><input type="number" step="0.01" value={editedPots.hell} onChange={e => setEditedPots({...editedPots, hell: e.target.value})} className="bg-slate-800 border border-slate-700 rounded p-2 text-white font-mono" /></div>
                                    <div className="flex flex-col gap-1"><label className="text-[10px] text-crypto-green uppercase">Pot Crypto</label><input type="number" step="0.01" value={editedPots.crypto} onChange={e => setEditedPots({...editedPots, crypto: e.target.value})} className="bg-slate-800 border border-slate-700 rounded p-2 text-white font-mono" /></div>
                                </div>
                            )}
                        </div>

                        <div className="space-y-4 pt-4 border-t border-gray-800">
                            <h3 className="text-xs uppercase font-bold text-gray-500">Gestion des Dossiers</h3>
                            <button onClick={handleDownloadSave} className="w-full bg-blue-900 border border-blue-700 py-4 rounded font-bold hover:bg-blue-800 text-blue-100 flex items-center justify-center gap-2 shadow-lg active:scale-95 transition-transform"><SVG icon="Briefcase" size={20}/> TÉLÉCHARGER LA SAUVEGARDE</button>
                            <p className="text-[10px] text-gray-500 text-center italic">Le fichier sera enregistré dans vos "Téléchargements".</p>
                            <div className="w-full h-px bg-gray-800 my-4"></div>
                            <div className="relative">
                                <input type="file" id="file-upload" accept=".txt" onChange={handleFileSelect} className="hidden" />
                                <label htmlFor="file-upload" className="w-full bg-red-900 border border-red-700 py-4 rounded font-bold hover:bg-red-800 text-red-100 flex items-center justify-center gap-2 cursor-pointer shadow-lg active:scale-95 transition-transform"><SVG icon="Shuffle" size={20}/> CHARGER UN FICHIER</label>
                            </div>
                        </div>
                        <div className="w-full h-px bg-gray-800 my-4"></div>
                        <button onClick={() => { if(confirm("ATTENTION : Cela va effacer TOUTES les données. Êtes-vous sûr ?")) { localStorage.removeItem('CARTEL_AUTO_SAVE'); window.location.reload(); } }} className="w-full bg-red-950 border border-red-600 py-4 rounded font-bold hover:bg-red-900 text-red-500 flex items-center justify-center gap-2 shadow-lg active:scale-95 transition-transform animate-pulse"><SVG icon="Skull" size={20}/> EFFACER LES DONNÉES (HARD RESET)</button>
                    </div>
                )}
            </main>

            <nav className={`fixed bottom-0 w-full h-16 border-t flex justify-around items-center bg-slate-950 z-50 ${isHellRound ? 'border-red-900' : 'border-slate-800'}`}>
                {[ {id:'GAME', icon:'Ticket', label:"L'Autel"}, {id:'RITUAL', icon:'Grid', label:'Planque'}, {id:'TERRITORIES', icon:'Map', label:'Carte'}, {id:'STATS', icon:'Chart', label:'Compta'}, {id:'HISTORY', icon:'Scroll', label:'Dossier'}, {id:'SAVE', icon:'Cog', label:'Système'} ].map(item => (
                    <button key={item.id} onClick={()=>{playSound('click'); setView(item.id)}} className={`flex flex-col items-center justify-center w-full h-full ${view===item.id ? (isHellRound?'text-red-500 hell-text-aura':'text-blue-500') : 'text-gray-600 hover:text-gray-400'}`}>
                        <SVG icon={item.icon} size={20} className={view===item.id ? 'scale-110 transition-transform' : ''}/>
                        <span className="text-[9px] uppercase mt-1 font-bold">{item.label}</span>
                    </button>
                ))}
            </nav>
        </div>
    );
}

// Lancement de React
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
