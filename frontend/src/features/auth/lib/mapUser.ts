// features/auth/lib/mapUser.ts
import type { User } from '@/features/auth/model/types';
import type { UserDTO } from '@/shared/api/auth/types';

export const mapUserToUI = (dto: UserDTO): User => ({
    id: dto.id,
    email: dto.email,
    firstName: dto.first_name,
    lastName: dto.last_name,
    fullName: dto.full_name,
    isStaff: dto.is_staff,
    isActive: dto.is_active,
    createdAt: dto.created_at,
});