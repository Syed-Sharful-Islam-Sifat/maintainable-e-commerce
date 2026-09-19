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

Now Schema sketching is done. we will now install npm install @prisma/adapter-pg pg dotenv as new schema 7 workflow is different than what claude suggested me
