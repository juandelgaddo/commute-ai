const contexto = `Commute Eyewear es un proyecto local en desarrollo que ofrece gafas de sol con protección UV y opción de receta. Todos los modelos son sin marca, con estilo conservador. Precios desde $19.99 adultos y $9.99 niños. Todos permiten lentes RX (Single Vision, Bifocal, Progressive).

LENTES:
- Clear: uso diario, resistentes.
- Blue Light Blocker: filtran luz azul, reducen fatiga visual.
- Polarized Sunglass: eliminan reflejos (conducción, playa).

MATERIALES:
- CR-39: económico, buena claridad óptica.
- Polycarbonate: más delgado, resistente a impactos.

ANTIRREFLEJO:
- Standard AR: básico.
- Premium AR: multicapa, más claridad, repelente.

TIPOS PROGRESIVOS:
- Standard: 30% más campo visual.
- Premium: 50% más, mayor nitidez.

CONDICIONES ESPECIALES:
- Blue Light solo permite “Standard AR w/BLB +$35”.
- Todos los lentes solares son Polarized +$65 (obligatorio).
- Si eliges Polarized: debes escoger color (Black o Brown +$25).
- Bifocal: solo usa Polycarbonate +$25.
- Progressive: CR-39 o Polycarbonate +$40.
- Prism recetado: +$25 si seleccionas "Yes".

GARANTÍA:
- 10 días por defectos de fábrica.
- No se cubren rayaduras por mal uso ni devoluciones de lentes usados.

PEDIDOS:
- Enviar receta por email a info@commuteeyewear.com.
- Entrega estimada: 7–12 días laborables.
- Se devuelven lentes originales para seguir usando como gafas de sol.`;

const apiKey = 'sk-reemplaza-con-tu-clave-segura'; // ⚠️ Reemplaza por tu clave privada

async function askAI() {
  const question = document.getElementById("question").value.trim();
  const output = document.getElementById("response");

  if (!question) {
    output.innerText = "Por favor escribe una pregunta.";
    return;
  }

  output.innerText = "Pensando...";

  try {
    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: `Usa solo esta información para responder preguntas sobre gafas y opciones ópticas:\n\n${contexto}`
          },
          {
            role: "user",
            content: question
          }
        ],
        max_tokens: 300,
        temperature: 0.3
      })
    });

    if (!res.ok) {
      const error = await res.text();
      output.innerText = "Error: " + error;
      return;
    }

    const data = await res.json();
    output.innerText = data.choices[0].message.content.trim();
  } catch (err) {
    output.innerText = "Error al conectar con la IA: " + err.message;
  }
}
