import { message } from 'antd';
import { useEffect } from 'react';
import type { PropsWithChildren } from 'react';
import { setMessageApi } from '../utils/global-message';

export function GlobalMessageProvider({ children }: PropsWithChildren) {
  const [messageApi, contextHolder] = message.useMessage();

  useEffect(() => {
    setMessageApi(messageApi);
  }, [messageApi]);

  return (
    <>
      {contextHolder}
      {children}
    </>
  );
}
