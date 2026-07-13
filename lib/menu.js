import os from 'os'
import { runtime, formatBytes } from './functions.js'

export async function createMenu(conn, m) {

    const name = await conn.getName(m.sender)

    const fecha = new Date().toLocaleDateString('es-MX')

    const hora = new Date().toLocaleTimeString('es-MX')

    const ram = formatBytes(process.memoryUsage().rss)

    const uptime = runtime(process.uptime())

    const totalPlugins = Object.values(global.plugins)
        .filter(v => !v.disabled)
        .length

    return {

        name,

        fecha,

        hora,

        ram,

        uptime,

        totalPlugins,

        version: global.vs,

        bot: global.botname

    }

}
