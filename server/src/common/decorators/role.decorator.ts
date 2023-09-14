import { ROLES } from '@common/constants';
import { SetMetadata } from '@nestjs/common';

export const Roles = (args: ROLES[]) => SetMetadata('roles', args);
