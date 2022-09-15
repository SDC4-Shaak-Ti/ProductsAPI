
// --------------------------all_products table ------------------------------//

// -- Table: public.all_products

// -- DROP TABLE IF EXISTS public.all_products;

CREATE TABLE IF NOT EXISTS public.all_products
(
    id integer NOT NULL,
    name text COLLATE pg_catalog."default" NOT NULL,
    slogan text COLLATE pg_catalog."default" NOT NULL,
    description text COLLATE pg_catalog."default" NOT NULL,
    category text COLLATE pg_catalog."default" NOT NULL,
    default_price integer NOT NULL,
    CONSTRAINT all_products_pkey PRIMARY KEY (id)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.all_products
    OWNER to postgres;

//import product csv file to all_products table
\copy public.all_products (id, name, slogan, description, category, default_price) FROM '/Users/daniel/ProductsAPI/etl/product.csv' DELIMITER ',' CSV HEADER ESCAPE '''';

// --------------------------features table ------------------------------//

    // -- Table: public.features

    // -- DROP TABLE IF EXISTS public.features;

    CREATE TABLE IF NOT EXISTS public.features
    (
        id integer NOT NULL,
        product_id integer NOT NULL,
        feature text COLLATE pg_catalog."default",
        value text COLLATE pg_catalog."default",
        CONSTRAINT features_pkey PRIMARY KEY (id),
        CONSTRAINT features_product_id_fkey FOREIGN KEY (product_id)
            REFERENCES public.all_products (id) MATCH SIMPLE
            ON UPDATE NO ACTION
            ON DELETE NO ACTION
    )

    TABLESPACE pg_default;

    ALTER TABLE IF EXISTS public.features
        OWNER to postgres;

//import features csv file to features table
\copy public.features (id, product_id, feature, value) FROM '/Users/daniel/ProductsAPI/etl/features.csv' DELIMITER ',' CSV HEADER ESCAPE '''';


// --------------------------photos table ------------------------------//

// -- Table: public.photos

// -- DROP TABLE IF EXISTS public.photos;

CREATE TABLE IF NOT EXISTS public.photos
(
    id integer NOT NULL,
    styleid integer,
    url character varying COLLATE pg_catalog."default",
    thumbnail_url character varying COLLATE pg_catalog."default",
    CONSTRAINT photos_pkey PRIMARY KEY (id),
    CONSTRAINT photos_styleid_fkey FOREIGN KEY (styleid)
        REFERENCES public.styles (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.photos
    OWNER to postgres;

//import photos csv file to photos table
\copy public.photos (id, styleid, url, thumbnail_url) FROM '/Users/daniel/ProductsAPI/etl/photos.csv' DELIMITER ',' CSV HEADER ESCAPE '''';

// --------------------------related table ------------------------------//

// -- Table: public.related

// -- DROP TABLE IF EXISTS public.related;

CREATE TABLE IF NOT EXISTS public.related
(
    id integer NOT NULL,
    current_product_id integer,
    related_product_id integer,
    CONSTRAINT related_pkey PRIMARY KEY (id),
    CONSTRAINT related_current_product_key FOREIGN KEY (current_product_id)
        REFERENCES public.all_products (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID,
    CONSTRAINT related_related_product_id_fkey FOREIGN KEY (related_product_id)
        REFERENCES public.all_products (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.related
    OWNER to postgres;

//import related csv file to related table
\copy public.related (id, current_product_id, related_product_id) FROM '/Users/daniel/ProductsAPI/etl/related.csv' DELIMITER ',' CSV HEADER ESCAPE '''';

// --------------------------skus table ------------------------------//

// -- Table: public.skus

// -- DROP TABLE IF EXISTS public.skus;

CREATE TABLE IF NOT EXISTS public.skus
(
    id integer NOT NULL,
    styleid integer,
    size character varying COLLATE pg_catalog."default",
    quantity integer,
    CONSTRAINT skus_pkey PRIMARY KEY (id),
    CONSTRAINT skus_styleid_fkey FOREIGN KEY (styleid)
        REFERENCES public.styles (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.skus
    OWNER to postgres;

//import skus csv file to skus table
\copy public.skus (id, styleid, size, quantity) FROM '/Users/daniel/ProductsAPI/etl/skus.csv' DELIMITER ',' CSV HEADER ESCAPE '''';

// --------------------------styles table ------------------------------//

// -- Table: public.styles

// -- DROP TABLE IF EXISTS public.styles;

CREATE TABLE IF NOT EXISTS public.styles
(
    id integer NOT NULL,
    productid integer,
    name text COLLATE pg_catalog."default",
    sale_price character varying COLLATE pg_catalog."default",
    original_price integer,
    default_style boolean,
    CONSTRAINT styles_pkey PRIMARY KEY (id),
    CONSTRAINT styles_product_id_fkey FOREIGN KEY (productid)
        REFERENCES public.all_products (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.styles
    OWNER to postgres;

//import styles csv file to styles table
\copy public.styles (id, productid, name, sale_price, original_price, default_style) FROM '/Users/daniel/ProductsAPI/etl/styles.csv' DELIMITER ',' CSV HEADER ESCAPE '''';