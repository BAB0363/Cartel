// --- CONSTANTES & CONFIGURATION ---
const CONFIG = {
    ticketPrice: 3.00,
    ticketPriceHell: 6.00,
    maxTicketsPerPlayer: 5,
    workReward: 5.00, 
    workCooldown: 3,
    omertaTarget: 10,
    cryptoTax: 0.10, 
    cryptoKeyLength: 50, 
    cryptoChars: "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789", 
    territoryUpkeep: 1.50,
    soulSiphonRate: 0.005, 
    ranks: [
        { id: 1, match: [4, 1], percent: 0.50, label: "50% - PARRAIN" },
        { id: 2, match: [4, 0], percent: 0.20, label: "20% - Lieutenant" },
        { id: 3, match: [3, 1], percent: 0.12, label: "12% - Soldat" },
        { id: 4, match: [3, 0], percent: 0.08, label: "8% - Guetteur" },
        { id: 5, match: [2, 1], percent: 0.06, label: "6% - Charbonneur" },
        { id: 6, match: [2, 0], percent: 0.04, label: "4% - Indic" }
    ],
    distNormal: { normal: 0.70, hell: 0.25, mystery: 0.05 },
    distHell: { normal: 0.25, hell: 0.70, mystery: 0.05 },
    mysteryTarget: 250, // UPDATE v14.3: Seuil Planque 250
    fid: {
        individualTarget: 25,
        globalTarget: 1000 
    },
    sealMinGrids: 20,
    soulDrawFreq: 5,
    soulTax: 0.05,
    cityBonusGain: 1.05,
    cityDiscount: 0.02,
    monopolyBonusGain: 1.50,
    monopolyDiscount: 0.15
};

const TERRITORIES = {
    // --- ALLIER (03) ---
    MOULINS: { 
        id: 'MOULINS', name: 'Moulins (03)', dept: 'ALLIER', target: { n: 3, b: 1 },
        zones: [
            { id: 'MOULINS_GARE', name: 'Gare SNCF', bonus: 'RENTE', desc: '1 Ticket / 2 Tours' },
            { id: 'MOULINS_CENTRE', name: 'Place d\'Allier', bonus: 'OMERTA', desc: 'Preuve Omerta/Tour' },
            { id: 'MOULINS_YZEURE', name: 'Zone Yzeure', bonus: 'DEFENSE', desc: 'Défense +1' }
        ]
    },
    VICHY: { 
        id: 'VICHY', name: 'Vichy (03)', dept: 'ALLIER', target: { n: 3, b: 5 },
        zones: [
            { id: 'VICHY_PARCS', name: 'Les Parcs', bonus: 'CRYPTO', desc: '2x Caractères Crypto' },
            { id: 'VICHY_CAVILAM', name: 'Le Cavilam', bonus: 'GAIN', desc: 'Gains +2%' },
            { id: 'VICHY_GARE', name: 'Gare Routière', bonus: 'RENTE', desc: '1 Ticket / 2 Tours' }
        ]
    },
    MONTLUCON: { 
        id: 'MONTLUCON', name: 'Montluçon (03)', dept: 'ALLIER', target: { n: 3, b: 3 },
        zones: [
            { id: 'MONT_MEDIEVAL', name: 'Cité Médiévale', bonus: 'DEFENSE', desc: 'Défense +1' },
            { id: 'MONT_BF', name: 'Bd de Courtais', bonus: 'OMERTA', desc: 'Preuve Omerta/Tour' },
            { id: 'MONT_DUNLOP', name: 'Usine Dunlop', bonus: 'RENTE', desc: '1 Ticket / 2 Tours' }
        ]
    },
    
    // --- HAUTE-LOIRE (43) ---
    LE_PUY: { 
        id: 'LE_PUY', name: 'Le Puy (43)', dept: 'HAUTE_LOIRE', target: { n: 4, b: 5 },
        zones: [
            { id: 'PUY_CATHEDRALE', name: 'La Cathédrale', bonus: 'CRYPTO', desc: '2x Caractères Crypto' },
            { id: 'PUY_VALS', name: 'Vals-près-le-Puy', bonus: 'GAIN', desc: 'Gains +2%' },
            { id: 'PUY_AIGUILHE', name: 'Rocher St-Michel', bonus: 'DEFENSE', desc: 'Défense +1' }
        ]
    },
    BRIOUDE: { 
        id: 'BRIOUDE', name: 'Brioude (43)', dept: 'HAUTE_LOIRE', target: { n: 4, b: 1 },
        zones: [
            { id: 'BRI_BASILIQUE', name: 'Basilique St-Julien', bonus: 'GAIN', desc: 'Gains +1%' },
            { id: 'BRI_HALLE', name: 'Halle aux Grains', bonus: 'RENTE', desc: '1 Ticket / 2 Tours' },
            { id: 'BRI_VIEILLE', name: 'Vieille Ville', bonus: 'OMERTA', desc: 'Preuve Omerta/Tour' }
        ]
    },
    YSSINGEAUX: { 
        id: 'YSSINGEAUX', name: 'Yssingeaux (43)', dept: 'HAUTE_LOIRE', target: { n: 4, b: 4 },
        zones: [
            { id: 'YSS_PLACE', name: 'Place Grenette', bonus: 'OMERTA', desc: 'Preuve Omerta/Tour' },
            { id: 'YSS_ENSP', name: 'École Pâtisserie', bonus: 'RENTE', desc: '1 Ticket / 2 Tours' },
            { id: 'YSS_CHAPELLE', name: 'Chapelle Pénitents', bonus: 'CRYPTO', desc: '2x Caractères Crypto' },
        ]
    },

    // --- CANTAL (15) ---
    AURILLAC: { 
        id: 'AURILLAC', name: 'Aurillac (15)', dept: 'CANTAL', target: { n: 5, b: 2 },
        zones: [
            { id: 'AUR_JORDANNE', name: 'Bords Jordanne', bonus: 'DEFENSE', desc: 'Défense +1' },
            { id: 'AUR_SQUARE', name: 'Square Vermenouze', bonus: 'GAIN', desc: 'Gains +2%' },
            { id: 'AUR_GARE', name: 'Gare Aurillac', bonus: 'RENTE', desc: '1 Ticket / 2 Tours' }
        ]
    },
    ST_FLOUR: { 
        id: 'ST_FLOUR', name: 'St-Flour (15)', dept: 'CANTAL', target: { n: 5, b: 1 },
        zones: [
            { id: 'STF_HAUTE', name: 'Ville Haute', bonus: 'DEFENSE', desc: 'Défense +2' },
            { id: 'STF_BASSE', name: 'Ville Basse', bonus: 'RENTE', desc: '1 Ticket / 2 Tours' },
            { id: 'STF_CATH', name: 'Cathédrale', bonus: 'OMERTA', desc: 'Preuve Omerta/Tour' }
        ]
    },
    MAURIAC: { 
        id: 'MAURIAC', name: 'Mauriac (15)', dept: 'CANTAL', target: { n: 5, b: 3 },
        zones: [
            { id: 'MAU_BASILIQUE', name: 'Basilique N-D', bonus: 'CRYPTO', desc: '2x Caractères Crypto' },
            { id: 'MAU_LYCEE', name: 'Lycée Marmontel', bonus: 'GAIN', desc: 'Gains +1%' },
            { id: 'MAU_PLACE', name: 'Place G.Péri', bonus: 'RENTE', desc: '1 Ticket / 2 Tours' }
        ]
    },

    // --- PUY-DE-DOME (63) ---
    CLERMONT: { 
        id: 'CLERMONT', name: 'Clermont (63)', dept: 'PUY_DE_DOME', target: { n: 6, b: 2 },
        zones: [
            { id: 'CF_JAUDE', name: 'Place de Jaude', bonus: 'GAIN', desc: 'Gains +5%' },
            { id: 'CF_GARE', name: 'La Gare', bonus: 'RENTE', desc: '1 Ticket / 2 Tours' },
            { id: 'CF_FACS', name: 'Les Cézeaux', bonus: 'OMERTA', desc: 'Preuve Omerta/Tour' },
            { id: 'CF_STADE', name: 'Stade Michelin', bonus: 'DEFENSE', desc: 'Défense +2' }
        ]
    },
    THIERS: { 
        id: 'THIERS', name: 'Thiers (63)', dept: 'PUY_DE_DOME', target: { n: 6, b: 6 },
        zones: [
            { id: 'THIERS_COUT', name: 'Vallée Couteliers', bonus: 'RENTE', desc: '1 Ticket / 2 Tours' },
            { id: 'THIERS_BAS', name: 'Ville Basse', bonus: 'GAIN', desc: 'Gains +2%' },
            { id: 'THIERS_PONT', name: 'Pont de Dore', bonus: 'OMERTA', desc: 'Preuve Omerta/Tour' }
        ]
    },
    ISSOIRE: { 
        id: 'ISSOIRE', name: 'Issoire (63)', dept: 'PUY_DE_DOME', target: { n: 6, b: 3 },
        zones: [
            { id: 'ISS_ALU', name: 'Usine Alu', bonus: 'RENTE', desc: '1 Ticket / 2 Tours' },
            { id: 'ISS_AUTO', name: 'Circuit Issoire', bonus: 'GAIN', desc: 'Gains +3%' },
            { id: 'ISS_CENTRE', name: 'Abbatiale', bonus: 'CRYPTO', desc: '2x Caractères Crypto' }
        ]
    }
};

// --- CONFIGURATION DES FACTIONS ---
const FACTIONS = {
    SYNDICAT: { 
        id: 'SYNDICAT', name: 'Le Syndicat', icon: 'Briefcase', desc: 'Riches mais fragiles.', bonus: 'Start 150€', malus: 'Défense -1'
    },
    BRAVAS: { 
        id: 'BRAVAS', name: 'Les Bravas', icon: 'Skull', desc: 'Tueurs nés.', bonus: 'Attaque +1', malus: 'Charbon -2€'
    },
    CHIMISTES: { 
        id: 'CHIMISTES', name: 'La Main Verte', icon: 'Biohazard', desc: 'Rois du produit.', bonus: 'Charbon +5€', malus: 'Ticket +1€'
    },
    ORDRE: { 
        id: 'ORDRE', name: 'L\'Ordre Noir', icon: 'Eye', desc: 'Mystiques.', bonus: 'Ticket -1€', malus: 'Start 50€'
    }
};

const GRAND_RITUAL_CONFIG = {
    price: 10.00,
    duration: 4,
    percentages: [0.15, 0.30, 0.45, 0.60] 
};

const PLAGUE = {
    STATUS: {
        HEALTHY: 'CLEAN',      
        INCUBATING: 'USER',    
        INFECTED: 'JUNKIE',    
        IMMUNE: 'REHAB'        
    },
    BONUS_ORIGIN: 3, 
    BONUS_CURE: 6,   
    IMMUNITY_DURATION: 10
};

const EVENT_TYPES = {
    GRAND_RITUAL: 'GRAND_CONSEIL', 
    BLOOD_MOON: 'VENDETTA',        
    LOCKDOWN: 'DESCENTE_POLICE',   
    PURE_CHAOS: 'GUERRE_GANGS',    
    MARK_OF_EVIL: 'CONTREBANDE',   
    QUARANTINE: 'GARDE_A_VUE',     
    ABSOLUTE_LOYALTY: 'OMERTA',    
    WIDOWS_GIFT: 'SOLIDARITE',     
    DIGITAL_HERESY: 'BLANCHIMENT', 
    NEGATIVE_IMPULSE: 'TRAHISON',  
    SOUL_DEBT: 'DETTE_JEU',        
    URBAN_REVOLT: 'REVOLTE_URBAINE',
    GO_FAST_INTERCEPT: 'GO_FAST_INTERCEPTE', 
    NONE: 'NONE'
};

const EVENT_WEIGHTS = [
    { type: 'VENDETTA', weight: 30, duration: 2, label: "Commun" },        
    { type: 'DESCENTE_POLICE', weight: 25, duration: 1, label: "Commun" }, 
    { type: 'SOLIDARITE', weight: 20, duration: 1, label: "Peu Commun" },  
    { type: 'DETTE_JEU', weight: 20, duration: 1, label: "Peu Commun" },   
    { type: 'GARDE_A_VUE', weight: 15, duration: 2, label: "Rare" },       
    { type: 'OMERTA', weight: 15, duration: 1, label: "Rare" },            
    { type: 'CONTREBANDE', weight: 10, duration: 1, label: "Très Rare" },  
    { type: 'GO_FAST_INTERCEPTE', weight: 8, duration: 1, label: "Rare" }, 
    { type: 'TRAHISON', weight: 8, duration: 1, label: "Très Rare" },      
    { type: 'REVOLTE_URBAINE', weight: 5, duration: 1, label: "Très Rare" }, 
    { type: 'BLANCHIMENT', weight: 5, duration: 1, label: "Légendaire" },  
    { type: 'GUERRE_GANGS', weight: 2, duration: 1, label: "Mythique" }    
];

// --- HELPER NARRATIF (ARGOT / STREET) ---
const getHistoryFlavorText = (isHell, isMystery, bonus, eventType) => {
    if (eventType === EVENT_TYPES.GRAND_RITUAL) return "Le Grand Conseil réclame sa part.";
    if (eventType === EVENT_TYPES.URBAN_REVOLT) return "Émeutes en ville. Les territoires brûlent."; 
    if (eventType === EVENT_TYPES.GO_FAST_INTERCEPT) return "Gros barrage sur l'A75. Le convoi est stoppé."; 
    if (isMystery) return "La Planque a été découverte. C'est l'heure de la récolte.";
    if (isHell) {
        const phrases = ["Gros coup de chaud ce soir.", "Le Four tourne à plein régime.", "C'est brûlant dans les quartiers."];
        return phrases[Math.floor(Math.random() * phrases.length)];
    }
    if (bonus === PLAGUE.BONUS_CURE) return "La marchandise est coupée, c'est calme.";
    if (bonus === PLAGUE.BONUS_ORIGIN) return "Une nouvelle drogue inonde les rues...";
    const phrases = ["Rien à signaler au quartier.", "Les affaires reprennent.", "L'argent n'a pas d'odeur."];
    return phrases[Math.floor(Math.random() * phrases.length)];
};

const getHistoryTitle = (isHell, isMystery, eventType) => {
    if (eventType === EVENT_TYPES.GRAND_RITUAL) return "LE GRAND CONSEIL";
    if (eventType === EVENT_TYPES.URBAN_REVOLT) return "RÉVOLTE URBAINE";
    if (eventType === EVENT_TYPES.GO_FAST_INTERCEPT) return "GO-FAST INTERCEPTÉ";
    if (isMystery) return "RAZZIA SUR LA PLANQUE";
    if (eventType === EVENT_TYPES.GUERRE_GANGS || eventType === EVENT_TYPES.BLANCHIMENT) return "GUERRE TOTALE";
    if (eventType === EVENT_TYPES.VENDETTA) return "VENDETTA SANGLANTE";
    if (eventType === EVENT_TYPES.TRAHISON) return "LA TRAHISON";
    if (isHell) return "LE FOUR"; 
    return "BUSINESS HABITUEL";
};

const getEventDescription = (eventType) => {
     switch(eventType) {
        case 'VENDETTA': return "Règlements de compte. Le prix du matos flambe, la part 'Pure' augmente.";
        case 'DESCENTE_POLICE': return "La BAC est partout. Certains secteurs sont bouclés.";
        case 'GUERRE_GANGS': return "Anarchie (Pool 10). Le Vainqueur VOLE le territoire du plus riche.";
        case 'CONTREBANDE': return "Trafic intense. Seuls les Junkies ont accès au marché.";
        case 'GARDE_A_VUE': return "Tout le monde au trou. Le prix triple pour les 'Clean'.";
        case 'OMERTA': return "La loi du silence paie. Bonus pour les anciens (Achats > 13).";
        case 'SOLIDARITE': return "Solidarité du quartier. Gratuit pour les fauchés (<5€).";
        case 'BLANCHIMENT': return "Blanchiment d'argent. Seuls les chiffres IMPAIRS comptent.";
        case 'TRAHISON': return "Retournement de veste. La Rue paie Le Four, et vice-versa.";
        case 'DETTE_JEU': return "L'huissier est là. Les habitués paient 1€, les autres raquent.";
        case 'GRAND_CONSEIL': return "Les Parrains se réunissent. Le Méga Coffre est ouvert.";
        case 'REVOLTE_URBAINE': return "Chaos social. Risque de perdre des territoires (1/6).";
        case 'GO_FAST_INTERCEPT': return "Douane volante. Le 'Boss' perd ses bonus ce tour-ci.";
        default: return "C'est calme... trop calme.";
    }
};
```[span_0](start_span)[span_0](end_span)

Dès que c'est enregistré, fais-moi signe pour passer au fichier **`jslogic.js`** (qui contient toute la logique pure de calcul et de compression de sauvegarde).
