import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import mongoose from 'mongoose';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
   // used for connect fronted to backend
   mongoose.connection.once('open', () => {
    console.log("MongoDB connected successfully")
   })
    mongoose.connection.on('error', (err) => {
    console.log("MongoDB connection error",err);
   })
  //   app.enableCors({   
  //   origin: 'http://localhost:5173', // Your React app URL
  //   methods: 'GET,POST,PUT,DELETE',
  // });
  app.enableCors({
  origin: 'http://localhost:5173',
  credentials: true,
  methods: 'GET,POST,PUT,DELETE,PATCH,OPTIONS',
  allowedHeaders: 'Content-Type, Authorization',
});
  const port = 5000; 
  await app.listen(port);
  
  console.log(`🚀 Server is running on: http://localhost:${port}`);


}
bootstrap();
// mongo db
//sign up cha crud
//login cha api la crud integrate