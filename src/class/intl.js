import EN from '../assets/lang/en';
import ZH_HK from '../assets/lang/zh-hk';
import ZH_CN from '../assets/lang/zh-cn';
import ZH_TW from '../assets/lang/zh-tw';
const intl = (module, key, language_id, interpolateParams) => {
    let translatedStr;
    switch (parseInt(language_id)) {
        case 2:
            translatedStr = ZH_HK[module][key];
            break;
        case 3:
            translatedStr = ZH_CN[module][key];
            break;
        case 4:
            translatedStr = ZH_TW[module][key];
            break;
        default:
            translatedStr = EN[module][key];
            break;
    }

    if (interpolateParams) {
        for (const key of Object.keys(interpolateParams)) {
            const regex = new RegExp(`{{${key}}}`, 'g');
            translatedStr = translatedStr.replace(regex, interpolateParams[key]);
        }
    }

    return translatedStr;
};

export default intl