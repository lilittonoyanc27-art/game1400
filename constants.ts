export interface RaceQuestion {
  id: string;
  sentence: string;
  options: string[];
  correctIndex: number;
  translation: string;
  explanation: string;
}

export const VENIR_IR_QUESTIONS: RaceQuestion[] = [
  {
    id: '1',
    sentence: "Mañana _______ a tu casa a las 5.",
    options: ["voy", "vengo", "vas"],
    correctIndex: 0,
    translation: "Վաղը ժամը 5-ին կգամ քո տուն:",
    explanation: "'Ir' (voy) օգտագործվում է, երբ շարժվում ենք դեպի մի վայր, որտեղ խոսակիցը չէ (կամ դեպի այնտեղ, որտեղ մենք հիմա չենք):"
  },
  {
    id: '2',
    sentence: "¿Quieres _______ a mi fiesta el sábado?",
    options: ["ir", "venir", "vienes"],
    correctIndex: 1,
    translation: "Ուզու՞մ ես գալ իմ խնջույքին շաբաթ օրը:",
    explanation: "'Venir' օգտագործվում է, երբ շարժումը դեպի խոսողի գտնվելու վայրն է:"
  },
  {
    id: '3',
    sentence: "Ahora mismo _______ a la biblioteca a estudiar.",
    options: ["vengo", "voy", "va"],
    correctIndex: 1,
    translation: "Հենց հիմա գնում եմ գրադարան սովորելու:",
    explanation: "'Ir' (voy) օգտագործվում է խոսողից դեպի այլ վայր շարժվելիս:"
  },
  {
    id: '4',
    sentence: "¿_______ con nosotros al cine?",
    options: ["Vas", "Vienes", "Viene"],
    correctIndex: 1,
    translation: "Մեզ հետ կգա՞ս կինո:",
    explanation: "'Venir' օգտագործվում է խոսողի խմբին միանալիս:"
  },
  {
    id: '5',
    sentence: "Ella _______ a visitarnos hoy.",
    options: ["va", "viene", "vienes"],
    correctIndex: 1,
    translation: "Նա այսօր գալիս է մեզ հյուր:",
    explanation: "'Venir' (viene) - գալ խոսողի մոտ:"
  },
  {
    id: '6',
    sentence: "Nosotros _______ al estadio cada domingo.",
    options: ["venimos", "vamos", "van"],
    correctIndex: 1,
    translation: "Մենք ամեն կիրակի գնում ենք մարզադաշտ:",
    explanation: "'Ir' - գնալ դեպի սովորական վայր:"
  },
  {
    id: '7',
    sentence: "¡Espera! Ya _______.",
    options: ["voy", "vengo", "vienes"],
    correctIndex: 0,
    translation: "Սպասիր: Արդեն գալիս եմ (քեզ մոտ):",
    explanation: "Իսպաներենում, երբ մարդը գնում է խոսակցի մոտ, ասում է 'voy' (գնում եմ քեզ մոտ):"
  },
  {
    id: '8',
    sentence: "¿A qué hora _______ Pedro a la oficina?",
    options: ["va", "vienes", "viene"],
    correctIndex: 2,
    translation: "Ժամը քանիսի՞ն է Պեդրոն գալիս գրասենյակ:",
    explanation: "Եթե խոսողը գրասենյակում է, օգտագործում է 'viene':"
  },
  {
    id: '9',
    sentence: "Ellos _______ a la playa este verano.",
    options: ["vienen", "van", "venimos"],
    correctIndex: 1,
    translation: "Նրանք այս ամառ գնում են լողափ:",
    explanation: "'Ir' - շարժում դեպի նպատակակետ:"
  },
  {
    id: '10',
    sentence: "Si quieres, puedes _______ a mi casa a cenar.",
    options: ["ir", "venir", "vengo"],
    correctIndex: 1,
    translation: "Եթե ուզում ես, կարող ես գալ իմ տուն ընթրելու:",
    explanation: "'Venir' - շարժում դեպի խոսողի տուն:"
  },
  {
    id: '11',
    sentence: "Yo _______ de la tienda ahora.",
    options: ["vengo", "voy", "vas"],
    correctIndex: 0,
    translation: "Ես հիմա գալիս եմ խանութից:",
    explanation: "'Venir' - վերադարձ կամ շարժում դեպի այստեղ:"
  },
  {
    id: '12',
    sentence: "¿Por qué no _______ a la fiesta con nosotros?",
    options: ["vas", "vienes", "vengo"],
    correctIndex: 1,
    translation: "Ինչու՞ չես գալիս խնջույքին մեզ հետ:",
    explanation: "'Venir' (vienes) - միանալ խոսողի խմբին:"
  }
];

export const PLAYER_CONFIG = {
  GOR: {
    name: 'Գոռ',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400&auto=format&fit=crop',
    color: '#3b82f6' // Blue
  },
  GAYANE: {
    name: 'Գայանե',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=400&auto=format&fit=crop',
    color: '#ec4899' // Pink
  }
};

export const RACE_ASSETS = {
  track: 'https://images.unsplash.com/photo-1532444458054-015fddf2b2cd?q=80&w=1200&auto=format&fit=crop',
  runner: 'https://cdn-icons-png.flaticon.com/512/3063/3063822.png',
  finish: 'https://cdn-icons-png.flaticon.com/512/3551/3551065.png'
};
