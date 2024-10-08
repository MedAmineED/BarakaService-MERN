PGDMP      1                |            barakaservice    16.4    16.4 �   
           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false                       0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false                       0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false                       1262    26659    barakaservice    DATABASE     �   CREATE DATABASE barakaservice WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'French_France.1252';
    DROP DATABASE barakaservice;
                postgres    false            �            1259    26668    tarticle    TABLE     �  CREATE TABLE public.tarticle (
    id integer NOT NULL,
    identification character varying(255),
    designation character varying(255),
    qte integer,
    qte_min integer,
    qte_max integer,
    prix_achat double precision,
    prix_vente double precision,
    tva double precision,
    etat integer DEFAULT 1,
    inventaire integer DEFAULT 0,
    annee integer,
    "familleId" integer,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);
    DROP TABLE public.tarticle;
       public         heap    postgres    false            �            1259    26667    tarticle_id_seq    SEQUENCE     �   CREATE SEQUENCE public.tarticle_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 &   DROP SEQUENCE public.tarticle_id_seq;
       public          postgres    false    218                       0    0    tarticle_id_seq    SEQUENCE OWNED BY     C   ALTER SEQUENCE public.tarticle_id_seq OWNED BY public.tarticle.id;
          public          postgres    false    217            �            1259    26694    tcategorieservice    TABLE     g   CREATE TABLE public.tcategorieservice (
    id integer NOT NULL,
    libelle character varying(255)
);
 %   DROP TABLE public.tcategorieservice;
       public         heap    postgres    false            �            1259    26693    tcategorieservice_id_seq    SEQUENCE     �   CREATE SEQUENCE public.tcategorieservice_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 /   DROP SEQUENCE public.tcategorieservice_id_seq;
       public          postgres    false    222                       0    0    tcategorieservice_id_seq    SEQUENCE OWNED BY     U   ALTER SEQUENCE public.tcategorieservice_id_seq OWNED BY public.tcategorieservice.id;
          public          postgres    false    221            �            1259    58282    tdemandeservice    TABLE     2  CREATE TABLE public.tdemandeservice (
    id_dem integer NOT NULL,
    date_demande timestamp with time zone NOT NULL,
    matricule character varying(255) NOT NULL,
    conducteur character varying(255) NOT NULL,
    employer character varying(255) NOT NULL,
    heure_deb character varying(255) NOT NULL,
    heure_fin character varying(255) NOT NULL,
    client character varying(255) NOT NULL,
    bon_commande character varying(255) NOT NULL,
    prix_ttc double precision NOT NULL,
    payer integer NOT NULL,
    marque character varying(255) NOT NULL
);
 #   DROP TABLE public.tdemandeservice;
       public         heap    postgres    false            �            1259    58281    tdemandeservice_id_dem_seq    SEQUENCE     �   CREATE SEQUENCE public.tdemandeservice_id_dem_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 1   DROP SEQUENCE public.tdemandeservice_id_dem_seq;
       public          postgres    false    228                       0    0    tdemandeservice_id_dem_seq    SEQUENCE OWNED BY     Y   ALTER SEQUENCE public.tdemandeservice_id_dem_seq OWNED BY public.tdemandeservice.id_dem;
          public          postgres    false    227            �            1259    26687 	   temployee    TABLE     �  CREATE TABLE public.temployee (
    id integer NOT NULL,
    cin character varying(12),
    nom character varying(75) NOT NULL,
    recrutement timestamp with time zone NOT NULL,
    mobile character varying(12) NOT NULL,
    salaire double precision,
    specialite integer,
    etat integer DEFAULT 1,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);
    DROP TABLE public.temployee;
       public         heap    postgres    false            �            1259    26686    temployee_id_seq    SEQUENCE     �   CREATE SEQUENCE public.temployee_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 '   DROP SEQUENCE public.temployee_id_seq;
       public          postgres    false    220                       0    0    temployee_id_seq    SEQUENCE OWNED BY     E   ALTER SEQUENCE public.temployee_id_seq OWNED BY public.temployee.id;
          public          postgres    false    219            �            1259    26661    tfamille    TABLE     �   CREATE TABLE public.tfamille (
    id integer NOT NULL,
    famille character varying(255),
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);
    DROP TABLE public.tfamille;
       public         heap    postgres    false            �            1259    26660    tfamille_id_seq    SEQUENCE     �   CREATE SEQUENCE public.tfamille_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 &   DROP SEQUENCE public.tfamille_id_seq;
       public          postgres    false    216                       0    0    tfamille_id_seq    SEQUENCE OWNED BY     C   ALTER SEQUENCE public.tfamille_id_seq OWNED BY public.tfamille.id;
          public          postgres    false    215            �            1259    58291    tlignedemande    TABLE     �  CREATE TABLE public.tlignedemande (
    id_ligne integer NOT NULL,
    demande_srv integer,
    type character varying(255) NOT NULL,
    categorie character varying(255),
    element integer,
    reference character varying(255),
    designation character varying(255),
    prix double precision,
    tva double precision,
    remise double precision,
    quantite integer,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);
 !   DROP TABLE public.tlignedemande;
       public         heap    postgres    false            �            1259    58290    tlignedemande_id_ligne_seq    SEQUENCE     �   CREATE SEQUENCE public.tlignedemande_id_ligne_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 1   DROP SEQUENCE public.tlignedemande_id_ligne_seq;
       public          postgres    false    230                       0    0    tlignedemande_id_ligne_seq    SEQUENCE OWNED BY     Y   ALTER SEQUENCE public.tlignedemande_id_ligne_seq OWNED BY public.tlignedemande.id_ligne;
          public          postgres    false    229            �            1259    58305 	   tpaiement    TABLE     S  CREATE TABLE public.tpaiement (
    id_p integer NOT NULL,
    demande_srv integer,
    date_payement timestamp with time zone NOT NULL,
    numero_cheque character varying(255),
    date_cheque timestamp with time zone,
    banque character varying(255),
    payer boolean DEFAULT false NOT NULL,
    montant double precision NOT NULL
);
    DROP TABLE public.tpaiement;
       public         heap    postgres    false            �            1259    58304    tpaiement_id_p_seq    SEQUENCE     �   CREATE SEQUENCE public.tpaiement_id_p_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 )   DROP SEQUENCE public.tpaiement_id_p_seq;
       public          postgres    false    232                       0    0    tpaiement_id_p_seq    SEQUENCE OWNED BY     I   ALTER SEQUENCE public.tpaiement_id_p_seq OWNED BY public.tpaiement.id_p;
          public          postgres    false    231            �            1259    26701 	   tservices    TABLE     8  CREATE TABLE public.tservices (
    id integer NOT NULL,
    categorieid integer NOT NULL,
    libelle character varying(255) NOT NULL,
    pu double precision NOT NULL,
    remise double precision NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);
    DROP TABLE public.tservices;
       public         heap    postgres    false            �            1259    26700    tservices_id_seq    SEQUENCE     �   CREATE SEQUENCE public.tservices_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 '   DROP SEQUENCE public.tservices_id_seq;
       public          postgres    false    224                       0    0    tservices_id_seq    SEQUENCE OWNED BY     E   ALTER SEQUENCE public.tservices_id_seq OWNED BY public.tservices.id;
          public          postgres    false    223            �            1259    26723    tusers    TABLE     �   CREATE TABLE public.tusers (
    id integer NOT NULL,
    login character varying(255) NOT NULL,
    pwd character varying(255) NOT NULL
);
    DROP TABLE public.tusers;
       public         heap    postgres    false            �            1259    26722    tusers_id_seq    SEQUENCE     �   CREATE SEQUENCE public.tusers_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 $   DROP SEQUENCE public.tusers_id_seq;
       public          postgres    false    226                       0    0    tusers_id_seq    SEQUENCE OWNED BY     ?   ALTER SEQUENCE public.tusers_id_seq OWNED BY public.tusers.id;
          public          postgres    false    225            y           2604    26671    tarticle id    DEFAULT     j   ALTER TABLE ONLY public.tarticle ALTER COLUMN id SET DEFAULT nextval('public.tarticle_id_seq'::regclass);
 :   ALTER TABLE public.tarticle ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    218    217    218            ~           2604    26697    tcategorieservice id    DEFAULT     |   ALTER TABLE ONLY public.tcategorieservice ALTER COLUMN id SET DEFAULT nextval('public.tcategorieservice_id_seq'::regclass);
 C   ALTER TABLE public.tcategorieservice ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    221    222    222            �           2604    58285    tdemandeservice id_dem    DEFAULT     �   ALTER TABLE ONLY public.tdemandeservice ALTER COLUMN id_dem SET DEFAULT nextval('public.tdemandeservice_id_dem_seq'::regclass);
 E   ALTER TABLE public.tdemandeservice ALTER COLUMN id_dem DROP DEFAULT;
       public          postgres    false    228    227    228            |           2604    26690    temployee id    DEFAULT     l   ALTER TABLE ONLY public.temployee ALTER COLUMN id SET DEFAULT nextval('public.temployee_id_seq'::regclass);
 ;   ALTER TABLE public.temployee ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    219    220    220            x           2604    26664    tfamille id    DEFAULT     j   ALTER TABLE ONLY public.tfamille ALTER COLUMN id SET DEFAULT nextval('public.tfamille_id_seq'::regclass);
 :   ALTER TABLE public.tfamille ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    215    216    216            �           2604    58294    tlignedemande id_ligne    DEFAULT     �   ALTER TABLE ONLY public.tlignedemande ALTER COLUMN id_ligne SET DEFAULT nextval('public.tlignedemande_id_ligne_seq'::regclass);
 E   ALTER TABLE public.tlignedemande ALTER COLUMN id_ligne DROP DEFAULT;
       public          postgres    false    229    230    230            �           2604    58308    tpaiement id_p    DEFAULT     p   ALTER TABLE ONLY public.tpaiement ALTER COLUMN id_p SET DEFAULT nextval('public.tpaiement_id_p_seq'::regclass);
 =   ALTER TABLE public.tpaiement ALTER COLUMN id_p DROP DEFAULT;
       public          postgres    false    231    232    232                       2604    26704    tservices id    DEFAULT     l   ALTER TABLE ONLY public.tservices ALTER COLUMN id SET DEFAULT nextval('public.tservices_id_seq'::regclass);
 ;   ALTER TABLE public.tservices ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    224    223    224            �           2604    26726 	   tusers id    DEFAULT     f   ALTER TABLE ONLY public.tusers ALTER COLUMN id SET DEFAULT nextval('public.tusers_id_seq'::regclass);
 8   ALTER TABLE public.tusers ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    226    225    226            �          0    26668    tarticle 
   TABLE DATA           �   COPY public.tarticle (id, identification, designation, qte, qte_min, qte_max, prix_achat, prix_vente, tva, etat, inventaire, annee, "familleId", "createdAt", "updatedAt") FROM stdin;
    public          postgres    false    218   �%      �          0    26694    tcategorieservice 
   TABLE DATA           8   COPY public.tcategorieservice (id, libelle) FROM stdin;
    public          postgres    false    222   1                0    58282    tdemandeservice 
   TABLE DATA           �   COPY public.tdemandeservice (id_dem, date_demande, matricule, conducteur, employer, heure_deb, heure_fin, client, bon_commande, prix_ttc, payer, marque) FROM stdin;
    public          postgres    false    228   P1      �          0    26687 	   temployee 
   TABLE DATA           {   COPY public.temployee (id, cin, nom, recrutement, mobile, salaire, specialite, etat, "createdAt", "updatedAt") FROM stdin;
    public          postgres    false    220   �1      �          0    26661    tfamille 
   TABLE DATA           I   COPY public.tfamille (id, famille, "createdAt", "updatedAt") FROM stdin;
    public          postgres    false    216   �8                0    58291    tlignedemande 
   TABLE DATA           �   COPY public.tlignedemande (id_ligne, demande_srv, type, categorie, element, reference, designation, prix, tva, remise, quantite, "createdAt", "updatedAt") FROM stdin;
    public          postgres    false    230   1;                0    58305 	   tpaiement 
   TABLE DATA           y   COPY public.tpaiement (id_p, demande_srv, date_payement, numero_cheque, date_cheque, banque, payer, montant) FROM stdin;
    public          postgres    false    232   �;      �          0    26701 	   tservices 
   TABLE DATA           c   COPY public.tservices (id, categorieid, libelle, pu, remise, "createdAt", "updatedAt") FROM stdin;
    public          postgres    false    224   <                0    26723    tusers 
   TABLE DATA           0   COPY public.tusers (id, login, pwd) FROM stdin;
    public          postgres    false    226   <@                 0    0    tarticle_id_seq    SEQUENCE SET     >   SELECT pg_catalog.setval('public.tarticle_id_seq', 71, true);
          public          postgres    false    217                       0    0    tcategorieservice_id_seq    SEQUENCE SET     F   SELECT pg_catalog.setval('public.tcategorieservice_id_seq', 4, true);
          public          postgres    false    221                       0    0    tdemandeservice_id_dem_seq    SEQUENCE SET     H   SELECT pg_catalog.setval('public.tdemandeservice_id_dem_seq', 1, true);
          public          postgres    false    227                       0    0    temployee_id_seq    SEQUENCE SET     ?   SELECT pg_catalog.setval('public.temployee_id_seq', 73, true);
          public          postgres    false    219                       0    0    tfamille_id_seq    SEQUENCE SET     >   SELECT pg_catalog.setval('public.tfamille_id_seq', 22, true);
          public          postgres    false    215                       0    0    tlignedemande_id_ligne_seq    SEQUENCE SET     H   SELECT pg_catalog.setval('public.tlignedemande_id_ligne_seq', 3, true);
          public          postgres    false    229                       0    0    tpaiement_id_p_seq    SEQUENCE SET     A   SELECT pg_catalog.setval('public.tpaiement_id_p_seq', 1, false);
          public          postgres    false    231                       0    0    tservices_id_seq    SEQUENCE SET     ?   SELECT pg_catalog.setval('public.tservices_id_seq', 80, true);
          public          postgres    false    223                       0    0    tusers_id_seq    SEQUENCE SET     <   SELECT pg_catalog.setval('public.tusers_id_seq', 1, false);
          public          postgres    false    225            �           2606    80448 $   tarticle tarticle_identification_key 
   CONSTRAINT     i   ALTER TABLE ONLY public.tarticle
    ADD CONSTRAINT tarticle_identification_key UNIQUE (identification);
 N   ALTER TABLE ONLY public.tarticle DROP CONSTRAINT tarticle_identification_key;
       public            postgres    false    218            �           2606    80450 %   tarticle tarticle_identification_key1 
   CONSTRAINT     j   ALTER TABLE ONLY public.tarticle
    ADD CONSTRAINT tarticle_identification_key1 UNIQUE (identification);
 O   ALTER TABLE ONLY public.tarticle DROP CONSTRAINT tarticle_identification_key1;
       public            postgres    false    218            �           2606    80438 &   tarticle tarticle_identification_key10 
   CONSTRAINT     k   ALTER TABLE ONLY public.tarticle
    ADD CONSTRAINT tarticle_identification_key10 UNIQUE (identification);
 P   ALTER TABLE ONLY public.tarticle DROP CONSTRAINT tarticle_identification_key10;
       public            postgres    false    218            �           2606    80518 '   tarticle tarticle_identification_key100 
   CONSTRAINT     l   ALTER TABLE ONLY public.tarticle
    ADD CONSTRAINT tarticle_identification_key100 UNIQUE (identification);
 Q   ALTER TABLE ONLY public.tarticle DROP CONSTRAINT tarticle_identification_key100;
       public            postgres    false    218            �           2606    80316 '   tarticle tarticle_identification_key101 
   CONSTRAINT     l   ALTER TABLE ONLY public.tarticle
    ADD CONSTRAINT tarticle_identification_key101 UNIQUE (identification);
 Q   ALTER TABLE ONLY public.tarticle DROP CONSTRAINT tarticle_identification_key101;
       public            postgres    false    218            �           2606    80314 '   tarticle tarticle_identification_key102 
   CONSTRAINT     l   ALTER TABLE ONLY public.tarticle
    ADD CONSTRAINT tarticle_identification_key102 UNIQUE (identification);
 Q   ALTER TABLE ONLY public.tarticle DROP CONSTRAINT tarticle_identification_key102;
       public            postgres    false    218            �           2606    80312 '   tarticle tarticle_identification_key103 
   CONSTRAINT     l   ALTER TABLE ONLY public.tarticle
    ADD CONSTRAINT tarticle_identification_key103 UNIQUE (identification);
 Q   ALTER TABLE ONLY public.tarticle DROP CONSTRAINT tarticle_identification_key103;
       public            postgres    false    218            �           2606    80310 '   tarticle tarticle_identification_key104 
   CONSTRAINT     l   ALTER TABLE ONLY public.tarticle
    ADD CONSTRAINT tarticle_identification_key104 UNIQUE (identification);
 Q   ALTER TABLE ONLY public.tarticle DROP CONSTRAINT tarticle_identification_key104;
       public            postgres    false    218            �           2606    80308 '   tarticle tarticle_identification_key105 
   CONSTRAINT     l   ALTER TABLE ONLY public.tarticle
    ADD CONSTRAINT tarticle_identification_key105 UNIQUE (identification);
 Q   ALTER TABLE ONLY public.tarticle DROP CONSTRAINT tarticle_identification_key105;
       public            postgres    false    218            �           2606    80306 '   tarticle tarticle_identification_key106 
   CONSTRAINT     l   ALTER TABLE ONLY public.tarticle
    ADD CONSTRAINT tarticle_identification_key106 UNIQUE (identification);
 Q   ALTER TABLE ONLY public.tarticle DROP CONSTRAINT tarticle_identification_key106;
       public            postgres    false    218            �           2606    80304 '   tarticle tarticle_identification_key107 
   CONSTRAINT     l   ALTER TABLE ONLY public.tarticle
    ADD CONSTRAINT tarticle_identification_key107 UNIQUE (identification);
 Q   ALTER TABLE ONLY public.tarticle DROP CONSTRAINT tarticle_identification_key107;
       public            postgres    false    218            �           2606    80302 '   tarticle tarticle_identification_key108 
   CONSTRAINT     l   ALTER TABLE ONLY public.tarticle
    ADD CONSTRAINT tarticle_identification_key108 UNIQUE (identification);
 Q   ALTER TABLE ONLY public.tarticle DROP CONSTRAINT tarticle_identification_key108;
       public            postgres    false    218            �           2606    80300 '   tarticle tarticle_identification_key109 
   CONSTRAINT     l   ALTER TABLE ONLY public.tarticle
    ADD CONSTRAINT tarticle_identification_key109 UNIQUE (identification);
 Q   ALTER TABLE ONLY public.tarticle DROP CONSTRAINT tarticle_identification_key109;
       public            postgres    false    218            �           2606    80460 &   tarticle tarticle_identification_key11 
   CONSTRAINT     k   ALTER TABLE ONLY public.tarticle
    ADD CONSTRAINT tarticle_identification_key11 UNIQUE (identification);
 P   ALTER TABLE ONLY public.tarticle DROP CONSTRAINT tarticle_identification_key11;
       public            postgres    false    218            �           2606    80298 '   tarticle tarticle_identification_key110 
   CONSTRAINT     l   ALTER TABLE ONLY public.tarticle
    ADD CONSTRAINT tarticle_identification_key110 UNIQUE (identification);
 Q   ALTER TABLE ONLY public.tarticle DROP CONSTRAINT tarticle_identification_key110;
       public            postgres    false    218            �           2606    80296 '   tarticle tarticle_identification_key111 
   CONSTRAINT     l   ALTER TABLE ONLY public.tarticle
    ADD CONSTRAINT tarticle_identification_key111 UNIQUE (identification);
 Q   ALTER TABLE ONLY public.tarticle DROP CONSTRAINT tarticle_identification_key111;
       public            postgres    false    218            �           2606    80294 '   tarticle tarticle_identification_key112 
   CONSTRAINT     l   ALTER TABLE ONLY public.tarticle
    ADD CONSTRAINT tarticle_identification_key112 UNIQUE (identification);
 Q   ALTER TABLE ONLY public.tarticle DROP CONSTRAINT tarticle_identification_key112;
       public            postgres    false    218            �           2606    80292 '   tarticle tarticle_identification_key113 
   CONSTRAINT     l   ALTER TABLE ONLY public.tarticle
    ADD CONSTRAINT tarticle_identification_key113 UNIQUE (identification);
 Q   ALTER TABLE ONLY public.tarticle DROP CONSTRAINT tarticle_identification_key113;
       public            postgres    false    218            �           2606    80290 '   tarticle tarticle_identification_key114 
   CONSTRAINT     l   ALTER TABLE ONLY public.tarticle
    ADD CONSTRAINT tarticle_identification_key114 UNIQUE (identification);
 Q   ALTER TABLE ONLY public.tarticle DROP CONSTRAINT tarticle_identification_key114;
       public            postgres    false    218            �           2606    80288 '   tarticle tarticle_identification_key115 
   CONSTRAINT     l   ALTER TABLE ONLY public.tarticle
    ADD CONSTRAINT tarticle_identification_key115 UNIQUE (identification);
 Q   ALTER TABLE ONLY public.tarticle DROP CONSTRAINT tarticle_identification_key115;
       public            postgres    false    218            �           2606    80286 '   tarticle tarticle_identification_key116 
   CONSTRAINT     l   ALTER TABLE ONLY public.tarticle
    ADD CONSTRAINT tarticle_identification_key116 UNIQUE (identification);
 Q   ALTER TABLE ONLY public.tarticle DROP CONSTRAINT tarticle_identification_key116;
       public            postgres    false    218            �           2606    80462 &   tarticle tarticle_identification_key12 
   CONSTRAINT     k   ALTER TABLE ONLY public.tarticle
    ADD CONSTRAINT tarticle_identification_key12 UNIQUE (identification);
 P   ALTER TABLE ONLY public.tarticle DROP CONSTRAINT tarticle_identification_key12;
       public            postgres    false    218            �           2606    80436 &   tarticle tarticle_identification_key13 
   CONSTRAINT     k   ALTER TABLE ONLY public.tarticle
    ADD CONSTRAINT tarticle_identification_key13 UNIQUE (identification);
 P   ALTER TABLE ONLY public.tarticle DROP CONSTRAINT tarticle_identification_key13;
       public            postgres    false    218            �           2606    80434 &   tarticle tarticle_identification_key14 
   CONSTRAINT     k   ALTER TABLE ONLY public.tarticle
    ADD CONSTRAINT tarticle_identification_key14 UNIQUE (identification);
 P   ALTER TABLE ONLY public.tarticle DROP CONSTRAINT tarticle_identification_key14;
       public            postgres    false    218            �           2606    80464 &   tarticle tarticle_identification_key15 
   CONSTRAINT     k   ALTER TABLE ONLY public.tarticle
    ADD CONSTRAINT tarticle_identification_key15 UNIQUE (identification);
 P   ALTER TABLE ONLY public.tarticle DROP CONSTRAINT tarticle_identification_key15;
       public            postgres    false    218            �           2606    80432 &   tarticle tarticle_identification_key16 
   CONSTRAINT     k   ALTER TABLE ONLY public.tarticle
    ADD CONSTRAINT tarticle_identification_key16 UNIQUE (identification);
 P   ALTER TABLE ONLY public.tarticle DROP CONSTRAINT tarticle_identification_key16;
       public            postgres    false    218            �           2606    80430 &   tarticle tarticle_identification_key17 
   CONSTRAINT     k   ALTER TABLE ONLY public.tarticle
    ADD CONSTRAINT tarticle_identification_key17 UNIQUE (identification);
 P   ALTER TABLE ONLY public.tarticle DROP CONSTRAINT tarticle_identification_key17;
       public            postgres    false    218            �           2606    80466 &   tarticle tarticle_identification_key18 
   CONSTRAINT     k   ALTER TABLE ONLY public.tarticle
    ADD CONSTRAINT tarticle_identification_key18 UNIQUE (identification);
 P   ALTER TABLE ONLY public.tarticle DROP CONSTRAINT tarticle_identification_key18;
       public            postgres    false    218            �           2606    80468 &   tarticle tarticle_identification_key19 
   CONSTRAINT     k   ALTER TABLE ONLY public.tarticle
    ADD CONSTRAINT tarticle_identification_key19 UNIQUE (identification);
 P   ALTER TABLE ONLY public.tarticle DROP CONSTRAINT tarticle_identification_key19;
       public            postgres    false    218            �           2606    80446 %   tarticle tarticle_identification_key2 
   CONSTRAINT     j   ALTER TABLE ONLY public.tarticle
    ADD CONSTRAINT tarticle_identification_key2 UNIQUE (identification);
 O   ALTER TABLE ONLY public.tarticle DROP CONSTRAINT tarticle_identification_key2;
       public            postgres    false    218            �           2606    80470 &   tarticle tarticle_identification_key20 
   CONSTRAINT     k   ALTER TABLE ONLY public.tarticle
    ADD CONSTRAINT tarticle_identification_key20 UNIQUE (identification);
 P   ALTER TABLE ONLY public.tarticle DROP CONSTRAINT tarticle_identification_key20;
       public            postgres    false    218            �           2606    80428 &   tarticle tarticle_identification_key21 
   CONSTRAINT     k   ALTER TABLE ONLY public.tarticle
    ADD CONSTRAINT tarticle_identification_key21 UNIQUE (identification);
 P   ALTER TABLE ONLY public.tarticle DROP CONSTRAINT tarticle_identification_key21;
       public            postgres    false    218            �           2606    80394 &   tarticle tarticle_identification_key22 
   CONSTRAINT     k   ALTER TABLE ONLY public.tarticle
    ADD CONSTRAINT tarticle_identification_key22 UNIQUE (identification);
 P   ALTER TABLE ONLY public.tarticle DROP CONSTRAINT tarticle_identification_key22;
       public            postgres    false    218            �           2606    80396 &   tarticle tarticle_identification_key23 
   CONSTRAINT     k   ALTER TABLE ONLY public.tarticle
    ADD CONSTRAINT tarticle_identification_key23 UNIQUE (identification);
 P   ALTER TABLE ONLY public.tarticle DROP CONSTRAINT tarticle_identification_key23;
       public            postgres    false    218            �           2606    80398 &   tarticle tarticle_identification_key24 
   CONSTRAINT     k   ALTER TABLE ONLY public.tarticle
    ADD CONSTRAINT tarticle_identification_key24 UNIQUE (identification);
 P   ALTER TABLE ONLY public.tarticle DROP CONSTRAINT tarticle_identification_key24;
       public            postgres    false    218            �           2606    80426 &   tarticle tarticle_identification_key25 
   CONSTRAINT     k   ALTER TABLE ONLY public.tarticle
    ADD CONSTRAINT tarticle_identification_key25 UNIQUE (identification);
 P   ALTER TABLE ONLY public.tarticle DROP CONSTRAINT tarticle_identification_key25;
       public            postgres    false    218            �           2606    80424 &   tarticle tarticle_identification_key26 
   CONSTRAINT     k   ALTER TABLE ONLY public.tarticle
    ADD CONSTRAINT tarticle_identification_key26 UNIQUE (identification);
 P   ALTER TABLE ONLY public.tarticle DROP CONSTRAINT tarticle_identification_key26;
       public            postgres    false    218            �           2606    80400 &   tarticle tarticle_identification_key27 
   CONSTRAINT     k   ALTER TABLE ONLY public.tarticle
    ADD CONSTRAINT tarticle_identification_key27 UNIQUE (identification);
 P   ALTER TABLE ONLY public.tarticle DROP CONSTRAINT tarticle_identification_key27;
       public            postgres    false    218            �           2606    80422 &   tarticle tarticle_identification_key28 
   CONSTRAINT     k   ALTER TABLE ONLY public.tarticle
    ADD CONSTRAINT tarticle_identification_key28 UNIQUE (identification);
 P   ALTER TABLE ONLY public.tarticle DROP CONSTRAINT tarticle_identification_key28;
       public            postgres    false    218            �           2606    80420 &   tarticle tarticle_identification_key29 
   CONSTRAINT     k   ALTER TABLE ONLY public.tarticle
    ADD CONSTRAINT tarticle_identification_key29 UNIQUE (identification);
 P   ALTER TABLE ONLY public.tarticle DROP CONSTRAINT tarticle_identification_key29;
       public            postgres    false    218            �           2606    80444 %   tarticle tarticle_identification_key3 
   CONSTRAINT     j   ALTER TABLE ONLY public.tarticle
    ADD CONSTRAINT tarticle_identification_key3 UNIQUE (identification);
 O   ALTER TABLE ONLY public.tarticle DROP CONSTRAINT tarticle_identification_key3;
       public            postgres    false    218            �           2606    80402 &   tarticle tarticle_identification_key30 
   CONSTRAINT     k   ALTER TABLE ONLY public.tarticle
    ADD CONSTRAINT tarticle_identification_key30 UNIQUE (identification);
 P   ALTER TABLE ONLY public.tarticle DROP CONSTRAINT tarticle_identification_key30;
       public            postgres    false    218            �           2606    80418 &   tarticle tarticle_identification_key31 
   CONSTRAINT     k   ALTER TABLE ONLY public.tarticle
    ADD CONSTRAINT tarticle_identification_key31 UNIQUE (identification);
 P   ALTER TABLE ONLY public.tarticle DROP CONSTRAINT tarticle_identification_key31;
       public            postgres    false    218            �           2606    80404 &   tarticle tarticle_identification_key32 
   CONSTRAINT     k   ALTER TABLE ONLY public.tarticle
    ADD CONSTRAINT tarticle_identification_key32 UNIQUE (identification);
 P   ALTER TABLE ONLY public.tarticle DROP CONSTRAINT tarticle_identification_key32;
       public            postgres    false    218            �           2606    80416 &   tarticle tarticle_identification_key33 
   CONSTRAINT     k   ALTER TABLE ONLY public.tarticle
    ADD CONSTRAINT tarticle_identification_key33 UNIQUE (identification);
 P   ALTER TABLE ONLY public.tarticle DROP CONSTRAINT tarticle_identification_key33;
       public            postgres    false    218            �           2606    80406 &   tarticle tarticle_identification_key34 
   CONSTRAINT     k   ALTER TABLE ONLY public.tarticle
    ADD CONSTRAINT tarticle_identification_key34 UNIQUE (identification);
 P   ALTER TABLE ONLY public.tarticle DROP CONSTRAINT tarticle_identification_key34;
       public            postgres    false    218            �           2606    80414 &   tarticle tarticle_identification_key35 
   CONSTRAINT     k   ALTER TABLE ONLY public.tarticle
    ADD CONSTRAINT tarticle_identification_key35 UNIQUE (identification);
 P   ALTER TABLE ONLY public.tarticle DROP CONSTRAINT tarticle_identification_key35;
       public            postgres    false    218            �           2606    80408 &   tarticle tarticle_identification_key36 
   CONSTRAINT     k   ALTER TABLE ONLY public.tarticle
    ADD CONSTRAINT tarticle_identification_key36 UNIQUE (identification);
 P   ALTER TABLE ONLY public.tarticle DROP CONSTRAINT tarticle_identification_key36;
       public            postgres    false    218            �           2606    80412 &   tarticle tarticle_identification_key37 
   CONSTRAINT     k   ALTER TABLE ONLY public.tarticle
    ADD CONSTRAINT tarticle_identification_key37 UNIQUE (identification);
 P   ALTER TABLE ONLY public.tarticle DROP CONSTRAINT tarticle_identification_key37;
       public            postgres    false    218            �           2606    80410 &   tarticle tarticle_identification_key38 
   CONSTRAINT     k   ALTER TABLE ONLY public.tarticle
    ADD CONSTRAINT tarticle_identification_key38 UNIQUE (identification);
 P   ALTER TABLE ONLY public.tarticle DROP CONSTRAINT tarticle_identification_key38;
       public            postgres    false    218            �           2606    80472 &   tarticle tarticle_identification_key39 
   CONSTRAINT     k   ALTER TABLE ONLY public.tarticle
    ADD CONSTRAINT tarticle_identification_key39 UNIQUE (identification);
 P   ALTER TABLE ONLY public.tarticle DROP CONSTRAINT tarticle_identification_key39;
       public            postgres    false    218            �           2606    80452 %   tarticle tarticle_identification_key4 
   CONSTRAINT     j   ALTER TABLE ONLY public.tarticle
    ADD CONSTRAINT tarticle_identification_key4 UNIQUE (identification);
 O   ALTER TABLE ONLY public.tarticle DROP CONSTRAINT tarticle_identification_key4;
       public            postgres    false    218            �           2606    80392 &   tarticle tarticle_identification_key40 
   CONSTRAINT     k   ALTER TABLE ONLY public.tarticle
    ADD CONSTRAINT tarticle_identification_key40 UNIQUE (identification);
 P   ALTER TABLE ONLY public.tarticle DROP CONSTRAINT tarticle_identification_key40;
       public            postgres    false    218            �           2606    80474 &   tarticle tarticle_identification_key41 
   CONSTRAINT     k   ALTER TABLE ONLY public.tarticle
    ADD CONSTRAINT tarticle_identification_key41 UNIQUE (identification);
 P   ALTER TABLE ONLY public.tarticle DROP CONSTRAINT tarticle_identification_key41;
       public            postgres    false    218            �           2606    80390 &   tarticle tarticle_identification_key42 
   CONSTRAINT     k   ALTER TABLE ONLY public.tarticle
    ADD CONSTRAINT tarticle_identification_key42 UNIQUE (identification);
 P   ALTER TABLE ONLY public.tarticle DROP CONSTRAINT tarticle_identification_key42;
       public            postgres    false    218            �           2606    80476 &   tarticle tarticle_identification_key43 
   CONSTRAINT     k   ALTER TABLE ONLY public.tarticle
    ADD CONSTRAINT tarticle_identification_key43 UNIQUE (identification);
 P   ALTER TABLE ONLY public.tarticle DROP CONSTRAINT tarticle_identification_key43;
       public            postgres    false    218            �           2606    80388 &   tarticle tarticle_identification_key44 
   CONSTRAINT     k   ALTER TABLE ONLY public.tarticle
    ADD CONSTRAINT tarticle_identification_key44 UNIQUE (identification);
 P   ALTER TABLE ONLY public.tarticle DROP CONSTRAINT tarticle_identification_key44;
       public            postgres    false    218            �           2606    80478 &   tarticle tarticle_identification_key45 
   CONSTRAINT     k   ALTER TABLE ONLY public.tarticle
    ADD CONSTRAINT tarticle_identification_key45 UNIQUE (identification);
 P   ALTER TABLE ONLY public.tarticle DROP CONSTRAINT tarticle_identification_key45;
       public            postgres    false    218            �           2606    80480 &   tarticle tarticle_identification_key46 
   CONSTRAINT     k   ALTER TABLE ONLY public.tarticle
    ADD CONSTRAINT tarticle_identification_key46 UNIQUE (identification);
 P   ALTER TABLE ONLY public.tarticle DROP CONSTRAINT tarticle_identification_key46;
       public            postgres    false    218            �           2606    80386 &   tarticle tarticle_identification_key47 
   CONSTRAINT     k   ALTER TABLE ONLY public.tarticle
    ADD CONSTRAINT tarticle_identification_key47 UNIQUE (identification);
 P   ALTER TABLE ONLY public.tarticle DROP CONSTRAINT tarticle_identification_key47;
       public            postgres    false    218                        2606    80482 &   tarticle tarticle_identification_key48 
   CONSTRAINT     k   ALTER TABLE ONLY public.tarticle
    ADD CONSTRAINT tarticle_identification_key48 UNIQUE (identification);
 P   ALTER TABLE ONLY public.tarticle DROP CONSTRAINT tarticle_identification_key48;
       public            postgres    false    218                       2606    80484 &   tarticle tarticle_identification_key49 
   CONSTRAINT     k   ALTER TABLE ONLY public.tarticle
    ADD CONSTRAINT tarticle_identification_key49 UNIQUE (identification);
 P   ALTER TABLE ONLY public.tarticle DROP CONSTRAINT tarticle_identification_key49;
       public            postgres    false    218                       2606    80454 %   tarticle tarticle_identification_key5 
   CONSTRAINT     j   ALTER TABLE ONLY public.tarticle
    ADD CONSTRAINT tarticle_identification_key5 UNIQUE (identification);
 O   ALTER TABLE ONLY public.tarticle DROP CONSTRAINT tarticle_identification_key5;
       public            postgres    false    218                       2606    80384 &   tarticle tarticle_identification_key50 
   CONSTRAINT     k   ALTER TABLE ONLY public.tarticle
    ADD CONSTRAINT tarticle_identification_key50 UNIQUE (identification);
 P   ALTER TABLE ONLY public.tarticle DROP CONSTRAINT tarticle_identification_key50;
       public            postgres    false    218                       2606    80486 &   tarticle tarticle_identification_key51 
   CONSTRAINT     k   ALTER TABLE ONLY public.tarticle
    ADD CONSTRAINT tarticle_identification_key51 UNIQUE (identification);
 P   ALTER TABLE ONLY public.tarticle DROP CONSTRAINT tarticle_identification_key51;
       public            postgres    false    218            
           2606    80382 &   tarticle tarticle_identification_key52 
   CONSTRAINT     k   ALTER TABLE ONLY public.tarticle
    ADD CONSTRAINT tarticle_identification_key52 UNIQUE (identification);
 P   ALTER TABLE ONLY public.tarticle DROP CONSTRAINT tarticle_identification_key52;
       public            postgres    false    218                       2606    80488 &   tarticle tarticle_identification_key53 
   CONSTRAINT     k   ALTER TABLE ONLY public.tarticle
    ADD CONSTRAINT tarticle_identification_key53 UNIQUE (identification);
 P   ALTER TABLE ONLY public.tarticle DROP CONSTRAINT tarticle_identification_key53;
       public            postgres    false    218                       2606    80380 &   tarticle tarticle_identification_key54 
   CONSTRAINT     k   ALTER TABLE ONLY public.tarticle
    ADD CONSTRAINT tarticle_identification_key54 UNIQUE (identification);
 P   ALTER TABLE ONLY public.tarticle DROP CONSTRAINT tarticle_identification_key54;
       public            postgres    false    218                       2606    80490 &   tarticle tarticle_identification_key55 
   CONSTRAINT     k   ALTER TABLE ONLY public.tarticle
    ADD CONSTRAINT tarticle_identification_key55 UNIQUE (identification);
 P   ALTER TABLE ONLY public.tarticle DROP CONSTRAINT tarticle_identification_key55;
       public            postgres    false    218                       2606    80378 &   tarticle tarticle_identification_key56 
   CONSTRAINT     k   ALTER TABLE ONLY public.tarticle
    ADD CONSTRAINT tarticle_identification_key56 UNIQUE (identification);
 P   ALTER TABLE ONLY public.tarticle DROP CONSTRAINT tarticle_identification_key56;
       public            postgres    false    218                       2606    80492 &   tarticle tarticle_identification_key57 
   CONSTRAINT     k   ALTER TABLE ONLY public.tarticle
    ADD CONSTRAINT tarticle_identification_key57 UNIQUE (identification);
 P   ALTER TABLE ONLY public.tarticle DROP CONSTRAINT tarticle_identification_key57;
       public            postgres    false    218                       2606    80376 &   tarticle tarticle_identification_key58 
   CONSTRAINT     k   ALTER TABLE ONLY public.tarticle
    ADD CONSTRAINT tarticle_identification_key58 UNIQUE (identification);
 P   ALTER TABLE ONLY public.tarticle DROP CONSTRAINT tarticle_identification_key58;
       public            postgres    false    218                       2606    80494 &   tarticle tarticle_identification_key59 
   CONSTRAINT     k   ALTER TABLE ONLY public.tarticle
    ADD CONSTRAINT tarticle_identification_key59 UNIQUE (identification);
 P   ALTER TABLE ONLY public.tarticle DROP CONSTRAINT tarticle_identification_key59;
       public            postgres    false    218                       2606    80456 %   tarticle tarticle_identification_key6 
   CONSTRAINT     j   ALTER TABLE ONLY public.tarticle
    ADD CONSTRAINT tarticle_identification_key6 UNIQUE (identification);
 O   ALTER TABLE ONLY public.tarticle DROP CONSTRAINT tarticle_identification_key6;
       public            postgres    false    218                       2606    80374 &   tarticle tarticle_identification_key60 
   CONSTRAINT     k   ALTER TABLE ONLY public.tarticle
    ADD CONSTRAINT tarticle_identification_key60 UNIQUE (identification);
 P   ALTER TABLE ONLY public.tarticle DROP CONSTRAINT tarticle_identification_key60;
       public            postgres    false    218                       2606    80496 &   tarticle tarticle_identification_key61 
   CONSTRAINT     k   ALTER TABLE ONLY public.tarticle
    ADD CONSTRAINT tarticle_identification_key61 UNIQUE (identification);
 P   ALTER TABLE ONLY public.tarticle DROP CONSTRAINT tarticle_identification_key61;
       public            postgres    false    218                        2606    80372 &   tarticle tarticle_identification_key62 
   CONSTRAINT     k   ALTER TABLE ONLY public.tarticle
    ADD CONSTRAINT tarticle_identification_key62 UNIQUE (identification);
 P   ALTER TABLE ONLY public.tarticle DROP CONSTRAINT tarticle_identification_key62;
       public            postgres    false    218            "           2606    80498 &   tarticle tarticle_identification_key63 
   CONSTRAINT     k   ALTER TABLE ONLY public.tarticle
    ADD CONSTRAINT tarticle_identification_key63 UNIQUE (identification);
 P   ALTER TABLE ONLY public.tarticle DROP CONSTRAINT tarticle_identification_key63;
       public            postgres    false    218            $           2606    80500 &   tarticle tarticle_identification_key64 
   CONSTRAINT     k   ALTER TABLE ONLY public.tarticle
    ADD CONSTRAINT tarticle_identification_key64 UNIQUE (identification);
 P   ALTER TABLE ONLY public.tarticle DROP CONSTRAINT tarticle_identification_key64;
       public            postgres    false    218            &           2606    80370 &   tarticle tarticle_identification_key65 
   CONSTRAINT     k   ALTER TABLE ONLY public.tarticle
    ADD CONSTRAINT tarticle_identification_key65 UNIQUE (identification);
 P   ALTER TABLE ONLY public.tarticle DROP CONSTRAINT tarticle_identification_key65;
       public            postgres    false    218            (           2606    80502 &   tarticle tarticle_identification_key66 
   CONSTRAINT     k   ALTER TABLE ONLY public.tarticle
    ADD CONSTRAINT tarticle_identification_key66 UNIQUE (identification);
 P   ALTER TABLE ONLY public.tarticle DROP CONSTRAINT tarticle_identification_key66;
       public            postgres    false    218            *           2606    80368 &   tarticle tarticle_identification_key67 
   CONSTRAINT     k   ALTER TABLE ONLY public.tarticle
    ADD CONSTRAINT tarticle_identification_key67 UNIQUE (identification);
 P   ALTER TABLE ONLY public.tarticle DROP CONSTRAINT tarticle_identification_key67;
       public            postgres    false    218            ,           2606    80504 &   tarticle tarticle_identification_key68 
   CONSTRAINT     k   ALTER TABLE ONLY public.tarticle
    ADD CONSTRAINT tarticle_identification_key68 UNIQUE (identification);
 P   ALTER TABLE ONLY public.tarticle DROP CONSTRAINT tarticle_identification_key68;
       public            postgres    false    218            .           2606    80366 &   tarticle tarticle_identification_key69 
   CONSTRAINT     k   ALTER TABLE ONLY public.tarticle
    ADD CONSTRAINT tarticle_identification_key69 UNIQUE (identification);
 P   ALTER TABLE ONLY public.tarticle DROP CONSTRAINT tarticle_identification_key69;
       public            postgres    false    218            0           2606    80442 %   tarticle tarticle_identification_key7 
   CONSTRAINT     j   ALTER TABLE ONLY public.tarticle
    ADD CONSTRAINT tarticle_identification_key7 UNIQUE (identification);
 O   ALTER TABLE ONLY public.tarticle DROP CONSTRAINT tarticle_identification_key7;
       public            postgres    false    218            2           2606    80506 &   tarticle tarticle_identification_key70 
   CONSTRAINT     k   ALTER TABLE ONLY public.tarticle
    ADD CONSTRAINT tarticle_identification_key70 UNIQUE (identification);
 P   ALTER TABLE ONLY public.tarticle DROP CONSTRAINT tarticle_identification_key70;
       public            postgres    false    218            4           2606    80364 &   tarticle tarticle_identification_key71 
   CONSTRAINT     k   ALTER TABLE ONLY public.tarticle
    ADD CONSTRAINT tarticle_identification_key71 UNIQUE (identification);
 P   ALTER TABLE ONLY public.tarticle DROP CONSTRAINT tarticle_identification_key71;
       public            postgres    false    218            6           2606    80508 &   tarticle tarticle_identification_key72 
   CONSTRAINT     k   ALTER TABLE ONLY public.tarticle
    ADD CONSTRAINT tarticle_identification_key72 UNIQUE (identification);
 P   ALTER TABLE ONLY public.tarticle DROP CONSTRAINT tarticle_identification_key72;
       public            postgres    false    218            8           2606    80510 &   tarticle tarticle_identification_key73 
   CONSTRAINT     k   ALTER TABLE ONLY public.tarticle
    ADD CONSTRAINT tarticle_identification_key73 UNIQUE (identification);
 P   ALTER TABLE ONLY public.tarticle DROP CONSTRAINT tarticle_identification_key73;
       public            postgres    false    218            :           2606    80362 &   tarticle tarticle_identification_key74 
   CONSTRAINT     k   ALTER TABLE ONLY public.tarticle
    ADD CONSTRAINT tarticle_identification_key74 UNIQUE (identification);
 P   ALTER TABLE ONLY public.tarticle DROP CONSTRAINT tarticle_identification_key74;
       public            postgres    false    218            <           2606    80360 &   tarticle tarticle_identification_key75 
   CONSTRAINT     k   ALTER TABLE ONLY public.tarticle
    ADD CONSTRAINT tarticle_identification_key75 UNIQUE (identification);
 P   ALTER TABLE ONLY public.tarticle DROP CONSTRAINT tarticle_identification_key75;
       public            postgres    false    218            >           2606    80512 &   tarticle tarticle_identification_key76 
   CONSTRAINT     k   ALTER TABLE ONLY public.tarticle
    ADD CONSTRAINT tarticle_identification_key76 UNIQUE (identification);
 P   ALTER TABLE ONLY public.tarticle DROP CONSTRAINT tarticle_identification_key76;
       public            postgres    false    218            @           2606    80514 &   tarticle tarticle_identification_key77 
   CONSTRAINT     k   ALTER TABLE ONLY public.tarticle
    ADD CONSTRAINT tarticle_identification_key77 UNIQUE (identification);
 P   ALTER TABLE ONLY public.tarticle DROP CONSTRAINT tarticle_identification_key77;
       public            postgres    false    218            B           2606    80358 &   tarticle tarticle_identification_key78 
   CONSTRAINT     k   ALTER TABLE ONLY public.tarticle
    ADD CONSTRAINT tarticle_identification_key78 UNIQUE (identification);
 P   ALTER TABLE ONLY public.tarticle DROP CONSTRAINT tarticle_identification_key78;
       public            postgres    false    218            D           2606    80356 &   tarticle tarticle_identification_key79 
   CONSTRAINT     k   ALTER TABLE ONLY public.tarticle
    ADD CONSTRAINT tarticle_identification_key79 UNIQUE (identification);
 P   ALTER TABLE ONLY public.tarticle DROP CONSTRAINT tarticle_identification_key79;
       public            postgres    false    218            F           2606    80458 %   tarticle tarticle_identification_key8 
   CONSTRAINT     j   ALTER TABLE ONLY public.tarticle
    ADD CONSTRAINT tarticle_identification_key8 UNIQUE (identification);
 O   ALTER TABLE ONLY public.tarticle DROP CONSTRAINT tarticle_identification_key8;
       public            postgres    false    218            H           2606    80354 &   tarticle tarticle_identification_key80 
   CONSTRAINT     k   ALTER TABLE ONLY public.tarticle
    ADD CONSTRAINT tarticle_identification_key80 UNIQUE (identification);
 P   ALTER TABLE ONLY public.tarticle DROP CONSTRAINT tarticle_identification_key80;
       public            postgres    false    218            J           2606    80352 &   tarticle tarticle_identification_key81 
   CONSTRAINT     k   ALTER TABLE ONLY public.tarticle
    ADD CONSTRAINT tarticle_identification_key81 UNIQUE (identification);
 P   ALTER TABLE ONLY public.tarticle DROP CONSTRAINT tarticle_identification_key81;
       public            postgres    false    218            L           2606    80350 &   tarticle tarticle_identification_key82 
   CONSTRAINT     k   ALTER TABLE ONLY public.tarticle
    ADD CONSTRAINT tarticle_identification_key82 UNIQUE (identification);
 P   ALTER TABLE ONLY public.tarticle DROP CONSTRAINT tarticle_identification_key82;
       public            postgres    false    218            N           2606    80348 &   tarticle tarticle_identification_key83 
   CONSTRAINT     k   ALTER TABLE ONLY public.tarticle
    ADD CONSTRAINT tarticle_identification_key83 UNIQUE (identification);
 P   ALTER TABLE ONLY public.tarticle DROP CONSTRAINT tarticle_identification_key83;
       public            postgres    false    218            P           2606    80346 &   tarticle tarticle_identification_key84 
   CONSTRAINT     k   ALTER TABLE ONLY public.tarticle
    ADD CONSTRAINT tarticle_identification_key84 UNIQUE (identification);
 P   ALTER TABLE ONLY public.tarticle DROP CONSTRAINT tarticle_identification_key84;
       public            postgres    false    218            R           2606    80344 &   tarticle tarticle_identification_key85 
   CONSTRAINT     k   ALTER TABLE ONLY public.tarticle
    ADD CONSTRAINT tarticle_identification_key85 UNIQUE (identification);
 P   ALTER TABLE ONLY public.tarticle DROP CONSTRAINT tarticle_identification_key85;
       public            postgres    false    218            T           2606    80342 &   tarticle tarticle_identification_key86 
   CONSTRAINT     k   ALTER TABLE ONLY public.tarticle
    ADD CONSTRAINT tarticle_identification_key86 UNIQUE (identification);
 P   ALTER TABLE ONLY public.tarticle DROP CONSTRAINT tarticle_identification_key86;
       public            postgres    false    218            V           2606    80340 &   tarticle tarticle_identification_key87 
   CONSTRAINT     k   ALTER TABLE ONLY public.tarticle
    ADD CONSTRAINT tarticle_identification_key87 UNIQUE (identification);
 P   ALTER TABLE ONLY public.tarticle DROP CONSTRAINT tarticle_identification_key87;
       public            postgres    false    218            X           2606    80338 &   tarticle tarticle_identification_key88 
   CONSTRAINT     k   ALTER TABLE ONLY public.tarticle
    ADD CONSTRAINT tarticle_identification_key88 UNIQUE (identification);
 P   ALTER TABLE ONLY public.tarticle DROP CONSTRAINT tarticle_identification_key88;
       public            postgres    false    218            Z           2606    80336 &   tarticle tarticle_identification_key89 
   CONSTRAINT     k   ALTER TABLE ONLY public.tarticle
    ADD CONSTRAINT tarticle_identification_key89 UNIQUE (identification);
 P   ALTER TABLE ONLY public.tarticle DROP CONSTRAINT tarticle_identification_key89;
       public            postgres    false    218            \           2606    80440 %   tarticle tarticle_identification_key9 
   CONSTRAINT     j   ALTER TABLE ONLY public.tarticle
    ADD CONSTRAINT tarticle_identification_key9 UNIQUE (identification);
 O   ALTER TABLE ONLY public.tarticle DROP CONSTRAINT tarticle_identification_key9;
       public            postgres    false    218            ^           2606    80516 &   tarticle tarticle_identification_key90 
   CONSTRAINT     k   ALTER TABLE ONLY public.tarticle
    ADD CONSTRAINT tarticle_identification_key90 UNIQUE (identification);
 P   ALTER TABLE ONLY public.tarticle DROP CONSTRAINT tarticle_identification_key90;
       public            postgres    false    218            `           2606    80334 &   tarticle tarticle_identification_key91 
   CONSTRAINT     k   ALTER TABLE ONLY public.tarticle
    ADD CONSTRAINT tarticle_identification_key91 UNIQUE (identification);
 P   ALTER TABLE ONLY public.tarticle DROP CONSTRAINT tarticle_identification_key91;
       public            postgres    false    218            b           2606    80332 &   tarticle tarticle_identification_key92 
   CONSTRAINT     k   ALTER TABLE ONLY public.tarticle
    ADD CONSTRAINT tarticle_identification_key92 UNIQUE (identification);
 P   ALTER TABLE ONLY public.tarticle DROP CONSTRAINT tarticle_identification_key92;
       public            postgres    false    218            d           2606    80330 &   tarticle tarticle_identification_key93 
   CONSTRAINT     k   ALTER TABLE ONLY public.tarticle
    ADD CONSTRAINT tarticle_identification_key93 UNIQUE (identification);
 P   ALTER TABLE ONLY public.tarticle DROP CONSTRAINT tarticle_identification_key93;
       public            postgres    false    218            f           2606    80328 &   tarticle tarticle_identification_key94 
   CONSTRAINT     k   ALTER TABLE ONLY public.tarticle
    ADD CONSTRAINT tarticle_identification_key94 UNIQUE (identification);
 P   ALTER TABLE ONLY public.tarticle DROP CONSTRAINT tarticle_identification_key94;
       public            postgres    false    218            h           2606    80326 &   tarticle tarticle_identification_key95 
   CONSTRAINT     k   ALTER TABLE ONLY public.tarticle
    ADD CONSTRAINT tarticle_identification_key95 UNIQUE (identification);
 P   ALTER TABLE ONLY public.tarticle DROP CONSTRAINT tarticle_identification_key95;
       public            postgres    false    218            j           2606    80324 &   tarticle tarticle_identification_key96 
   CONSTRAINT     k   ALTER TABLE ONLY public.tarticle
    ADD CONSTRAINT tarticle_identification_key96 UNIQUE (identification);
 P   ALTER TABLE ONLY public.tarticle DROP CONSTRAINT tarticle_identification_key96;
       public            postgres    false    218            l           2606    80322 &   tarticle tarticle_identification_key97 
   CONSTRAINT     k   ALTER TABLE ONLY public.tarticle
    ADD CONSTRAINT tarticle_identification_key97 UNIQUE (identification);
 P   ALTER TABLE ONLY public.tarticle DROP CONSTRAINT tarticle_identification_key97;
       public            postgres    false    218            n           2606    80320 &   tarticle tarticle_identification_key98 
   CONSTRAINT     k   ALTER TABLE ONLY public.tarticle
    ADD CONSTRAINT tarticle_identification_key98 UNIQUE (identification);
 P   ALTER TABLE ONLY public.tarticle DROP CONSTRAINT tarticle_identification_key98;
       public            postgres    false    218            p           2606    80318 &   tarticle tarticle_identification_key99 
   CONSTRAINT     k   ALTER TABLE ONLY public.tarticle
    ADD CONSTRAINT tarticle_identification_key99 UNIQUE (identification);
 P   ALTER TABLE ONLY public.tarticle DROP CONSTRAINT tarticle_identification_key99;
       public            postgres    false    218            r           2606    26675    tarticle tarticle_pkey 
   CONSTRAINT     T   ALTER TABLE ONLY public.tarticle
    ADD CONSTRAINT tarticle_pkey PRIMARY KEY (id);
 @   ALTER TABLE ONLY public.tarticle DROP CONSTRAINT tarticle_pkey;
       public            postgres    false    218            .           2606    26699 (   tcategorieservice tcategorieservice_pkey 
   CONSTRAINT     f   ALTER TABLE ONLY public.tcategorieservice
    ADD CONSTRAINT tcategorieservice_pkey PRIMARY KEY (id);
 R   ALTER TABLE ONLY public.tcategorieservice DROP CONSTRAINT tcategorieservice_pkey;
       public            postgres    false    222            ^           2606    58289 $   tdemandeservice tdemandeservice_pkey 
   CONSTRAINT     f   ALTER TABLE ONLY public.tdemandeservice
    ADD CONSTRAINT tdemandeservice_pkey PRIMARY KEY (id_dem);
 N   ALTER TABLE ONLY public.tdemandeservice DROP CONSTRAINT tdemandeservice_pkey;
       public            postgres    false    228            t           2606    80653    temployee temployee_cin_key 
   CONSTRAINT     U   ALTER TABLE ONLY public.temployee
    ADD CONSTRAINT temployee_cin_key UNIQUE (cin);
 E   ALTER TABLE ONLY public.temployee DROP CONSTRAINT temployee_cin_key;
       public            postgres    false    220            v           2606    80651    temployee temployee_cin_key1 
   CONSTRAINT     V   ALTER TABLE ONLY public.temployee
    ADD CONSTRAINT temployee_cin_key1 UNIQUE (cin);
 F   ALTER TABLE ONLY public.temployee DROP CONSTRAINT temployee_cin_key1;
       public            postgres    false    220            x           2606    80639    temployee temployee_cin_key10 
   CONSTRAINT     W   ALTER TABLE ONLY public.temployee
    ADD CONSTRAINT temployee_cin_key10 UNIQUE (cin);
 G   ALTER TABLE ONLY public.temployee DROP CONSTRAINT temployee_cin_key10;
       public            postgres    false    220            z           2606    80591    temployee temployee_cin_key11 
   CONSTRAINT     W   ALTER TABLE ONLY public.temployee
    ADD CONSTRAINT temployee_cin_key11 UNIQUE (cin);
 G   ALTER TABLE ONLY public.temployee DROP CONSTRAINT temployee_cin_key11;
       public            postgres    false    220            |           2606    80637    temployee temployee_cin_key12 
   CONSTRAINT     W   ALTER TABLE ONLY public.temployee
    ADD CONSTRAINT temployee_cin_key12 UNIQUE (cin);
 G   ALTER TABLE ONLY public.temployee DROP CONSTRAINT temployee_cin_key12;
       public            postgres    false    220            ~           2606    80593    temployee temployee_cin_key13 
   CONSTRAINT     W   ALTER TABLE ONLY public.temployee
    ADD CONSTRAINT temployee_cin_key13 UNIQUE (cin);
 G   ALTER TABLE ONLY public.temployee DROP CONSTRAINT temployee_cin_key13;
       public            postgres    false    220            �           2606    80595    temployee temployee_cin_key14 
   CONSTRAINT     W   ALTER TABLE ONLY public.temployee
    ADD CONSTRAINT temployee_cin_key14 UNIQUE (cin);
 G   ALTER TABLE ONLY public.temployee DROP CONSTRAINT temployee_cin_key14;
       public            postgres    false    220            �           2606    80635    temployee temployee_cin_key15 
   CONSTRAINT     W   ALTER TABLE ONLY public.temployee
    ADD CONSTRAINT temployee_cin_key15 UNIQUE (cin);
 G   ALTER TABLE ONLY public.temployee DROP CONSTRAINT temployee_cin_key15;
       public            postgres    false    220            �           2606    80597    temployee temployee_cin_key16 
   CONSTRAINT     W   ALTER TABLE ONLY public.temployee
    ADD CONSTRAINT temployee_cin_key16 UNIQUE (cin);
 G   ALTER TABLE ONLY public.temployee DROP CONSTRAINT temployee_cin_key16;
       public            postgres    false    220            �           2606    80633    temployee temployee_cin_key17 
   CONSTRAINT     W   ALTER TABLE ONLY public.temployee
    ADD CONSTRAINT temployee_cin_key17 UNIQUE (cin);
 G   ALTER TABLE ONLY public.temployee DROP CONSTRAINT temployee_cin_key17;
       public            postgres    false    220            �           2606    80599    temployee temployee_cin_key18 
   CONSTRAINT     W   ALTER TABLE ONLY public.temployee
    ADD CONSTRAINT temployee_cin_key18 UNIQUE (cin);
 G   ALTER TABLE ONLY public.temployee DROP CONSTRAINT temployee_cin_key18;
       public            postgres    false    220            �           2606    80631    temployee temployee_cin_key19 
   CONSTRAINT     W   ALTER TABLE ONLY public.temployee
    ADD CONSTRAINT temployee_cin_key19 UNIQUE (cin);
 G   ALTER TABLE ONLY public.temployee DROP CONSTRAINT temployee_cin_key19;
       public            postgres    false    220            �           2606    80655    temployee temployee_cin_key2 
   CONSTRAINT     V   ALTER TABLE ONLY public.temployee
    ADD CONSTRAINT temployee_cin_key2 UNIQUE (cin);
 F   ALTER TABLE ONLY public.temployee DROP CONSTRAINT temployee_cin_key2;
       public            postgres    false    220            �           2606    80601    temployee temployee_cin_key20 
   CONSTRAINT     W   ALTER TABLE ONLY public.temployee
    ADD CONSTRAINT temployee_cin_key20 UNIQUE (cin);
 G   ALTER TABLE ONLY public.temployee DROP CONSTRAINT temployee_cin_key20;
       public            postgres    false    220            �           2606    80629    temployee temployee_cin_key21 
   CONSTRAINT     W   ALTER TABLE ONLY public.temployee
    ADD CONSTRAINT temployee_cin_key21 UNIQUE (cin);
 G   ALTER TABLE ONLY public.temployee DROP CONSTRAINT temployee_cin_key21;
       public            postgres    false    220            �           2606    80627    temployee temployee_cin_key22 
   CONSTRAINT     W   ALTER TABLE ONLY public.temployee
    ADD CONSTRAINT temployee_cin_key22 UNIQUE (cin);
 G   ALTER TABLE ONLY public.temployee DROP CONSTRAINT temployee_cin_key22;
       public            postgres    false    220            �           2606    80603    temployee temployee_cin_key23 
   CONSTRAINT     W   ALTER TABLE ONLY public.temployee
    ADD CONSTRAINT temployee_cin_key23 UNIQUE (cin);
 G   ALTER TABLE ONLY public.temployee DROP CONSTRAINT temployee_cin_key23;
       public            postgres    false    220            �           2606    80605    temployee temployee_cin_key24 
   CONSTRAINT     W   ALTER TABLE ONLY public.temployee
    ADD CONSTRAINT temployee_cin_key24 UNIQUE (cin);
 G   ALTER TABLE ONLY public.temployee DROP CONSTRAINT temployee_cin_key24;
       public            postgres    false    220            �           2606    80625    temployee temployee_cin_key25 
   CONSTRAINT     W   ALTER TABLE ONLY public.temployee
    ADD CONSTRAINT temployee_cin_key25 UNIQUE (cin);
 G   ALTER TABLE ONLY public.temployee DROP CONSTRAINT temployee_cin_key25;
       public            postgres    false    220            �           2606    80607    temployee temployee_cin_key26 
   CONSTRAINT     W   ALTER TABLE ONLY public.temployee
    ADD CONSTRAINT temployee_cin_key26 UNIQUE (cin);
 G   ALTER TABLE ONLY public.temployee DROP CONSTRAINT temployee_cin_key26;
       public            postgres    false    220            �           2606    80623    temployee temployee_cin_key27 
   CONSTRAINT     W   ALTER TABLE ONLY public.temployee
    ADD CONSTRAINT temployee_cin_key27 UNIQUE (cin);
 G   ALTER TABLE ONLY public.temployee DROP CONSTRAINT temployee_cin_key27;
       public            postgres    false    220            �           2606    80609    temployee temployee_cin_key28 
   CONSTRAINT     W   ALTER TABLE ONLY public.temployee
    ADD CONSTRAINT temployee_cin_key28 UNIQUE (cin);
 G   ALTER TABLE ONLY public.temployee DROP CONSTRAINT temployee_cin_key28;
       public            postgres    false    220            �           2606    80621    temployee temployee_cin_key29 
   CONSTRAINT     W   ALTER TABLE ONLY public.temployee
    ADD CONSTRAINT temployee_cin_key29 UNIQUE (cin);
 G   ALTER TABLE ONLY public.temployee DROP CONSTRAINT temployee_cin_key29;
       public            postgres    false    220            �           2606    80649    temployee temployee_cin_key3 
   CONSTRAINT     V   ALTER TABLE ONLY public.temployee
    ADD CONSTRAINT temployee_cin_key3 UNIQUE (cin);
 F   ALTER TABLE ONLY public.temployee DROP CONSTRAINT temployee_cin_key3;
       public            postgres    false    220            �           2606    80611    temployee temployee_cin_key30 
   CONSTRAINT     W   ALTER TABLE ONLY public.temployee
    ADD CONSTRAINT temployee_cin_key30 UNIQUE (cin);
 G   ALTER TABLE ONLY public.temployee DROP CONSTRAINT temployee_cin_key30;
       public            postgres    false    220            �           2606    80619    temployee temployee_cin_key31 
   CONSTRAINT     W   ALTER TABLE ONLY public.temployee
    ADD CONSTRAINT temployee_cin_key31 UNIQUE (cin);
 G   ALTER TABLE ONLY public.temployee DROP CONSTRAINT temployee_cin_key31;
       public            postgres    false    220            �           2606    80579    temployee temployee_cin_key32 
   CONSTRAINT     W   ALTER TABLE ONLY public.temployee
    ADD CONSTRAINT temployee_cin_key32 UNIQUE (cin);
 G   ALTER TABLE ONLY public.temployee DROP CONSTRAINT temployee_cin_key32;
       public            postgres    false    220            �           2606    80617    temployee temployee_cin_key33 
   CONSTRAINT     W   ALTER TABLE ONLY public.temployee
    ADD CONSTRAINT temployee_cin_key33 UNIQUE (cin);
 G   ALTER TABLE ONLY public.temployee DROP CONSTRAINT temployee_cin_key33;
       public            postgres    false    220            �           2606    80581    temployee temployee_cin_key34 
   CONSTRAINT     W   ALTER TABLE ONLY public.temployee
    ADD CONSTRAINT temployee_cin_key34 UNIQUE (cin);
 G   ALTER TABLE ONLY public.temployee DROP CONSTRAINT temployee_cin_key34;
       public            postgres    false    220            �           2606    80615    temployee temployee_cin_key35 
   CONSTRAINT     W   ALTER TABLE ONLY public.temployee
    ADD CONSTRAINT temployee_cin_key35 UNIQUE (cin);
 G   ALTER TABLE ONLY public.temployee DROP CONSTRAINT temployee_cin_key35;
       public            postgres    false    220            �           2606    80583    temployee temployee_cin_key36 
   CONSTRAINT     W   ALTER TABLE ONLY public.temployee
    ADD CONSTRAINT temployee_cin_key36 UNIQUE (cin);
 G   ALTER TABLE ONLY public.temployee DROP CONSTRAINT temployee_cin_key36;
       public            postgres    false    220            �           2606    80613    temployee temployee_cin_key37 
   CONSTRAINT     W   ALTER TABLE ONLY public.temployee
    ADD CONSTRAINT temployee_cin_key37 UNIQUE (cin);
 G   ALTER TABLE ONLY public.temployee DROP CONSTRAINT temployee_cin_key37;
       public            postgres    false    220            �           2606    80585    temployee temployee_cin_key38 
   CONSTRAINT     W   ALTER TABLE ONLY public.temployee
    ADD CONSTRAINT temployee_cin_key38 UNIQUE (cin);
 G   ALTER TABLE ONLY public.temployee DROP CONSTRAINT temployee_cin_key38;
       public            postgres    false    220            �           2606    80587    temployee temployee_cin_key39 
   CONSTRAINT     W   ALTER TABLE ONLY public.temployee
    ADD CONSTRAINT temployee_cin_key39 UNIQUE (cin);
 G   ALTER TABLE ONLY public.temployee DROP CONSTRAINT temployee_cin_key39;
       public            postgres    false    220            �           2606    80647    temployee temployee_cin_key4 
   CONSTRAINT     V   ALTER TABLE ONLY public.temployee
    ADD CONSTRAINT temployee_cin_key4 UNIQUE (cin);
 F   ALTER TABLE ONLY public.temployee DROP CONSTRAINT temployee_cin_key4;
       public            postgres    false    220            �           2606    80577    temployee temployee_cin_key40 
   CONSTRAINT     W   ALTER TABLE ONLY public.temployee
    ADD CONSTRAINT temployee_cin_key40 UNIQUE (cin);
 G   ALTER TABLE ONLY public.temployee DROP CONSTRAINT temployee_cin_key40;
       public            postgres    false    220            �           2606    80575    temployee temployee_cin_key41 
   CONSTRAINT     W   ALTER TABLE ONLY public.temployee
    ADD CONSTRAINT temployee_cin_key41 UNIQUE (cin);
 G   ALTER TABLE ONLY public.temployee DROP CONSTRAINT temployee_cin_key41;
       public            postgres    false    220            �           2606    80641    temployee temployee_cin_key42 
   CONSTRAINT     W   ALTER TABLE ONLY public.temployee
    ADD CONSTRAINT temployee_cin_key42 UNIQUE (cin);
 G   ALTER TABLE ONLY public.temployee DROP CONSTRAINT temployee_cin_key42;
       public            postgres    false    220            �           2606    80661    temployee temployee_cin_key43 
   CONSTRAINT     W   ALTER TABLE ONLY public.temployee
    ADD CONSTRAINT temployee_cin_key43 UNIQUE (cin);
 G   ALTER TABLE ONLY public.temployee DROP CONSTRAINT temployee_cin_key43;
       public            postgres    false    220            �           2606    80573    temployee temployee_cin_key44 
   CONSTRAINT     W   ALTER TABLE ONLY public.temployee
    ADD CONSTRAINT temployee_cin_key44 UNIQUE (cin);
 G   ALTER TABLE ONLY public.temployee DROP CONSTRAINT temployee_cin_key44;
       public            postgres    false    220            �           2606    80663    temployee temployee_cin_key45 
   CONSTRAINT     W   ALTER TABLE ONLY public.temployee
    ADD CONSTRAINT temployee_cin_key45 UNIQUE (cin);
 G   ALTER TABLE ONLY public.temployee DROP CONSTRAINT temployee_cin_key45;
       public            postgres    false    220            �           2606    80571    temployee temployee_cin_key46 
   CONSTRAINT     W   ALTER TABLE ONLY public.temployee
    ADD CONSTRAINT temployee_cin_key46 UNIQUE (cin);
 G   ALTER TABLE ONLY public.temployee DROP CONSTRAINT temployee_cin_key46;
       public            postgres    false    220            �           2606    80665    temployee temployee_cin_key47 
   CONSTRAINT     W   ALTER TABLE ONLY public.temployee
    ADD CONSTRAINT temployee_cin_key47 UNIQUE (cin);
 G   ALTER TABLE ONLY public.temployee DROP CONSTRAINT temployee_cin_key47;
       public            postgres    false    220            �           2606    80667    temployee temployee_cin_key48 
   CONSTRAINT     W   ALTER TABLE ONLY public.temployee
    ADD CONSTRAINT temployee_cin_key48 UNIQUE (cin);
 G   ALTER TABLE ONLY public.temployee DROP CONSTRAINT temployee_cin_key48;
       public            postgres    false    220            �           2606    80569    temployee temployee_cin_key49 
   CONSTRAINT     W   ALTER TABLE ONLY public.temployee
    ADD CONSTRAINT temployee_cin_key49 UNIQUE (cin);
 G   ALTER TABLE ONLY public.temployee DROP CONSTRAINT temployee_cin_key49;
       public            postgres    false    220            �           2606    80657    temployee temployee_cin_key5 
   CONSTRAINT     V   ALTER TABLE ONLY public.temployee
    ADD CONSTRAINT temployee_cin_key5 UNIQUE (cin);
 F   ALTER TABLE ONLY public.temployee DROP CONSTRAINT temployee_cin_key5;
       public            postgres    false    220            �           2606    80669    temployee temployee_cin_key50 
   CONSTRAINT     W   ALTER TABLE ONLY public.temployee
    ADD CONSTRAINT temployee_cin_key50 UNIQUE (cin);
 G   ALTER TABLE ONLY public.temployee DROP CONSTRAINT temployee_cin_key50;
       public            postgres    false    220            �           2606    80671    temployee temployee_cin_key51 
   CONSTRAINT     W   ALTER TABLE ONLY public.temployee
    ADD CONSTRAINT temployee_cin_key51 UNIQUE (cin);
 G   ALTER TABLE ONLY public.temployee DROP CONSTRAINT temployee_cin_key51;
       public            postgres    false    220            �           2606    80673    temployee temployee_cin_key52 
   CONSTRAINT     W   ALTER TABLE ONLY public.temployee
    ADD CONSTRAINT temployee_cin_key52 UNIQUE (cin);
 G   ALTER TABLE ONLY public.temployee DROP CONSTRAINT temployee_cin_key52;
       public            postgres    false    220            �           2606    80567    temployee temployee_cin_key53 
   CONSTRAINT     W   ALTER TABLE ONLY public.temployee
    ADD CONSTRAINT temployee_cin_key53 UNIQUE (cin);
 G   ALTER TABLE ONLY public.temployee DROP CONSTRAINT temployee_cin_key53;
       public            postgres    false    220            �           2606    80677    temployee temployee_cin_key54 
   CONSTRAINT     W   ALTER TABLE ONLY public.temployee
    ADD CONSTRAINT temployee_cin_key54 UNIQUE (cin);
 G   ALTER TABLE ONLY public.temployee DROP CONSTRAINT temployee_cin_key54;
       public            postgres    false    220            �           2606    80565    temployee temployee_cin_key55 
   CONSTRAINT     W   ALTER TABLE ONLY public.temployee
    ADD CONSTRAINT temployee_cin_key55 UNIQUE (cin);
 G   ALTER TABLE ONLY public.temployee DROP CONSTRAINT temployee_cin_key55;
       public            postgres    false    220            �           2606    80679    temployee temployee_cin_key56 
   CONSTRAINT     W   ALTER TABLE ONLY public.temployee
    ADD CONSTRAINT temployee_cin_key56 UNIQUE (cin);
 G   ALTER TABLE ONLY public.temployee DROP CONSTRAINT temployee_cin_key56;
       public            postgres    false    220            �           2606    80563    temployee temployee_cin_key57 
   CONSTRAINT     W   ALTER TABLE ONLY public.temployee
    ADD CONSTRAINT temployee_cin_key57 UNIQUE (cin);
 G   ALTER TABLE ONLY public.temployee DROP CONSTRAINT temployee_cin_key57;
       public            postgres    false    220            �           2606    80681    temployee temployee_cin_key58 
   CONSTRAINT     W   ALTER TABLE ONLY public.temployee
    ADD CONSTRAINT temployee_cin_key58 UNIQUE (cin);
 G   ALTER TABLE ONLY public.temployee DROP CONSTRAINT temployee_cin_key58;
       public            postgres    false    220            �           2606    80561    temployee temployee_cin_key59 
   CONSTRAINT     W   ALTER TABLE ONLY public.temployee
    ADD CONSTRAINT temployee_cin_key59 UNIQUE (cin);
 G   ALTER TABLE ONLY public.temployee DROP CONSTRAINT temployee_cin_key59;
       public            postgres    false    220            �           2606    80645    temployee temployee_cin_key6 
   CONSTRAINT     V   ALTER TABLE ONLY public.temployee
    ADD CONSTRAINT temployee_cin_key6 UNIQUE (cin);
 F   ALTER TABLE ONLY public.temployee DROP CONSTRAINT temployee_cin_key6;
       public            postgres    false    220            �           2606    80683    temployee temployee_cin_key60 
   CONSTRAINT     W   ALTER TABLE ONLY public.temployee
    ADD CONSTRAINT temployee_cin_key60 UNIQUE (cin);
 G   ALTER TABLE ONLY public.temployee DROP CONSTRAINT temployee_cin_key60;
       public            postgres    false    220            �           2606    80559    temployee temployee_cin_key61 
   CONSTRAINT     W   ALTER TABLE ONLY public.temployee
    ADD CONSTRAINT temployee_cin_key61 UNIQUE (cin);
 G   ALTER TABLE ONLY public.temployee DROP CONSTRAINT temployee_cin_key61;
       public            postgres    false    220            �           2606    80685    temployee temployee_cin_key62 
   CONSTRAINT     W   ALTER TABLE ONLY public.temployee
    ADD CONSTRAINT temployee_cin_key62 UNIQUE (cin);
 G   ALTER TABLE ONLY public.temployee DROP CONSTRAINT temployee_cin_key62;
       public            postgres    false    220            �           2606    80557    temployee temployee_cin_key63 
   CONSTRAINT     W   ALTER TABLE ONLY public.temployee
    ADD CONSTRAINT temployee_cin_key63 UNIQUE (cin);
 G   ALTER TABLE ONLY public.temployee DROP CONSTRAINT temployee_cin_key63;
       public            postgres    false    220            �           2606    80675    temployee temployee_cin_key64 
   CONSTRAINT     W   ALTER TABLE ONLY public.temployee
    ADD CONSTRAINT temployee_cin_key64 UNIQUE (cin);
 G   ALTER TABLE ONLY public.temployee DROP CONSTRAINT temployee_cin_key64;
       public            postgres    false    220            �           2606    80687    temployee temployee_cin_key65 
   CONSTRAINT     W   ALTER TABLE ONLY public.temployee
    ADD CONSTRAINT temployee_cin_key65 UNIQUE (cin);
 G   ALTER TABLE ONLY public.temployee DROP CONSTRAINT temployee_cin_key65;
       public            postgres    false    220            �           2606    80555    temployee temployee_cin_key66 
   CONSTRAINT     W   ALTER TABLE ONLY public.temployee
    ADD CONSTRAINT temployee_cin_key66 UNIQUE (cin);
 G   ALTER TABLE ONLY public.temployee DROP CONSTRAINT temployee_cin_key66;
       public            postgres    false    220            �           2606    80689    temployee temployee_cin_key67 
   CONSTRAINT     W   ALTER TABLE ONLY public.temployee
    ADD CONSTRAINT temployee_cin_key67 UNIQUE (cin);
 G   ALTER TABLE ONLY public.temployee DROP CONSTRAINT temployee_cin_key67;
       public            postgres    false    220            �           2606    80553    temployee temployee_cin_key68 
   CONSTRAINT     W   ALTER TABLE ONLY public.temployee
    ADD CONSTRAINT temployee_cin_key68 UNIQUE (cin);
 G   ALTER TABLE ONLY public.temployee DROP CONSTRAINT temployee_cin_key68;
       public            postgres    false    220            �           2606    80691    temployee temployee_cin_key69 
   CONSTRAINT     W   ALTER TABLE ONLY public.temployee
    ADD CONSTRAINT temployee_cin_key69 UNIQUE (cin);
 G   ALTER TABLE ONLY public.temployee DROP CONSTRAINT temployee_cin_key69;
       public            postgres    false    220            �           2606    80659    temployee temployee_cin_key7 
   CONSTRAINT     V   ALTER TABLE ONLY public.temployee
    ADD CONSTRAINT temployee_cin_key7 UNIQUE (cin);
 F   ALTER TABLE ONLY public.temployee DROP CONSTRAINT temployee_cin_key7;
       public            postgres    false    220            �           2606    80551    temployee temployee_cin_key70 
   CONSTRAINT     W   ALTER TABLE ONLY public.temployee
    ADD CONSTRAINT temployee_cin_key70 UNIQUE (cin);
 G   ALTER TABLE ONLY public.temployee DROP CONSTRAINT temployee_cin_key70;
       public            postgres    false    220            �           2606    80695    temployee temployee_cin_key71 
   CONSTRAINT     W   ALTER TABLE ONLY public.temployee
    ADD CONSTRAINT temployee_cin_key71 UNIQUE (cin);
 G   ALTER TABLE ONLY public.temployee DROP CONSTRAINT temployee_cin_key71;
       public            postgres    false    220                        2606    80549    temployee temployee_cin_key72 
   CONSTRAINT     W   ALTER TABLE ONLY public.temployee
    ADD CONSTRAINT temployee_cin_key72 UNIQUE (cin);
 G   ALTER TABLE ONLY public.temployee DROP CONSTRAINT temployee_cin_key72;
       public            postgres    false    220                       2606    80697    temployee temployee_cin_key73 
   CONSTRAINT     W   ALTER TABLE ONLY public.temployee
    ADD CONSTRAINT temployee_cin_key73 UNIQUE (cin);
 G   ALTER TABLE ONLY public.temployee DROP CONSTRAINT temployee_cin_key73;
       public            postgres    false    220                       2606    80547    temployee temployee_cin_key74 
   CONSTRAINT     W   ALTER TABLE ONLY public.temployee
    ADD CONSTRAINT temployee_cin_key74 UNIQUE (cin);
 G   ALTER TABLE ONLY public.temployee DROP CONSTRAINT temployee_cin_key74;
       public            postgres    false    220                       2606    80701    temployee temployee_cin_key75 
   CONSTRAINT     W   ALTER TABLE ONLY public.temployee
    ADD CONSTRAINT temployee_cin_key75 UNIQUE (cin);
 G   ALTER TABLE ONLY public.temployee DROP CONSTRAINT temployee_cin_key75;
       public            postgres    false    220                       2606    80545    temployee temployee_cin_key76 
   CONSTRAINT     W   ALTER TABLE ONLY public.temployee
    ADD CONSTRAINT temployee_cin_key76 UNIQUE (cin);
 G   ALTER TABLE ONLY public.temployee DROP CONSTRAINT temployee_cin_key76;
       public            postgres    false    220            
           2606    80703    temployee temployee_cin_key77 
   CONSTRAINT     W   ALTER TABLE ONLY public.temployee
    ADD CONSTRAINT temployee_cin_key77 UNIQUE (cin);
 G   ALTER TABLE ONLY public.temployee DROP CONSTRAINT temployee_cin_key77;
       public            postgres    false    220                       2606    80543    temployee temployee_cin_key78 
   CONSTRAINT     W   ALTER TABLE ONLY public.temployee
    ADD CONSTRAINT temployee_cin_key78 UNIQUE (cin);
 G   ALTER TABLE ONLY public.temployee DROP CONSTRAINT temployee_cin_key78;
       public            postgres    false    220                       2606    80705    temployee temployee_cin_key79 
   CONSTRAINT     W   ALTER TABLE ONLY public.temployee
    ADD CONSTRAINT temployee_cin_key79 UNIQUE (cin);
 G   ALTER TABLE ONLY public.temployee DROP CONSTRAINT temployee_cin_key79;
       public            postgres    false    220                       2606    80643    temployee temployee_cin_key8 
   CONSTRAINT     V   ALTER TABLE ONLY public.temployee
    ADD CONSTRAINT temployee_cin_key8 UNIQUE (cin);
 F   ALTER TABLE ONLY public.temployee DROP CONSTRAINT temployee_cin_key8;
       public            postgres    false    220                       2606    80541    temployee temployee_cin_key80 
   CONSTRAINT     W   ALTER TABLE ONLY public.temployee
    ADD CONSTRAINT temployee_cin_key80 UNIQUE (cin);
 G   ALTER TABLE ONLY public.temployee DROP CONSTRAINT temployee_cin_key80;
       public            postgres    false    220                       2606    80711    temployee temployee_cin_key81 
   CONSTRAINT     W   ALTER TABLE ONLY public.temployee
    ADD CONSTRAINT temployee_cin_key81 UNIQUE (cin);
 G   ALTER TABLE ONLY public.temployee DROP CONSTRAINT temployee_cin_key81;
       public            postgres    false    220                       2606    80539    temployee temployee_cin_key82 
   CONSTRAINT     W   ALTER TABLE ONLY public.temployee
    ADD CONSTRAINT temployee_cin_key82 UNIQUE (cin);
 G   ALTER TABLE ONLY public.temployee DROP CONSTRAINT temployee_cin_key82;
       public            postgres    false    220                       2606    80709    temployee temployee_cin_key83 
   CONSTRAINT     W   ALTER TABLE ONLY public.temployee
    ADD CONSTRAINT temployee_cin_key83 UNIQUE (cin);
 G   ALTER TABLE ONLY public.temployee DROP CONSTRAINT temployee_cin_key83;
       public            postgres    false    220                       2606    80537    temployee temployee_cin_key84 
   CONSTRAINT     W   ALTER TABLE ONLY public.temployee
    ADD CONSTRAINT temployee_cin_key84 UNIQUE (cin);
 G   ALTER TABLE ONLY public.temployee DROP CONSTRAINT temployee_cin_key84;
       public            postgres    false    220                       2606    80699    temployee temployee_cin_key85 
   CONSTRAINT     W   ALTER TABLE ONLY public.temployee
    ADD CONSTRAINT temployee_cin_key85 UNIQUE (cin);
 G   ALTER TABLE ONLY public.temployee DROP CONSTRAINT temployee_cin_key85;
       public            postgres    false    220                       2606    80535    temployee temployee_cin_key86 
   CONSTRAINT     W   ALTER TABLE ONLY public.temployee
    ADD CONSTRAINT temployee_cin_key86 UNIQUE (cin);
 G   ALTER TABLE ONLY public.temployee DROP CONSTRAINT temployee_cin_key86;
       public            postgres    false    220                        2606    80693    temployee temployee_cin_key87 
   CONSTRAINT     W   ALTER TABLE ONLY public.temployee
    ADD CONSTRAINT temployee_cin_key87 UNIQUE (cin);
 G   ALTER TABLE ONLY public.temployee DROP CONSTRAINT temployee_cin_key87;
       public            postgres    false    220            "           2606    80533    temployee temployee_cin_key88 
   CONSTRAINT     W   ALTER TABLE ONLY public.temployee
    ADD CONSTRAINT temployee_cin_key88 UNIQUE (cin);
 G   ALTER TABLE ONLY public.temployee DROP CONSTRAINT temployee_cin_key88;
       public            postgres    false    220            $           2606    80713    temployee temployee_cin_key89 
   CONSTRAINT     W   ALTER TABLE ONLY public.temployee
    ADD CONSTRAINT temployee_cin_key89 UNIQUE (cin);
 G   ALTER TABLE ONLY public.temployee DROP CONSTRAINT temployee_cin_key89;
       public            postgres    false    220            &           2606    80589    temployee temployee_cin_key9 
   CONSTRAINT     V   ALTER TABLE ONLY public.temployee
    ADD CONSTRAINT temployee_cin_key9 UNIQUE (cin);
 F   ALTER TABLE ONLY public.temployee DROP CONSTRAINT temployee_cin_key9;
       public            postgres    false    220            (           2606    80531    temployee temployee_cin_key90 
   CONSTRAINT     W   ALTER TABLE ONLY public.temployee
    ADD CONSTRAINT temployee_cin_key90 UNIQUE (cin);
 G   ALTER TABLE ONLY public.temployee DROP CONSTRAINT temployee_cin_key90;
       public            postgres    false    220            *           2606    80707    temployee temployee_cin_key91 
   CONSTRAINT     W   ALTER TABLE ONLY public.temployee
    ADD CONSTRAINT temployee_cin_key91 UNIQUE (cin);
 G   ALTER TABLE ONLY public.temployee DROP CONSTRAINT temployee_cin_key91;
       public            postgres    false    220            ,           2606    26692    temployee temployee_pkey 
   CONSTRAINT     V   ALTER TABLE ONLY public.temployee
    ADD CONSTRAINT temployee_pkey PRIMARY KEY (id);
 B   ALTER TABLE ONLY public.temployee DROP CONSTRAINT temployee_pkey;
       public            postgres    false    220            �           2606    26666    tfamille tfamille_pkey 
   CONSTRAINT     T   ALTER TABLE ONLY public.tfamille
    ADD CONSTRAINT tfamille_pkey PRIMARY KEY (id);
 @   ALTER TABLE ONLY public.tfamille DROP CONSTRAINT tfamille_pkey;
       public            postgres    false    216            `           2606    58298     tlignedemande tlignedemande_pkey 
   CONSTRAINT     d   ALTER TABLE ONLY public.tlignedemande
    ADD CONSTRAINT tlignedemande_pkey PRIMARY KEY (id_ligne);
 J   ALTER TABLE ONLY public.tlignedemande DROP CONSTRAINT tlignedemande_pkey;
       public            postgres    false    230            b           2606    58313    tpaiement tpaiement_pkey 
   CONSTRAINT     X   ALTER TABLE ONLY public.tpaiement
    ADD CONSTRAINT tpaiement_pkey PRIMARY KEY (id_p);
 B   ALTER TABLE ONLY public.tpaiement DROP CONSTRAINT tpaiement_pkey;
       public            postgres    false    232            0           2606    26706    tservices tservices_pkey 
   CONSTRAINT     V   ALTER TABLE ONLY public.tservices
    ADD CONSTRAINT tservices_pkey PRIMARY KEY (id);
 B   ALTER TABLE ONLY public.tservices DROP CONSTRAINT tservices_pkey;
       public            postgres    false    224            2           2606    80996    tusers tusers_login_key 
   CONSTRAINT     S   ALTER TABLE ONLY public.tusers
    ADD CONSTRAINT tusers_login_key UNIQUE (login);
 A   ALTER TABLE ONLY public.tusers DROP CONSTRAINT tusers_login_key;
       public            postgres    false    226            4           2606    80822    tusers tusers_login_key1 
   CONSTRAINT     T   ALTER TABLE ONLY public.tusers
    ADD CONSTRAINT tusers_login_key1 UNIQUE (login);
 B   ALTER TABLE ONLY public.tusers DROP CONSTRAINT tusers_login_key1;
       public            postgres    false    226            6           2606    80908    tusers tusers_login_key10 
   CONSTRAINT     U   ALTER TABLE ONLY public.tusers
    ADD CONSTRAINT tusers_login_key10 UNIQUE (login);
 C   ALTER TABLE ONLY public.tusers DROP CONSTRAINT tusers_login_key10;
       public            postgres    false    226            8           2606    80854    tusers tusers_login_key100 
   CONSTRAINT     V   ALTER TABLE ONLY public.tusers
    ADD CONSTRAINT tusers_login_key100 UNIQUE (login);
 D   ALTER TABLE ONLY public.tusers DROP CONSTRAINT tusers_login_key100;
       public            postgres    false    226            :           2606    80836    tusers tusers_login_key101 
   CONSTRAINT     V   ALTER TABLE ONLY public.tusers
    ADD CONSTRAINT tusers_login_key101 UNIQUE (login);
 D   ALTER TABLE ONLY public.tusers DROP CONSTRAINT tusers_login_key101;
       public            postgres    false    226            <           2606    80790    tusers tusers_login_key102 
   CONSTRAINT     V   ALTER TABLE ONLY public.tusers
    ADD CONSTRAINT tusers_login_key102 UNIQUE (login);
 D   ALTER TABLE ONLY public.tusers DROP CONSTRAINT tusers_login_key102;
       public            postgres    false    226            >           2606    80834    tusers tusers_login_key103 
   CONSTRAINT     V   ALTER TABLE ONLY public.tusers
    ADD CONSTRAINT tusers_login_key103 UNIQUE (login);
 D   ALTER TABLE ONLY public.tusers DROP CONSTRAINT tusers_login_key103;
       public            postgres    false    226            @           2606    80792    tusers tusers_login_key104 
   CONSTRAINT     V   ALTER TABLE ONLY public.tusers
    ADD CONSTRAINT tusers_login_key104 UNIQUE (login);
 D   ALTER TABLE ONLY public.tusers DROP CONSTRAINT tusers_login_key104;
       public            postgres    false    226            B           2606    80794    tusers tusers_login_key105 
   CONSTRAINT     V   ALTER TABLE ONLY public.tusers
    ADD CONSTRAINT tusers_login_key105 UNIQUE (login);
 D   ALTER TABLE ONLY public.tusers DROP CONSTRAINT tusers_login_key105;
       public            postgres    false    226            D           2606    80874    tusers tusers_login_key106 
   CONSTRAINT     V   ALTER TABLE ONLY public.tusers
    ADD CONSTRAINT tusers_login_key106 UNIQUE (login);
 D   ALTER TABLE ONLY public.tusers DROP CONSTRAINT tusers_login_key106;
       public            postgres    false    226            F           2606    80798    tusers tusers_login_key107 
   CONSTRAINT     V   ALTER TABLE ONLY public.tusers
    ADD CONSTRAINT tusers_login_key107 UNIQUE (login);
 D   ALTER TABLE ONLY public.tusers DROP CONSTRAINT tusers_login_key107;
       public            postgres    false    226            H           2606    80800    tusers tusers_login_key108 
   CONSTRAINT     V   ALTER TABLE ONLY public.tusers
    ADD CONSTRAINT tusers_login_key108 UNIQUE (login);
 D   ALTER TABLE ONLY public.tusers DROP CONSTRAINT tusers_login_key108;
       public            postgres    false    226            J           2606    80802    tusers tusers_login_key109 
   CONSTRAINT     V   ALTER TABLE ONLY public.tusers
    ADD CONSTRAINT tusers_login_key109 UNIQUE (login);
 D   ALTER TABLE ONLY public.tusers DROP CONSTRAINT tusers_login_key109;
       public            postgres    false    226            L           2606    80994    tusers tusers_login_key11 
   CONSTRAINT     U   ALTER TABLE ONLY public.tusers
    ADD CONSTRAINT tusers_login_key11 UNIQUE (login);
 C   ALTER TABLE ONLY public.tusers DROP CONSTRAINT tusers_login_key11;
       public            postgres    false    226            N           2606    80872    tusers tusers_login_key110 
   CONSTRAINT     V   ALTER TABLE ONLY public.tusers
    ADD CONSTRAINT tusers_login_key110 UNIQUE (login);
 D   ALTER TABLE ONLY public.tusers DROP CONSTRAINT tusers_login_key110;
       public            postgres    false    226            P           2606    80804    tusers tusers_login_key111 
   CONSTRAINT     V   ALTER TABLE ONLY public.tusers
    ADD CONSTRAINT tusers_login_key111 UNIQUE (login);
 D   ALTER TABLE ONLY public.tusers DROP CONSTRAINT tusers_login_key111;
       public            postgres    false    226            R           2606    80728    tusers tusers_login_key112 
   CONSTRAINT     V   ALTER TABLE ONLY public.tusers
    ADD CONSTRAINT tusers_login_key112 UNIQUE (login);
 D   ALTER TABLE ONLY public.tusers DROP CONSTRAINT tusers_login_key112;
       public            postgres    false    226            T           2606    80886    tusers tusers_login_key113 
   CONSTRAINT     V   ALTER TABLE ONLY public.tusers
    ADD CONSTRAINT tusers_login_key113 UNIQUE (login);
 D   ALTER TABLE ONLY public.tusers DROP CONSTRAINT tusers_login_key113;
       public            postgres    false    226            V           2606    80726    tusers tusers_login_key114 
   CONSTRAINT     V   ALTER TABLE ONLY public.tusers
    ADD CONSTRAINT tusers_login_key114 UNIQUE (login);
 D   ALTER TABLE ONLY public.tusers DROP CONSTRAINT tusers_login_key114;
       public            postgres    false    226            X           2606    81016    tusers tusers_login_key115 
   CONSTRAINT     V   ALTER TABLE ONLY public.tusers
    ADD CONSTRAINT tusers_login_key115 UNIQUE (login);
 D   ALTER TABLE ONLY public.tusers DROP CONSTRAINT tusers_login_key115;
       public            postgres    false    226            Z           2606    81020    tusers tusers_login_key116 
   CONSTRAINT     V   ALTER TABLE ONLY public.tusers
    ADD CONSTRAINT tusers_login_key116 UNIQUE (login);
 D   ALTER TABLE ONLY public.tusers DROP CONSTRAINT tusers_login_key116;
       public            postgres    false    226            \           2606    81018    tusers tusers_login_key117 
   CONSTRAINT     V   ALTER TABLE ONLY public.tusers
    ADD CONSTRAINT tusers_login_key117 UNIQUE (login);
 D   ALTER TABLE ONLY public.tusers DROP CONSTRAINT tusers_login_key117;
       public            postgres    false    226            ^           2606    81006    tusers tusers_login_key118 
   CONSTRAINT     V   ALTER TABLE ONLY public.tusers
    ADD CONSTRAINT tusers_login_key118 UNIQUE (login);
 D   ALTER TABLE ONLY public.tusers DROP CONSTRAINT tusers_login_key118;
       public            postgres    false    226            `           2606    80968    tusers tusers_login_key119 
   CONSTRAINT     V   ALTER TABLE ONLY public.tusers
    ADD CONSTRAINT tusers_login_key119 UNIQUE (login);
 D   ALTER TABLE ONLY public.tusers DROP CONSTRAINT tusers_login_key119;
       public            postgres    false    226            b           2606    80912    tusers tusers_login_key12 
   CONSTRAINT     U   ALTER TABLE ONLY public.tusers
    ADD CONSTRAINT tusers_login_key12 UNIQUE (login);
 C   ALTER TABLE ONLY public.tusers DROP CONSTRAINT tusers_login_key12;
       public            postgres    false    226            d           2606    81010    tusers tusers_login_key120 
   CONSTRAINT     V   ALTER TABLE ONLY public.tusers
    ADD CONSTRAINT tusers_login_key120 UNIQUE (login);
 D   ALTER TABLE ONLY public.tusers DROP CONSTRAINT tusers_login_key120;
       public            postgres    false    226            f           2606    80966    tusers tusers_login_key121 
   CONSTRAINT     V   ALTER TABLE ONLY public.tusers
    ADD CONSTRAINT tusers_login_key121 UNIQUE (login);
 D   ALTER TABLE ONLY public.tusers DROP CONSTRAINT tusers_login_key121;
       public            postgres    false    226            h           2606    80938    tusers tusers_login_key122 
   CONSTRAINT     V   ALTER TABLE ONLY public.tusers
    ADD CONSTRAINT tusers_login_key122 UNIQUE (login);
 D   ALTER TABLE ONLY public.tusers DROP CONSTRAINT tusers_login_key122;
       public            postgres    false    226            j           2606    80960    tusers tusers_login_key123 
   CONSTRAINT     V   ALTER TABLE ONLY public.tusers
    ADD CONSTRAINT tusers_login_key123 UNIQUE (login);
 D   ALTER TABLE ONLY public.tusers DROP CONSTRAINT tusers_login_key123;
       public            postgres    false    226            l           2606    80940    tusers tusers_login_key124 
   CONSTRAINT     V   ALTER TABLE ONLY public.tusers
    ADD CONSTRAINT tusers_login_key124 UNIQUE (login);
 D   ALTER TABLE ONLY public.tusers DROP CONSTRAINT tusers_login_key124;
       public            postgres    false    226            n           2606    80942    tusers tusers_login_key125 
   CONSTRAINT     V   ALTER TABLE ONLY public.tusers
    ADD CONSTRAINT tusers_login_key125 UNIQUE (login);
 D   ALTER TABLE ONLY public.tusers DROP CONSTRAINT tusers_login_key125;
       public            postgres    false    226            p           2606    80838    tusers tusers_login_key126 
   CONSTRAINT     V   ALTER TABLE ONLY public.tusers
    ADD CONSTRAINT tusers_login_key126 UNIQUE (login);
 D   ALTER TABLE ONLY public.tusers DROP CONSTRAINT tusers_login_key126;
       public            postgres    false    226            r           2606    80904    tusers tusers_login_key127 
   CONSTRAINT     V   ALTER TABLE ONLY public.tusers
    ADD CONSTRAINT tusers_login_key127 UNIQUE (login);
 D   ALTER TABLE ONLY public.tusers DROP CONSTRAINT tusers_login_key127;
       public            postgres    false    226            t           2606    80796    tusers tusers_login_key128 
   CONSTRAINT     V   ALTER TABLE ONLY public.tusers
    ADD CONSTRAINT tusers_login_key128 UNIQUE (login);
 D   ALTER TABLE ONLY public.tusers DROP CONSTRAINT tusers_login_key128;
       public            postgres    false    226            v           2606    80902    tusers tusers_login_key129 
   CONSTRAINT     V   ALTER TABLE ONLY public.tusers
    ADD CONSTRAINT tusers_login_key129 UNIQUE (login);
 D   ALTER TABLE ONLY public.tusers DROP CONSTRAINT tusers_login_key129;
       public            postgres    false    226            x           2606    80914    tusers tusers_login_key13 
   CONSTRAINT     U   ALTER TABLE ONLY public.tusers
    ADD CONSTRAINT tusers_login_key13 UNIQUE (login);
 C   ALTER TABLE ONLY public.tusers DROP CONSTRAINT tusers_login_key13;
       public            postgres    false    226            z           2606    80928    tusers tusers_login_key130 
   CONSTRAINT     V   ALTER TABLE ONLY public.tusers
    ADD CONSTRAINT tusers_login_key130 UNIQUE (login);
 D   ALTER TABLE ONLY public.tusers DROP CONSTRAINT tusers_login_key130;
       public            postgres    false    226            |           2606    80870    tusers tusers_login_key131 
   CONSTRAINT     V   ALTER TABLE ONLY public.tusers
    ADD CONSTRAINT tusers_login_key131 UNIQUE (login);
 D   ALTER TABLE ONLY public.tusers DROP CONSTRAINT tusers_login_key131;
       public            postgres    false    226            ~           2606    80806    tusers tusers_login_key132 
   CONSTRAINT     V   ALTER TABLE ONLY public.tusers
    ADD CONSTRAINT tusers_login_key132 UNIQUE (login);
 D   ALTER TABLE ONLY public.tusers DROP CONSTRAINT tusers_login_key132;
       public            postgres    false    226            �           2606    80868    tusers tusers_login_key133 
   CONSTRAINT     V   ALTER TABLE ONLY public.tusers
    ADD CONSTRAINT tusers_login_key133 UNIQUE (login);
 D   ALTER TABLE ONLY public.tusers DROP CONSTRAINT tusers_login_key133;
       public            postgres    false    226            �           2606    80808    tusers tusers_login_key134 
   CONSTRAINT     V   ALTER TABLE ONLY public.tusers
    ADD CONSTRAINT tusers_login_key134 UNIQUE (login);
 D   ALTER TABLE ONLY public.tusers DROP CONSTRAINT tusers_login_key134;
       public            postgres    false    226            �           2606    80866    tusers tusers_login_key135 
   CONSTRAINT     V   ALTER TABLE ONLY public.tusers
    ADD CONSTRAINT tusers_login_key135 UNIQUE (login);
 D   ALTER TABLE ONLY public.tusers DROP CONSTRAINT tusers_login_key135;
       public            postgres    false    226            �           2606    80826    tusers tusers_login_key136 
   CONSTRAINT     V   ALTER TABLE ONLY public.tusers
    ADD CONSTRAINT tusers_login_key136 UNIQUE (login);
 D   ALTER TABLE ONLY public.tusers DROP CONSTRAINT tusers_login_key136;
       public            postgres    false    226            �           2606    80864    tusers tusers_login_key137 
   CONSTRAINT     V   ALTER TABLE ONLY public.tusers
    ADD CONSTRAINT tusers_login_key137 UNIQUE (login);
 D   ALTER TABLE ONLY public.tusers DROP CONSTRAINT tusers_login_key137;
       public            postgres    false    226            �           2606    80862    tusers tusers_login_key138 
   CONSTRAINT     V   ALTER TABLE ONLY public.tusers
    ADD CONSTRAINT tusers_login_key138 UNIQUE (login);
 D   ALTER TABLE ONLY public.tusers DROP CONSTRAINT tusers_login_key138;
       public            postgres    false    226            �           2606    80920    tusers tusers_login_key139 
   CONSTRAINT     V   ALTER TABLE ONLY public.tusers
    ADD CONSTRAINT tusers_login_key139 UNIQUE (login);
 D   ALTER TABLE ONLY public.tusers DROP CONSTRAINT tusers_login_key139;
       public            postgres    false    226            �           2606    80992    tusers tusers_login_key14 
   CONSTRAINT     U   ALTER TABLE ONLY public.tusers
    ADD CONSTRAINT tusers_login_key14 UNIQUE (login);
 C   ALTER TABLE ONLY public.tusers DROP CONSTRAINT tusers_login_key14;
       public            postgres    false    226            �           2606    80910    tusers tusers_login_key140 
   CONSTRAINT     V   ALTER TABLE ONLY public.tusers
    ADD CONSTRAINT tusers_login_key140 UNIQUE (login);
 D   ALTER TABLE ONLY public.tusers DROP CONSTRAINT tusers_login_key140;
       public            postgres    false    226            �           2606    80814    tusers tusers_login_key141 
   CONSTRAINT     V   ALTER TABLE ONLY public.tusers
    ADD CONSTRAINT tusers_login_key141 UNIQUE (login);
 D   ALTER TABLE ONLY public.tusers DROP CONSTRAINT tusers_login_key141;
       public            postgres    false    226            �           2606    80812    tusers tusers_login_key142 
   CONSTRAINT     V   ALTER TABLE ONLY public.tusers
    ADD CONSTRAINT tusers_login_key142 UNIQUE (login);
 D   ALTER TABLE ONLY public.tusers DROP CONSTRAINT tusers_login_key142;
       public            postgres    false    226            �           2606    80852    tusers tusers_login_key143 
   CONSTRAINT     V   ALTER TABLE ONLY public.tusers
    ADD CONSTRAINT tusers_login_key143 UNIQUE (login);
 D   ALTER TABLE ONLY public.tusers DROP CONSTRAINT tusers_login_key143;
       public            postgres    false    226            �           2606    80740    tusers tusers_login_key144 
   CONSTRAINT     V   ALTER TABLE ONLY public.tusers
    ADD CONSTRAINT tusers_login_key144 UNIQUE (login);
 D   ALTER TABLE ONLY public.tusers DROP CONSTRAINT tusers_login_key144;
       public            postgres    false    226            �           2606    80756    tusers tusers_login_key145 
   CONSTRAINT     V   ALTER TABLE ONLY public.tusers
    ADD CONSTRAINT tusers_login_key145 UNIQUE (login);
 D   ALTER TABLE ONLY public.tusers DROP CONSTRAINT tusers_login_key145;
       public            postgres    false    226            �           2606    80828    tusers tusers_login_key146 
   CONSTRAINT     V   ALTER TABLE ONLY public.tusers
    ADD CONSTRAINT tusers_login_key146 UNIQUE (login);
 D   ALTER TABLE ONLY public.tusers DROP CONSTRAINT tusers_login_key146;
       public            postgres    false    226            �           2606    80724    tusers tusers_login_key147 
   CONSTRAINT     V   ALTER TABLE ONLY public.tusers
    ADD CONSTRAINT tusers_login_key147 UNIQUE (login);
 D   ALTER TABLE ONLY public.tusers DROP CONSTRAINT tusers_login_key147;
       public            postgres    false    226            �           2606    80810    tusers tusers_login_key148 
   CONSTRAINT     V   ALTER TABLE ONLY public.tusers
    ADD CONSTRAINT tusers_login_key148 UNIQUE (login);
 D   ALTER TABLE ONLY public.tusers DROP CONSTRAINT tusers_login_key148;
       public            postgres    false    226            �           2606    80916    tusers tusers_login_key15 
   CONSTRAINT     U   ALTER TABLE ONLY public.tusers
    ADD CONSTRAINT tusers_login_key15 UNIQUE (login);
 C   ALTER TABLE ONLY public.tusers DROP CONSTRAINT tusers_login_key15;
       public            postgres    false    226            �           2606    80982    tusers tusers_login_key16 
   CONSTRAINT     U   ALTER TABLE ONLY public.tusers
    ADD CONSTRAINT tusers_login_key16 UNIQUE (login);
 C   ALTER TABLE ONLY public.tusers DROP CONSTRAINT tusers_login_key16;
       public            postgres    false    226            �           2606    80986    tusers tusers_login_key17 
   CONSTRAINT     U   ALTER TABLE ONLY public.tusers
    ADD CONSTRAINT tusers_login_key17 UNIQUE (login);
 C   ALTER TABLE ONLY public.tusers DROP CONSTRAINT tusers_login_key17;
       public            postgres    false    226            �           2606    80934    tusers tusers_login_key18 
   CONSTRAINT     U   ALTER TABLE ONLY public.tusers
    ADD CONSTRAINT tusers_login_key18 UNIQUE (login);
 C   ALTER TABLE ONLY public.tusers DROP CONSTRAINT tusers_login_key18;
       public            postgres    false    226            �           2606    80990    tusers tusers_login_key19 
   CONSTRAINT     U   ALTER TABLE ONLY public.tusers
    ADD CONSTRAINT tusers_login_key19 UNIQUE (login);
 C   ALTER TABLE ONLY public.tusers DROP CONSTRAINT tusers_login_key19;
       public            postgres    false    226            �           2606    80824    tusers tusers_login_key2 
   CONSTRAINT     T   ALTER TABLE ONLY public.tusers
    ADD CONSTRAINT tusers_login_key2 UNIQUE (login);
 B   ALTER TABLE ONLY public.tusers DROP CONSTRAINT tusers_login_key2;
       public            postgres    false    226            �           2606    80936    tusers tusers_login_key20 
   CONSTRAINT     U   ALTER TABLE ONLY public.tusers
    ADD CONSTRAINT tusers_login_key20 UNIQUE (login);
 C   ALTER TABLE ONLY public.tusers DROP CONSTRAINT tusers_login_key20;
       public            postgres    false    226            �           2606    80988    tusers tusers_login_key21 
   CONSTRAINT     U   ALTER TABLE ONLY public.tusers
    ADD CONSTRAINT tusers_login_key21 UNIQUE (login);
 C   ALTER TABLE ONLY public.tusers DROP CONSTRAINT tusers_login_key21;
       public            postgres    false    226            �           2606    80962    tusers tusers_login_key22 
   CONSTRAINT     U   ALTER TABLE ONLY public.tusers
    ADD CONSTRAINT tusers_login_key22 UNIQUE (login);
 C   ALTER TABLE ONLY public.tusers DROP CONSTRAINT tusers_login_key22;
       public            postgres    false    226            �           2606    80978    tusers tusers_login_key23 
   CONSTRAINT     U   ALTER TABLE ONLY public.tusers
    ADD CONSTRAINT tusers_login_key23 UNIQUE (login);
 C   ALTER TABLE ONLY public.tusers DROP CONSTRAINT tusers_login_key23;
       public            postgres    false    226            �           2606    80964    tusers tusers_login_key24 
   CONSTRAINT     U   ALTER TABLE ONLY public.tusers
    ADD CONSTRAINT tusers_login_key24 UNIQUE (login);
 C   ALTER TABLE ONLY public.tusers DROP CONSTRAINT tusers_login_key24;
       public            postgres    false    226            �           2606    80976    tusers tusers_login_key25 
   CONSTRAINT     U   ALTER TABLE ONLY public.tusers
    ADD CONSTRAINT tusers_login_key25 UNIQUE (login);
 C   ALTER TABLE ONLY public.tusers DROP CONSTRAINT tusers_login_key25;
       public            postgres    false    226            �           2606    80970    tusers tusers_login_key26 
   CONSTRAINT     U   ALTER TABLE ONLY public.tusers
    ADD CONSTRAINT tusers_login_key26 UNIQUE (login);
 C   ALTER TABLE ONLY public.tusers DROP CONSTRAINT tusers_login_key26;
       public            postgres    false    226            �           2606    80972    tusers tusers_login_key27 
   CONSTRAINT     U   ALTER TABLE ONLY public.tusers
    ADD CONSTRAINT tusers_login_key27 UNIQUE (login);
 C   ALTER TABLE ONLY public.tusers DROP CONSTRAINT tusers_login_key27;
       public            postgres    false    226            �           2606    80974    tusers tusers_login_key28 
   CONSTRAINT     U   ALTER TABLE ONLY public.tusers
    ADD CONSTRAINT tusers_login_key28 UNIQUE (login);
 C   ALTER TABLE ONLY public.tusers DROP CONSTRAINT tusers_login_key28;
       public            postgres    false    226            �           2606    80984    tusers tusers_login_key29 
   CONSTRAINT     U   ALTER TABLE ONLY public.tusers
    ADD CONSTRAINT tusers_login_key29 UNIQUE (login);
 C   ALTER TABLE ONLY public.tusers DROP CONSTRAINT tusers_login_key29;
       public            postgres    false    226            �           2606    80772    tusers tusers_login_key3 
   CONSTRAINT     T   ALTER TABLE ONLY public.tusers
    ADD CONSTRAINT tusers_login_key3 UNIQUE (login);
 B   ALTER TABLE ONLY public.tusers DROP CONSTRAINT tusers_login_key3;
       public            postgres    false    226            �           2606    80980    tusers tusers_login_key30 
   CONSTRAINT     U   ALTER TABLE ONLY public.tusers
    ADD CONSTRAINT tusers_login_key30 UNIQUE (login);
 C   ALTER TABLE ONLY public.tusers DROP CONSTRAINT tusers_login_key30;
       public            postgres    false    226            �           2606    80786    tusers tusers_login_key31 
   CONSTRAINT     U   ALTER TABLE ONLY public.tusers
    ADD CONSTRAINT tusers_login_key31 UNIQUE (login);
 C   ALTER TABLE ONLY public.tusers DROP CONSTRAINT tusers_login_key31;
       public            postgres    false    226            �           2606    80788    tusers tusers_login_key32 
   CONSTRAINT     U   ALTER TABLE ONLY public.tusers
    ADD CONSTRAINT tusers_login_key32 UNIQUE (login);
 C   ALTER TABLE ONLY public.tusers DROP CONSTRAINT tusers_login_key32;
       public            postgres    false    226            �           2606    80840    tusers tusers_login_key33 
   CONSTRAINT     U   ALTER TABLE ONLY public.tusers
    ADD CONSTRAINT tusers_login_key33 UNIQUE (login);
 C   ALTER TABLE ONLY public.tusers DROP CONSTRAINT tusers_login_key33;
       public            postgres    false    226            �           2606    80842    tusers tusers_login_key34 
   CONSTRAINT     U   ALTER TABLE ONLY public.tusers
    ADD CONSTRAINT tusers_login_key34 UNIQUE (login);
 C   ALTER TABLE ONLY public.tusers DROP CONSTRAINT tusers_login_key34;
       public            postgres    false    226            �           2606    80958    tusers tusers_login_key35 
   CONSTRAINT     U   ALTER TABLE ONLY public.tusers
    ADD CONSTRAINT tusers_login_key35 UNIQUE (login);
 C   ALTER TABLE ONLY public.tusers DROP CONSTRAINT tusers_login_key35;
       public            postgres    false    226            �           2606    80882    tusers tusers_login_key36 
   CONSTRAINT     U   ALTER TABLE ONLY public.tusers
    ADD CONSTRAINT tusers_login_key36 UNIQUE (login);
 C   ALTER TABLE ONLY public.tusers DROP CONSTRAINT tusers_login_key36;
       public            postgres    false    226            �           2606    80956    tusers tusers_login_key37 
   CONSTRAINT     U   ALTER TABLE ONLY public.tusers
    ADD CONSTRAINT tusers_login_key37 UNIQUE (login);
 C   ALTER TABLE ONLY public.tusers DROP CONSTRAINT tusers_login_key37;
       public            postgres    false    226            �           2606    80906    tusers tusers_login_key38 
   CONSTRAINT     U   ALTER TABLE ONLY public.tusers
    ADD CONSTRAINT tusers_login_key38 UNIQUE (login);
 C   ALTER TABLE ONLY public.tusers DROP CONSTRAINT tusers_login_key38;
       public            postgres    false    226            �           2606    80754    tusers tusers_login_key39 
   CONSTRAINT     U   ALTER TABLE ONLY public.tusers
    ADD CONSTRAINT tusers_login_key39 UNIQUE (login);
 C   ALTER TABLE ONLY public.tusers DROP CONSTRAINT tusers_login_key39;
       public            postgres    false    226            �           2606    80774    tusers tusers_login_key4 
   CONSTRAINT     T   ALTER TABLE ONLY public.tusers
    ADD CONSTRAINT tusers_login_key4 UNIQUE (login);
 B   ALTER TABLE ONLY public.tusers DROP CONSTRAINT tusers_login_key4;
       public            postgres    false    226            �           2606    80900    tusers tusers_login_key40 
   CONSTRAINT     U   ALTER TABLE ONLY public.tusers
    ADD CONSTRAINT tusers_login_key40 UNIQUE (login);
 C   ALTER TABLE ONLY public.tusers DROP CONSTRAINT tusers_login_key40;
       public            postgres    false    226            �           2606    80816    tusers tusers_login_key41 
   CONSTRAINT     U   ALTER TABLE ONLY public.tusers
    ADD CONSTRAINT tusers_login_key41 UNIQUE (login);
 C   ALTER TABLE ONLY public.tusers DROP CONSTRAINT tusers_login_key41;
       public            postgres    false    226            �           2606    80898    tusers tusers_login_key42 
   CONSTRAINT     U   ALTER TABLE ONLY public.tusers
    ADD CONSTRAINT tusers_login_key42 UNIQUE (login);
 C   ALTER TABLE ONLY public.tusers DROP CONSTRAINT tusers_login_key42;
       public            postgres    false    226            �           2606    80888    tusers tusers_login_key43 
   CONSTRAINT     U   ALTER TABLE ONLY public.tusers
    ADD CONSTRAINT tusers_login_key43 UNIQUE (login);
 C   ALTER TABLE ONLY public.tusers DROP CONSTRAINT tusers_login_key43;
       public            postgres    false    226            �           2606    80896    tusers tusers_login_key44 
   CONSTRAINT     U   ALTER TABLE ONLY public.tusers
    ADD CONSTRAINT tusers_login_key44 UNIQUE (login);
 C   ALTER TABLE ONLY public.tusers DROP CONSTRAINT tusers_login_key44;
       public            postgres    false    226            �           2606    80890    tusers tusers_login_key45 
   CONSTRAINT     U   ALTER TABLE ONLY public.tusers
    ADD CONSTRAINT tusers_login_key45 UNIQUE (login);
 C   ALTER TABLE ONLY public.tusers DROP CONSTRAINT tusers_login_key45;
       public            postgres    false    226            �           2606    80892    tusers tusers_login_key46 
   CONSTRAINT     U   ALTER TABLE ONLY public.tusers
    ADD CONSTRAINT tusers_login_key46 UNIQUE (login);
 C   ALTER TABLE ONLY public.tusers DROP CONSTRAINT tusers_login_key46;
       public            postgres    false    226            �           2606    80894    tusers tusers_login_key47 
   CONSTRAINT     U   ALTER TABLE ONLY public.tusers
    ADD CONSTRAINT tusers_login_key47 UNIQUE (login);
 C   ALTER TABLE ONLY public.tusers DROP CONSTRAINT tusers_login_key47;
       public            postgres    false    226            �           2606    80780    tusers tusers_login_key48 
   CONSTRAINT     U   ALTER TABLE ONLY public.tusers
    ADD CONSTRAINT tusers_login_key48 UNIQUE (login);
 C   ALTER TABLE ONLY public.tusers DROP CONSTRAINT tusers_login_key48;
       public            postgres    false    226            �           2606    80776    tusers tusers_login_key49 
   CONSTRAINT     U   ALTER TABLE ONLY public.tusers
    ADD CONSTRAINT tusers_login_key49 UNIQUE (login);
 C   ALTER TABLE ONLY public.tusers DROP CONSTRAINT tusers_login_key49;
       public            postgres    false    226            �           2606    80782    tusers tusers_login_key5 
   CONSTRAINT     T   ALTER TABLE ONLY public.tusers
    ADD CONSTRAINT tusers_login_key5 UNIQUE (login);
 B   ALTER TABLE ONLY public.tusers DROP CONSTRAINT tusers_login_key5;
       public            postgres    false    226            �           2606    80778    tusers tusers_login_key50 
   CONSTRAINT     U   ALTER TABLE ONLY public.tusers
    ADD CONSTRAINT tusers_login_key50 UNIQUE (login);
 C   ALTER TABLE ONLY public.tusers DROP CONSTRAINT tusers_login_key50;
       public            postgres    false    226            �           2606    81000    tusers tusers_login_key51 
   CONSTRAINT     U   ALTER TABLE ONLY public.tusers
    ADD CONSTRAINT tusers_login_key51 UNIQUE (login);
 C   ALTER TABLE ONLY public.tusers DROP CONSTRAINT tusers_login_key51;
       public            postgres    false    226            �           2606    80820    tusers tusers_login_key52 
   CONSTRAINT     U   ALTER TABLE ONLY public.tusers
    ADD CONSTRAINT tusers_login_key52 UNIQUE (login);
 C   ALTER TABLE ONLY public.tusers DROP CONSTRAINT tusers_login_key52;
       public            postgres    false    226            �           2606    81002    tusers tusers_login_key53 
   CONSTRAINT     U   ALTER TABLE ONLY public.tusers
    ADD CONSTRAINT tusers_login_key53 UNIQUE (login);
 C   ALTER TABLE ONLY public.tusers DROP CONSTRAINT tusers_login_key53;
       public            postgres    false    226            �           2606    80818    tusers tusers_login_key54 
   CONSTRAINT     U   ALTER TABLE ONLY public.tusers
    ADD CONSTRAINT tusers_login_key54 UNIQUE (login);
 C   ALTER TABLE ONLY public.tusers DROP CONSTRAINT tusers_login_key54;
       public            postgres    false    226            �           2606    81004    tusers tusers_login_key55 
   CONSTRAINT     U   ALTER TABLE ONLY public.tusers
    ADD CONSTRAINT tusers_login_key55 UNIQUE (login);
 C   ALTER TABLE ONLY public.tusers DROP CONSTRAINT tusers_login_key55;
       public            postgres    false    226            �           2606    80924    tusers tusers_login_key56 
   CONSTRAINT     U   ALTER TABLE ONLY public.tusers
    ADD CONSTRAINT tusers_login_key56 UNIQUE (login);
 C   ALTER TABLE ONLY public.tusers DROP CONSTRAINT tusers_login_key56;
       public            postgres    false    226            �           2606    80926    tusers tusers_login_key57 
   CONSTRAINT     U   ALTER TABLE ONLY public.tusers
    ADD CONSTRAINT tusers_login_key57 UNIQUE (login);
 C   ALTER TABLE ONLY public.tusers DROP CONSTRAINT tusers_login_key57;
       public            postgres    false    226                        2606    80954    tusers tusers_login_key58 
   CONSTRAINT     U   ALTER TABLE ONLY public.tusers
    ADD CONSTRAINT tusers_login_key58 UNIQUE (login);
 C   ALTER TABLE ONLY public.tusers DROP CONSTRAINT tusers_login_key58;
       public            postgres    false    226                       2606    80930    tusers tusers_login_key59 
   CONSTRAINT     U   ALTER TABLE ONLY public.tusers
    ADD CONSTRAINT tusers_login_key59 UNIQUE (login);
 C   ALTER TABLE ONLY public.tusers DROP CONSTRAINT tusers_login_key59;
       public            postgres    false    226                       2606    80784    tusers tusers_login_key6 
   CONSTRAINT     T   ALTER TABLE ONLY public.tusers
    ADD CONSTRAINT tusers_login_key6 UNIQUE (login);
 B   ALTER TABLE ONLY public.tusers DROP CONSTRAINT tusers_login_key6;
       public            postgres    false    226                       2606    80952    tusers tusers_login_key60 
   CONSTRAINT     U   ALTER TABLE ONLY public.tusers
    ADD CONSTRAINT tusers_login_key60 UNIQUE (login);
 C   ALTER TABLE ONLY public.tusers DROP CONSTRAINT tusers_login_key60;
       public            postgres    false    226                       2606    80950    tusers tusers_login_key61 
   CONSTRAINT     U   ALTER TABLE ONLY public.tusers
    ADD CONSTRAINT tusers_login_key61 UNIQUE (login);
 C   ALTER TABLE ONLY public.tusers DROP CONSTRAINT tusers_login_key61;
       public            postgres    false    226            
           2606    80932    tusers tusers_login_key62 
   CONSTRAINT     U   ALTER TABLE ONLY public.tusers
    ADD CONSTRAINT tusers_login_key62 UNIQUE (login);
 C   ALTER TABLE ONLY public.tusers DROP CONSTRAINT tusers_login_key62;
       public            postgres    false    226                       2606    80948    tusers tusers_login_key63 
   CONSTRAINT     U   ALTER TABLE ONLY public.tusers
    ADD CONSTRAINT tusers_login_key63 UNIQUE (login);
 C   ALTER TABLE ONLY public.tusers DROP CONSTRAINT tusers_login_key63;
       public            postgres    false    226                       2606    80944    tusers tusers_login_key64 
   CONSTRAINT     U   ALTER TABLE ONLY public.tusers
    ADD CONSTRAINT tusers_login_key64 UNIQUE (login);
 C   ALTER TABLE ONLY public.tusers DROP CONSTRAINT tusers_login_key64;
       public            postgres    false    226                       2606    80946    tusers tusers_login_key65 
   CONSTRAINT     U   ALTER TABLE ONLY public.tusers
    ADD CONSTRAINT tusers_login_key65 UNIQUE (login);
 C   ALTER TABLE ONLY public.tusers DROP CONSTRAINT tusers_login_key65;
       public            postgres    false    226                       2606    80922    tusers tusers_login_key66 
   CONSTRAINT     U   ALTER TABLE ONLY public.tusers
    ADD CONSTRAINT tusers_login_key66 UNIQUE (login);
 C   ALTER TABLE ONLY public.tusers DROP CONSTRAINT tusers_login_key66;
       public            postgres    false    226                       2606    80884    tusers tusers_login_key67 
   CONSTRAINT     U   ALTER TABLE ONLY public.tusers
    ADD CONSTRAINT tusers_login_key67 UNIQUE (login);
 C   ALTER TABLE ONLY public.tusers DROP CONSTRAINT tusers_login_key67;
       public            postgres    false    226                       2606    80918    tusers tusers_login_key68 
   CONSTRAINT     U   ALTER TABLE ONLY public.tusers
    ADD CONSTRAINT tusers_login_key68 UNIQUE (login);
 C   ALTER TABLE ONLY public.tusers DROP CONSTRAINT tusers_login_key68;
       public            postgres    false    226                       2606    80880    tusers tusers_login_key69 
   CONSTRAINT     U   ALTER TABLE ONLY public.tusers
    ADD CONSTRAINT tusers_login_key69 UNIQUE (login);
 C   ALTER TABLE ONLY public.tusers DROP CONSTRAINT tusers_login_key69;
       public            postgres    false    226                       2606    80748    tusers tusers_login_key7 
   CONSTRAINT     T   ALTER TABLE ONLY public.tusers
    ADD CONSTRAINT tusers_login_key7 UNIQUE (login);
 B   ALTER TABLE ONLY public.tusers DROP CONSTRAINT tusers_login_key7;
       public            postgres    false    226                       2606    81008    tusers tusers_login_key70 
   CONSTRAINT     U   ALTER TABLE ONLY public.tusers
    ADD CONSTRAINT tusers_login_key70 UNIQUE (login);
 C   ALTER TABLE ONLY public.tusers DROP CONSTRAINT tusers_login_key70;
       public            postgres    false    226                       2606    81014    tusers tusers_login_key71 
   CONSTRAINT     U   ALTER TABLE ONLY public.tusers
    ADD CONSTRAINT tusers_login_key71 UNIQUE (login);
 C   ALTER TABLE ONLY public.tusers DROP CONSTRAINT tusers_login_key71;
       public            postgres    false    226                        2606    80746    tusers tusers_login_key72 
   CONSTRAINT     U   ALTER TABLE ONLY public.tusers
    ADD CONSTRAINT tusers_login_key72 UNIQUE (login);
 C   ALTER TABLE ONLY public.tusers DROP CONSTRAINT tusers_login_key72;
       public            postgres    false    226            "           2606    80730    tusers tusers_login_key73 
   CONSTRAINT     U   ALTER TABLE ONLY public.tusers
    ADD CONSTRAINT tusers_login_key73 UNIQUE (login);
 C   ALTER TABLE ONLY public.tusers DROP CONSTRAINT tusers_login_key73;
       public            postgres    false    226            $           2606    80744    tusers tusers_login_key74 
   CONSTRAINT     U   ALTER TABLE ONLY public.tusers
    ADD CONSTRAINT tusers_login_key74 UNIQUE (login);
 C   ALTER TABLE ONLY public.tusers DROP CONSTRAINT tusers_login_key74;
       public            postgres    false    226            &           2606    80734    tusers tusers_login_key75 
   CONSTRAINT     U   ALTER TABLE ONLY public.tusers
    ADD CONSTRAINT tusers_login_key75 UNIQUE (login);
 C   ALTER TABLE ONLY public.tusers DROP CONSTRAINT tusers_login_key75;
       public            postgres    false    226            (           2606    80742    tusers tusers_login_key76 
   CONSTRAINT     U   ALTER TABLE ONLY public.tusers
    ADD CONSTRAINT tusers_login_key76 UNIQUE (login);
 C   ALTER TABLE ONLY public.tusers DROP CONSTRAINT tusers_login_key76;
       public            postgres    false    226            *           2606    80736    tusers tusers_login_key77 
   CONSTRAINT     U   ALTER TABLE ONLY public.tusers
    ADD CONSTRAINT tusers_login_key77 UNIQUE (login);
 C   ALTER TABLE ONLY public.tusers DROP CONSTRAINT tusers_login_key77;
       public            postgres    false    226            ,           2606    80738    tusers tusers_login_key78 
   CONSTRAINT     U   ALTER TABLE ONLY public.tusers
    ADD CONSTRAINT tusers_login_key78 UNIQUE (login);
 C   ALTER TABLE ONLY public.tusers DROP CONSTRAINT tusers_login_key78;
       public            postgres    false    226            .           2606    80770    tusers tusers_login_key79 
   CONSTRAINT     U   ALTER TABLE ONLY public.tusers
    ADD CONSTRAINT tusers_login_key79 UNIQUE (login);
 C   ALTER TABLE ONLY public.tusers DROP CONSTRAINT tusers_login_key79;
       public            postgres    false    226            0           2606    80750    tusers tusers_login_key8 
   CONSTRAINT     T   ALTER TABLE ONLY public.tusers
    ADD CONSTRAINT tusers_login_key8 UNIQUE (login);
 B   ALTER TABLE ONLY public.tusers DROP CONSTRAINT tusers_login_key8;
       public            postgres    false    226            2           2606    80830    tusers tusers_login_key80 
   CONSTRAINT     U   ALTER TABLE ONLY public.tusers
    ADD CONSTRAINT tusers_login_key80 UNIQUE (login);
 C   ALTER TABLE ONLY public.tusers DROP CONSTRAINT tusers_login_key80;
       public            postgres    false    226            4           2606    80768    tusers tusers_login_key81 
   CONSTRAINT     U   ALTER TABLE ONLY public.tusers
    ADD CONSTRAINT tusers_login_key81 UNIQUE (login);
 C   ALTER TABLE ONLY public.tusers DROP CONSTRAINT tusers_login_key81;
       public            postgres    false    226            6           2606    80998    tusers tusers_login_key82 
   CONSTRAINT     U   ALTER TABLE ONLY public.tusers
    ADD CONSTRAINT tusers_login_key82 UNIQUE (login);
 C   ALTER TABLE ONLY public.tusers DROP CONSTRAINT tusers_login_key82;
       public            postgres    false    226            8           2606    80832    tusers tusers_login_key83 
   CONSTRAINT     U   ALTER TABLE ONLY public.tusers
    ADD CONSTRAINT tusers_login_key83 UNIQUE (login);
 C   ALTER TABLE ONLY public.tusers DROP CONSTRAINT tusers_login_key83;
       public            postgres    false    226            :           2606    80766    tusers tusers_login_key84 
   CONSTRAINT     U   ALTER TABLE ONLY public.tusers
    ADD CONSTRAINT tusers_login_key84 UNIQUE (login);
 C   ALTER TABLE ONLY public.tusers DROP CONSTRAINT tusers_login_key84;
       public            postgres    false    226            <           2606    80760    tusers tusers_login_key85 
   CONSTRAINT     U   ALTER TABLE ONLY public.tusers
    ADD CONSTRAINT tusers_login_key85 UNIQUE (login);
 C   ALTER TABLE ONLY public.tusers DROP CONSTRAINT tusers_login_key85;
       public            postgres    false    226            >           2606    80764    tusers tusers_login_key86 
   CONSTRAINT     U   ALTER TABLE ONLY public.tusers
    ADD CONSTRAINT tusers_login_key86 UNIQUE (login);
 C   ALTER TABLE ONLY public.tusers DROP CONSTRAINT tusers_login_key86;
       public            postgres    false    226            @           2606    80762    tusers tusers_login_key87 
   CONSTRAINT     U   ALTER TABLE ONLY public.tusers
    ADD CONSTRAINT tusers_login_key87 UNIQUE (login);
 C   ALTER TABLE ONLY public.tusers DROP CONSTRAINT tusers_login_key87;
       public            postgres    false    226            B           2606    80732    tusers tusers_login_key88 
   CONSTRAINT     U   ALTER TABLE ONLY public.tusers
    ADD CONSTRAINT tusers_login_key88 UNIQUE (login);
 C   ALTER TABLE ONLY public.tusers DROP CONSTRAINT tusers_login_key88;
       public            postgres    false    226            D           2606    80844    tusers tusers_login_key89 
   CONSTRAINT     U   ALTER TABLE ONLY public.tusers
    ADD CONSTRAINT tusers_login_key89 UNIQUE (login);
 C   ALTER TABLE ONLY public.tusers DROP CONSTRAINT tusers_login_key89;
       public            postgres    false    226            F           2606    80752    tusers tusers_login_key9 
   CONSTRAINT     T   ALTER TABLE ONLY public.tusers
    ADD CONSTRAINT tusers_login_key9 UNIQUE (login);
 B   ALTER TABLE ONLY public.tusers DROP CONSTRAINT tusers_login_key9;
       public            postgres    false    226            H           2606    80878    tusers tusers_login_key90 
   CONSTRAINT     U   ALTER TABLE ONLY public.tusers
    ADD CONSTRAINT tusers_login_key90 UNIQUE (login);
 C   ALTER TABLE ONLY public.tusers DROP CONSTRAINT tusers_login_key90;
       public            postgres    false    226            J           2606    80846    tusers tusers_login_key91 
   CONSTRAINT     U   ALTER TABLE ONLY public.tusers
    ADD CONSTRAINT tusers_login_key91 UNIQUE (login);
 C   ALTER TABLE ONLY public.tusers DROP CONSTRAINT tusers_login_key91;
       public            postgres    false    226            L           2606    80876    tusers tusers_login_key92 
   CONSTRAINT     U   ALTER TABLE ONLY public.tusers
    ADD CONSTRAINT tusers_login_key92 UNIQUE (login);
 C   ALTER TABLE ONLY public.tusers DROP CONSTRAINT tusers_login_key92;
       public            postgres    false    226            N           2606    80758    tusers tusers_login_key93 
   CONSTRAINT     U   ALTER TABLE ONLY public.tusers
    ADD CONSTRAINT tusers_login_key93 UNIQUE (login);
 C   ALTER TABLE ONLY public.tusers DROP CONSTRAINT tusers_login_key93;
       public            postgres    false    226            P           2606    80860    tusers tusers_login_key94 
   CONSTRAINT     U   ALTER TABLE ONLY public.tusers
    ADD CONSTRAINT tusers_login_key94 UNIQUE (login);
 C   ALTER TABLE ONLY public.tusers DROP CONSTRAINT tusers_login_key94;
       public            postgres    false    226            R           2606    80848    tusers tusers_login_key95 
   CONSTRAINT     U   ALTER TABLE ONLY public.tusers
    ADD CONSTRAINT tusers_login_key95 UNIQUE (login);
 C   ALTER TABLE ONLY public.tusers DROP CONSTRAINT tusers_login_key95;
       public            postgres    false    226            T           2606    80850    tusers tusers_login_key96 
   CONSTRAINT     U   ALTER TABLE ONLY public.tusers
    ADD CONSTRAINT tusers_login_key96 UNIQUE (login);
 C   ALTER TABLE ONLY public.tusers DROP CONSTRAINT tusers_login_key96;
       public            postgres    false    226            V           2606    80858    tusers tusers_login_key97 
   CONSTRAINT     U   ALTER TABLE ONLY public.tusers
    ADD CONSTRAINT tusers_login_key97 UNIQUE (login);
 C   ALTER TABLE ONLY public.tusers DROP CONSTRAINT tusers_login_key97;
       public            postgres    false    226            X           2606    81012    tusers tusers_login_key98 
   CONSTRAINT     U   ALTER TABLE ONLY public.tusers
    ADD CONSTRAINT tusers_login_key98 UNIQUE (login);
 C   ALTER TABLE ONLY public.tusers DROP CONSTRAINT tusers_login_key98;
       public            postgres    false    226            Z           2606    80856    tusers tusers_login_key99 
   CONSTRAINT     U   ALTER TABLE ONLY public.tusers
    ADD CONSTRAINT tusers_login_key99 UNIQUE (login);
 C   ALTER TABLE ONLY public.tusers DROP CONSTRAINT tusers_login_key99;
       public            postgres    false    226            \           2606    26730    tusers tusers_pkey 
   CONSTRAINT     P   ALTER TABLE ONLY public.tusers
    ADD CONSTRAINT tusers_pkey PRIMARY KEY (id);
 <   ALTER TABLE ONLY public.tusers DROP CONSTRAINT tusers_pkey;
       public            postgres    false    226            c           2606    80523     tarticle tarticle_familleId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.tarticle
    ADD CONSTRAINT "tarticle_familleId_fkey" FOREIGN KEY ("familleId") REFERENCES public.tfamille(id) ON UPDATE CASCADE ON DELETE CASCADE;
 L   ALTER TABLE ONLY public.tarticle DROP CONSTRAINT "tarticle_familleId_fkey";
       public          postgres    false    218    216    4742            e           2606    81021 ,   tlignedemande tlignedemande_demande_srv_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.tlignedemande
    ADD CONSTRAINT tlignedemande_demande_srv_fkey FOREIGN KEY (demande_srv) REFERENCES public.tdemandeservice(id_dem) ON UPDATE CASCADE ON DELETE CASCADE;
 V   ALTER TABLE ONLY public.tlignedemande DROP CONSTRAINT tlignedemande_demande_srv_fkey;
       public          postgres    false    5470    228    230            f           2606    81026 $   tpaiement tpaiement_demande_srv_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.tpaiement
    ADD CONSTRAINT tpaiement_demande_srv_fkey FOREIGN KEY (demande_srv) REFERENCES public.tdemandeservice(id_dem) ON UPDATE CASCADE ON DELETE CASCADE;
 N   ALTER TABLE ONLY public.tpaiement DROP CONSTRAINT tpaiement_demande_srv_fkey;
       public          postgres    false    228    232    5470            d           2606    80716 $   tservices tservices_categorieid_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.tservices
    ADD CONSTRAINT tservices_categorieid_fkey FOREIGN KEY (categorieid) REFERENCES public.tcategorieservice(id) ON UPDATE CASCADE;
 N   ALTER TABLE ONLY public.tservices DROP CONSTRAINT tservices_categorieid_fkey;
       public          postgres    false    222    224    5166            �   A  x��[�n�8>����7HQ�Oߒ�`2�8k�INs�e�V"�z�ķ��#�m���s���l�jI�ZV��8����d�W_k<���'�<�cZ��s���_��L���.�����Y'��3�eg���C��q��9�Z.Xp�k�m��z����o�O|Z�����5Y��*ӧ�yZ\���/e�6��IGK�㱁	�B2!p>�qV�O)�p��U���I�)M�<M����x�� >X|��tx����ծ?���B����R��	`�p�C�p!|D�Q����2���֒ˢƳ̡���z��Bp�JD��,^�����u�dy������*�p�m@3�7��R|N����2�b��������%uV씛)�Ha O��$�K�����]�����v��,)���L) /��^��]p`���
AV��cv�c�M7�����W�K�P>W���Km��Ϲ>���t ~�f��)[/�˲��X@E�r�o��b)�O*+�s�/�g�:��b9����"��Rdb@\�$��"����pU����HAŜ�>���8�,m �ɗ�����W>�C04�p)��3�Xe�{�Vy�x�穾���m7����> #�݁���V�-�&|u
d wn�}�� |�����E6:�I�=��?΂�kζ"�J�a����g��N�7\tVUx���N�oK����hWy�2t�el˂�+ԉS�3�#��={����o�����S����Z���z=k��
��j�!WNI��&����?���;�������I�/�z��,o�k��s�/�J�R�z��4Ṕ�`����b��c�u|�ᘓ�K��Kn��朖��.�.n�f��92��}Z���n?�,:��)3�����;��>dr�K�J�:^��Q�Kυ�<�J>�̻��N$[I��d����D���?�����]�M���ljv�.�"Sʂ�5Sv����d���<e�!ܬ�5�J[`Ȕ|���E�iJ��E&�Z����,|_j����&��\x�-�B�GD�Ǔ�R��L�`Q�LH�)+��C��kي|.��B]��GR�^�]�2(|E��&�|-�Oc5�I/�,ɹ������*X$:��t*���sQ�� ���*��{�
�Mz��_JT��
�u�=�{}��?���Q7�g�jN�8��s���DO�Wŝ*�Ze����aS��1��X�R�X
�����b�2�v�R��
�E�\0"&���T^�ezj��9T���Rsa��Dhz�o��k�O�x�Vɴ��<b$�6��QS��ڥ]�(l5�'t��%z��[\�4�ի"l+A��
�F~Z�D����DG��)�Qg(�Us�S�enx)0�?��v�2A3�X�$�BE��kͩ��/ڹ�����B�sOI����,}ό��6�T�SCP��W�_��p�J8[�����MU�m+ց\�[�&�S*�<(bF?�{�� ��~+0�K��x��n�p�=�5�U�/l�6�hx��Nt���}Z�X�����J�ӊ�,Ȁ�*0z�o�Ë�i5Gu>�1Ww~BU�N�p������� �=��+�!l>��}Y�VA��.Qd�z�qB2r7h$�*�b�y��W������R�7�_�\1�Ԫ��OJ�s���`�����;(G�}�:Q��LA��Nʭs������e:x�/Qly֍[�5�h+����V��w��m�s`��`9�����$KKҔ������!���m$�M��7����E:5����db� �v�T�h� a'U��!qX�,�215�Q��!��oO�y�b��1���ä�%-o��&�Fл/���S��,��C�v���<8�PLD/6Ў���T.*.6����@�y�]�����W���t>1,݅cָ=&�a�	��Fr0-��@\��[�h�<0��b�y�Dca_��H��xP���ꌅ�O�y��d���[=�^|Ƨ�.�}&�=-�IFV�|�w�\&��Cg�EF����z%L*��s(1Y�_&?֭�>�~d��18�⳨�gf�뺽��R�ћ-���Eb�[���NÈPY�n�[䙳.T�dwx�A[�G�*[�iq,�R�/�;ϳ

��S��|�+�p�Dj�o��|���Ո�.�X."��F�M�t����r{E ��$r������~�Q��g��n5nl�8��.���:s��\֩�SO˘F�+:q4�66.#WR�ح�����-g"sB�F
�W��P=��m�8��L���p�K)�v�q��g�PE���4{㲭�v��o�q����'��#<s�_/�Y��ul�ˑ1.w1�$\Uy���tM�WZ��`��i�� ������{�䠷؆�l�*�c"���98$���M����Q��Q��؀�8Q��:�P�����4��K��b>�t�%o�ky0�,j`h�,ԃ��٣ŘDd���^f(J��J<��ɞ{��cG�_L^4��ˤ@$F�$�P���>=��1.ͭw��d�+2�����h"��3�����h2�q���Q�Q1r95�y�Dr�٬'U�&�+.&7N�e�a�8O�c�� ������4Gcj��BΪuT�6���tG�j���؉����~�9���p�x���Ƹ� 7)`�1�е���){-V9%[�&����������rRŞa�T��J/���l������M#��V��6H��`D�fZC��O+8�ׯ���[�����D���/�64�V���v\d�i%����͹}��=�[�N8!�x���r@�r�ݭl�Jo��֧���ǯ�N�$�*
�$�Xe?��"����,�x�5H<���}�Z��ӧ�b      �   (   x�3�LN,1�2�L,-)J�2�LLL�2�LJJ����� �$�         V   x���
@@�����������l��B���Sgu���U*�TM�
���֋q��1͸�u!B���\�eV� ��r]�{ N��      �     x��ZKo7>ӿB�B�ǮnF[�Aj�si���"���5���w83Ү���&,����y�3�<�~~w�C݀V���q��S-�Yj� ��?�Ў�J�`�է{��q���4n���/̪
��_��M��z��v�wO��,�-��:��F���8��v�j�4~�,���c�F/�Zjw�n�n@y (�	�m�q�G���M���OF���tc:��}>�m�_��[~�_�>3<�%�K�J��W�Hy����!ڸ�ޢ����~2:��6E�>!kZ���ח���w����zg7�-K97�n�Z��7#𽟮]����4Y��� 6y�i#k���b������qq�ϯ_��GB�T��3��喖�cI��nZ	�zY�++K�P�^�-u�o�og���\['k���k�VZ�zע�m�ϯ�3��!���l.6�y����o�ٟ6ۧ����HF� ���������#��m|y�q9���K��bwG�L����=�;$�=G ��#�nd���2h�7��n�Q�=���g,��P�d�;�\�.Pwhy�����|��l���3�Aڜ�%�˹<�j>��]�Y�V�q�����99]J�:K� {<���(�-���A>����,�.%9�$is'�M>��˧]��Y&9H[q�x.�Ռ����-�����u�+(�XA����R��Lr������w��Ӊa�qn�������e���9�?ė-+>�UM͇(f9�,G���LWOp7�nNCMC6�I[�`�_6,UFo��*ȹ�LoU�R�^��2_O��|Q��Lp6�s�~�v���膏�����>%�s���C�+>��K)΁��0�����o㞫H⸡�}��1'9;��ו[��#轟�q��Og���4�$�L�}.81���������B8��Қl�I�im.:7�,���o�xxڋ��٭{�Ƭ�Bp�86 wH�:L�^�1)��8N�ݦt�zTCeܐj��cR�l���{)'�0����&���l���Py":FM[/�s�:�|�Գ�Z�hN�q׫"���NL3U��Eg�caܹ �<"ǟ��e�s�dj�	�A��$�S̙�GSkd�M���0|��UT�"��ClLM�$��D���?�0ccdLL�.��DWrg��c� ��c�ɉ0�����5:f���:��N����[��g���r�Ӛ;f��&��
Y��g��L#�=~b$ج��]�r���T�^�(�
�l��y{��t�$Tw�P�`
��Fs)��$�/J�o�:�'K�i��ZW+�k�<9^@Q ��$�9IVş���,;OqB6lF��Ǉ��Oy�,p
u p�����=�l#���g�o��Hȏq���Ll��'�lޛp�֠<)�.�ldwzk	�5���t�:T���/�����:�諺@qw�^%�c�?3�����#ԚK���5��ĩ���{�H��2%�['p��9�M����n�8h�%v0��^C�����ͽR>:�(=��|�2����˱>�d�=���^���^�p)-2�w����#� I�U�)/�N�ʩE5c��Z���*��=E�ҋ�Pk�vo��S�.²� $�z\-��w���g�,���^�bS�0��Z���,sѵ<o%aBo��V5��P�{�z��n�eHX*�.�!Kg� ��W9�ds��Ó�Ǟq�#��께�jFݬt`�;�!��y���Y�:��^���0,���DY�pqs9�yb�����F� �[�c�ҵ	ٜ�WD�l�"ZL���O���mȀy	k����%\��է�������      �   B  x����n�0�g�)�!�+R[�-�&0��SF�m���T�l]�ݺ�9�&}�J�-+�MPt����s��Rm�f�o�V�A\��@ēR�r�f�C��A��ZmkꕏۺhnMh����D��,O�s�׈&��t��BG3�1ޫ��~��,�Ԁ� 7:���p�����9	�ސ�d��5G���Jw^}47-%Ks@�DS�i��M��U8���MP�f��8g Du�hvf��)�V�a�x�Q>����5��1�6d�h޻ڭ�`�^5�9�I����q]۠[7��+R���������ֶ����$%���X�����j�3^���:l���	t@#D9������7��
%�
�Z7B�wW�6˥�}����T�.ͣC��<��ހ(�v�RۧS֙6u��2	,�U��5N=���U������H�Q��)��*��=�x�DɁ�k�Q>��>�붮
����+��^;��w�`�>h#Dy���I���揄��~6�^u}��~�2f�c#!
q?�E[f���/�@�O�W�c,�Q��`�+(X���P �qߥ��N�Pt���F)��L�)         �   x���A�0E��Stoh:"��ܚ�Gl"���3y/fq)A\��������9L�ah�H�%ľ�K���>�ɶ,�et�g�nr�h�1�A+L_HS�i�!I�j��b�r���	Z�W���������0��Ťd���6A�N0G"_�Y ���6B��0G⬄o��ex            x������ � �      �   '  x��XK��6]ӧ�.�A")Z��Y� �U6�M�ȢBQ��r���X��G�d)���6��WdU�z��W�����D�uT�����oJ��z�^�x��I���E8��ՆxD��s�8�@�>i�	�A�_��T)Y��W��OQ�
��@�5���^Ju�F�����8{�Ā��0F}�3tດ�� �Wag'x�Y:��Et���6�*�}Q~�\q����.X\BG�U�=����ۋ�J�pz���Ra��������go"�$��Z���^*��І��Y�� 鸜߀[���
���a�ۋ��,k�h88��z�L}��,�4v&�ˮ� auaŁ3��Y�US�|�ڽ΁ܢ�	ר�2b�rU�k#�j IB�4&�uDDF@kف�����¨���N'^��vPv�ߣ��	��hDp ���W�w�e�m$���q�JS�~�2���O�4s�~=�T������TF�m�7�Wt+��G�a
MK�/���WU�Zc.Gյ��dJ�}�]�y.������t��cCcO�e� �+(�ϝV�Q�p��TC�b����f�侨+g����
a�)�;T��R�r������E��y��^���s9iH�!-�:qJX=�ـ�Z�U�C�6	s����#pF12|�Q�
ۉ�ӊ�������������|�]�� DYX�06�n-ns���g�2eQ}��������������.G�kKJ7̲��D}<Z���	nxn-��A��e�S�+�*���N�V��i������ �t�/�����A����fop�9�P�W�P�,��m����7 s+�/���C9mv�`ӁȨ��o<�������s~����kmo��~K-�ڿy��5���5�~��e�U�����}�}:?����:N�:����?�ĩ�-�Fvl��y����� 9�����پ�O/s��V�`3��Mow�+��7�[��۬�Wꊢ�T}VR��)o�����d1¨��!����4��ś8]��ݟG���v���g�.\�n��2I^�������b��
�=            x������ � �     