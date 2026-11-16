import { useTranslation } from 'react-i18next';
import Keys from "../config/Keys";
const Main = () => {
    const { t } = useTranslation();
    return (
        <div>
            <h1>{ t(Keys.PAGE.TITLE.HOME) }</h1>
        </div>
    );
};
export default Main;