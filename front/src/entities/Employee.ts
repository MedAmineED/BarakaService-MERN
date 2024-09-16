interface Employee {
    id?: number;
    cin: string;
    nom: string;
    recrutement: Date;
    mobile: string;
    salaire: number;
    specialite?: number;
}

export default Employee;
