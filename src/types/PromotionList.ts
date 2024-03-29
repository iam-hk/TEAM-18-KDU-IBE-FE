
export interface GlobalPromotions {
    highestPromotion:        Promotion;
    allApplicablePromotions: Promotion[];
}

export interface Promotion {
    promotionId:          number;
    minimumDaysOfStay:    number;
    promotionTitle:       string;
    promotionDescription: string;
    priceFactor:          number;
}

export interface SuccessfulCustomPromo {
    promotionName:        string;
    promotionDescription: string;
    priceFactor:          number;
}
