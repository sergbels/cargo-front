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

interface CargoInputInlineProps extends AppComponentProps {
    label?: string;
    cargoList: CargoDetails[];
    setCargoList: React.Dispatch<React.SetStateAction<CargoDetails[]>>;
}

export const CargoInputInline: React.FC<CargoInputInlineProps> = ({
    label,
    sx,
    cargoList,
    setCargoList,
}) => {
    const [displayValue, setDisplayValue] = useState<string>("");
    const [saveToMyCargo, setSaveToMyCargo] = useState(false);

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

    const handleAddCargo = () => {
        setCargoList((prev) => [
            ...prev,
            { length: 0, width: 0, height: 0, weight: 0, count: 1, description: "" },
        ]);
    };

    const handleClearCargo = () => {
        setCargoList([{ length: 0, width: 0, height: 0, weight: 0, count: 1, description: "" }]);
    };

    const handleRemoveCargo = (index: number) => {
        setCargoList((prev) => prev.filter((_, i) => i !== index));
    };

    const handleInputChange = (
        index: number,
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setCargoList((prev) =>
            prev.map((cargo, i) =>
                i === index
                    ? {
                          ...cargo,
                          [name]: name === "description" ? value : parseFloat(value) || 0,
                      }
                    : cargo
            )
        );
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
            <div className={styles.summary}>
                <input
                    type="text"
                    value={displayValue}
                    readOnly
                    className={styles.input}
                    placeholder="Габариты груза"
                />
            </div>
            <div className={styles.cargoContainer}>
                {cargoList.map((cargo, index) => (
                    <div key={index} className={styles.cargoRow}>
                        <div className={styles.dimensionsGroup}>
                            <div className={styles.inputGroup}>
                                <label className={styles.modalLabel}>Длина (см)</label>
                                <input
                                    type="number"
                                    name="length"
                                    value={cargo.length || ""}
                                    onChange={(e) => handleInputChange(index, e)}
                                    className={styles.modalInput}
                                    min="0"
                                    step="1"
                                />
                            </div>
                            <div className={styles.inputGroup}>
                                <label className={styles.modalLabel}>Ширина (см)</label>
                                <input
                                    type="number"
                                    name="width"
                                    value={cargo.width || ""}
                                    onChange={(e) => handleInputChange(index, e)}
                                    className={styles.modalInput}
                                    min="0"
                                    step="1"
                                />
                            </div>
                            <div className={styles.inputGroup}>
                                <label className={styles.modalLabel}>Высота (см)</label>
                                <input
                                    type="number"
                                    name="height"
                                    value={cargo.height || ""}
                                    onChange={(e) => handleInputChange(index, e)}
                                    className={styles.modalInput}
                                    min="0"
                                    step="1"
                                />
                            </div>
                            <div className={`${styles.inputGroup} ${styles.weightInput}`}>
                                <label className={styles.modalLabel}>Вес (кг)</label>
                                <input
                                    type="number"
                                    name="weight"
                                    value={cargo.weight || ""}
                                    onChange={(e) => handleInputChange(index, e)}
                                    className={styles.modalInput}
                                    min="0"
                                    step="0.1"
                                />
                            </div>
                            <div className={`${styles.inputGroup} ${styles.countInput}`}>
                                <label className={styles.modalLabel}>Места</label>
                                <input
                                    type="number"
                                    name="count"
                                    value={cargo.count || 1}
                                    onChange={(e) => handleInputChange(index, e)}
                                    className={styles.modalInput}
                                    min="1"
                                    step="1"
                                />
                            </div>
                        </div>
                        <div className={styles.descriptionGroup}>
                            <label className={styles.modalLabel}>Описание</label>
                            <div style={{ display: "flex", gap: "0.5rem" }}>
                                <textarea
                                    name="description"
                                    value={cargo.description || ""}
                                    onChange={(e) => handleInputChange(index, e)}
                                    className={styles.modalTextarea}
                                    placeholder="Введите описание груза"
                                />
                                {cargoList.length > 1 && (
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
                                )}
                            </div>
                        </div>
                    </div>
                ))}
                <div className={styles.buttonGroup}>
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
                        Мест: {calculateTotalCargoCount()} | Объём: {calculateTotalVolume()} см³ | Вес: {calculateTotalWeight()} кг
                    </p>
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
                    <Link href="/mycargo" className={styles.myCargoLink}>
                        Мои грузы
                    </Link>
                </div>
            </div>
        </div>
    );
};