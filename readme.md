# Localize: ts
localize is a nodejs module used to translate strings easily using a mix of defined strings and live translation.
this module exists in 2 versions (js and ts) this is the ts version, you can find the js version [here](github.com).

list of supported languages [here](github.com)

if you need another language, fell free to email me ```contact@thebrainfox.com```

to translate your strings in languages not hard coded, you need to provide a vali google translate key. [here]() you can get one
# Setup
to use the module, import it (documentation not completed)
then import it in each file you need it this way:
```ts
import Localize from 'localize'
const local = new Localize.local('en')
// you can change 'en' to any supported language. you can see the list [here](github.com)

const local = new Localize.local('en', google_translate_api_key)
// you can change 'en' to any supported language. you can see the list [here](github.com).
// the key provided will be used to perform requests to translate in non defined languages.
// by default, when the key is provided and a string already registered is requested in a language not provided, it will return the string in the first language provided translated with google translate.

console.log(local.localize("str-1"))
// output the string labelled "1" from the folder "str" in the language set before ('en')

console.log(local.localize("book-line-12", 'fr'))
// output the string labelled "12" from the subfolder "line" in the folder "book" in the language specified ('fr')

local.set('es')
// set the language to spanish ('es')

local.translate("hello world", 'de')
// translate the literal string "hello world" to deutch ('de') using google translate api
```
