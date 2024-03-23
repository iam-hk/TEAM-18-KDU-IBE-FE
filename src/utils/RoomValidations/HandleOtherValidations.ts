export function validateOthers(id: string | null, bedCount: string | null): string {
    if (id === null || isNaN(parseInt(id))) {
        return "Invalid ID";
    }

    if (parseInt(id) !== 18) {
        return "ID should be equal to 18";
    }

    if (bedCount === null || isNaN(parseInt(bedCount))) {
        return "Invalid Bed Count";
    }

    if (parseInt(bedCount) < 0) {
        return "Bed Count should not be negative";
    }
    return "";
}
