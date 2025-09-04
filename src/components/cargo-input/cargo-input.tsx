import React, { useState, useEffect } from "react";
import Link from "next/link";
import styles from "./component.module.css";
import { AppComponentProps } from "@/common";
import { Button } from "@/components/button/button";

export interface CargoDetails {
    length: number;
    width: number;
    height: number;
    weight: number;
    count: number;
    description?: string;
}

interface CargoInputProps extends AppComponentProps {
    label?: string;
    cargoList: CargoDetails[];
    setCargoList: (value: CargoDetails[]) => void;
}

export const CargoInput: React.FC<CargoInputProps> = ({
    label,
    sx,
    cargoList,
    setCargoList,
}) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [displayValue, setDisplayValue] = useState<string>("");
    const [saveToMyCargo, setSaveToMyCargo] = useState(false);

    // Формирование строки для отображения на основе cargoList
    useEffect(() => {
        const validCargos = cargoList.filter(
            (cargo) =>
                cargo.length > 0 &&
                cargo.width > 0 &&
                cargo.height > 0 &&
                cargo.weight > 0 &&
                cargo.count > 0
        );

        if (validCargos.length === 0) {
            setDisplayValue("");
            return;
        }

        const totalCount = validCargos.reduce(
            (sum, cargo) => sum + cargo.count,
            0
        );
        const totalVolume = validCargos.reduce(
            (sum, cargo) => sum + cargo.length * cargo.width * cargo.height * cargo.count,
            0
        );
        const totalWeight = validCargos.reduce(
            (sum, cargo) => sum + cargo.weight * cargo.count,
            0
        );

        setDisplayValue(
            `Мест: ${totalCount} | Объём: ${totalVolume} см³ | Вес: ${totalWeight} кг`
        );
    }, [cargoList]);

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleAddCargo = () => {
        setCargoList([
            ...cargoList,
            { length: 0, width: 0, height: 0, weight: 0, count: 1, description: "" },
        ]);
    };

    const handleClearCargo = () => {
        setCargoList([{ length: 0, width: 0, height: 0, weight: 0, count: 1, description: "" }]);
    };

    const handleRemoveCargo = (index: number) => {
        setCargoList(cargoList.filter((_, i) => i !== index));
    };

    const handleInputChange = (
        index: number,
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setCargoList(
            cargoList.map((cargo, i) =>
                i === index
                    ? {
                        ...cargo,
                        [name]:
                            name === "description" ? value : parseFloat(value) || 0,
                    }
                    : cargo
            )
        );
    };

    const handleSave = () => {
        const validCargos = cargoList.filter(
            (cargo) =>
                cargo.length > 0 &&
                cargo.width > 0 &&
                cargo.height > 0 &&
                cargo.weight > 0 &&
                cargo.count > 0
        );

        if (validCargos.length === 0) {
            setCargoList([
                { length: 0, width: 0, height: 0, weight: 0, count: 1, description: "" },
            ]);
            setIsModalOpen(false);
            return;
        }

        setCargoList(validCargos);
        setIsModalOpen(false);
        // Здесь можно добавить логику для сохранения в "Мои грузы", если saveToMyCargo === true
    };

    const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) {
            handleCloseModal();
        }
    };

    const calculateTotalVolume = () => {
        return cargoList.reduce(
            (sum, cargo) =>
                sum + (cargo.length * cargo.width * cargo.height * cargo.count || 0),
            0
        );
    };

    const calculateTotalWeight = () => {
        return cargoList.reduce(
            (sum, cargo) => sum + (cargo.weight * cargo.count || 0),
            0
        );
    };

    const calculateTotalCargoCount = () => {
        return cargoList.reduce(
            (sum, cargo) => sum + (cargo.count > 0 ? cargo.count : 0),
            0
        );
    };

    return (
        <div className={styles.container} style={sx}>
            {label && <label className={styles.label}>{label}</label>}
            <input
                type="text"
                value={displayValue}
                onClick={handleOpenModal}
                readOnly
                className={styles.input}
                placeholder="Нажмите, чтобы указать габариты"
            />
            {isModalOpen && (
                <div
                    className={styles.modalBackdrop}
                    onClick={handleBackdropClick}
                >
                    <div className={styles.modal}>
                        <button
                            className={styles.closeButton}
                            onClick={handleCloseModal}
                        >
                            ✕
                        </button>
                        <div className={styles.modalHeader}>
                            <h3 className={styles.modalTitle}>
                                Укажите габариты груза
                            </h3>
                            <Link href="/mycargo" className={styles.myCargoLink}>
                                Мои грузы
                            </Link>
                        </div>
                        <div className={styles.modalContent}>
                            {cargoList.map((cargo, index) => (
                                <div key={index} className={styles.cargoRow}>
                                    <div className={styles.dimensionsGroup}>
                                        <div className={styles.inputGroup}>
                                            <label className={styles.modalLabel}>
                                                Длина (см)
                                            </label>
                                            <input
                                                type="number"
                                                name="length"
                                                value={cargo.length || ""}
                                                onChange={(e) =>
                                                    handleInputChange(index, e)
                                                }
                                                className={styles.modalInput}
                                                min="0"
                                                step="1"
                                            />
                                        </div>
                                        <div className={styles.inputGroup}>
                                            <label className={styles.modalLabel}>
                                                Ширина (см)
                                            </label>
                                            <input
                                                type="number"
                                                name="width"
                                                value={cargo.width || ""}
                                                onChange={(e) =>
                                                    handleInputChange(index, e)
                                                }
                                                className={styles.modalInput}
                                                min="0"
                                                step="1"
                                            />
                                        </div>
                                        <div className={styles.inputGroup}>
                                            <label className={styles.modalLabel}>
                                                Высота (см)
                                            </label>
                                            <input
                                                type="number"
                                                name="height"
                                                value={cargo.height || ""}
                                                onChange={(e) =>
                                                    handleInputChange(index, e)
                                                }
                                                className={styles.modalInput}
                                                min="0"
                                                step="1"
                                            />
                                        </div>
                                        <div className={`${styles.inputGroup} ${styles.weightInput}`}>
                                            <label className={styles.modalLabel}>
                                                Вес (кг)
                                            </label>
                                            <input
                                                type="number"
                                                name="weight"
                                                value={cargo.weight || ""}
                                                onChange={(e) =>
                                                    handleInputChange(index, e)
                                                }
                                                className={styles.modalInput}
                                                min="0"
                                                step="0.1"
                                            />
                                        </div>
                                        <div className={`${styles.inputGroup} ${styles.countInput}`}>
                                            <label className={styles.modalLabel}>
                                                Места
                                            </label>
                                            <input
                                                type="number"
                                                name="count"
                                                value={cargo.count || 1}
                                                onChange={(e) =>
                                                    handleInputChange(index, e)
                                                }
                                                className={styles.modalInput}
                                                min="1"
                                                step="1"
                                            />
                                        </div>
                                    </div>
                                    <div className={styles.weightCountGroup}>
                                        <div className={styles.inputGroup}>
                                            <label className={styles.modalLabel}>
                                                Вес (кг)
                                            </label>
                                            <input
                                                type="number"
                                                name="weight"
                                                value={cargo.weight || ""}
                                                onChange={(e) =>
                                                    handleInputChange(index, e)
                                                }
                                                className={styles.modalInput}
                                                min="0"
                                                step="0.1"
                                            />
                                        </div>
                                        <div className={styles.inputGroup}>
                                            <label className={styles.modalLabel}>
                                                Места
                                            </label>
                                            <input
                                                type="number"
                                                name="count"
                                                value={cargo.count || 1}
                                                onChange={(e) =>
                                                    handleInputChange(index, e)
                                                }
                                                className={styles.modalInput}
                                                min="1"
                                                step="1"
                                            />
                                        </div>
                                    </div>
                                    <div className={styles.descriptionGroup}>
                                        <label className={styles.modalLabel}>
                                            Описание
                                        </label>
                                        <div style={{ display: "flex", gap: "1rem" }}>
                                            <textarea
                                                name="description"
                                                value={cargo.description || ""}
                                                onChange={(e) =>
                                                    handleInputChange(index, e)
                                                }
                                                className={styles.modalTextarea}
                                                placeholder="Введите описание груза"
                                            />

                                            {cargoList.length > 1 && (
                                                <div className={styles.removeButtonContainer}>
                                                    <button
                                                        className={styles.removeButton}
                                                        onClick={() => handleRemoveCargo(index)}
                                                        aria-label="Удалить груз"
                                                    >
                                                        <svg
                                                            width="20"
                                                            height="20"
                                                            viewBox="0 0 24 24"
                                                            fill="none"
                                                            stroke="currentColor"
                                                            strokeWidth="2"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                        >
                                                            <path d="M3 6h18" />
                                                            <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                                                            <path d="M3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6" />
                                                            <path d="M10 11v6" />
                                                            <path d="M14 11v6" />
                                                        </svg>
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                            <div
                                className={styles.buttonGroup}
                                style={{
                                    display: "flex",
                                    flexWrap: "nowrap",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    gap: "1rem",
                                }}
                            >
                                <Button
                                    variant="secondary"
                                    onClick={handleAddCargo}
                                    sx={{ width: "100%" }}
                                >
                                    Добавить груз
                                </Button>
                                <button
                                    className={styles.removeButton}
                                    onClick={handleClearCargo}
                                    style={{ width: "30px", height: "30px" }}
                                >
                                    ✕
                                </button>
                            </div>
                            <div className={styles.summary}>
                                <p>
                                    Мест: {calculateTotalCargoCount()} | Объём:{" "}
                                    {calculateTotalVolume()} см³ | Вес:{" "}
                                    {calculateTotalWeight()} кг
                                </p>
                            </div>
                        </div>
                        <div className={styles.modalActions}>
                            <div className={styles.checkboxContainer}>
                                <input
                                    type="checkbox"
                                    id="saveToMyCargo"
                                    checked={saveToMyCargo}
                                    onChange={(e) => setSaveToMyCargo(e.target.checked)}
                                    className={styles.checkbox}
                                />
                                <label htmlFor="saveToMyCargo" className={styles.checkboxLabel}>
                                    Сохранить в мои грузы
                                </label>
                            </div>
                            <Button variant="primary" onClick={handleSave}>
                                Рассчитать
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};