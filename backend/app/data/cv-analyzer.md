# 🤖 Analizador de CVs con IA por Telegram

Bot de Telegram que analiza CVs en PDF automáticamente 
usando inteligencia artificial y da feedback profesional detallado.

## ¿Cómo funciona?

1. El usuario manda su CV en PDF al bot por Telegram
2. n8n descarga y extrae el texto del PDF
3. Groq (Llama 3.3 70B) analiza el CV como un experto en RRHH
4. El bot responde con un análisis detallado que incluye:
   - Puntos fuertes
   - Puntos a mejorar
   - Sugerencias concretas
   - Valoración del 1 al 10
5. Si el usuario manda texto en lugar de PDF, el bot le indica 
   que debe mandar un PDF

## Tecnologías usadas

- n8n (automatización)
- Telegram Bot API
- Groq API (Llama 3.3 70B)
- ngrok (túnel público)

## Cómo usarlo

1. Importa el JSON en tu instancia de n8n
2. Conecta tus credenciales de Telegram y Groq
3. Configura ngrok apuntando al puerto 5678
4. Activa el flujo y manda tu CV en PDF al bot

## Autor

Álvaro Rodrigo Cantalejo  
LinkedIn: linkedin.com/in/alvarorrodrigo



<img width="1354" height="379" alt="Captura de pantalla 2026-04-01 171214" src="https://github.com/user-attachments/assets/ab24b509-3634-41bd-ac13-fe9b4d92c717" />


<img width="329" height="679" alt="Captura de pantalla 2026-04-02 134456" src="https://github.com/user-attachments/assets/3a4c4bc1-55ee-4900-a26d-3fecf555f376" />


