import { GoogleGenAI } from '@google/genai';

const SYSTEM_PROMPT = `Sei l'assistente virtuale di Domu Laura, una casa vacanze a Torpè, in Sardegna Orientale.
Rispondi in modo cordiale, conciso e utile. Fornisci informazioni su:
- L'appartamento: 80m², 2 camere da letto, 1 bagno, max 4 ospiti, WiFi, aria condizionata, cucina attrezzata, terrazzo, parcheggio privato
- Posizione: Via Lombardia 7a, 08020 Torpè (NU), Sardegna
- Spiagge vicine: La Caletta (3km, la più vicina), Cala Liberotto (8km), La Cinta (10km), Berchida (12km), Cala Brandinchi (14km)
- Escursioni: Cala Goloritze (50km), Gole di Gorropu (60km), Nuraghe Loelle (15km)
- Stagione: Febbraio - Novembre
- Per prenotazioni: contattare tramite il modulo contatti o WhatsApp
Rispondi nella stessa lingua della domanda. Sii breve e diretto.`;

let genAI: GoogleGenAI | null = null;

const getClient = (): GoogleGenAI => {
  if (!genAI) {
    const apiKey = process.env.GEMINI_API_KEY as string;
    if (!apiKey) throw new Error('GEMINI_API_KEY non configurata');
    genAI = new GoogleGenAI({ apiKey });
  }
  return genAI;
};

export const sendMessageToConcierge = async (message: string): Promise<string> => {
  const client = getClient();
  const response = await client.models.generateContent({
    model: 'gemini-2.0-flash',
    contents: message,
    config: {
      systemInstruction: SYSTEM_PROMPT,
    },
  });
  return response.text ?? '';
};
