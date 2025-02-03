import * as React from "react";
import { Autocomplete, TextField, Stack } from "@mui/material";

const countries = [
    // AR timezones
    { countryCode: 'EG', timezone: 'GMT+2', en: 'Egypt', ar: 'مصر' },
    { countryCode: 'MA', timezone: 'GMT', en: 'Morocco', ar: 'المغرب' },
    { countryCode: 'MR', timezone: 'GMT', en: 'Mauritania', ar: 'موريتانيا' },
    { countryCode: 'DZ', timezone: 'GMT+1', en: 'Algeria', ar: 'الجزائر' },
    { countryCode: 'TN', timezone: 'GMT+1', en: 'Tunisia', ar: 'تونس' },
    { countryCode: 'SD', timezone: 'GMT+2', en: 'Sudan', ar: 'السودان' },
    { countryCode: 'LY', timezone: 'GMT+2', en: 'Libya', ar: 'ليبيا' },
    { countryCode: 'PS', timezone: 'GMT+2', en: 'Palestine', ar: 'فلسطين' },
    { countryCode: 'LB', timezone: 'GMT+2', en: 'Lebanon', ar: 'لبنان' },
    { countryCode: 'JO', timezone: 'GMT+2', en: 'Jordan', ar: 'الأردن' },
    { countryCode: 'SY', timezone: 'GMT+2', en: 'Syria', ar: 'سوريا' },
    { countryCode: 'SA', timezone: 'GMT+3', en: 'Saudi Arabia', ar: 'السعودية' },
    { countryCode: 'AE', timezone: 'GMT+3', en: 'United Arab Emirates', ar: 'الإمارات' },
    { countryCode: 'QA', timezone: 'GMT+3', en: 'Qatar', ar: 'قطر' },
    { countryCode: 'BH', timezone: 'GMT+3', en: 'Bahrain', ar: 'البحرين' },
    { countryCode: 'KW', timezone: 'GMT+3', en: 'Kuwait', ar: 'الكويت' },
    { countryCode: 'IQ', timezone: 'GMT+3', en: 'Iraq', ar: 'العراق' },
    { countryCode: 'YE', timezone: 'GMT+3', en: 'Yemen', ar: 'اليمن' },
    { countryCode: 'SO', timezone: 'GMT+3', en: 'Somalia', ar: 'الصومال' },
    { countryCode: 'OM', timezone: 'GMT+4', en: 'Oman', ar: 'عمان' },
    // EU timezones
    { countryCode: 'GB', timezone: 'GMT', en: 'United Kingdom', ar: 'المملكة المتحدة' },
    { countryCode: 'IE', timezone: 'GMT', en: 'Ireland', ar: 'أيرلندا' },
    { countryCode: 'PT', timezone: 'GMT', en: 'Portugal', ar: 'البرتغال' },
    { countryCode: 'FR', timezone: 'GMT+1', en: 'France', ar: 'فرنسا' },
    { countryCode: 'DE', timezone: 'GMT+1', en: 'Germany', ar: 'ألمانيا' },
    { countryCode: 'ES', timezone: 'GMT+1', en: 'Spain', ar: 'إسبانيا' },
    { countryCode: 'IT', timezone: 'GMT+1', en: 'Italy', ar: 'إيطاليا' },
    { countryCode: 'BE', timezone: 'GMT+1', en: 'Belgium', ar: 'بلجيكا' },
    { countryCode: 'NL', timezone: 'GMT+1', en: 'Netherlands', ar: 'هولندا' },
    { countryCode: 'DK', timezone: 'GMT+1', en: 'Denmark', ar: 'الدنمارك' },
    { countryCode: 'SE', timezone: 'GMT+1', en: 'Sweden', ar: 'السويد' },
    { countryCode: 'NO', timezone: 'GMT+1', en: 'Norway', ar: 'النرويج' },
    { countryCode: 'PL', timezone: 'GMT+1', en: 'Poland', ar: 'بولندا' },
    { countryCode: 'CZ', timezone: 'GMT+1', en: 'Czech Republic', ar: 'التشيك' },
    { countryCode: 'HU', timezone: 'GMT+1', en: 'Hungary', ar: 'المجر' },
    { countryCode: 'CH', timezone: 'GMT+1', en: 'Switzerland', ar: 'سويسرا' },
    { countryCode: 'AT', timezone: 'GMT+1', en: 'Austria', ar: 'النمسا' },
    { countryCode: 'SK', timezone: 'GMT+1', en: 'Slovakia', ar: 'سلوفاكيا' },
    { countryCode: 'SI', timezone: 'GMT+1', en: 'Slovenia', ar: 'سلوفينيا' },
    { countryCode: 'HR', timezone: 'GMT+1', en: 'Croatia', ar: 'كرواتيا' },
    { countryCode: 'RS', timezone: 'GMT+1', en: 'Serbia', ar: 'صربيا' },
    { countryCode: 'BA', timezone: 'GMT+1', en: 'Bosnia and Herzegovina', ar: 'البوسنة والهرسك' },
    { countryCode: 'ME', timezone: 'GMT+1', en: 'Montenegro', ar: 'الجبل الأسود' },
    { countryCode: 'MK', timezone: 'GMT+1', en: 'North Macedonia', ar: 'مقدونيا الشمالية' },
    { countryCode: 'GR', timezone: 'GMT+2', en: 'Greece', ar: 'اليونان' },
    { countryCode: 'BG', timezone: 'GMT+2', en: 'Bulgaria', ar: 'بلغاريا' },
    { countryCode: 'RO', timezone: 'GMT+2', en: 'Romania', ar: 'رومانيا' },
    { countryCode: 'FI', timezone: 'GMT+2', en: 'Finland', ar: 'فنلندا' },
    { countryCode: 'UA', timezone: 'GMT+2', en: 'Ukraine', ar: 'أوكرانيا' },
    { countryCode: 'EE', timezone: 'GMT+2', en: 'Estonia', ar: 'إستونيا' },
    { countryCode: 'LV', timezone: 'GMT+2', en: 'Latvia', ar: 'لاتفيا' },
    { countryCode: 'LT', timezone: 'GMT+2', en: 'Lithuania', ar: 'ليتوانيا' },
    { countryCode: 'RU', timezone: 'GMT+3', en: 'Moscow, Russia', ar: 'موسكو، روسيا' },
    { countryCode: 'RU', timezone: 'GMT+3', en: 'St. Petersburg, Russia', ar: 'سانت بطرسبرغ، روسيا' },
    // US timezones
    { countryCode: 'US', timezone: 'GMT-5', en: 'New York, United States', ar: 'نيويورك، الولايات المتحدة الأمريكية' },
    { countryCode: 'US', timezone: 'GMT-5', en: 'Florida, United States', ar: 'فلوريدا، الولايات المتحدة الأمريكية' },
    { countryCode: 'US', timezone: 'GMT-5', en: 'Washington, D.C., United States', ar: 'واشنطن العاصمة، الولايات المتحدة الأمريكية' },
    { countryCode: 'US', timezone: 'GMT-5', en: 'Georgia, United States', ar: 'جورجيا، الولايات المتحدة الأمريكية' },
    { countryCode: 'US', timezone: 'GMT-5', en: 'Nort, United Statesh Carolina, United States', ar: 'كارولينا الشمالية، الولايات المتحدة الأمريكية' },
    { countryCode: 'US', timezone: 'GMT-5', en: 'Sout, United Statesh Carolina, United States', ar: 'كارولينا الجنوبية، الولايات المتحدة الأمريكية' },
    { countryCode: 'US', timezone: 'GMT-5', en: 'Ohio, United States', ar: 'أوهايو، الولايات المتحدة الأمريكية' },
    { countryCode: 'US', timezone: 'GMT-5', en: 'Michigan, United States', ar: 'ميشيغان، الولايات المتحدة الأمريكية' },
    { countryCode: 'US', timezone: 'GMT-5', en: 'Indiana, United States', ar: 'إنديانا، الولايات المتحدة الأمريكية' },
    { countryCode: 'US', timezone: 'GMT-5', en: 'Kentucky, United States', ar: 'كنتاكي، الولايات المتحدة الأمريكية' },
    { countryCode: 'US', timezone: 'GMT-5', en: 'Tennessee, United States', ar: 'تينيسي، الولايات المتحدة الأمريكية' },
    { countryCode: 'US', timezone: 'GMT-6', en: 'Texas, United States', ar: 'تكساس، الولايات المتحدة الأمريكية' },
    { countryCode: 'US', timezone: 'GMT-6', en: 'Illinois, United States', ar: 'إلينوي، الولايات المتحدة الأمريكية' },
    { countryCode: 'US', timezone: 'GMT-6', en: 'Missouri, United States', ar: 'ميزوري، الولايات المتحدة الأمريكية' },
    { countryCode: 'US', timezone: 'GMT-6', en: 'Minnesota, United States', ar: 'مينيسوتا، الولايات المتحدة الأمريكية' },
    { countryCode: 'US', timezone: 'GMT-6', en: 'Wisconsin, United States', ar: 'ويسكونسن، الولايات المتحدة الأمريكية' },
    { countryCode: 'US', timezone: 'GMT-6', en: 'Arkansas, United States', ar: 'أركنساس، الولايات المتحدة الأمريكية' },
    { countryCode: 'US', timezone: 'GMT-6', en: 'Louisiana, United States', ar: 'لويزيانا، الولايات المتحدة الأمريكية' },
    { countryCode: 'US', timezone: 'GMT-6', en: 'Iowa, United States', ar: 'أيوا، الولايات المتحدة الأمريكية' },
    { countryCode: 'US', timezone: 'GMT-6', en: 'North Dakota, United States', ar: 'داكوتا الشمالية، الولايات المتحدة الأمريكية' },
    { countryCode: 'US', timezone: 'GMT-6', en: 'South Dakota, United States', ar: 'داكوتا الجنوبية، الولايات المتحدة الأمريكية' },
    { countryCode: 'US', timezone: 'GMT-6', en: 'Nebraska, United States', ar: 'نبراسكا، الولايات المتحدة الأمريكية' },
    { countryCode: 'US', timezone: 'GMT-6', en: 'Kansas, United States', ar: 'كانساس، الولايات المتحدة الأمريكية' },
    { countryCode: 'US', timezone: 'GMT-7', en: 'Colorado, United States', ar: 'كولورادو، الولايات المتحدة الأمريكية' },
    { countryCode: 'US', timezone: 'GMT-7', en: 'Arizona, United States', ar: 'أريزونا، الولايات المتحدة الأمريكية' },
    { countryCode: 'US', timezone: 'GMT-7', en: 'Utah, United States', ar: 'يوتا، الولايات المتحدة الأمريكية' },
    { countryCode: 'US', timezone: 'GMT-7', en: 'New Mexico, United States', ar: 'نيومكسيكو، الولايات المتحدة الأمريكية' },
    { countryCode: 'US', timezone: 'GMT-7', en: 'Montana, United States', ar: 'مونتانا، الولايات المتحدة الأمريكية' },
    { countryCode: 'US', timezone: 'GMT-7', en: 'Wyoming, United States', ar: 'وايومنغ، الولايات المتحدة الأمريكية' },
    { countryCode: 'US', timezone: 'GMT-8', en: 'California, United States', ar: 'كاليفورنيا، الولايات المتحدة الأمريكية' },
    { countryCode: 'US', timezone: 'GMT-8', en: 'Nevada, United States', ar: 'نيفادا، الولايات المتحدة الأمريكية' },
    { countryCode: 'US', timezone: 'GMT-8', en: 'Washington, United States', ar: 'واشنطن، الولايات المتحدة الأمريكية' },
    { countryCode: 'US', timezone: 'GMT-8', en: 'Oregon, United States', ar: 'أوريغون، الولايات المتحدة الأمريكية' },
    { countryCode: 'US', timezone: 'GMT-9', en: 'Alaska, United States', ar: 'ألاسكا، الولايات المتحدة الأمريكية' },
    { countryCode: 'US', timezone: 'GMT-10', en: 'Hawaii, United States', ar: 'هاواي، الولايات المتحدة الأمريكية' },
];

export default function TimezoneButton({ defaultValue, handleChange }) {
    return (
        <Stack spacing={2} sx={{ width: 325 }}>
            <Autocomplete
                id="timezone-select"
                freeSolo
                disableClearable
                defaultValue={countries.find(country => country.timezone === defaultValue) || countries[0]}
                options={countries}
                getOptionLabel={(option) => option.ar}
                onChange={(_, newValue) => {
                    if (newValue) {
                        handleChange(newValue.timezone);
                    }
                }}
                renderOption={(props, option) => (
                    <li {...props} key={option.countryCode} value={option.timezone}>
                        <img
                            src={`https://flagcdn.com/w40/${option.countryCode.toLowerCase()}.png`}
                            alt={option.en}
                            style={{ marginRight: 10, width: 25, height: 15 }}
                        />
                        {option.ar}
                        <br />
                        ({option.timezone})
                    </li>
                )}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        label="المنطقة الزمنية"
                        InputProps={{
                            ...params.InputProps,
                            type: "search",
                        }}
                    />
                )}
            />
        </Stack>
    );
}
