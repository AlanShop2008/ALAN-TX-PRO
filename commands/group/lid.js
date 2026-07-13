let handler = async (m, { conn }) => {
  if (!m.isGroup) return m.reply('❌ Este comando solo funciona en grupos.')

  const metadata = await conn.groupMetadata(m.chat)
  const participants = metadata.participants

  let txt = `╭━━━〔 📋 LID DEL GRUPO 〕━━━╮\n\n`

  for (let i = 0; i < participants.length; i++) {
    const p = participants[i]

    let lid = p.id
    try {
      const res = await conn.onWhatsApp(p.id)
      if (res?.[0]?.lid) lid = res[0].lid
    } catch {}

    let rango = '👤 Usuario'

    if (metadata.owner === p.id) {
      rango = '👑 Dueño'
    } else if (p.admin === 'superadmin') {
      rango = '👑 Super Admin'
    } else if (p.admin === 'admin') {
      rango = '🛡️ Admin'
    }

    txt += `*${i + 1}.* @${p.id.split('@')[0]}\n`
    txt += `📌 ${lid}\n`
    txt += `🏷️ ${rango}\n\n`
  }

  await conn.reply(
    m.chat,
    txt.trim(),
    m,
    {
      mentions: participants.map(v => v.id)
    }
  )
}

handler.help = ['lid']
handler.tags = ['group']
handler.command = ['lid']

handler.group = true
handler.admin = true

export default handler
