import { z } from 'zod';

export const demandeServiceSchema = z.object({
    matricule: z.string()
    .min(1, "Le matricule est requis")
    .regex(/^\d{1,3} TU \d{1,4}$/, "Le matricule doit être au format : (max 3 chiffres) TU (max 4 chiffres)"),
  marque: z.string().min(1, 'Marque est obligatoire'),
  employer: z.string().min(1, 'Employé est obligatoire'),
  heure_deb: z.string().min(1, 'Heure de début est obligatoire'),
  heure_fin: z.string().min(1, 'Heure de fin est obligatoire'),
  payer: z.number().min(0, 'Le montant payé ne peut pas être négatif'),
  prix_ttc: z.number().min(0, 'Le prix TTC ne peut pas être négatif'),
  lignedemande: z.array(z.any()).nonempty('Ligne de demande ne peut pas être vide'),
});


