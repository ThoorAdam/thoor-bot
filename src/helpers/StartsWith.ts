export const startsWith = (checkFor: string | string[], checkIn: string): boolean => {
    if (Array.isArray(checkFor)) {
        let found = false;

        for (const key of checkFor) {
            if (checkIn.charAt(0) === key) {
                found = true;

                break;
            }
        }

        return found;
    } else if (checkIn.charAt(0) === checkFor) {
        return true;
    }

    return false;
};
