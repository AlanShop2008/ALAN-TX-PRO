export const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms))

export function runtime(seconds) {

seconds = Number(seconds)

const d = Math.floor(seconds / (3600 * 24))
const h = Math.floor(seconds % (3600 * 24) / 3600)
const m = Math.floor(seconds % 3600 / 60)
const s = Math.floor(seconds % 60)

return [
d && d + 'd',
h && h + 'h',
m && m + 'm',
s + 's'
].filter(Boolean).join(' ')

}

export function formatBytes(bytes){

if(bytes===0) return '0 B'

const k=1024

const sizes=[
'B',
'KB',
'MB',
'GB',
'TB'
]

const i=Math.floor(Math.log(bytes)/Math.log(k))

return parseFloat((bytes/Math.pow(k,i)).toFixed(2))+' '+sizes[i]

}

export function clockString(ms){

let h=Math.floor(ms/3600000)

let m=Math.floor(ms/60000)%60

let s=Math.floor(ms/1000)%60

return [h,m,s].map(v=>v.toString().padStart(2,0)).join(':')

}

export function getRandom(ext=''){

return `${Math.floor(Math.random()*100000)}${ext}`

}

export function isUrl(url){

return /https?:\/\/[^\s]+/gi.test(url)

}
