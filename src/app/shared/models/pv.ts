import { PanelType } from './panel-type';

export interface Pv {
  company: {
    name: string;
    siren: string;
  },
  customer: {
    name: string;
    phone_number: string;
    email: string;
  },
  installation_date: string;
  nb_panel: number;
  type: PanelType;
  address: string;
}
