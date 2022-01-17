DROP DATABASE movieland IF EXISTS;
CREATE DATABASE movieland;

CREATE TABLE user(
        user_id        Int  Auto_increment  NOT NULL ,
        user_firstname Varchar (50) NOT NULL ,
        user_lastname  Varchar (50) NOT NULL ,
        user_birth     Date NOT NULL ,
        user_mail      Varchar (50) NOT NULL ,
        user_phone     Varchar (20) ,
        user_password  Varchar (50) NOT NULL
	,CONSTRAINT user_PK PRIMARY KEY (user_id)
)ENGINE=InnoDB;



CREATE TABLE admin(
        admin_id        Int  Auto_increment  NOT NULL ,
        admin_firstname Varchar (50) NOT NULL ,
        admin_lastname  Varchar (50) NOT NULL ,
        admin_birth     Date NOT NULL ,
        admin_phone     Varchar (20) ,
        admin_mail      Varchar (50) NOT NULL ,
        admin_password  Varchar (100) NOT NULL
	,CONSTRAINT admin_PK PRIMARY KEY (admin_id)
)ENGINE=InnoDB;


CREATE TABLE formule(
        formule_id   Int  Auto_increment  NOT NULL ,
        formule_name Varchar (50) NOT NULL ,
        nb_personnes Int NOT NULL ,
        date         Date NOT NULL ,
        duree        Int NOT NULL ,
        accomp_handi TinyINT NOT NULL ,
        seminaire    TinyINT NOT NULL ,
        prix         Double NOT NULL
	,CONSTRAINT formule_PK PRIMARY KEY (formule_id)
)ENGINE=InnoDB;


CREATE TABLE contenu_emploi(
        emploi_id    Int  Auto_increment  NOT NULL ,
        emploi_desc  Text NOT NULL ,
        emploi_duree Datetime NOT NULL
	,CONSTRAINT contenu_emploi_PK PRIMARY KEY (emploi_id)
)ENGINE=InnoDB;



CREATE TABLE contenu_vie(
        contenu_id   Int  Auto_increment  NOT NULL ,
        contenu_desc Text NOT NULL ,
        contenu_type Varchar (50) NOT NULL
	,CONSTRAINT contenu_vie_PK PRIMARY KEY (contenu_id)
)ENGINE=InnoDB;



CREATE TABLE image(
        id         Int  Auto_increment  NOT NULL ,
        image_name Varchar (255)
	,CONSTRAINT image_PK PRIMARY KEY (id)
)ENGINE=InnoDB;



CREATE TABLE reserver(
        formule_id Int NOT NULL ,
        user_id    Int NOT NULL
	,CONSTRAINT reserver_PK PRIMARY KEY (formule_id,user_id)

	,CONSTRAINT reserver_formule_FK FOREIGN KEY (formule_id) REFERENCES formule(formule_id)
	,CONSTRAINT reserver_user0_FK FOREIGN KEY (user_id) REFERENCES user(user_id)
)ENGINE=InnoDB;



CREATE TABLE administrer(
        emploi_id Int NOT NULL ,
        admin_id  Int NOT NULL
	,CONSTRAINT administrer_PK PRIMARY KEY (emploi_id,admin_id)

	,CONSTRAINT administrer_contenu_emploi_FK FOREIGN KEY (emploi_id) REFERENCES contenu_emploi(emploi_id)
	,CONSTRAINT administrer_admin0_FK FOREIGN KEY (admin_id) REFERENCES admin(admin_id)
)ENGINE=InnoDB;



CREATE TABLE postuler(
        user_id   Int NOT NULL ,
        emploi_id Int NOT NULL
	,CONSTRAINT postuler_PK PRIMARY KEY (user_id,emploi_id)

	,CONSTRAINT postuler_user_FK FOREIGN KEY (user_id) REFERENCES user(user_id)
	,CONSTRAINT postuler_contenu_emploi0_FK FOREIGN KEY (emploi_id) REFERENCES contenu_emploi(emploi_id)
)ENGINE=InnoDB;



CREATE TABLE alimenter(
        contenu_id Int NOT NULL ,
        admin_id   Int NOT NULL
	,CONSTRAINT alimenter_PK PRIMARY KEY (contenu_id,admin_id)

	,CONSTRAINT alimenter_contenu_vie_FK FOREIGN KEY (contenu_id) REFERENCES contenu_vie(contenu_id)
	,CONSTRAINT alimenter_admin0_FK FOREIGN KEY (admin_id) REFERENCES admin(admin_id)
)ENGINE=InnoDB;

