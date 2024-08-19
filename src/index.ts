import plugin from 'tailwindcss/plugin';

type FontFamilyMap = Record<
    string,
    {
        weight: number;
        family: string;
    }
>;
type FontSizeList = number[];
type LineHeightList = number[];

const defaultFontFamilyMap: FontFamilyMap = {
    'Pretendard-normal': {
        weight: 400,
        family: '"Pretendard", sans-serif',
    },
    'Pretendard-bold': {
        weight: 700,
        family: '"Pretendard", sans-serif',
    },
};
const defaultFontSizeList: FontSizeList = [
    80, 60, 40, 35, 30, 28, 25, 22, 20, 18, 15, 13, 12, 11, 10,
];
const defaultLineHeights: LineHeightList = [130, 160];

interface TypographyOptions {
    fontFamilyMap?: FontFamilyMap;
    fontSizeList?: FontSizeList;
    lineHeightList?: LineHeightList;
}

const typography = plugin.withOptions<TypographyOptions | undefined>(
    (props) =>
        ({ addUtilities }) => {
            const fontFamilyMap = props?.fontFamilyMap || defaultFontFamilyMap;
            const fontSizeList = props?.fontSizeList || defaultFontSizeList;
            const lineHeightList = props?.lineHeightList || defaultLineHeights;

            const newUtilities: Record<string, any> = {};

            Object.entries(fontFamilyMap).forEach(
                ([fontFamilyName, { weight: fontWeight, family: fontFamily }]) => {
                    fontSizeList.forEach((fontSize) => {
                        lineHeightList.forEach((lineHeight) => {
                            const key = `.${fontFamilyName}-${fontSize}-${lineHeight}`;
                            newUtilities[key] = {
                                fontFamily,
                                fontWeight,
                                fontSize: `${fontSize}px`,
                                lineHeight: `${lineHeight}%`,
                            };
                        });
                    });
                },
            );

            addUtilities(newUtilities);
        },
    (props) => ({
        fontFamilies: props?.fontFamilyMap || defaultFontFamilyMap,
        fontSizes: props?.fontSizeList || defaultFontSizeList,
        lineHeights: props?.lineHeightList || defaultLineHeights,
    }),
);

export default typography;
