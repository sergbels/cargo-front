"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Header } from "@/components/header/header";
import { Footer } from "@/components/footer/footer";
import { CargoDetails } from "@/components/cargo-input/cargo-input";
import styles from "../HeroSection.module.css";
import axios from "axios";

import InputForm from "./InputForm";
import Filters from "./Filters";
import Results from "./Results";
import MapSection from "./MapSection";
import { DeliveryOption, formatDeliveryOptions } from "./static-data";

interface ParsedData {
    from?: { city: string };
    to?: { city: string };
    cargoList?: CargoDetails[];
    endDate?: string;
}

interface ApiResponse {
    deliveryToDoor?: Array<{
        providerKey: string;
        tariffs: Array<{
            tariffProviderId: string;
            tariffId: number;
            tariffName: string;
            from: string;
            deliveryCost: number;
            deliveryCostOriginal: number;
            feesIncluded: boolean | null;
            insuranceFee: number | null;
            cashServiceFee: number | null;
            calendarDaysMin: number;
            calendarDaysMax: number;
            pickupTypes: number[];
            deliveryTypes: number[];
        }>;
    }>;
    deliveryToPoint?: Array<{
        providerKey: string;
        tariffs: Array<{
            tariffProviderId: string;
            tariffId: number;
            tariffName: string;
            from: string;
            deliveryCost: number;
            deliveryCostOriginal: number;
            feesIncluded: boolean | null;
            insuranceFee: number | null;
            cashServiceFee: number | null;
            calendarDaysMin: number;
            calendarDaysMax: number;
            pickupTypes: number[];
            deliveryTypes: number[];
            pointIds: number[];
        }>;
    }>;
}

const CalcPage: React.FC = () => {
    const router = useRouter();
    const searchParams = useSearchParams();

    const [fromCity, setFromCity] = useState<string>("");
    const [toCity, setToCity] = useState<string>("");
    const [cargoList, setCargoList] = useState<CargoDetails[]>([
        {
            length: 0,
            width: 0,
            height: 0,
            weight: 0,
            count: 1,
            description: "",
        },
    ]);
    const [sortBy, setSortBy] = useState<string>("price-asc");
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [selectedCompanies, setSelectedCompanies] = useState<string[]>([]);
    const [isFilterOpen, setIsFilterOpen] = useState<boolean>(true);
    const [endDate, setEndDate] = useState<string>("");
    const [highlightBest, setHighlightBest] = useState<boolean>(true);
    const [apiResult, setApiResult] = useState<DeliveryOption[] | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const itemsPerPage = 10;

    useEffect(() => {
        const dataParam = searchParams.get("data");

        if (dataParam) {
            try {
                const decodedData = decodeURIComponent(dataParam);
                const parsedData: ParsedData = JSON.parse(decodedData);
                setFromCity(parsedData.from?.city || "");
                setToCity(parsedData.to?.city || "");
                setCargoList(
                    parsedData.cargoList && Array.isArray(parsedData.cargoList)
                        ? parsedData.cargoList
                        : [
                            {
                                length: 0,
                                width: 0,
                                height: 0,
                                weight: 0,
                                count: 1,
                                description: "",
                            },
                        ]
                );
                setEndDate(parsedData.endDate || "");
            } catch (error) {
                console.error("Ошибка парсинга JSON:", error);
                setFromCity("");
                setToCity("");
                setCargoList([
                    {
                        length: 0,
                        width: 0,
                        height: 0,
                        weight: 0,
                        count: 1,
                        description: "",
                    },
                ]);
                setEndDate("");
            }
        }
    }, [searchParams]);

    useEffect(() => {
        if (apiResult) {
            setSelectedCompanies(apiResult.map((opt) => opt.name));
        }
    }, [apiResult]);

    const onSubmit = async () => {
        if (!fromCity || !toCity) {
            setError("Пожалуйста, выберите города отправления и назначения.");
            return;
        }

        try {
            setError(null);
            setIsLoading(true);

            const totalWeight = cargoList.reduce((sum, cargo) => sum + cargo.weight * cargo.count, 0);
            const totalDimensions = cargoList.reduce(
                (acc, cargo) => ({
                    length: Math.max(acc.length, cargo.length),
                    width: Math.max(acc.width, cargo.width),
                    height: acc.height + cargo.height * cargo.count,
                }),
                { length: 0, width: 0, height: 0 }
            );

            const response = await axios.post<ApiResponse>("http://localhost:8080/api/calc", {
                from: fromCity,
                to: toCity,
                places: cargoList.map((cargo) => ({
                    length: cargo.length,
                    width: cargo.width,
                    height: cargo.height,
                    weight: cargo.weight,
                })),
                weight: totalWeight,
                width: totalDimensions.width,
                height: totalDimensions.height,
                length: totalDimensions.length,
                assessedCost: 100,
                pickupDate: new Date().toISOString().split("T")[0],
                providerKeys: ["cdek", "dpd", "pecom", "hehe", "cse"],
            });

            const deliveryOptions = formatDeliveryOptions(response.data);
            setApiResult(deliveryOptions);
        } catch (err) {
            setError("Ошибка при расчёте стоимости доставки. Попробуйте снова.");
            console.error("API error:", err);
            setApiResult(null);
        } finally {
            setIsLoading(false);
            setCurrentPage(1);
        }
    };

    const handleSwapCities = () => {
        setFromCity(toCity);
        setToCity(fromCity);
    };

    const handleCompanyToggle = (company: string) => {
        setSelectedCompanies((prev) =>
            prev.includes(company)
                ? prev.filter((c) => c !== company)
                : [...prev, company]
        );
        setCurrentPage(1);
    };

    const resetFilters = () => {
        setSelectedCompanies(apiResult?.map((opt) => opt.name) || []);
        setSortBy("price-asc");
        setEndDate("");
        setHighlightBest(true);
        setCurrentPage(1);
    };

    const filteredOptions = (apiResult || []).filter((option) => {
        const optionDate = new Date(option.deliveryDate).getTime();
        const end = endDate ? new Date(endDate).getTime() : null;

        return (
            selectedCompanies.includes(option.name) &&
            (!end || optionDate <= end)
        );
    });

    const bestPriceOption = filteredOptions.reduce((best, option) => {
        return !best || option.price < best.price ? option : best;
    }, null as DeliveryOption | null);

    const bestDateOption = filteredOptions.reduce((best, option) => {
        const optionDate = new Date(option.deliveryDate).getTime();
        const bestDate = best
            ? new Date(best.deliveryDate).getTime()
            : Infinity;
        return !best || optionDate < bestDate ? option : best;
    }, null as DeliveryOption | null);

    const markedOptions = filteredOptions.map((option) => ({
        ...option,
        isBestPrice: highlightBest && option === bestPriceOption,
        isBestDate: highlightBest && option === bestDateOption,
    }));

    const sortedOptions = [...markedOptions].sort((a, b) => {
        if (highlightBest) {
            if (a.isBestPrice || a.isBestDate) return -1;
            if (b.isBestPrice || b.isBestDate) return 1;
        }
        if (sortBy === "price-asc") {
            return a.price - b.price;
        } else if (sortBy === "price-desc") {
            return b.price - a.price;
        } else if (sortBy === "date-asc") {
            return (
                new Date(a.deliveryDate).getTime() -
                new Date(b.deliveryDate).getTime()
            );
        } else if (sortBy === "date-desc") {
            return (
                new Date(b.deliveryDate).getTime() -
                new Date(a.deliveryDate).getTime()
            );
        }
        return 0;
    });

    const totalPages = Math.ceil(sortedOptions.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedOptions = sortedOptions.slice(
        startIndex,
        startIndex + itemsPerPage
    );

    const handlePageChange = (page: number) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    return (
        <>
            <Header />
            <section className={styles.heroSection} style={{ padding: "1rem 0" }}>
                <div className="container">
                    <InputForm
                        fromCity={fromCity}
                        setFromCity={setFromCity}
                        toCity={toCity}
                        setToCity={setToCity}
                        cargoList={cargoList}
                        setCargoList={setCargoList}
                        onSubmit={onSubmit}
                        handleSwapCities={handleSwapCities}
                    />
                    {isLoading && (
                        <div
                            style={{
                                position: "fixed",
                                top: 0,
                                left: 0,
                                width: "100vw",
                                height: "100vh",
                                backgroundColor: "rgba(0, 0, 0, 0.5)",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                zIndex: 9999,
                            }}
                        >
                            <div
                                style={{
                                    border: "4px solid #f3f3f3",
                                    borderTop: "4px solid var(--primary)",
                                    borderRadius: "50%",
                                    width: "40px",
                                    height: "40px",
                                    animation: "spin 1s linear infinite",
                                }}
                            ></div>
                            <style jsx>{`
                                @keyframes spin {
                                    0% {
                                        transform: rotate(0deg);
                                    }
                                    100% {
                                        transform: rotate(360deg);
                                    }
                                }
                            `}</style>
                        </div>
                    )}
                    {error && (
                        <div
                            style={{
                                marginTop: "1rem",
                                padding: "1rem",
                                backgroundColor: "var(--error-surface)",
                                borderRadius: "var(--bradius)",
                                color: "var(--error)",
                                fontFamily: "var(--font-main)",
                                textAlign: "center",
                            }}
                        >
                            <p>{error}</p>
                        </div>
                    )}
                    <div className="row">
                        <div className="col-xs-12 col-md-4 col-lg-3">
                            <Filters
                                isFilterOpen={isFilterOpen}
                                setIsFilterOpen={setIsFilterOpen}
                                endDate={endDate}
                                setEndDate={setEndDate}
                                highlightBest={highlightBest}
                                setHighlightBest={setHighlightBest}
                                selectedCompanies={selectedCompanies}
                                handleCompanyToggle={handleCompanyToggle}
                                resetFilters={resetFilters}
                                deliveryOptions={apiResult || []}
                            />
                        </div>
                        <div className="col-xs-12 col-md-8 col-lg-9">
                            <Results
                                sortBy={sortBy}
                                setSortBy={setSortBy}
                                paginatedOptions={paginatedOptions}
                                highlightBest={highlightBest}
                                totalPages={totalPages}
                                currentPage={currentPage}
                                handlePageChange={handlePageChange}
                            />
                        </div>
                    </div>
                </div>
            </section>
            <MapSection />
            <Footer />
        </>
    );
};

export default CalcPage;