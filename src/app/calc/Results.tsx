import { Button } from "@/components/button/button";
import { DeliveryCard } from "@/components/delivery-card/delivery-card";

export interface DeliveryOption {
    logo: string;
    name: string;
    deliveryDate: string;
    price: number;
    isBestPrice?: boolean;
    isBestDate?: boolean;
}

interface ResultsProps {
    sortBy: string;
    setSortBy: (value: string) => void;
    paginatedOptions: DeliveryOption[];
    highlightBest: boolean;
    totalPages: number;
    currentPage: number;
    handlePageChange: (page: number) => void;
}

const Results: React.FC<ResultsProps> = ({
    sortBy,
    setSortBy,
    paginatedOptions,
    highlightBest,
    totalPages,
    currentPage,
    handlePageChange,
}) => {
    return (
        <div>
            <div
                style={{
                    marginBottom: "1rem",
                }}
            >
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "end",
                    }}
                >
                    <div>
                        <label
                            style={{
                                fontFamily: "var(--font-main)",
                                fontSize: "var(--text-base)",
                                color: "var(--onsurface)",
                                display: "block",
                            }}
                        >
                            Сортировка
                        </label>
                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            style={{
                                padding: "0.5rem",
                                borderRadius: "var(--bradius-sm)",
                                border: "1px solid var(--border)",
                                backgroundColor: "var(--surface)",
                                fontFamily: "var(--font-main)",
                                fontSize: "var(--text-base)",
                                color: "var(--onsurface)",
                                marginTop: "0.5rem",
                            }}
                        >
                            <option value="price-asc">По цене (возрастание)</option>
                            <option value="price-desc">По цене (убывание)</option>
                            <option value="date-asc">По дате (ближайшая)</option>
                            <option value="date-desc">По дате (дальняя)</option>
                        </select>
                    </div>
                </div>
            </div>
            <div className="row">
                {paginatedOptions.length > 0 ? (
                    paginatedOptions.map((option, index) => (
                        <div
                            key={index}
                            className="col-xs-12"
                            style={{
                                marginBottom: "1rem",
                            }}
                        >
                            <DeliveryCard
                                logo={option.logo}
                                name={option.name}
                                deliveryDate={option.deliveryDate}
                                price={option.price}
                                isBestPrice={option.isBestPrice}
                                isBestDate={option.isBestDate}
                                onClick={() => console.log(`Выбрана ${option.name}`)}
                            />
                            {highlightBest &&
                                (option.isBestPrice || option.isBestDate) &&
                                index < paginatedOptions.length - 1 && (
                                    <div className="best-options-divider" />
                                )}
                        </div>
                    ))
                ) : (
                    <p
                        style={{
                            color: "var(--onsurface)",
                            fontFamily: "var(--font-main)",
                            fontSize: "var(--text-base)",
                        }}
                    >
                        Нет результатов для выбранных фильтров
                    </p>
                )}
            </div>
            {totalPages > 1 && (
                <div
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        gap: "0.5rem",
                        marginTop: "1rem",
                    }}
                >
                    <Button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        sx={{
                            padding: "0.5rem 1rem",
                            fontSize: "var(--text-base)",
                            backgroundColor: currentPage === 1 ? "var(--surface-variant)" : "var(--primary)",
                            color: currentPage === 1 ? "var(--onsurface-variant)" : "var(--onprimary)",
                            cursor: currentPage === 1 ? "not-allowed" : "pointer",
                        }}
                    >
                        Назад
                    </Button>
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                        <Button
                            key={page}
                            onClick={() => handlePageChange(page)}
                            sx={{
                                padding: "0.5rem 1rem",
                                fontSize: "var(--text-base)",
                                backgroundColor: currentPage === page ? "var(--primary)" : "var(--surface)",
                                color: currentPage === page ? "var(--onprimary)" : "var(--onsurface)",
                                border: "1px solid var(--border)",
                            }}
                        >
                            {page}
                        </Button>
                    ))}
                    <Button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        sx={{
                            padding: "0.5rem 1rem",
                            fontSize: "var(--text-base)",
                            backgroundColor: currentPage === totalPages ? "var(--surface-variant)" : "var(--primary)",
                            color: currentPage === totalPages ? "var(--onsurface-variant)" : "var(--onprimary)",
                            cursor: currentPage === totalPages ? "not-allowed" : "pointer",
                        }}
                    >
                        Вперёд
                    </Button>
                </div>
            )}
        </div>
    );
};

export default Results;