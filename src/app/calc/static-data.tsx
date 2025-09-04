export interface DeliveryOption {
    logo: string;
    name: string;
    deliveryDate: string;
    price: number;
    isBestPrice?: boolean;
    isBestDate?: boolean;
}

// Статические данные стран и городов
export const countries = {
    Russia: ["Moscow", "Saint Petersburg", "Novosibirsk"],
    USA: ["New York", "Los Angeles", "Chicago", "Houston", "Phoenix"],
    Germany: ["Berlin", "Munich", "Hamburg"],
};

// Словарь служб доставки
export const deliveryProviders = [
    {
        key: "cdek",
        name: "СДЭК",
        logo: "https://yandex-images.clstorage.net/Dl4iv7284/0294cd_p/xvyR7u35leEwErY30wBppXO2tYM7t_wOtGa0YfbJfMsZugTkWcL6IPrtS0s38fRupHfAmI2oF1GY9ZoxnZiOWKP49G_JPeGQ5VeydhZA6ZUjl2BXCqY5rvG3EEQ2TXzrmUoBkjpQ-AKcf9gM5dNDGhETZDmbPoYjjBAqlbuYiD8m3lD_XLr1lLKiBjEDgAv0E4ajklhG6GyC9UUm1h9rCa3txbMrAUhjn59pDsdjsugj9zV6Sa-DEN7x2rd4mblfpc1Dv2y4J-cgcsQCAHDLlbKVwdNrNtlsMRc1pKWsigs__4ci6tPasF1NyzzFYfG4w6T2Wkn9EuCscnoUq9obfHW-cQzfidQFcNDV0SJB6NejtmBSW0eJzBKUFkcmHQo5vI9lAFvwmiGtvCodB-DwuPIEJAiKrVLAXGI6FFqoOCxVTQCe_Jg3tkIxtXFiwUmEEpazULmU2ryAhqaHpqyL6R4Od5E5wEuz_1xKfrfQcwvCF0eJuB4TMU-Sq3T6qclMlk8xv72INqShk2dyEaLZ1jEGIMCKZymuYYa2lQTd-_pcbGUhGpK7Ah-_ez0ls_DroXfGiGpNAYCfw6tF6fo5v3V_oH2Mm5V1AZJ2IdAQqZQghFDBasYKnEPXpYeEXggqDDxXM_nB2SCP_Tpe1bMjiTHUJ2m4jeBivaDY9XlbyT0F7uL-jYn2VHDTtGHSwynV8odyY3vVGZ4Ap6R25iwZGt4sN7L7EqriDSx77gYy8JkQN5YL-c4xsNwCiUeoGNsspd6DD_1ZpadS0Vdyc5N614L0I-MaRHo8cJaHF0T8aUnO7yXiubF7AP-t2f1F01PbAiU2mfvcIjP_4Fl2WkkrL7fNEzw92Ef3shLEMkAQCcVzRWIiWcRavaKkVWQ3PMhprr-mEorgSkKP_aofRePC6yPl1jmJvZLTj2Ko5qn5iX0XnLNPTOqGt-KwF1NjgIuVESdD8LiW-b4TV2aHVo4IQ",
    },
    {
        key: "pecom",
        name: "ПЭК",
        logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5_n9aGKRv5cx_7EMBX-1TS0KuHFrWS7Mn1g&s",
    },
    {
        key: "hehe",
        name: "Авито",
        logo: "https://avatars.mds.yandex.net/i?id=5f8c594ce037be0ed6cfd40663547834_l-5910627-images-thumbs&n=13",
    },
    {
        key: "cse",
        name: "CSE",
        logo: "https://yandex-images.clstorage.net/Dl4iv7284/0294cd_p/xvyR7u35leEwErY30wBppXO2tYM7t_wOtGa0YfaJWT456iHEzJe6UOoYS3t3hIR-EUKVCK2YVxRIcOo0yzmaOeOopPrYnfGhAFInE0LBTZRzZmGz-tLY7vCTlMHziUqojo0GgjtRyILNH8q-Y0DwqHLzh1moXbNynVOYRNtpq-xkrLCdzRmG5MCwRiNTAojGk7ejwLiHug6ihHb1VE1rud89Z4Hb4Mqgfe44jIcRs3rj9rQLSa2RsZxi-MfIeuvcZn7DDx3btecwcCeCQGDJ9eOGo3Na9zh9EWV0Z0YP-ngNr7RDCUL4on-taGzU0pN6sWdEecoNMmLfwNsXu0hYb1eNIV-_ymbFAVNlk2PBSMWS1gNQ2dTb_qDlRuQ27djJLu8ls_ij2WD-rGhddADBueEnZInaTTKTreOLN0g5ykxGbpJtXqrGhYHyNiJDEkonQYVzwstkG34RZJZGt_9Jqx4-t-EYw7rQzi_bbWdjQItSZpWaKtxSM6wS6_RKCOsNVm-Ajvx4xfbiYmQB04HaFLJ2YSPLdAncYBSFBNXt-YhMzgYB-_L5Qq2sOw4H4kFZAXQkSnvcYyD_4hgXepkpPEXMUS79aZY3UBImEFHx2_QTVVMBmmcbXOPnVVSF3-trH6wkkbmzmrKtf1mepAOgi8GVxmgYr9OwXhKaZ-vbqj1Xr3BfvKvWNYOSZ8JS03nlAEZRQupm6j6R9mWGlb9qaczf5hNo8iphLKxJv0eywsqCRBQJuv5hYR0Ai8fbultNh_yDfb5IxZTTwWWyIYL5hJEl8zLbRYucQYY2llatOitvDgTh6VA5Is0PC61VElDIkFeXKlguUJNM8IjVyCpojQYe051924WnULJ3Q5DDOMcRBXLg6Zf474EnFvYGLsoYPj9Gkbkj2yL9njuMlfLwuvHnd1ra38Bg_FLadZmKG_w035PN3wjkhMAwJyHy4uomQ6ZxURqkG44z5zc0d97IQ",
    },
    {
        key: "dpd",
        name: "DPD",
        logo: "https://avatars.mds.yandex.net/i?id=59af825fbb58240975304376ff75f26d_sr-5523609-images-thumbs&n=13",
    },
];

// Функция для форматирования DeliveryOption
export const formatDeliveryOptions = (
    apiResponse: {
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
): DeliveryOption[] => {
    const deliveryOptions: DeliveryOption[] = [];

    // Функция для получения данных провайдера
    const getProviderInfo = (providerKey: string) => {
        const provider = deliveryProviders.find((p) => p.key === providerKey);
        return provider || {
            key: providerKey,
            name: providerKey.toUpperCase(), // Заглушка для неизвестных провайдеров
            logo: "/logos/default.png", // Заглушка для логотипа
        };
    };

    // Обработка deliveryToDoor
    apiResponse.deliveryToDoor?.forEach((provider) => {
        const providerInfo = getProviderInfo(provider.providerKey);
        provider.tariffs.forEach((tariff) => {
            const deliveryDate = new Date();
            deliveryDate.setDate(deliveryDate.getDate() + tariff.calendarDaysMax);
            deliveryOptions.push({
                logo: providerInfo.logo,
                name: providerInfo.name,
                deliveryDate: deliveryDate.toISOString().split("T")[0],
                price: tariff.deliveryCost,
            });
        });
    });

    // Обработка deliveryToPoint
    apiResponse.deliveryToPoint?.forEach((provider) => {
        const providerInfo = getProviderInfo(provider.providerKey);
        provider.tariffs.forEach((tariff) => {
            const deliveryDate = new Date();
            deliveryDate.setDate(deliveryDate.getDate() + tariff.calendarDaysMax);
            deliveryOptions.push({
                logo: providerInfo.logo,
                name: providerInfo.name,
                deliveryDate: deliveryDate.toISOString().split("T")[0],
                price: tariff.deliveryCost,
            });
        });
    });

    return deliveryOptions;
};