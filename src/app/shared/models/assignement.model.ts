import {Eleve} from "./eleve.model";
import {Matiere} from "./matiere.model";

export class Assignment {
  _id?: string;
  id?: number;
  nom?: string;
  dateRendu?: Date;
  rendu?: boolean;
  note?: number;
  matiere?: Matiere; // Référence à la matière
  eleve?: Eleve; // Référence à l'élève
}
