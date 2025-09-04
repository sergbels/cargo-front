import React, { useState, useEffect, useRef } from "react";
import styles from "./component.module.css";

export type CountryCityPickerProps = {
    label?: string;
    countryValue?: string;
    cityValue?: string;
    placeholderCountry?: string;
    placeholderCity?: string;
    disabled?: boolean;
    error?: boolean;
    errorMessage?: string;
    countries: { [country: string]: string[] };
    onChange?: (country: string, city: string) => void;
    onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
    onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;
    sx?: React.CSSProperties;
};

export const CountryCityPicker: React.FC<CountryCityPickerProps> = ({
    label,
    countryValue = "",
    cityValue = "",
    placeholderCountry = "Select country",
    placeholderCity = "Select city",
    disabled = false,
    error = false,
    errorMessage,
    countries,
    sx,
    onChange,
    onBlur,
    onFocus,
}) => {
    const [countryInput, setCountryInput] = useState(countryValue);
    const [cityInput, setCityInput] = useState(cityValue);
    const [isCountryFocused, setIsCountryFocused] = useState(false);
    const [isCityFocused, setIsCityFocused] = useState(false);
    const [filteredCountries, setFilteredCountries] = useState<string[]>([]);
    const [filteredCities, setFilteredCities] = useState<string[]>([]);
    const [countryActiveIndex, setCountryActiveIndex] = useState<number>(-1);
    const [cityActiveIndex, setCityActiveIndex] = useState<number>(-1);
    const wrapperRef = useRef<HTMLDivElement>(null);
    const countryInputRef = useRef<HTMLInputElement>(null);
    const cityInputRef = useRef<HTMLInputElement>(null);

    // Синхронизация входных значений с пропсами
    useEffect(() => {
        setCountryInput(countryValue);
        setCityInput(cityValue);
    }, [countryValue, cityValue]);

    // Фильтрация стран и городов
    useEffect(() => {
        const countryList = Object.keys(countries);
        if (countryInput) {
            const filtered = countryList.filter((country) =>
                country.toLowerCase().includes(countryInput.toLowerCase())
            );
            setFilteredCountries(filtered);
            setCountryActiveIndex(-1);
        } else {
            setFilteredCountries(countryList);
            setCountryActiveIndex(-1);
        }
    }, [countryInput, countries]);

    useEffect(() => {
        if (countryInput && countries[countryInput]) {
            const cityList = countries[countryInput];
            if (cityInput) {
                const filtered = cityList.filter((city) =>
                    city.toLowerCase().includes(cityInput.toLowerCase())
                );
                setFilteredCities(filtered);
                setCityActiveIndex(-1);
            } else {
                setFilteredCities(cityList);
                setCityActiveIndex(-1);
            }
        } else {
            setFilteredCities([]);
            setCityInput("");
            setCityActiveIndex(-1);
        }
    }, [cityInput, countryInput, countries]);

    // Закрытие выпадающих списков при клике вне компонента
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                wrapperRef.current &&
                !wrapperRef.current.contains(event.target as Node)
            ) {
                setIsCountryFocused(false);
                setIsCityFocused(false);
                setCountryActiveIndex(-1);
                setCityActiveIndex(-1);
                if (!Object.keys(countries).includes(countryInput)) {
                    setCountryInput("");
                    setCityInput("");
                    onChange?.("", "");
                } else if (
                    countryInput &&
                    !countries[countryInput].includes(cityInput)
                ) {
                    setCityInput("");
                    onChange?.(countryInput, "");
                }
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [countryInput, cityInput, countries, onChange]);

    const handleKeyDown = (
        e: React.KeyboardEvent<HTMLInputElement>,
        type: "country" | "city"
    ) => {
        const isCountry = type === "country";
        const focused = isCountry ? isCountryFocused : isCityFocused;
        const activeIndex = isCountry ? countryActiveIndex : cityActiveIndex;
        const setActiveIndex = isCountry
            ? setCountryActiveIndex
            : setCityActiveIndex;
        const filteredList = isCountry ? filteredCountries : filteredCities;

        if (!focused || filteredList.length === 0) return;

        if (e.key === "ArrowDown") {
            e.preventDefault();
            setActiveIndex((prev) => {
                const nextIndex =
                    prev < filteredList.length - 1 ? prev + 1 : prev;
                scrollToActiveItem(nextIndex, isCountry);
                return nextIndex;
            });
        } else if (e.key === "ArrowUp") {
            e.preventDefault();
            setActiveIndex((prev) => {
                const nextIndex = prev > 0 ? prev - 1 : -1;
                scrollToActiveItem(nextIndex, isCountry);
                return nextIndex;
            });
        } else if (e.key === "Enter" && activeIndex >= 0) {
            e.preventDefault();
            const selectedValue = filteredList[activeIndex];
            if (isCountry) {
                setCountryInput(selectedValue);
                setCityInput("");
                onChange?.(selectedValue, "");
                setIsCountryFocused(false);
                setCountryActiveIndex(-1);
                cityInputRef.current?.focus();
            } else {
                setCityInput(selectedValue);
                onChange?.(countryInput, selectedValue);
                setIsCityFocused(false);
                setCityActiveIndex(-1);
            }
        } else if (e.key === "Escape") {
            if (isCountry) {
                setIsCountryFocused(false);
                setCountryActiveIndex(-1);
            } else {
                setIsCityFocused(false);
                setCityActiveIndex(-1);
            }
        }
    };

    const scrollToActiveItem = (index: number, isCountry: boolean) => {
        if (wrapperRef.current) {
            const dropdown = wrapperRef.current.querySelector(
                `.${isCountry ? styles.countryDropdown : styles.cityDropdown}`
            );
            const activeItem = dropdown?.querySelector(
                `.${styles.dropdownItem}:nth-child(${index + 1})`
            );
            if (activeItem && dropdown) {
                activeItem.scrollIntoView({
                    block: "nearest",
                    behavior: "smooth",
                });
            }
        }
    };

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement>,
        type: "country" | "city"
    ) => {
        const newValue = e.target.value;
        if (type === "country") {
            setCountryInput(newValue);
            setCityInput("");
            onChange?.(newValue, "");
            setIsCountryFocused(true);
        } else {
            setCityInput(newValue);
            onChange?.(countryInput, newValue);
            setIsCityFocused(true);
        }
    };

    const handleSelect = (value: string, type: "country" | "city") => {
        if (type === "country") {
            setCountryInput(value);
            setCityInput("");
            onChange?.(value, "");
            setIsCountryFocused(false);
            setCountryActiveIndex(-1);
            cityInputRef.current?.focus();
        } else {
            setCityInput(value);
            onChange?.(countryInput, value);
            setIsCityFocused(false);
            setCityActiveIndex(-1);
        }
    };

    const handleClear = (type: "country" | "city") => {
        if (type === "country") {
            setCountryInput("");
            setCityInput("");
            onChange?.("", "");
            setIsCountryFocused(false);
            countryInputRef.current?.focus();
        } else {
            setCityInput("");
            onChange?.(countryInput, "");
            setIsCityFocused(false);
            cityInputRef.current?.focus();
        }
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        onBlur?.(e);
    };

    const handleFocus = (
        e: React.FocusEvent<HTMLInputElement>,
        type: "country" | "city"
    ) => {
        if (type === "country") {
            setIsCountryFocused(true);
        } else if (countryInput && countries[countryInput]) {
            setIsCityFocused(true);
        }
        onFocus?.(e);
    };

    return (
        <div
            ref={wrapperRef}
            className={`${styles.container} ${error ? styles.error : ""} ${
                disabled ? styles.disabled : ""
            }`}
            style={sx}
        >
            {label && <label className={styles.label}>{label}</label>}
            <div className={styles.inputGroup}>
                <div
                    className={`${styles.inputWrapper} ${
                        styles.countryWrapper
                    } ${isCountryFocused ? styles.focused : ""}`}
                >
                    <input
                        ref={countryInputRef}
                        type="text"
                        value={countryInput}
                        placeholder={placeholderCountry}
                        disabled={disabled}
                        onChange={(e) => handleInputChange(e, "country")}
                        onFocus={(e) => handleFocus(e, "country")}
                        onBlur={handleBlur}
                        onKeyDown={(e) => handleKeyDown(e, "country")}
                        className={styles.input}
                    />
                    {countryInput && !disabled && (
                        <button
                            type="button"
                            className={styles.clearButton}
                            onClick={() => handleClear("country")}
                            aria-label="Clear country input"
                        >
                            <svg
                                className={styles.clearIcon}
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M6 18L18 6M6 6l12 12"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        </button>
                    )}
                    {isCountryFocused && filteredCountries.length > 0 && (
                        <ul
                            className={`${styles.dropdown} ${styles.countryDropdown}`}
                        >
                            {filteredCountries.map((country, index) => (
                                <li
                                    key={country}
                                    className={`${styles.dropdownItem} ${
                                        index === countryActiveIndex
                                            ? styles.active
                                            : ""
                                    }`}
                                    onMouseDown={() =>
                                        handleSelect(country, "country")
                                    }
                                >
                                    {country}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
                <div
                    className={`${styles.inputWrapper} ${styles.cityWrapper} ${
                        isCityFocused ? styles.focused : ""
                    }`}
                >
                    <input
                        ref={cityInputRef}
                        type="text"
                        value={cityInput}
                        placeholder={placeholderCity}
                        disabled={
                            disabled ||
                            !countryInput ||
                            !countries[countryInput]
                        }
                        onChange={(e) => handleInputChange(e, "city")}
                        onFocus={(e) => handleFocus(e, "city")}
                        onBlur={handleBlur}
                        onKeyDown={(e) => handleKeyDown(e, "city")}
                        className={styles.input}
                    />
                    {cityInput &&
                        !disabled &&
                        countryInput &&
                        countries[countryInput] && (
                            <button
                                type="button"
                                className={styles.clearButton}
                                onClick={() => handleClear("city")}
                                aria-label="Clear city input"
                            >
                                <svg
                                    className={styles.clearIcon}
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M6 18L18 6M6 6l12 12"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                            </button>
                        )}
                    {isCityFocused && filteredCities.length > 0 && (
                        <ul
                            className={`${styles.dropdown} ${styles.cityDropdown}`}
                        >
                            {filteredCities.map((city, index) => (
                                <li
                                    key={city}
                                    className={`${styles.dropdownItem} ${
                                        index === cityActiveIndex
                                            ? styles.active
                                            : ""
                                    }`}
                                    onMouseDown={() =>
                                        handleSelect(city, "city")
                                    }
                                >
                                    {city}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
            {error && errorMessage && (
                <span className={styles.errorMessage}>{errorMessage}</span>
            )}
        </div>
    );
};
