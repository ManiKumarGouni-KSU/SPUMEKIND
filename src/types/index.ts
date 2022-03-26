export enum PageName {
    LANDING = '',
    SIGIN = '',
    DASHBOARD = 'User Profile', 
    SWIPRCARD = 'Swipe Card',
    
}
declare module '@mui/material/styles' {
    interface TypographyVariants {
        guideline: React.CSSProperties;
    }

    // allow configuration using `createTheme`
    interface TypographyVariantsOptions {
        guideline?: React.CSSProperties;
    }
}
export type UserData = {
    firstName: string;
    lastName: string;
    email: string;
    photoURL: string;
    gender: string;
    age: number;
    displayname: string;
    interests: string[];
    description: string;
} | null;

export interface UserSaveFormData {
    firstName: string;
    lastName: string;
    email: string;
    photoURL: string;
    gender: string;
    age: number;
    dispalyName: string;
    interests: string[];
    description: string;
    
}