export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método no permitido" });
  }

  const { question } = req.body;

  if (!question) {
    return res.status(400).json({ error: "Pregunta no proporcionada" });
  }

  const contexto = `
🕶️ Commute Eyewear – Información General

Commute Eyewear es un proyecto local que ofrece gafas de sol sin marca con protección UV y también lentes recetados (Single Vision, Bifocal, Progressive). Puedes probarte los modelos antes de ordenar y añadir tu receta óptica a cualquiera de nuestras monturas. Todas las gafas incluyen su bolsa y paño de limpieza.

💰 Precios:
- Gafas de sol: $19.99 USD
- Modelos KIDS: $9.99 USD
- Lente Visión Sencilla: desde $40.00 USD
- Lente Bifocal: desde $55.00 USD
- Lente Progresivo: desde $70.00 USD
*Los precios de lentes no incluyen montura. Los precios pueden aumentar según las opciones seleccionadas.

👓 Lentes disponibles:
- Clear: uso diario, resistentes
- Blue Light Blocker: filtran luz azul, reducen fatiga visual (+$30)
- Polarized Sunglass: eliminan reflejos (+$65), obligatorio en gafas de sol

📐 Materiales:
- CR-39: básico, buena claridad
- Polycarbonate: más delgado, resistente a impactos (+$25 o +$40 según receta)

🌈 Antirreflejo (AR):
- No AR
- Standard AR (+$25/$35)
- Premium AR (+$30)
- Con Blue Light Blocker, solo puedes usar “Standard AR w/BLB +$35.00”

🔄 Opciones Adicionales:
- Prismas recetados: +$25
- Bifocal diámetro 28mm o 35mm (+$20)
- Progresivos:
  - Standard Progressive: +30% campo visual
  - Premium Digital Progressive: +50% campo visual (+$59)

🚚 Entrega:
- Tiempo de entrega: 7 a 12 días laborables
- Se devuelven los lentes solares originales si ordenas receta
- Si solo compras la gafa sin receta, puede entregarse a la brevedad

✅ GARANTÍA Y POLÍTICAS

🔒 Monturas – Commute Eyewear
- Garantía por defectos: 7 días desde la compra. Cubre tornillos sueltos, bisagras flojas y lentes originales con rayaduras visibles al recibirlos.
- No se aceptan devoluciones por incomodidad. Puedes probarte los modelos antes.
- Garantía limitada por proveedor: 2 días desde la compra para cambios de color o devoluciones por regalo. Solo se aceptan monturas sin daños, con todas sus piezas originales.
- No cubre: rayones por uso, caídas, calor extremo, modificación con lentes recetados ni mal uso.

🔎 Lentes Recetados – Commute Eyewear
- La garantía expira una vez el cliente acepta la montura con lentes Rx.
- Antes de entregar, se verifica que no tengan defectos visibles.
- Política de devolución: 7 días desde entrega.
- Si hubo error del médico: ofrecemos 20% de descuento en un nuevo pedido (no reembolso).
- Si el error es de fábrica: corregimos sin costo, incluyendo envío.
- El cliente debe tener su receta actualizada antes del pedido.
- No se aceptan devoluciones fuera de los 7 días.
- Solo aceptamos cambios si los lentes fueron fabricados por Commute Eyewear.

📦 Condiciones para devoluciones:
- Presentar recibo.
- Producto sin usar, en su empaque original.
- Entregar directamente a Commute Eyewear.
- No aceptamos productos usados, dañados o incompletos.
- No hacemos reembolsos.

📣 Información adicional sobre el proyecto

- ENTREGA EN UNA SEMANA APROXIMADAMENTE. SI ES SOLO LA GAFA TE LA ENTREGO A LA BREVEDAD POSIBLE.
- ESTA PÁGINA ES INFORMATIVA. COMMUTE EYEWEAR ESTÁ PARCIALMENTE ONLINE.
- TENEMOS GRANDES PLANES Y NECESITAMOS TU APOYO.
- HAY OPORTUNIDADES DE INVERSIÓN. SOLO NOS TIENE QUE CONTACTAR.
- HAY OPCIONES DE VENTAS AL POR MAYOR QUE COMIENZAN DESDE $45.00 APROXIMADAMENTE E INCLUYEN 4 GAFAS, 4 BOLSAS Y 4 PAÑOS.
- NO SOMOS UNA TIENDA ONLINE. PARA VER PRECIOS Y COTIZACIONES EL PROCESO ES EN PERSONA POR EL MOMENTO.
- ES UN PROYECTO EN DESARROLLO.

🧒 Catálogo de Modelos Infantiles (CE-K001 a CE-K004)

CE-K001:
- Montura: Redonda clásica
- Material: Metal liviano
- Lentes: Protección UV400
- Colores: Plateado, dorado, negro
- Estilo: Unisex, Kids

CE-K002:
- Montura: Clubmaster
- Material: Acetate y metal
- Lentes: Protección UV400
- Colores: Negro y carey
- Estilo: Unisex, Kids

CE-K003:
- Montura: Redonda clásica
- Material: Acetate
- Lentes: Protección UV400
- Colores: Carey y negro
- Estilo: Unisex, Kids

CE-K004:
- Montura: Aviador
- Material: Metal liviano
- Lentes: Protección UV400
- Colores: Negro, dorado, plateado
- Estilo: Unisex, Kids

🧑 Catálogo de Modelos para Adultos (CE-M001 a CE-M010)

CE-M001:
- Montura: Hexagonal / Metal liviano
- Lentes: Protección UV400
- Colores: Dorado, negro, plateado

CE-M002:
- Montura: Aviador clásico (oversized y medium) / Metal liviano
- Lentes: Protección UV400 / Colores: Dorado, negro, plateado

CE-M003:
- Montura: Fashion / Acetate
- Colores: Champán, carey, negro sólido

CE-M004:
- Montura: Wayfarer / Acetate
- Colores: Carey, negro, gris translúcido

CE-M005:
- Montura: Cuadrada / Soft Touch
- Colores: Negro mate, carey

CE-M006:
- Montura: Hexagonal / Metal liviano y acetate
- Colores: Dorado, plateado, carey, verde militar

CE-M007:
- Montura: Clásico / Acetate
- Colores: Carey, negro, gris transparente, ámbar

CE-M008:
- Montura: Cuadrada clásica / Acetate
- Lentes: Protección UV400 + Blue Light
- Colores: Negro, carey, gris, clear

CE-M009:
- Montura: Vintage / Acetate
- Colores: Negro mate, carey

CE-M010:
- Montura: Clubmaster / Soft Touch + Metal
- Colores: Negro, carey
`;
  /* ------------------------------
   CONTEXTO: DESCRIPCIÓN DE COMMUTE EYEWEAR
------------------------------ */
contextData.push({
  section: "Sobre Commute Eyewear",
  content: `
Commute Eyewear es un negocio en desarrollo dedicado a la reventa de gafas de sol, inspirado en la vida, rutina y pasatiempos urbanos. 
Su sede está en Puerto Rico y los dueños permanecen anónimos por el momento.

La marca no busca resolver un problema específico, sino ser reconocida por:
- Sus gafas sin logo de calidad media-alta.
- Los accesorios que acompañan cada gafa vendida.
- La opción de poner lentes recetados a las monturas, con excelente calidad y tiempos de entrega competitivos.
- Un empaquetado cuidado que incluye bolsa, paño y muestra de toallita limpiadora.

El objetivo es ofrecer valor añadido para que el cliente final no sienta que debe ser parte de la moda rápida ni verse atado a una montura costosa de óptica tradicional.

Commute Eyewear incluirá modelos conservadores que no pasan de moda, aumentando la calidad y branding de cada accesorio o gafa. 
En sus primeros pasos, apuesta por el servicio, tiempos de entrega y logística, para que cuando llegue el momento de expandir, ya tenga un modelo sólido y probado.
`
});

/* ------------------------------
   CONTEXTO: OFERTAS DE COMMUTE EYEWEAR
------------------------------ */
contextData.push({
  section: "Ofertas",
  content: `
Commute Eyewear ofrece:
- 4-pack: Paquete de 4 gafas con sus accesorios (4 bolsas y 4 paños), empacado en caja de 8x8x2 pulgadas. Precio: $45.00. 
  Puede usarse para uso personal, reventa, regalo o para cubrir el costo de una receta mediante la reventa.
- Oferta introductoria: Notificada al momento de poner la orden, antes del pago.
`
});

/* ------------------------------
   CONTEXTO: CÓMO PONER UNA ORDEN
------------------------------ */
contextData.push({
  section: "Cómo poner una orden",
  content: `
1. Visita commuteeyewear.com y entra a la sección de productos.
2. Revisa el catálogo y elige el pack deseado, tomando nota de los nombres de los modelos.
3. Si te interesa alguno, utiliza la sección de Contacto. Si no puedes, escribe a info@commuteeyewear.com.
4. Responderemos en horario de oficina (Lunes a Viernes).
5. Para añadir lentes recetados a cualquier montura Commute Eyewear o tuya, utiliza la sección de Cotización en commuteeyewear.com.
6. Completa el formulario sin dejar campos vacíos; este mostrará el total sin incluir el precio de la montura.
7. Si confirmas interés, oprime “Me interesa” y envía tu cotización.
8. Recibirás una respuesta automática; luego, en horario de oficina, te daremos detalles y próximos pasos para completar tu orden.
9. Tiempos de entrega: competitivos.
`
});

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
