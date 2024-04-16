const paths = {
  toDashboard: () => '/dashboard',
  toLogin: () => '/login',
  toRegister: () => '/register',
  toPasswords: () => '/passwords',
  toWeb: () => '/web',
  toWebItem: (id: string) => `/web/${id}`,
  toIdentities: () => '/identities',
  toEmails: () => '/emails',
  toNotes: () => '/notes',
  toSettings: () => '/settings',
  toChangePassword: () => '/settings/credential',
};

export default paths;
