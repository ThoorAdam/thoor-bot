import { Environment } from '../enums';

export const env = {
    asString: (key: Environment): string => {
        const value = process.env[key] || '';

        return value;
    },
    asNumber: (key: Environment): number => {
        const value = process.env[key] || '';

        return parseInt(value, 10);
    },
    asBoolean: (key: Environment): boolean => {
        if (env.asNumber(key) >= 1) {
            return true;
        }

        return false;
    },
};
