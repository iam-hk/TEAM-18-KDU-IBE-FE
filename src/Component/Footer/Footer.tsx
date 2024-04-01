import "./Footer.scss";
import i18n from "../../Constants/LanguageTranslator";
import { useTranslation } from "react-i18next";
export function Footer() {
  const { t } = useTranslation();
  return (
    <div className="footer">
      <div className="left-heading">
        <h2>{t("footer.leftHeading")}</h2>
      </div>
      <div className="right-heading">
        <h4>{i18n.t("footer.rightHeading")}</h4>
        <h4>{i18n.t("footer.allRightsReserved")}</h4>
      </div>
    </div>
  );
}
