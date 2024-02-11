npm install prisma --save-dev
npm install lodash

Start from scratch
    Relational databases

        npx prisma          //prisma cli
        npx prisma init     //Prisma schema file & env
        npx prisma migrate dev --name init  //creates a new SQL migration file & run it

        npm install @prisma/client
        npx prisma generate     //reads your Prisma schema and generates your Prisma Client library        

Add to existing project
    Relational databases
        ////////////default////////////////////////////////////////////////////////////////////////
        npx prisma          //prisma cli
        npx prisma init     //Prisma schema file & env
        //npx prisma init --datasource-provider sqlite

        npx prisma db pull  // introspect database -> data model inside Prisma schema
        //uppercased & Prisma's naming conventions
        mkdir -p prisma/migrations/0_init
        npx prisma migrate diff --from-empty --to-schema-datamodel prisma/schema.prisma --script > prisma/migrations/0_init/migration.sql
        npx prisma migrate resolve --applied 0_init
        //if changes to your database schema
            npx prisma migrate dev //apply the changes to your database
        npm install @prisma/client
        npx prisma generate     //reads your Prisma schema and generates your Prisma Client library
        /////////////////////////////////////////////////////////////////////////////////////////////
        npx prisma init --schema=./databases/prismaMysql/schema.prisma
        npx prisma db pull --schema=./databases/prismaMysql/schema.prisma
        npx prisma migrate diff --from-empty --to-schema-datamodel databases/prismaMysql/schema.prisma --script > databases/prismaMysql/migrations/0_init/migration.sql
        npx prisma migrate resolve --applied 0_init --schema=./databases/prismaMysql/schema.prisma
        npx prisma migrate dev --name init --schema=./databases/prismaMysql/schema.prisma
        npx prisma generate --schema=./databases/prismaMysql/schema.prisma
        /////////////////////////////////////////////////////////////////////////////////////////////
        npx prisma init --schema=./databases/prismaSqlite/schema.prisma
        npx prisma db pull --schema=./databases/prismaSqlite/schema.prisma
        npx prisma migrate diff --from-empty --to-schema-datamodel databases/prismaSqlite/schema.prisma --script > databases/prismaSqlite/migrations/0_init/migration.sql
        npx prisma generate --schema=./databases/prismaSqlite/schema.prisma

npx prisma init --schema=./dist/databases/prismaMongodb/schema.prisma 
npx prisma generate --schema=./dist/models/mongodb/schema.prisma 


////git
echo "# podify" >> README.md
git init
git add README.md
git commit -m "first commit"
git branch -M main
git remote add origin https://github.com/mrsupon/podify.git
git push -u origin main


