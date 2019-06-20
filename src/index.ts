interface Dictionary {
    [key: string]: string
}

let l10nDictionary: Dictionary = {}

/** setLocalizationDictionary sets the dictionary used for localization. */
export const setLocalizationDictionary = (dictionary: Dictionary) => {
    l10nDictionary = dictionary
}

/** localizeText translates the given text using the currentDictionary. */
export const localizeText = (text: string): string => {
    return l10nDictionary[text] || text
}

/** localize is used by the l10n 'tag' function. */
const localize = (strings: readonly string[], ...values: any[]): string => {
    let input: string

    if (strings.length == 1) {
        return localizeText(strings[0])
    }

    input = strings[0]

    for (let i = 1; i < strings.length; i++) {
        input += `{${i - 1}}${strings[i]}`
    }

    const localizedTemplate = localizeText(input)

    return values.reduce(
        (result, value, i) => result.replace(`{${i}}`, value),
        localizedTemplate,
    )
}

/** l10n is the 'tag' function that translates a tagged template literal. */
export const l10n = (strings: TemplateStringsArray, ...values: any[]): string => {
    return localize(strings.raw, ...values)
}
