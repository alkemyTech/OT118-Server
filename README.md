# Server Base - Proyecto ONG


## Envinroment setup

1) Create database
2) Copy .env.example to .env and fill with database credentials.

To install dependencies, run
``` bash
npm install
```

3) Migrations:
``` bash
npx sequelize-cli db:migrate
```

4) Seeders:
``` bash
npx sequelize-cli db:seed:all
```

## Start local server

``` bash
npm start
```

## User data from seeders

Admin users


``` 

Name: Rick
Email: testAdminEmail1@gmail.com
Password: adminPasswordOT118!


Name: Federico
Email: testAdminEmail2@gmail.com
Password: adminPasswordOT118!


Name: Miles
Email: testAdminEmail3@gmail.com
Password: adminPasswordOT118!


Name: Miguel
Email: testAdminEmail4@gmail.com
Password: adminPasswordOT118!


Name: Lara
Email: testAdminEmail5@gmail.com
Password: adminPasswordOT118!


Name: Ricardo
Email: testAdminEmail6@gmail.com
Password: adminPasswordOT118!


Name: Axel
Email: testAdminEmail7@gmail.com
Password: adminPasswordOT118!


Name: Ramiro
Email: testAdminEmail8@gmail.com
Password: adminPasswordOT118!


Name: Esteban
Email: testAdminEmail9@gmail.com
Password: adminPasswordOT118!


Name: Elias
Email: testAdminEmail10@gmail.com
Password: adminPasswordOT118!

```


Regular users


``` 

Name: Pepe
Email: testEmail1@gmail.com
Password: passwordOT118!


Name: Rosa
Email: testEmail2@gmail.com
Password: passwordOT118!


Name: Jorge
Email: testEmail3@gmail.com
Password: passwordOT118!


Name: Abel
Email: testEmail4@gmail.com
Password: passwordOT118!


Name: Martin
Email: testAEmail5@gmail.com
Password: passwordOT118!


Name: Belen
Email: testEmail6@gmail.com
Password: passwordOT118!


Name: Prinscila
Email: testEmail7@gmail.com
Password: passwordOT118!


Name: Gabriel
Email: testmail8@gmail.com
Password: passwordOT118!


Name: Brian
Email: testEmail9@gmail.com
Password: passwordOT118!


Name: Anastasia
Email: testEmail10@gmail.com
Password: passwordOT118!


Name: Gonzalo
Email: testEmail10@gmail.com
Password: passwordOT118!

```
