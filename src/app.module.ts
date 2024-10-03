import { Module } from '@nestjs/common';
import { AuthUserModule } from './context/authUser/infraestructure/authuser.module';

@Module({
  imports: [AuthUserModule],
})
export class AppModule {}
