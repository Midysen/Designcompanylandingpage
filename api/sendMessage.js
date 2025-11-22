export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({error: "Only POST allowed"});
    }

    // 1. Достаем userTimeZone из тела запроса
    const {name, email, message, userTimeZone} = req.body;

    // 2. Используем полученную таймзону или ставим UTC как запасной вариант
    const timeZoneToUse = userTimeZone || "UTC";

    const date = new Date().toLocaleString("ru-RU", {
        timeZone: timeZoneToUse, // <-- Подставляем сюда
        day: "numeric",
        month: "long",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    });

    const text = `
📝 <b>Новая заявка с сайта:</b>

📅 <b>Дата:</b> ${date} (${timeZoneToUse})
👤 <b>Имя:</b> ${name}
📧 <b>Email:</b> ${email}
💬 <b>Сообщение:</b> ${message}
  `;

    const telegramToken = process.env.TELEGRAM_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    try {
        await fetch(`https://api.telegram.org/bot${telegramToken}/sendMessage`, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                chat_id: chatId,
                text: text,
                parse_mode: "HTML",
            }),
        });

        return res.status(200).json({ok: true});
    } catch (error) {
        console.error("Telegram Error:", error);
        return res.status(500).json({error: "Error sending message"});
    }
}