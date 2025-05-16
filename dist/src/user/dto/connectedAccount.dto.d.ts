declare class TokenDto {
    token: string;
    expiry: string;
    scopes: string[];
    client_id: string;
    token_uri: string;
    client_secret: string;
    refresh_token?: string;
    universe_domain: string;
}
export declare class ConnectedAccountDto {
    token: TokenDto;
    provider: string;
    accountId: string;
}
export {};
