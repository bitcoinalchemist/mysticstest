// ── Planet data — mysticscards.space ──────────────────────────────
// The seven planets of cardology, after Olney H. Richmond's
// The Mystic Test Book (1893), plus the Crown. Richmond's scheme,
// kept deliberately: Mercury rules from passion and speed, Venus from
// love and friendship, Mars from strength and contest, Jupiter from
// wealth, Saturn from death and limit, Uranus from labor, land and
// psychic force, Neptune from the sea, travel and distance.
// Oracle text in the locked Sage voice (see sage-voice skill).
// Shared data: used by the Planets tool on cardsoflife.html and
// available to astrology.html and any future page.

window.PLANET_ORDER = ['Mercury', 'Venus', 'Mars', 'Jupiter', 'Saturn', 'Uranus', 'Neptune'];

window.PLANET_DATA = {

  Mercury: {
    glyph: '☿',
    epithet: 'The Messenger',
    keywords: ['speed', 'news', 'wit', 'desire', 'beginnings'],
    light: ['quick understanding', 'eloquence', 'fresh starts', 'keen senses', 'young love'],
    shadow: ['restlessness', 'scattered aims', 'fickleness', 'worn nerves', 'words outrunning truth'],
    synopsis: 'Quicksilver in the blood. The message that arrives before its reasons, the heart that leaps while the mind is still counting.',
    text: [
      'Mercury is the first fire of knowing. It moves as the young move, all speed and appetite, carrying word from one chamber of your life to another: the letter, the sudden turn, the idea that lands whole at breakfast and is half spent by noon. Under its rule the mind is bright, the tongue is quick, and desire runs ahead of judgment with its shoes untied.',
      'Honour it by moving when it moves. Catch the thought as it passes, write the letter the same hour, try the new road while it is still warm underfoot. What Mercury gives, it gives once and briefly, and it does not wait.'
    ]
  },

  Venus: {
    glyph: '♀',
    epithet: 'The Beloved',
    keywords: ['love', 'friendship', 'union', 'harmony', 'art'],
    light: ['devotion', 'friendship', 'grace', 'generosity', 'comfort made and shared'],
    shadow: ['jealousy', 'indulgence', 'clinging', 'vanity', 'peace bought with silence'],
    synopsis: 'Warmth between people. Every union, every kindness, every letter sealed with more than wax.',
    text: [
      'Venus is the drawing together. Friendship, marriage, the gathering at the table, music and the making of beautiful things: all of it is one force, the same gravity that holds two hearts in a single orbit. Where she rules, life softens and joins. Even your wanting of money she turns toward the ones you love, wealth desired so that it can be given.',
      'Tend what she tends. Answer affection plainly, keep the friendship fed, let comfort be made for sharing. Love in her house is a daily craft, bread and butter and the remembered birthday, and it outlasts every grand declaration left unpracticed.'
    ]
  },

  Mars: {
    glyph: '♂',
    epithet: 'The Sword',
    keywords: ['strength', 'will', 'contest', 'command', 'heat'],
    light: ['courage', 'vigor', 'protection', 'decisiveness', 'strength to bear trouble'],
    shadow: ['quarrels', 'lawsuits', 'haste', 'domineering', 'anger without an object'],
    synopsis: 'Heat and will. The strength that builds, and the same strength that quarrels.',
    text: [
      'Mars is the fire in the forge of you. It commands, it contends, it carries the heavy thing up the hill because it said it would. Under its rule come the captain and the athlete, the advocate in full cry, every test where your force meets another force and is measured. Heat is its whole nature, and heat is neither good nor ill until you see what it is cooking.',
      'Spend it deliberately. Strength wants a worthy object, and finding none it will pick a quarrel just to feel its own weight. Give it labor, give it the defense of the small, give it the long contest toward a thing that matters, and the same heat that burns houses warms them.'
    ]
  },

  Jupiter: {
    glyph: '♃',
    epithet: 'The Giver',
    keywords: ['wealth', 'increase', 'enterprise', 'generosity', 'fortune'],
    light: ['prosperity', 'open-handedness', 'growth', 'confidence', 'broad vision'],
    shadow: ['excess', 'waste', 'overreach', 'promises beyond the purse', 'appetite mistaken for need'],
    synopsis: 'Increase. The open hand of the world, and the question of what your own hand does when it is full.',
    text: [
      'Jupiter is abundance moving toward you. Trade prospers under it, partnerships knit, the harvest comes in heavier than the seed deserved. It is the largeness in things, the planet of yes, and its wealth is older than money: plenty at the table, plenty of welcome, plenty of room in the heart for one more.',
      'Its law is circulation. Fortune that pools turns stagnant; fortune that moves gathers more to itself, as rivers do. Receive largely and give largely and the gate stays open. The richest house under Jupiter is the one most often full of guests.'
    ]
  },

  Saturn: {
    glyph: '♄',
    epithet: 'The Teacher',
    keywords: ['limit', 'trial', 'endurance', 'age', 'wisdom'],
    light: ['endurance', 'patience', 'depth', 'hard won wisdom', 'power over illness'],
    shadow: ['fear', 'melancholy', 'miserliness', 'hardness of heart', 'longing for the unattainable'],
    synopsis: 'The weight that instructs. Loss, limit, illness, age: the hard schoolmasters, and the strength only they leave behind.',
    text: [
      'Saturn is the oldest voice at the table. It brings the bill, the diagnosis, the winter, everything that ends or says no. It is feared like a devil and works like a physician, setting pain exactly where the healing has to happen, and it keeps the company of old learned men who paid full price for what they know.',
      'Meet it with gravity and it gives gravity back. What survives Saturn is real; the rest was decoration, and you will miss it less than you think. Endure, simplify, keep faith with the long discipline, and age arrives as authority. Its students are the wisest in the deck.'
    ]
  },

  Uranus: {
    glyph: '♅',
    epithet: 'The Plough',
    keywords: ['labor', 'land', 'service', 'foresight', 'the unseen'],
    light: ['industry', 'steadfastness', 'foresight', 'psychic depth', 'service for others’ good'],
    shadow: ['drudgery', 'monotony', 'toil without lifting the eyes', 'doubtful visions'],
    synopsis: 'Labor and the unseen. The hand on the plough, the field it works, and the strange foreknowing that comes to those who serve long enough.',
    text: [
      'Uranus rules the work of your hands and the ground it stands on. The trade learned slowly, the field cleared stone by stone, the house raised, the long service given for others’ good. And in the depth of that patience something else wakes: the psychic current, the foresight of those who have repeated a labor until it became prayer. The worker and the seer are one figure here.',
      'Stay at the bench. What looks like drudgery is apprenticeship to forces that reward nothing else; the land remembers who tends it, and the unseen speaks soonest to those too busy working to invent visions. Ten years of honest labor under Uranus buys what no sudden gift can.'
    ]
  },

  Neptune: {
    glyph: '♆',
    epithet: 'The Far Water',
    keywords: ['distance', 'voyage', 'the sea', 'vision', 'the future'],
    light: ['vision', 'breadth', 'discovery', 'glad news from afar', 'the open future'],
    shadow: ['rootlessness', 'vagueness', 'escape dressed as voyage', 'plans forever offshore'],
    synopsis: 'The far water. Distance, voyage, the news from over the horizon, and the part of you already standing on the dock.',
    text: [
      'Neptune is everything beyond your shoreline. The sea and those who work it, the crossing out and the stranger arriving, trade moving between ports you will never see, word from far away that changes the shape of home. It rules the future the way the horizon rules a harbor: always visible, never reached, forever drawing the bow around toward open water.',
      'Let it widen you. Go when the going calls, receive what distance sends, and make your visions pay their passage. Its danger is dissolution, the traveler who belongs nowhere, the dream that never buys its boat. Sail far, and keep one rope made fast to your own dock.'
    ]
  },

  Crown: {
    glyph: '♛',
    epithet: 'The Three Masters',
    keywords: ['mastery', 'witness', 'sovereignty'],
    light: ['mastery', 'serenity', 'finished work'],
    shadow: ['aloofness', 'the crown worn before it is earned'],
    synopsis: 'What presides. Three masters above the seven rows, the work of spirit looking down on the work of days.',
    text: [
      'Above the planetary rows sit three masters, the Jack, the Queen and the King of Spades. They take no week of the year and answer to no planet; their work is finished work, mastery itself, and everything seated beneath them is lived under their witness.',
      'Read them as the standard you are climbing toward. Every labor below has its crowned form, the same act done with the whole self behind it. The Crown does not strive; it presides, and it waits for you.'
    ]
  }

};
