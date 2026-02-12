import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useAuditLog } from './useAuditLog';

type UserRole = 'admin' | 'editor' | 'counselor' | 'student' | 'agent';

interface RolePermissions {
  canManageUsers: boolean;
  canManageContent: boolean;
  canViewAnalytics: boolean;
  canManageSettings: boolean;
  canViewAuditLogs: boolean;
}

const ROLE_HIERARCHY: Record<UserRole, number> = {
  admin: 5,
  editor: 4,
  counselor: 3,
  agent: 2,
  student: 1
};

const ROLE_PERMISSIONS: Record<UserRole, RolePermissions> = {
  admin: {
    canManageUsers: true,
    canManageContent: true,
    canViewAnalytics: true,
    canManageSettings: true,
    canViewAuditLogs: true
  },
  editor: {
    canManageUsers: false,
    canManageContent: true,
    canViewAnalytics: true,
    canManageSettings: false,
    canViewAuditLogs: false
  },
  counselor: {
    canManageUsers: false,
    canManageContent: false,
    canViewAnalytics: false,
    canManageSettings: false,
    canViewAuditLogs: false
  },
  agent: {
    canManageUsers: false,
    canManageContent: false,
    canViewAnalytics: false,
    canManageSettings: false,
    canViewAuditLogs: false
  },
  student: {
    canManageUsers: false,
    canManageContent: false,
    canViewAnalytics: false,
    canManageSettings: false,
    canViewAuditLogs: false
  }
};

export const useRoleValidation = () => {
  const { user } = useAuth();
  const { logEvent } = useAuditLog();
  const [currentRole, setCurrentRole] = useState<UserRole | null>(null);
  const [permissions, setPermissions] = useState<RolePermissions | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserRole = async () => {
      if (!user) {
        setLoading(false);
        return;
      }

      try {
        const { data: userProfile, error } = await supabase
          .from('user_profiles')
          .select('role')
          .eq('user_id', user.id)
          .single();

        if (error) {
          console.error('Error fetching user role:', error);
          setCurrentRole('student'); // Default to student
        } else {
          const role = userProfile?.role as UserRole || 'student';
          setCurrentRole(role);
          setPermissions(ROLE_PERMISSIONS[role]);
        }
      } catch (error) {
        console.error('Role fetch error:', error);
        setCurrentRole('student');
        setPermissions(ROLE_PERMISSIONS.student);
      } finally {
        setLoading(false);
      }
    };

    fetchUserRole();
  }, [user]);

  const hasPermission = useCallback((permission: keyof RolePermissions): boolean => {
    if (!permissions) return false;
    return permissions[permission];
  }, [permissions]);

  const canModifyRole = useCallback((targetRole: UserRole): boolean => {
    if (!currentRole) return false;
    
    // Only admins can modify roles
    if (currentRole !== 'admin') return false;
    
    // Admins can modify any role except their own to prevent lockout
    return ROLE_HIERARCHY[currentRole] >= ROLE_HIERARCHY[targetRole];
  }, [currentRole]);

  const validateRoleChange = useCallback(async (
    targetUserId: string,
    newRole: UserRole,
    currentUserRole?: UserRole
  ): Promise<{ isValid: boolean; error?: string }> => {
    // Security validations
    if (!user || !currentRole) {
      return { isValid: false, error: 'Authentication required' };
    }

    if (currentRole !== 'admin') {
      await logEvent({
        action: 'unauthorized_role_change_attempt',
        tableName: 'user_profiles',
        recordId: targetUserId,
        newValues: { attempted_role: newRole, current_user_role: currentRole }
      });
      return { isValid: false, error: 'Insufficient privileges' };
    }

    // Prevent self-role modification that could cause lockout
    if (targetUserId === user.id && newRole !== 'admin') {
      await logEvent({
        action: 'self_admin_role_removal_attempt',
        tableName: 'user_profiles',
        recordId: targetUserId,
        newValues: { attempted_role: newRole }
      });
      return { isValid: false, error: 'Cannot remove admin role from yourself' };
    }

    // Validate role hierarchy
    if (!canModifyRole(newRole)) {
      return { isValid: false, error: 'Cannot assign this role level' };
    }

    return { isValid: true };
  }, [user, currentRole, canModifyRole, logEvent]);

  const updateUserRole = useCallback(async (
    targetUserId: string,
    newRole: UserRole,
    oldRole?: UserRole
  ): Promise<{ success: boolean; error?: string }> => {
    const validation = await validateRoleChange(targetUserId, newRole, oldRole);
    
    if (!validation.isValid) {
      return { success: false, error: validation.error };
    }

    try {
      const { error } = await supabase
        .from('user_profiles')
        .update({ role: newRole as any })
        .eq('user_id', targetUserId);

      if (error) {
        await logEvent({
          action: 'role_change_failed',
          tableName: 'user_profiles',
          recordId: targetUserId,
          oldValues: { role: oldRole },
          newValues: { role: newRole, error: error.message }
        });
        return { success: false, error: 'Failed to update role' };
      }

      await logEvent({
        action: 'role_changed',
        tableName: 'user_profiles',
        recordId: targetUserId,
        oldValues: { role: oldRole },
        newValues: { role: newRole }
      });

      return { success: true };
    } catch (error) {
      console.error('Role update error:', error);
      return { success: false, error: 'System error occurred' };
    }
  }, [validateRoleChange, logEvent]);

  return {
    currentRole,
    permissions,
    loading,
    hasPermission,
    canModifyRole,
    validateRoleChange,
    updateUserRole
  };
};