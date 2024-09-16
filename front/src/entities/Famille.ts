import Article from "./Article";

interface Famille {
    id?: number;
    famille: string;
    articles?: Article[]; // Optional if you want to include related articles
}

export default Famille;