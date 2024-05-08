import { NextFunction, Request, Response } from 'express';
import { FORBIDDEN } from 'http-status';

/**
 * prevent user enter api without authorization
 * @param allowRoles list allowed roles
 */
export const routeGuard = (allowedRoles: number[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const hasPermission = allowedRoles.includes(
      Number((req as any).user.positionId),
    );

    if (!hasPermission) {
      return res.status(FORBIDDEN).json({ message: 'Forbidden' });
    }

    return next();
  };
};
