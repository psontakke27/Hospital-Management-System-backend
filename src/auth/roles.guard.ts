import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";


@Injectable()
export class RolesGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean {
        const request = context.switchToHttp().getRequest();
        console.log("🚀 ~ RolesGuard ~ canActivate ~ request:", request)
        const user = request.user;
        console.log("🚀 ~ RolesGuard ~ canActivate ~ user:", user)
        return user.role === 'admin';
    }
        
}

// @Injectable() ---> Without this, NestJS won’t use it as a guard.
// creating a Guard implements CanActivate means:  👉 “This class MUST have a method called canActivate()
// canActivate(context: ExecutionContext): boolean ---->context = full request info --return true → allow access -- return false → block access
// const request = context.switchToHttp().getRequest();--> gat http request 
//   const user = request.user;  After JWT authentication, NestJS stores user info inside request.user