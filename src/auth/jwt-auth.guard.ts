//Without Guard Your routes will be completely unprotected
//Anyone can call this API: No login required  No token required  No security ❌

import { AuthGuard } from '@nestjs/passport';

export class JwtAuthGuard extends AuthGuard('jwt') {}