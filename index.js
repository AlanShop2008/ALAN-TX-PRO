process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '1'

import './config.js'

import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url'
import pino from 'pino'
import NodeCache from 'node-cache'

import {
  makeWASocket,
  DisconnectReason,
  fetchLatestBaileysVersion,
  useMultiFileAuthState,
  makeCacheableSignalKeyStore
} from '@whiskeysockets/baileys'

import { Boom } from '@hapi/boom'

import handler, {
  participantsUpdate,
  groupsUpdate,
  deleteUpdate
} from './handler.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// =======================
// EXPRESS
// =======================

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'public')))

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'))
})

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log(`
╔════════════════════════════╗
        🛒 ALANSHOP
╚════════════════════════════╝

🌐 Panel iniciado
http://localhost:${PORT}
`)
})

// =======================
// BAILEYS
// =======================

const { state, saveCreds } = await useMultiFileAuthState('./sessions')

const { version } = await fetchLatestBaileysVersion()

const msgRetryCounterCache = new NodeCache()

global.conn = makeWASocket({

    version,

    logger: pino({
        level: 'silent'
    }),

    auth: {

        creds: state.creds,

        keys: makeCacheableSignalKeyStore(
            state.keys,
            pino({ level: 'fatal' })
        )

    },

    markOnlineOnConnect: true,

    generateHighQualityLinkPreview: true,

    msgRetryCounterCache

})

conn.ev.on('creds.update', saveCreds)

console.log("✅ WhatsApp iniciado")
