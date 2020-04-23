export interface Token {
  headerName: string;
  token: string;
  expiresAt: Date;
  permissions: string[];
  username: string;
}
