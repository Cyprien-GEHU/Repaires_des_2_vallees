### Technical Documentation - Repaire des 2 Vallées ![favicon-16x16](/Repaires_des_2_vallees/Stage%203/favicon.ico)

## User Stories and Mockups


## Design System Architecture
front-end : HTML, CSS
back-end : node.js and express
database: mangoDb
api external : Ionos

## Components, Classes, and Database Design
Class :
- article
- agenda
database :
- Admin : nom, prenom, mail, PhoneNumber, rule, password, id_admin
- User: nom, prenom, rule, mail, adress, password, PhoneNumber, id_User
- Agenda: titre, description, day, image (optionnal), prix, id_agenda
- Article : titre, description, date, image (optionnal), creator, id_Article

## High-Level Sequence Diagrams


## Document External and Internal APIs

### **User part**

| **URL**  | **Method**      | **input** (json)                 | **Output** (json or message)  | 
|------------|-----------------|---------------------------------|--------------|
|api/user/signin|POST|``{FirstName, LastName, numero, adress, Password}``|"Your acount are created!"|
|api/user/login | GET | ``{Email, Password}``|``{token}``|
|api/user/parameter|PUT|``{FirstName, LastName, numero, adress, Password, id}``|"Your information have been modified"|
|api/user/Delete|DELETE|``{id_user}``|"your acount are been delete"|
|api/article| GET ||``{list of article}``|
|api/article/:id |GET|``{id_Article}``|``{title, description, date, image}``|
|api/agenda |GET||``{list of article}``|
|api/agenda:id |GET|``{id_Agenda}``|``{title, description, date, image}``|

### **admin part**

| **URL**  | **Method**      | **input** (json)                 | **Output** (json or message)  | 
|------------|-----------------|---------------------------------|--------------|
|api/admin/user/parameter|PUT|``{FirstName, LastName, numero, adress, Password, id_User, id_admin}``|"the user info have been modified"|
|api/admin/user/parameter|DELETE|``{id_user}``|"the acount user are delete"|
|api/admin/article| POST |``{titre, description, date, image (optionnal)}``|"Your article are create !"|
|api/admin/article:id |PUT|``{titre, description, date, image (optionnal)}``|" The article are update !"|
|api/admin/article/:id |DELETE|``{id_Article}``|"the article has deleted"|
|api/admin/agenda |POST|``{titre, description, date, image (optionnal)}``|"Your agenda are create !"|
|api/admin/agenda:id |PUT|``{id_Agenda, titre, description, date, image (optionnal)}``|" The agenda are update !"|
|api/admin/agenda:id |DELETE|``{id_Agenda}``|" The agenda are delete !"|


## Plan SCM and QA Strategies


## Technical Justifications

We goes with a classique technologie for these raison :
- Our client are a litle assiosiation
- If the client recrute a developper web the web site need to be simple
- 