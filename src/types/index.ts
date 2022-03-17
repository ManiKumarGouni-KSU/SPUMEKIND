export enum PageName {
    LANDING = '',
    SIGIN = '',
    
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
    displayName: string;
    email: string;
    photoURL: string;
    gender: string;
    hostileRating: number;
    levelOfExperience: number;
    peerRating: number;
    interests: string[];
} | null;