import {ThemeProvider} from 'styled-components';


const ThemeProv = ({children}) => {

    const theme = {
        upperHeader: '#272729',
        main: 'rgb(112, 51, 181)',
        lowerHeader: '#e1e1e6',
        accent: 'gray',
        footer: '#282a2b',
        footerTitle: '#a16dc9',
        navigationGlassy: 'rgba(112, 51, 181, .5)'
    }
    return (
        <ThemeProvider theme={theme}>
            {children}
        </ThemeProvider>
    )
}

export default ThemeProv;