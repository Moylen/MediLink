import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class ExcludePasswordInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map(data => {
        // Если ответом является объект пользователя, исключаем поле пароля
        if (Array.isArray(data)) {
          return data.map(item => this.excludePassword(item));
        } else {
          return this.excludePassword(data);
        }
      }),
    );
  }

  private excludePassword(data: any): any {
    if (data && data.password) {
      delete data.password;
    }
    return data;
  }
}
