import { RawUserData } from "../interface/RawUserData";

export const fetchData = async (): Promise<RawUserData[]> => {
    const response = await fetch('src/api/data.json');
    const data = await response.json();
    return data.results;
};
