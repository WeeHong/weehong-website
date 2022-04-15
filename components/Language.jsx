import {
  chunkArray,
  clampValue,
  flexLayout,
  lowercaseTrim,
  measureText,
} from "../common/utils";

export const useLanguages = (topLangs, hide, langs_count) => {
  let langs = Object.values(topLangs);
  let langsToHide = {};
  let langsCount = clampValue(parseInt(langs_count), 1, 10);

  // populate langsToHide map for quick lookup
  // while filtering out
  if (hide) {
    hide.forEach((langName) => {
      langsToHide[lowercaseTrim(langName)] = true;
    });
  }

  // filter out langauges to be hidden
  langs = langs
    .sort((a, b) => b.size - a.size)
    .filter((lang) => {
      return !langsToHide[lowercaseTrim(lang.name)];
    })
    .slice(0, langsCount);

  const totalLanguageSize = langs.reduce((acc, curr) => acc + curr.size, 0);

  return { langs, totalLanguageSize };
};

const getLongestLang = (arr) =>
  arr.reduce(
    (savedLang, lang) =>
      lang.name.length > savedLang.name.length ? lang : savedLang,
    { name: "", size: null, color: "" }
  );

const createCompactLangNode = ({ lang, totalSize }) => {
  const percentage = ((lang.size / totalSize) * 100).toFixed(2);
  const color = lang.color || "#858585";

  return `
      <g>
        <circle cx="5" cy="6" r="5" fill="${color}" />
        <text data-testid="lang-name" x="15" y="10" class='lang-name'>
          ${lang.name} ${percentage}%
        </text>
      </g>
    `;
};

const createLanguageTextNode = ({ langs, totalSize }) => {
  const longestLang = getLongestLang(langs);
  const chunked = chunkArray(langs, langs.length / 2);
  const layouts = chunked.map((array) => {
    // @ts-ignore
    const items = array.map((lang, index) =>
      createCompactLangNode({
        lang,
        totalSize,
        // @ts-ignore
        index,
      })
    );
    return flexLayout({
      items,
      gap: 25,
      direction: "column",
    }).join("");
  });

  const percent = ((longestLang.size / totalSize) * 100).toFixed(2);
  const minGap = 150;
  const maxGap = 20 + measureText(`${longestLang.name} ${percent}%`, 11);
  return flexLayout({
    items: layouts,
    gap: maxGap < minGap ? minGap : maxGap,
  }).join("");
};

export const renderLayout = (langs, width = 300, totalLanguageSize) => {
  const paddingRight = 50;
  const offsetWidth = width - paddingRight;
  // progressOffset holds the previous language's width and used to offset the next language
  // so that we can stack them one after another, like this: [--][----][---]
  let progressOffset = 0;
  const compactProgressBar = langs
    .map((lang) => {
      const percentage = parseFloat(
        ((lang.size / totalLanguageSize) * offsetWidth).toFixed(2)
      );

      const progress = percentage < 10 ? percentage + 10 : percentage;

      const output = `
          <rect
            mask="url(#rect-mask)"
            data-testid="lang-progress"
            x="${progressOffset}"
            y="0"
            width="${progress}"
            height="8"
            fill="${lang.color || "#858585"}"
          />
        `;
      progressOffset += percentage;
      return output;
    })
    .join("");

  return `
    <svg data-testid="lang-items" x="25" width="250" height="100" viewBox="0 0 250 100">
      <mask id="rect-mask">
        <rect x="0" y="0" width="${offsetWidth}" height="8" fill="white" rx="5" />
      </mask>
      ${compactProgressBar}
  
      <g transform="translate(0, 25)">
        ${createLanguageTextNode({
          langs,
          totalSize: totalLanguageSize,
        })}
      </g>
    </svg>
    `;
};
