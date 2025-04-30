export interface Info {
    category: string;
    endpoint: string;
}

export interface GetRandomCat {
    success: boolean;
    status: number;
    info: Info;
    message: string;
}

/**
 * Fetches a random cat image from the API.
 * @returns A promise that resolves to a random fox object on success.
 * @throws If the request fails, the response is invalid, or JSON parsing fails.
 */
export function getRandomCat(): Promise<GetRandomCat>;