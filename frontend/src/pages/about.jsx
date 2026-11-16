import { useTranslation } from "react-i18next";
import Keys from "../config/Keys";
import process from "process";

/*
 * About page component.
 *
 * Displays information about the application.
 */
const About=() => {
    const { t } = useTranslation();
    const appName = import.meta.env.VITE_APP_NAME || "Digital Garden";
    const version = import.meta.env.VITE_VERSION || "1.0.0";
    return (
        <div>
            <h1>{ t(Keys.PAGE.TITLE.ABOUT) }</h1>
            <p>{ t("ABOUT_TEXT") }</p>
            <p>{ appName } { version }</p>
        </div>
    );
}
export default About;