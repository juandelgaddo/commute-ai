export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método no permitido" });
  }

  const { question } = req.body;

  if (!question) {
    return res.status(400).json({ error: "Pregunta no proporcionada" });
  }

  const contexto = `
Commute Eyewear es un proyecto local que ofrece gafas de sol con protección UV y lentes recetados (Single Vision, Bifocal, Progressive).

Modelos:
- Adultos: $19.99
- Niños: $9.99
- Todos permiten receta. Incluyen bolsa y paño.

Lentes:
- Clear: uso diario, resistentes.
- Blue Light Blocker: filtran luz azul, reducen fatiga visual.
- Polarized Sunglass: eliminan reflejos. $65.00 adicionales (obligatorio en solares).

Materiales:
- CR-39: básico, buena claridad.
- Polycarbonate: más delgado, resistente a impactos (+$25 o +$40 según receta).

Antirreflejo:
- Standard AR
- Premium AR (multicapa, más nítido, repele manchas, UVA/UVB)
- Si eliges Blue Light Blocker, solo puedes usar “Standard AR w/BLB +$35”.

Lentes Progresivos:
- Standard Progressive: +30% campo visual.
- Premium Digital Progressive: +50% campo visual, mayor nitidez. +$59

Otros:
- Prismas: $25 adicionales.
- Bifocal: diámetro puede ser Standard 28mm o Large 35mm +$20.

Entrega:
- 7 a 12 días laborables.
- Se devuelven los lentes solares originales si ordenas receta.

Garantía:
- 10 días por defectos. No se cubren rayaduras ni errores externos a laboratorio.
`;

  try {
    const completion = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          { role: "system", content: `Responde como asistente óptico de Commute Eyewear. Usa solo esta información:\n\n${contexto}` },
          { role: "user", content: question }
        ],
        max_tokens: 300,
        temperature: 0.3
      })
    });

    const data = await completion.json();

    if (data.choices && data.choices.length > 0) {
      res.status(200).json({ answer: data.choices[0].message.content.trim() });
    } else {
      res.status(500).json({ error: "Sin respuesta de la IA" });
    }

  } catch (error) {
    res.status(500).json({ error: "Error interno: " + error.message });
  }
}