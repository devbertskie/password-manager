const paths = {
  toDashboard: () => '/dashboard',
  toLogin: () => '/login',
  toRegister: () => '/register',
  toPasswords: () => '/passwords',
  toWeb: () => '/web',
  toWebItem: (id: string) => `/web/${id}`,
  toWebItemMobile: (id: string) => `/web/mobile/${id}`,
  toEmail: () => '/emails',
  toEmailItem: (id: string) => `/emails/${id}`,
  toEmailItemMobile: (id: string) => `/emails/mobile/${id}`,
  toEmails: () => '/emails',
  toNotes: () => '/notes',
  toNoteItem: (id: string) => `/notes/${id}`,
  toNoteItemMobile: (id: string) => `/notes/mobile/${id}`,
  toSettings: () => '/settings',
  toChangePassword: () => '/settings/credential',
  toForgotPassword: () => '/forgot-password',
  toTrash: () => '/trash',
};

export default paths;
