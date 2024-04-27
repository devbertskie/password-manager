const paths = {
  toDashboard: () => '/dashboard',
  toLogin: () => '/login',
  toRegister: () => '/register',
  toPasswords: () => '/passwords',
  toWeb: () => '/web',
  toWebItem: (id: string) => `/web/${id}`,
  toWebItemMobile: (id: string) => `/web/mobile/${id}`,
  toIdentities: () => '/identities',
  toEmails: () => '/emails',
  toNotes: () => '/notes',
  toSettings: () => '/settings',
  toChangePassword: () => '/settings/credential',
  toForgotPassword: () => '/forgot-password',
};

export default paths;
