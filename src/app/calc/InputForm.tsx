import { Button } from "@/components/button/button";
import { CityInput } from "@/components/city-input/city-input";
import { CargoInput, CargoDetails } from "@/components/cargo-input/cargo-input";

interface InputFormProps {
    fromCity: string;
    setFromCity: (value: string) => void;
    toCity: string;
    setToCity: (value: string) => void;
    cargoList: CargoDetails[];
    setCargoList: (value: CargoDetails[]) => void;
    onSubmit: () => void;
    handleSwapCities: () => void;
}

const InputForm: React.FC<InputFormProps> = ({
    fromCity,
    setFromCity,
    toCity,
    setToCity,
    cargoList,
    setCargoList,
    onSubmit,
    handleSwapCities,
}) => {
    return (
        <>
            <style jsx>{`
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
                    .form-container {
                        position: sticky;
                        top: 1rem;
                        z-index: 1000;
                        width: 100%;
                    }
                }
            `}</style>
            <div className="row form-container">
                <div className="col-xs-12">
                    <div
                        style={{
                            marginLeft: "-16px",
                            marginRight: "-32px",
                            boxShadow: "var(--shadow)",
                            padding: "1rem 1.5rem",
                            backgroundColor: "var(--surface)",
                            marginBottom: "2rem",
                        }}
                    >
                        <div className="form-row">
                            <div className="form-col">
                                <CityInput
                                    onChange={(city) => setFromCity(city)}
                                    value={fromCity}
                                    label={"Откуда"}
                                    placeholder={"Введите город отправления"}
                                    sx={{ width: "100%" }}
                                />
                            </div>
                            <div className="swap-button-col">
                                <Button
                                    onClick={handleSwapCities}
                                    sx={{
                                        padding: "0.5rem",
                                        backgroundColor: "var(--surface)",
                                        border: "1px solid var(--border)",
                                        color: "var(--onsurface)",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        alignContent: "center",
                                        width: "40px",
                                        height: "40px",
                                        borderRadius: "var(--bradius-sm)",
                                    }}
                                >
                                    <svg
                                        width="40px"
                                        height="40px"
                                        viewBox="0 0 64 64"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        stroke="#000000"
                                    >
                                        <polyline points="32 24 40 24 40 16 56 28 40 40 40 32 24 32 24 24 8 36 24 48 24 40 32 40" />
                                    </svg>
                                </Button>
                            </div>
                            <div className="form-col">
                                <CityInput
                                    onChange={(city) => setToCity(city)}
                                    value={toCity}
                                    label={"Куда"}
                                    placeholder={"Введите город назначения"}
                                    sx={{ width: "100%" }}
                                />
                            </div>
                            <div
                                className="form-col"
                                style={{
                                    display: "flex",
                                    justifyContent: "end",
                                }}
                            >
                                <CargoInput
                                    cargoList={cargoList}
                                    setCargoList={setCargoList}
                                    label="Груз"
                                    sx={{ width: "100%" }}
                                />
                            </div>
                            <div
                                className="form-col"
                                style={{
                                    display: "flex",
                                    alignItems: "flex-end",
                                }}
                            >
                                <Button
                                    onClick={onSubmit}
                                    sx={{
                                        width: "100%",
                                        height: "fit-content",
                                    }}
                                >
                                    Рассчитать
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default InputForm;