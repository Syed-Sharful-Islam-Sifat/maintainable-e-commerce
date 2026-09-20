1. Completed the initial Setup Installed nextjs , typescript , app router , eslint(for best practices) import alias for smooth import.

2. initialized a git repository.

3. Need to install postgress via docker. but here first need to understand what are the processes of installing it. is there any best practices or security concern to install it.

Ok got some understanding about DHI is known as Dokcer Hardening producation ready container base and application images that provides secured Images and maintains by docker.

But the container storage is temporary designed so stopping the container the storage will also be removed

Thats why volume is important with volume data can be persistent through docker-managed storage locations that persist independently of containers

Bind mounts is an alternative way of persisting data that time it maps to a directory of host machine to docker-container the data stores as long as the somehow data does not remove from disk.

To manage docker configuration file under one single file we can use docker-compose much easy to maintain

postgres image is running 

4. now need to install prisma client
npm install --save-dev prisma
npm install @prisma/client

prisma is kind of a toolbox where we can use migrate , db init , generate and studio

prisma client is needed to talk with db its like API for server to db.

npx prisma init --datasource-provider postgresql

creates a prisma/schema.prisma and a .env with a placeholder DATABASE_URL

Now we will do schema design before doing the schema design we should follow a methods so that it becomes easy for us to make the decision easy.

There are three key factors to make the decision while designing the schema

1. Volume. How much data are going to be stored for example 1b(can single db handle it or we need distribution)

2. Access pattern. How system will query the data

3. Consistency requirements - How Strict (ACID vs eventual consistency)

Now Schema sketching is done. I will now install npm install @prisma/adapter-pg pg dotenv as new schema 7 workflow is different than what claude suggested me

I have written the schema but needs to run npx prisma generate to create prisma client and get all the methods also with types

as we have generated primsa client and now we have to generate real tables through running prisma migrate dev:npx prisma migrate dev --name init

Now to see the GUI to ensure about the creation of tables a snd see the tables live we need to run npx prisma studio 

now we have to seed the product category and some product so to run the script we have to install the typescript in root as seeding the data should out of the src folder so run npm install --save-dev tsx 

I have written the script for product category to seed into db one thing to notice here is I have used:  for (const category of categories){
        await prisma.productCategory.upsert({
           where:{id:category.id},
           update:category,
           create:category 
        })
    }

upsert on a fixed id makes the seed idempotent run it ten times get the same result , no duplicates the deletemany and create is another option but it fails when you have referential integrity

Now I have seeded the data successfully to the postgres db.

Now we have to decide about the price as prisma client returns the decimal object so we should provide a global solution so we will return a round number on cents and stripe will also convert price into cents.

We will define each of the core entities type on src/domain we have choosen domain over types because it represents a concept.

Now we will write interfaces for repository. why? because it gives you what operations are allowed or avaialble to do without exposing the implementation details and also it works for different database as well if in future other database needs to query as defined interface user only needs to use interface and also it is hugely benifited in terms of writing unit test user does not need to use real db.

I have created a db connection on prisma in src/lib/prisma.ts and here PrismaPg is the driver adapter. In Prisma 7 the client does not open a database connection itself the adapter built on pg driver does. purpose of globalThis is we will use single prismaCLient instance without this every time on change db will try to use new connection this way connection pool limit can exceed and says too many clients globalThis survives the reload, so the second run finds the first client and reuses it but in productuon theres no hot reload so guard is not needed

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
