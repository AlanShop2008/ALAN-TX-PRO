export default class MenuBuilder {

    constructor() {
        this.text = ''
    }

    header(title = 'ALANSHOP') {
        this.text += `
╔══════════════════════╗
      🛒 ${title}
╚══════════════════════╝

`
        return this
    }

    line(text = '') {
        this.text += `${text}\n`
        return this
    }

    section(title) {
        this.text += `\n╭━━〔 ${title} 〕━━╮\n`
        return this
    }

    command(cmd, desc = '') {
        this.text += `┃ ➤ .${cmd}${desc ? ' » ' + desc : ''}\n`
        return this
    }

    endSection() {
        this.text += `╰━━━━━━━━━━━━━━╯\n`
        return this
    }

    footer() {
        this.text += `

━━━━━━━━━━━━━━━━━━━━━━
⚡ Powered by ALANSHOP
`
        return this
    }

    build() {
        return this.text.trim()
    }
}
