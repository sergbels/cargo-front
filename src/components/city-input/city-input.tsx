import React, { useState, useEffect, useRef, useCallback } from "react";
import debounce from "lodash/debounce"; 
import axios from "axios";
import styles from "./component.module.css";

type CityInputProps = {
  label?: string;
  value?: string;
  placeholder?: string;
  disabled?: boolean;
  error?: boolean;
  errorMessage?: string;
  onChange?: (city: string) => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;
  sx?: React.CSSProperties;
};

type DaDataSuggestion = {
  value: string;
  data: {
    city?: string;
    fias_id?: string;
    city_type_full?: string;
  };
};

const DADATA_API_URL = "https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address";
const DADATA_API_KEY = process.env.NEXT_PUBLIC_DADATA_API_KEY || "a259591c9c9155707ee6eb71e4a1316ae27d879a";

export const CityInput: React.FC<CityInputProps> = ({
  label,
  value = "",
  placeholder = "Введите город",
  disabled = false,
  error = false,
  errorMessage,
  onChange,
  onBlur,
  onFocus,
  sx,
}) => {
  const [inputValue, setInputValue] = useState(value);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isFocused, setIsFocused] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number>(-1);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Синхронизация входного значения с пропсом
  useEffect(() => {
    setInputValue(value);
  }, [value]);

  // Закрытие выпадающего списка при клике вне компонента
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsFocused(false);
        setActiveIndex(-1);
        if (!suggestions.includes(inputValue)) {
          setInputValue("");
          onChange?.("");
        }
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [inputValue, suggestions, onChange]);

  // Debounced функция для запроса к DaData
  const fetchSuggestions = useCallback(
    debounce(async (query: string) => {
      if (!query || query.length < 2) {
        setSuggestions([]);
        return;
      }

      try {
        const response = await axios.post(
          DADATA_API_URL,
          {
            query,
            locations: [{ city_type_full: "город" }],
            from_bound: {value: "city"},
            to_bound: {value: "city"},
            count: 10,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Token ${DADATA_API_KEY}`,
            },
          }
        );

        const cities = response.data.suggestions
          .map((suggestion: DaDataSuggestion) => suggestion.data.city)
          .filter((city: string | undefined): city is string => !!city);
        setSuggestions(cities);
        setActiveIndex(-1);
      } catch (error) {
        console.error("Error fetching DaData suggestions:", error);
        setSuggestions([]);
      }
    }, 500),
    []
  );

  // Вызов запроса при изменении ввода
  useEffect(() => {
    if (isFocused) {
      fetchSuggestions(inputValue);
    }
  }, [inputValue, isFocused, fetchSuggestions]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!isFocused || suggestions.length === 0) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((prev) => {
        const nextIndex = prev < suggestions.length - 1 ? prev + 1 : prev;
        scrollToActiveItem(nextIndex);
        return nextIndex;
      });
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((prev) => {
        const nextIndex = prev > 0 ? prev - 1 : -1;
        scrollToActiveItem(nextIndex);
        return nextIndex;
      });
    } else if (e.key === "Enter" && activeIndex >= 0) {
      e.preventDefault();
      const selectedCity = suggestions[activeIndex];
      setInputValue(selectedCity);
      onChange?.(selectedCity);
      setIsFocused(false);
      setActiveIndex(-1);
    } else if (e.key === "Escape") {
      setIsFocused(false);
      setActiveIndex(-1);
    }
  };

  const scrollToActiveItem = (index: number) => {
    if (wrapperRef.current) {
      const dropdown = wrapperRef.current.querySelector(`.${styles.dropdown}`);
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    onChange?.(newValue);
    setIsFocused(true);
  };

  const handleSelect = (city: string) => {
    setInputValue(city);
    onChange?.(city);
    setIsFocused(false);
    setActiveIndex(-1);
  };

  const handleClear = () => {
    setInputValue("");
    onChange?.("");
    setIsFocused(false);
    inputRef.current?.focus();
  };

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(true);
    onFocus?.(e);
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    onBlur?.(e);
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
      <div className={styles.inputWrapper}>
        <input
          ref={inputRef}
          type="text"
          value={inputValue}
          placeholder={placeholder}
          disabled={disabled}
          onChange={handleInputChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          className={styles.input}
        />
        {inputValue && !disabled && (
          <button
            type="button"
            className={styles.clearButton}
            onClick={handleClear}
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
        {isFocused && suggestions.length > 0 && (
          <ul className={`${styles.dropdown} ${styles.cityDropdown}`}>
            {suggestions.map((city, index) => (
              <li
                key={city}
                className={`${styles.dropdownItem} ${
                  index === activeIndex ? styles.active : ""
                }`}
                onMouseDown={() => handleSelect(city)}
              >
                {city}
              </li>
            ))}
          </ul>
        )}
      </div>
      {error && errorMessage && (
        <span className={styles.errorMessage}>{errorMessage}</span>
      )}
    </div>
  );
};