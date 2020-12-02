import chalk from 'chalk';

export const logger = {
    info: (title: string, message: any) => console.info(`${chalk.green(`[${title}]`)} - ${message}`),
    error: (title: string, err: string | Error) => console.error(`${chalk.red(`[${title}]`)} - ${err}`),
};
