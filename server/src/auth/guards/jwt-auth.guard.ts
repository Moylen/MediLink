import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';


@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private authService: AuthService) {
  }

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return false;
    }

    const token = authHeader.split(' ')[1];
    try {
      request.user = this.authService.validateToken(token);
      return true;
    } catch (err) {
      console.log(err);
      return false;
    }
  }
}
