// export interface PropertyConfig {
//     showRoomSearch:       boolean;
//     showGuestSearch:      boolean;
//     showDisabilityOption: boolean;
//     promocode:            string[];
//     guests:               Guest[];
//     bedType:              boolean;
//     roomType:             boolean;
//     maxBeds:              number;
//     maxCards:             number;
//     sorting:              Sorting[];
//     filters:              Filter[];
// }

export interface Filter {
    filterTitle: string;
    options:     string[];
}
export interface Sorting {
    sortDisplayName: string;
    variable:        string;
    order:           boolean;
}

export interface IDropDownSort{
    sorts : Sorting[]
}