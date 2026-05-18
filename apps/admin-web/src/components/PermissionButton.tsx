import { Button, ButtonProps } from 'antd';
import { usePermission } from '../hooks/use-permission';

interface PermissionButtonProps extends ButtonProps {
  permission: string;
}

export function PermissionButton({ permission, ...props }: PermissionButtonProps) {
  const allowed = usePermission(permission);
  if (!allowed) return null;
  return <Button {...props} />;
}
