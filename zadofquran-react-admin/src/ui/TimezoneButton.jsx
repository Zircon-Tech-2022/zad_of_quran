import * as React from "react";
import { Autocomplete, TextField, Stack } from "@mui/material";

const countries = [
    // AR timezones
    { countryCode: 'EG', timezone: 'Africa/Cairo', en: 'Egypt', ar: 'مصر' },
    { countryCode: 'MA', timezone: 'Africa/Casablanca', en: 'Morocco', ar: 'المغرب' },
    { countryCode: 'MR', timezone: 'Africa/Nouakchott', en: 'Mauritania', ar: 'موريتانيا' },
    { countryCode: 'DZ', timezone: 'Africa/Algiers', en: 'Algeria', ar: 'الجزائر' },
    { countryCode: 'TN', timezone: 'Africa/Tunis', en: 'Tunisia', ar: 'تونس' },
    { countryCode: 'SD', timezone: 'Africa/Khartoum', en: 'Sudan', ar: 'السودان' },
    { countryCode: 'LY', timezone: 'Africa/Tripoli', en: 'Libya', ar: 'ليبيا' },
    { countryCode: 'PS', timezone: 'Asia/Gaza', en: 'Palestine', ar: 'فلسطين' },
    { countryCode: 'LB', timezone: 'Asia/Beirut', en: 'Lebanon', ar: 'لبنان' },
    { countryCode: 'JO', timezone: 'Asia/Amman', en: 'Jordan', ar: 'الأردن' },
    { countryCode: 'SY', timezone: 'Asia/Damascus', en: 'Syria', ar: 'سوريا' },
    { countryCode: 'SA', timezone: 'Asia/Riyadh', en: 'Saudi Arabia', ar: 'السعودية' },
    { countryCode: 'AE', timezone: 'Asia/Dubai', en: 'United Arab Emirates', ar: 'الإمارات' },
    { countryCode: 'QA', timezone: 'Asia/Qatar', en: 'Qatar', ar: 'قطر' },
    { countryCode: 'BH', timezone: 'Asia/Bahrain', en: 'Bahrain', ar: 'البحرين' },
    { countryCode: 'KW', timezone: 'Asia/Kuwait', en: 'Kuwait', ar: 'الكويت' },
    { countryCode: 'IQ', timezone: 'Asia/Baghdad', en: 'Iraq', ar: 'العراق' },
    { countryCode: 'YE', timezone: 'Asia/Aden', en: 'Yemen', ar: 'اليمن' },
    { countryCode: 'SO', timezone: 'Africa/Mogadishu', en: 'Somalia', ar: 'الصومال' },
    { countryCode: 'OM', timezone: 'Asia/Muscat', en: 'Oman', ar: 'عمان' },
    // EU timezones
    { countryCode: 'GB', timezone: 'Europe/London', en: 'United Kingdom', ar: 'المملكة المتح' },
    { countryCode: 'IE', timezone: 'Europe/Dublin', en: 'Ireland', ar: 'أيرلندا' },
    { countryCode: 'PT', timezone: 'Europe/Lisbon', en: 'Portugal', ar: 'البرتغال' },
    { countryCode: 'FR', timezone: 'Europe/Paris', en: 'France', ar: 'فرن' },
    { countryCode: 'DE', timezone: 'Europe/Berlin', en: 'Germany', ar: 'ألمانيا' },
    { countryCode: 'ES', timezone: 'Europe/Madrid', en: 'Spain', ar: 'إسبانيا' },
    { countryCode: 'IT', timezone: 'Europe/Rome', en: 'Italy', ar: 'إيطاليا' },
    { countryCode: 'BE', timezone: 'Europe/Brussels', en: 'Belgium', ar: 'بلجيكا' },
    { countryCode: 'NL', timezone: 'Europe/Amsterdam', en: 'Netherlands', ar: 'هولندا' },
    { countryCode: 'DK', timezone: 'Europe/Copenhagen', en: 'Denmark', ar: 'الدنمارك' },
    { countryCode: 'SE', timezone: 'Europe/Stockholm', en: 'Sweden', ar: 'السويد' },
    { countryCode: 'NO', timezone: 'Europe/Oslo', en: 'Norway', ar: 'النرويج' },
    { countryCode: 'PL', timezone: 'Europe/Warsaw', en: 'Poland', ar: 'بولندا' },
    { countryCode: 'CZ', timezone: 'Europe/Prague', en: 'Czech Republic', ar: 'التشيك' },
    { countryCode: 'HU', timezone: 'Europe/Budapest', en: 'Hungary', ar: 'المجر' },
    { countryCode: 'CH', timezone: 'Europe/Zurich', en: 'Switzerland', ar: 'سويسرا' },
    { countryCode: 'AT', timezone: 'Europe/Vienna', en: 'Austria', ar: 'النمسا' },
    { countryCode: 'SK', timezone: 'Europe/Bratislava', en: 'Slovakia', ar: 'سلوفاكيا' },
    { countryCode: 'SI', timezone: 'Europe/Ljubljana', en: 'Slovenia', ar: 'سلوفينيا' },
    { countryCode: 'HR', timezone: 'Europe/Zagreb', en: 'Croatia', ar: 'كرواتيا' },
    { countryCode: 'RS', timezone: 'Europe/Belgrade', en: 'Serbia', ar: 'صربيا' },
    { countryCode: 'BA', timezone: 'Europe/Sarajevo', en: 'Bosnia and Herzegovina', ar: 'البوسنة والهرسك' },
    { countryCode: 'ME', timezone: 'Europe/Podgorica', en: 'Montenegro', ar: 'الجبل الأسود' },
    { countryCode: 'MK', timezone: 'Europe/Skopje', en: 'North Macedonia', ar: 'مقدونيا الشمالية' },
    { countryCode: 'GR', timezone: 'Europe/Athens', en: 'Greece', ar: 'اليونان' },
    { countryCode: 'BG', timezone: 'Europe/Sofia', en: 'Bulgaria', ar: 'بلغاريا' },
    { countryCode: 'RO', timezone: 'Europe/Bucharest', en: 'Romania', ar: 'رومانيا' },
    { countryCode: 'FI', timezone: 'Europe/Helsinki', en: 'Finland', ar: 'فنلندا' },
    { countryCode: 'UA', timezone: 'Europe/Kyiv', en: 'Ukraine', ar: 'أوكرانيا' },
    { countryCode: 'EE', timezone: 'Europe/Tallinn', en: 'Estonia', ar: 'إستونيا' },
    { countryCode: 'LV', timezone: 'Europe/Riga', en: 'Latvia', ar: 'لاتفيا' },
    { countryCode: 'LT', timezone: 'Europe/Vilnius', en: 'Lithuania', ar: 'ليتوانيا' },
    { countryCode: 'RU', timezone: 'Europe/Moscow', en: 'Moscow, Russia', ar: 'موسكو، روسيا' },
    { countryCode: 'RU', timezone: 'Europe/Moscow', en: 'St. Petersburg, Russia', ar: 'سانت بطرسبرغ، روسيا' },
    // US timezones
    { countryCode: 'US', timezone: 'America/New_York', en: 'New York, United States', ar: 'نيويورك، الولايات المتحدة الأمريكية' },
    { countryCode: 'US', timezone: 'America/New_York', en: 'Florida, United States', ar: 'فلوريدا، الولايات المتحدة الأمريكية' },
    { countryCode: 'US', timezone: 'America/New_York', en: 'Washington, D.C., United States', ar: 'واشنطن العاصمة، الولايات المتحدة الأمريكية' },
    { countryCode: 'US', timezone: 'America/New_York', en: 'Georgia, United States', ar: 'جورجيا، الولايات المتحدة الأمريكية' },
    { countryCode: 'US', timezone: 'America/New_York', en: 'North Carolina, United States', ar: 'كارولينا الشمالية، الولايات المتحدة الأمريكية' },
    { countryCode: 'US', timezone: 'America/New_York', en: 'South Carolina, United States', ar: 'كارولينا الجنوبية، الولايات المتحدة الأمريكية' },
    { countryCode: 'US', timezone: 'America/New_York', en: 'Ohio, United States', ar: 'أوهايو، الولايات المتحدة الأمريكية' },
    { countryCode: 'US', timezone: 'America/New_York', en: 'Michigan, United States', ar: 'ميشيغان، الولايات المتحدة الأمريكية' },
    { countryCode: 'US', timezone: 'America/New_York', en: 'Indiana, United States', ar: 'إنديانا، الولايات المتحدة الأمريكية' },
    { countryCode: 'US', timezone: 'America/New_York', en: 'Kentucky, United States', ar: 'كنتاكي، الولايات المتحدة الأمريكية' },
    { countryCode: 'US', timezone: 'America/New_York', en: 'Tennessee, United States', ar: 'تينيسي، الولايات المتحدة الأمريكية' },
    { countryCode: 'US', timezone: 'America/New_York', en: 'New York, United States', ar: 'نيويورك، الولايات المتحدة الأمريكية' },
    { countryCode: 'US', timezone: 'America/New_York', en: 'Massachusetts, United States', ar: 'ماساتشوستس، الولايات المتحدة الأمريكية' },
    { countryCode: 'US', timezone: 'America/Chicago', en: 'Texas, United States', ar: 'تكساس، الولايات المتحدة الأمريكية' },
    { countryCode: 'US', timezone: 'America/Chicago', en: 'Illinois, United States', ar: 'إلينوي، الولايات المتحدة الأمريكية' },
    { countryCode: 'US', timezone: 'America/Chicago', en: 'Missouri, United States', ar: 'ميزوري، الولايات المتحدة الأمريكية' },
    { countryCode: 'US', timezone: 'America/Chicago', en: 'Minnesota, United States', ar: 'مينيسوتا، الولايات المتحدة الأمريكية' },
    { countryCode: 'US', timezone: 'America/Chicago', en: 'Wisconsin, United States', ar: 'ويسكونسن، الولايات المتحدة الأمريكية' },
    { countryCode: 'US', timezone: 'America/Chicago', en: 'Arkansas, United States', ar: 'أركنساس، الولايات المتحدة الأمريكية' },
    { countryCode: 'US', timezone: 'America/Chicago', en: 'Louisiana, United States', ar: 'لويزيانا، الولايات المتحدة الأمريكية' },
    { countryCode: 'US', timezone: 'America/Chicago', en: 'Iowa, United States', ar: 'أيوا، الولايات المتحدة الأمريكية' },
    { countryCode: 'US', timezone: 'America/Chicago', en: 'North Dakota, United States', ar: 'داكوتا الشمالية، الولايات المتحدة الأمريكية' },
    { countryCode: 'US', timezone: 'America/Chicago', en: 'South Dakota, United States', ar: 'داكوتا الجنوبية، الولايات المتحدة الأمريكية' },
    { countryCode: 'US', timezone: 'America/Chicago', en: 'Nebraska, United States', ar: 'نبراسكا، الولايات المتحدة الأمريكية' },
    { countryCode: 'US', timezone: 'America/Chicago', en: 'Kansas, United States', ar: 'كانساس، الولايات المتحدة الأمريكية' },
    { countryCode: 'US', timezone: 'America/Denver', en: 'Colorado, United States', ar: 'كولورادو، الولايات المتحدة الأمريكية' },
    { countryCode: 'US', timezone: 'America/Phoenix', en: 'Arizona, United States', ar: 'أريزونا، الولايات المتحدة الأمريكية' },
    { countryCode: 'US', timezone: 'America/Denver', en: 'Utah, United States', ar: 'يوتا، الولايات المتحدة الأمريكية' },
    { countryCode: 'US', timezone: 'America/Denver', en: 'New Mexico, United States', ar: 'نيومكسيكو، الولايات المتحدة الأمريكية' },
    { countryCode: 'US', timezone: 'America/Denver', en: 'Montana, United States', ar: 'مونتانا، الولايات المتحدة الأمريكية' },
    { countryCode: 'US', timezone: 'America/Denver', en: 'Wyoming, United States', ar: 'وايومنغ، الولايات المتحدة الأمريكية' },
    { countryCode: 'US', timezone: 'America/Los_Angeles', en: 'California, United States', ar: 'كاليفورنيا، الولايات المتحدة الأمريكية' },
    { countryCode: 'US', timezone: 'America/Los_Angeles', en: 'Nevada, United States', ar: 'نيفادا، الولايات المتحدة الأمريكية' },
    { countryCode: 'US', timezone: 'America/Los_Angeles', en: 'Washington, United States', ar: 'واشنطن، الولايات المتحدة الأمريكية' },
    { countryCode: 'US', timezone: 'America/Los_Angeles', en: 'Oregon, United States', ar: 'أوريغون، الولايات المتحدة الأمريكية' },
    { countryCode: 'US', timezone: 'America/Anchorage', en: 'Alaska, United States', ar: 'ألاسكا، الولايات المتحدة الأمريكية' },
    { countryCode: 'US', timezone: 'Pacific/Honolulu', en: 'Hawaii, United States', ar: 'هاواي، الولايات المتحدة الأمريكية' },
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
                    <li {...props} key={option.en} value={option.timezone}>
                        <img
                            src={`https://flagcdn.com/w40/${option.countryCode.toLowerCase()}.png`}
                            alt={option.en}
                            style={{ marginRight: 10, marginLeft: 10, width: 25, height: 15 }}
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
