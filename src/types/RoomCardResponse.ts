export interface RoomCardResponse {
    totalRoomCards:      number;
    propertyInformation: PropertyInformation;
    roomCards:           RoomCardIndividual[];
}
export interface PropertyInformation {
    contactNumber:   string;
    propertyAddress: string;
    propertyName:    string;
}

export interface RoomCardIndividual {
    roomTypeId:                      number;
    roomTypeName:                    string;
    singleBed:                       number;
    maxCapacity:                     number;
    doubleBed:                       number;
    areaInSquareFeet:                number;
    price:                           number;
    roomCount:                       number;
    arrayOfImages:                   string[];
    lowQualityImages:                string[];
    rating:                          number;
    reviewCount:                     number;
    priceOfRoomTypeInParticularDate: { [key: string]: number };
    amenitiesOfRoom:                 any[];
    description:                     string;
    newProperty:                     boolean;
}
