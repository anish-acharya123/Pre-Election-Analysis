import React from "react";
import { useTranslation } from "react-i18next";

function LanguageSwitcher() {
  const { i18n } = useTranslation();

  const changeLanguage = (event) => {
    const selectedLanguage = event.target.value;
    i18n.changeLanguage(selectedLanguage);
    localStorage.setItem("language", selectedLanguage); // Persist language choice
  };

  return (
    <div>
      <select
        name="lang"
        id="language"
        onChange={changeLanguage}
        defaultValue={i18n.language}
        className="border-none outline-none"
      >
        <option value="en">Eng</option>
        <option value="ne">Nep</option>
      </select>
    </div>
  );
}

export default LanguageSwitcher;
