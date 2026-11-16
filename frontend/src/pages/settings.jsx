import { useTranslation } from 'react-i18next';
import Keys from "../config/Keys";
/*
 * Settings page component.
 *
 * Displays settings information.
 */
const Settings = () => {
    const { t } = useTranslation();
    return (
        <div>
            <h1>{ t(Keys.PAGE.TITLE.SETTINGS) }</h1>
        </div>
    );
};
export default Settings;