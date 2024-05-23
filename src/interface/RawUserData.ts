export interface RawUserData {
    picture: { medium: string };
    name: { title: string; first: string; last: string };
    gender: string;
    location: { country: string };
    dob: { date: string };
    email: string;
    phone: string;
}
