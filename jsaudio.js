// --- MOTEUR AUDIO V3 ---
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
```[span_0](start_span)[span_0](end_span)

Dès que tu as sauvegardé ce fichier, fais-moi signe et je t'enverrai le fichier **`js/constants.js`** qui contient toute la configuration (`CONFIG`, `TERRITORIES`, `FACTIONS`, etc.).
