// ALANSHOP menu.js (plantilla original) // Completa este archivo con la
lógica de tu proyecto.

import os from ‘os’ import { runtime } from ‘../../lib/runtime.js’

const TAGS = { main: ‘🏠 INFORMACIÓN’, group: ‘👥 GRUPOS’, downloader:
‘📥 DESCARGAS’, freefire: ‘🎮 FREE FIRE’, tools: ‘🛠️ HERRAMIENTAS’,
sticker: ‘🖼️ STICKERS’, anime: ‘🌸 ANIME’, search: ‘🔎 BÚSQUEDA’, owner:
‘👑 OWNER’, ai: ‘🤖 IA’ }

export default async function handler(m, { conn, usedPrefix }) { const
name = await conn.getName(m.sender) const fecha = new
Date().toLocaleDateString(‘es-MX’) const hora = new
Date().toLocaleTimeString(‘es-MX’) const uptime =
runtime(process.uptime()) const ram =
${((os.totalmem()-os.freemem())/1024/1024).toFixed(0)} MB

let texto = ` ╔══════════════════════╗ 🛒 ALANSHOP
╚══════════════════════╝

👤 Usuario : ${name} 📅 Fecha : ${fecha} 🕒 Hora : ${hora} 💾 RAM :
${ram} ⏱️ Uptime : ${uptime}

`

const plugins = Object.values(global.plugins).filter(p => !p.disabled)

for (const [tag, title] of Object.entries(TAGS)) { const cmds =
plugins.filter(p => (p.tags || []).includes(tag)) if (!cmds.length)
continue

    texto += `\n━━━ ${title} ━━━\n`

    for (const p of cmds) {
      const helps = Array.isArray(p.help) ? p.help : (p.help ? [p.help] : [])
      for (const h of helps) {
        texto += `• ${usedPrefix}${h}\n`
      }
    }

}

texto += “© ALANSHOP”

await conn.sendMessage(m.chat, { text: texto }, { quoted: m }) }

handler.help = [‘menu’] handler.tags = [‘main’] handler.command =
[‘menu’,‘help’]
