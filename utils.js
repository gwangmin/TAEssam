/*
Get Browser language setting.

return: lang code('ko' or 'en').
*/
function get_browser_lang() {
    let locale = navigator.language || navigator.userLanguage;
    switch (locale) {
        case 'ko':
        case 'ko-KR':
            return 'ko';
        case 'en':
        case 'en-US':
            return 'en';
    }
}
