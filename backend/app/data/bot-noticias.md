# 📰 Bot de Noticias Tech con IA por Telegram

Automatización con n8n que envía cada mañana un resumen 
de las últimas noticias de tecnología por Telegram usando IA.

## ¿Cómo funciona?

1. Cada mañana a la hora configurada el flujo se activa automáticamente
2. Obtiene las últimas noticias de Xataka via RSS
3. Groq (Llama 3.3 70B) resume cada noticia en 3-4 líneas
4. El bot manda los resúmenes por Telegram

## Tecnologías usadas

- n8n (automatización)
- RSS Feed (Xataka)
- Groq API (Llama 3.3 70B)
- Telegram Bot API

## Cómo usarlo

1. Importa el JSON en tu instancia de n8n
2. Conecta tus credenciales de Telegram y Groq
3. Configura la hora de envío en el Schedule Trigger
4. Activa el flujo y cada mañana recibirás las noticias

## Autor

Álvaro Rodrigo Cantalejo  
LinkedIn: linkedin.com/in/alvarorrodrigo



<img width="1279" height="289" alt="Captura de pantalla 2026-04-02 133944" src="https://github.com/user-attachments/assets/53e6674a-2efc-4ffd-9bb7-8991041c5dc8" />
<img width="1028" height="962" alt="Captura de pantalla 2026-04-02 134217" src="https://github.com/user-attachments/assets/b0cb9a66-92c2-4605-8d0e-65ea7451a7fd" />

