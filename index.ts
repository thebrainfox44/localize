export default class Localize() {
constructor(lang: string = 'en', auto: bool = false) {
 this.lang = lang
this.auto = auto
}
}

export class CreateLocalize() {
constructor(str: string, lang: string, value: string) {
this.str = str
this.lang = lang
this.value = value
}
add(lang, value) {

}
private register(local: array, default: string)
if (!local[default]) throw new Error("default language has no value")
const locals = local.map((e,i) => {
return `  ${i} = ${e},`
})
const content = "default export enum(\n" + locals.join("\n")
}