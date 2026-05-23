import { message } from 'antd';

type MessageApi = ReturnType<typeof message.useMessage>[0];

let messageApi: MessageApi | null = null;

export const setMessageApi = (api: MessageApi) => {
  messageApi = api;
};

const safeMessage = (fnName: 'success' | 'error' | 'info' | 'warning', content: string) => {
  try {
    if (!messageApi) {
      return;
    }
    return messageApi[fnName](content);
  } catch {
    return;
  }
};

export const globalMessage = {
  success: (content: string) => safeMessage('success', content),
  error: (content: string) => safeMessage('error', content),
  info: (content: string) => safeMessage('info', content),
  warning: (content: string) => safeMessage('warning', content),
};
