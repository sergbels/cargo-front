import { Button } from "@/components/button/button";

interface DeliveryOption {
    logo: string;
    name: string;
    deliveryDate: string;
    price: number;
    isBestPrice?: boolean;
    isBestDate?: boolean;
}

interface FiltersProps {
    isFilterOpen: boolean;
    setIsFilterOpen: (value: boolean) => void;
    endDate: string;
    setEndDate: (value: string) => void;
    highlightBest: boolean;
    setHighlightBest: (value: boolean) => void;
    selectedCompanies: string[];
    handleCompanyToggle: (company: string) => void;
    resetFilters: () => void;
    deliveryOptions: DeliveryOption[];
}

const Filters: React.FC<FiltersProps> = ({
    isFilterOpen,
    setIsFilterOpen,
    endDate,
    setEndDate,
    highlightBest,
    setHighlightBest,
    selectedCompanies,
    handleCompanyToggle,
    resetFilters,
    deliveryOptions,
}) => {
    const unq = new Set(deliveryOptions.map(e => e.name));
    const unqDO = Array.from(unq);
    return (
        <>
            <style jsx>{`
                .filter-container {
                    padding: 1rem;
                    background-color: var(--surface);
                    border-radius: var(--bradius);
                    box-shadow: var(--shadow);
                    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
                    overflow: auto;
                }
                .filter-container.closed {
                    max-height: 0;
                    opacity: 0;
                    transform: translateY(-10px);
                    padding: 0 1rem;
                }
                .filter-container.open {
                    max-height: 500px;
                    opacity: 1;
                    transform: translateY(0);
                }
                .filter-button {
                    transition: var(--transition);
                }
                .filter-button:hover {
                    background-color: var(--primary-hover);
                    color: var(--onprimary);
                    transform: scale(1.02);
                }
                .filter-content {
                    opacity: 0;
                    transition: opacity 0.3s ease-in-out;
                }
                .filter-container.open .filter-content {
                    opacity: 1;
                    transition-delay: 0.1s;
                }
                select,
                input[type="checkbox"],
                input[type="date"] {
                    transition: opacity 0.3s ease-in-out,
                        transform 0.3s ease-in-out;
                }
                .filter-container.closed select,
                .filter-container.closed input[type="checkbox"],
                .filter-container.closed input[type="date"] {
                    opacity: 0;
                    transform: translateY(-5px);
                }
                @keyframes fadeIn {
                    from {
                        opacity: 0;
                        transform: translateY(10px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                .form-row {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 1rem;
                    margin-bottom: 2rem;
                    align-items: flex-end;
                }
                .form-col {
                    flex: 1;
                    min-width: 200px;
                }
                .swap-button-col {
                    display: flex;
                    align-items: flex-end;
                    padding-bottom: 0.5rem;
                }
                @media (max-width: 768px) {
                    .form-row {
                        flex-direction: column;
                    }
                    .form-col {
                        width: 100%;
                    }
                    .swap-button-col {
                        display: none;
                    }
                    .form-container {
                        position: static;
                        top: auto;
                        z-index: auto;
                        width: 100%;
                    }
                }
                @media (min-width: 769px) {
                    .filter-container {
                        max-height: none;
                        opacity: 1;
                        transform: translateY(0);
                        padding: 1rem;
                    }
                    .filter-content {
                        opacity: 1;
                    }
                    .form-container {
                        position: sticky;
                        top: 1rem;
                        z-index: 1000;
                        width: 100%;
                    }
                }
            `}</style>
            <div
                className={`filter-container ${isFilterOpen ? "open" : "closed"}`}
                style={{
                    backgroundColor: "var(--surface)",
                    borderRadius: "var(--bradius)",
                    boxShadow: "var(--shadow)",
                }}
            >
                <div
                    className="filter-content"
                    style={{
                        padding: "1rem",
                    }}
                >
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            marginBottom: "1rem",
                        }}
                    >
                        <h3
                            style={{
                                fontFamily: "var(--font-heading)",
                                fontSize: "var(--text-lg)",
                                color: "var(--onsurface)",
                            }}
                        >
                            Фильтры
                        </h3>
                        <Button
                            onClick={resetFilters}
                            sx={{
                                padding: "0.5rem 1rem",
                                fontSize: "var(--text-sm)",
                                backgroundColor: "var(--surface)",
                                border: "1px solid var(--border)",
                                color: "var(--onsurface)",
                            }}
                        >
                            Сбросить
                        </Button>
                    </div>
                    <div
                        style={{
                            marginBottom: "1rem",
                        }}
                    >
                        <label
                            style={{
                                fontFamily: "var(--font-main)",
                                fontSize: "var(--text-base)",
                                color: "var(--onsurface)",
                                display: "block",
                                marginBottom: "0.5rem",
                            }}
                        >
                            Крайняя дата доставки
                        </label>
                        <input
                            type="date"
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                            style={{
                                padding: "0.5rem",
                                borderRadius: "var(--bradius-sm)",
                                border: "1px solid var(--border)",
                                backgroundColor: "var(--surface)",
                                fontFamily: "var(--font-main)",
                                fontSize: "var(--text-base)",
                                color: "var(--onsurface)",
                                width: "100%",
                            }}
                            placeholder="Максимальная дата"
                        />
                    </div>
                    <div
                        style={{
                            marginBottom: "1rem",
                        }}
                    >
                        <input
                            type="checkbox"
                            checked={highlightBest}
                            onChange={() => setHighlightBest(!highlightBest)}
                            style={{
                                accentColor: "var(--primary)",
                            }}
                        />
                        <span
                            style={{
                                fontFamily: "var(--font-main)",
                                fontSize: "var(--text-base)",
                                color: "var(--onsurface)",
                                marginLeft: "0.5rem",
                            }}
                        >
                            Выделять лучшие по цене и срокам
                        </span>
                    </div>
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "0.5rem",
                        }}
                    >
                        <h4
                            style={{
                                fontFamily: "var(--font-heading)",
                                fontSize: "var(--text-base)",
                                color: "var(--onsurface)",
                                marginBottom: "0.5rem",
                            }}
                        >
                            Компании
                        </h4>
                        {unqDO.map((option) => (
                            <label
                                key={option}
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "0.5rem",
                                    fontFamily: "var(--font-main)",
                                    fontSize: "var(--text-base)",
                                    color: "var(--onsurface)",
                                }}
                            >
                                <input
                                    type="checkbox"
                                    checked={selectedCompanies.includes(option)}
                                    onChange={() => handleCompanyToggle(option)}
                                    style={{
                                        accentColor: "var(--primary)",
                                    }}
                                />
                                {option}
                            </label>
                        ))}
                    </div>
                </div>
            </div>
            <Button
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                sx={{
                    padding: "0.5rem 1rem",
                    fontSize: "var(--text-base)",
                    backgroundColor: "var(--surface)",
                    border: "1px solid var(--border)",
                    color: "var(--onsurface)",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    marginTop: "1rem",
                    width: "100%",
                }}
                className="filter-button md:hidden"
            >
                {isFilterOpen ? "Скрыть фильтры" : "Показать фильтры"}
                <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    style={{
                        transform: isFilterOpen ? "rotate(180deg)" : "rotate(0deg)",
                        transition: "transform 0.3s ease-in-out",
                    }}
                >
                    <path d="M6 9l6 6 6-6" />
                </svg>
            </Button>
        </>
    );
};

export default Filters;