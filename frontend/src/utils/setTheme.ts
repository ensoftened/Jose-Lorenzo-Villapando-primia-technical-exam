import { neutral, primary } from "../style-helpers/theme"

const setTheme = (color ?: string) => {

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////console.log("THE COLOR", color)
    const theme : any = {}

    switch(color) {
        case "primary":
            theme.main = primary.main
            theme.lighter = primary.lighter
            theme.lightest = primary.lightest
            theme.darker = primary.darker
            break
        case "neutral":
            theme.main = neutral.darker
            theme.lighter = neutral.darker
            theme.darker = neutral.darker
            break

    }



    return theme
}

export default setTheme