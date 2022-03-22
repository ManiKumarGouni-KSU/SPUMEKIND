export enum PageName {
    LANDING = '',
    SIGIN = '',
    DASHBOARD = 'User Profile', 
    
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