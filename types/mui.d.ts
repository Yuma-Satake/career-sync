// eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
import { ButtonPropsSizeOverrides } from '@mui/material/Button/Button';

declare module '@mui/material/styles/createTheme' {
  export interface Theme {
    imageTheme: {
      iconFileName: string;
      iconKey: string;
      imageUrl: string;
      iconUrl: string;
    };
  }
  export interface ThemeOptions {
    imageTheme?: {
      iconFileName?: string;
      iconKey?: string;
      imageUrl?: string;
      iconUrl?: string;
    };
  }
}

declare module '@mui/material/Button/Button' {
  interface ButtonPropsSizeOverrides {
    extLarge: true;
  }
}
