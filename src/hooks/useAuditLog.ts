import { supabase } from '@/integrations/supabase/client';

interface AuditLogParams {
  action: string;
  tableName?: string;
  recordId?: string;
  oldValues?: any;
  newValues?: any;
}

export const useAuditLog = () => {
  const logEvent = async ({
    action,
    tableName,
    recordId,
    oldValues,
    newValues
  }: AuditLogParams) => {
    try {
      const { error } = await supabase.rpc('log_audit_event', {
        p_action: action,
        p_table_name: tableName || null,
        p_record_id: recordId || null,
        p_old_values: oldValues ? JSON.stringify(oldValues) : null,
        p_new_values: newValues ? JSON.stringify(newValues) : null
      });

      if (error) {
        console.error('Failed to log audit event:', error);
      }
    } catch (error) {
      console.error('Audit logging error:', error);
    }
  };

  return { logEvent };
};